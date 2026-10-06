import { CloudflareProvider } from "./cloudflare-provider";
import { PLAN_OUTPUT_TOKENS } from "./generation-config";
import { CloudflareQuotaExhaustedError } from "./provider-errors";

describe("structured Cloudflare plan response", () => {
  const original = {
    mode: process.env.AI_PROVIDER_MODE,
    account: process.env.CLOUDFLARE_ACCOUNT_ID,
    token: process.env.CLOUDFLARE_AI_API_TOKEN,
    fallback: process.env.CLOUDFLARE_API_TOKEN,
  };
  beforeEach(() => {
    process.env.AI_PROVIDER_MODE = "cloudflare";
    process.env.CLOUDFLARE_ACCOUNT_ID = "test-account";
    process.env.CLOUDFLARE_AI_API_TOKEN = "test-token";
  });
  afterEach(() => {
    for (const [key, value] of Object.entries({
      AI_PROVIDER_MODE: original.mode,
      CLOUDFLARE_ACCOUNT_ID: original.account,
      CLOUDFLARE_AI_API_TOKEN: original.token,
      CLOUDFLARE_API_TOKEN: original.fallback,
    })) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    jest.restoreAllMocks();
  });

  it("requests bounded JSON mode and decodes the measured result envelope", async () => {
    const value = { goal: "frontend", milestones: [] };
    const fetcher = jest.spyOn(global, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
          result: {
            choices: [
              {
                message: { content: JSON.stringify(value) },
                finish_reason: "stop",
              },
            ],
            usage: {
              prompt_tokens: 100,
              completion_tokens: 40,
              total_neurons: 5.5,
            },
          },
        }),
        { status: 200 }
      )
    );
    const result = await new CloudflareProvider().completePlan(
      [{ role: "user", content: "Plan" }],
      new AbortController().signal
    );
    expect(result).toEqual({
      value,
      usage: { inputTokens: 100, outputTokens: 40, neurons: 5.5 },
    });
    const request = JSON.parse(String(fetcher.mock.calls[0][1]?.body));
    expect(request).toMatchObject({
      stream: false,
      max_tokens: PLAN_OUTPUT_TOKENS,
      response_format: { type: "json_schema" },
    });
  });

  it("rejects a response truncated by the token cap", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
          result: {
            choices: [{ message: { content: "{}" }, finish_reason: "length" }],
          },
        }),
        { status: 200 }
      )
    );
    await expect(
      new CloudflareProvider().completePlan(
        [{ role: "user", content: "Plan" }],
        new AbortController().signal
      )
    ).rejects.toThrow("Incomplete provider response");
  });

  it.each([429, 502])(
    "reports HTTP %i without exposing the response body",
    async (status) => {
      jest
        .spyOn(global, "fetch")
        .mockResolvedValue(new Response("private upstream detail", { status }));
      await expect(
        new CloudflareProvider().completePlan(
          [{ role: "user", content: "Plan" }],
          new AbortController().signal
        )
      ).rejects.toThrow(`Provider HTTP ${status}`);
    }
  );

  it("recognizes only Cloudflare's daily-allocation code as a global pause signal", async () => {
    const fetcher = jest.spyOn(global, "fetch");
    fetcher.mockResolvedValueOnce(
      new Response(
        JSON.stringify({ errors: [{ code: 3036, message: "private" }] }),
        {
          status: 429,
        }
      )
    );
    await expect(
      new CloudflareProvider().completePlan(
        [{ role: "user", content: "Plan" }],
        new AbortController().signal
      )
    ).rejects.toBeInstanceOf(CloudflareQuotaExhaustedError);
    fetcher.mockResolvedValueOnce(
      new Response(JSON.stringify({ errors: [{ code: 3040 }] }), {
        status: 429,
      })
    );
    await expect(
      new CloudflareProvider().completePlan(
        [{ role: "user", content: "Plan" }],
        new AbortController().signal
      )
    ).rejects.toThrow("Provider HTTP 429");
  });

  it("passes cancellation to the upstream fetch", async () => {
    const fetcher = jest
      .spyOn(global, "fetch")
      .mockImplementation(async (_url, init) => {
        if (init?.signal?.aborted) throw init.signal.reason;
        throw new Error("Unexpected provider dispatch");
      });
    const controller = new AbortController();
    controller.abort();
    await expect(
      new CloudflareProvider().completePlan(
        [{ role: "user", content: "Plan" }],
        controller.signal
      )
    ).rejects.toBeDefined();
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
});
