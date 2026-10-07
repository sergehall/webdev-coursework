import { GenerationService } from "./generation.service";
import type { GenerationStore } from "./generation.store";
import type { GenerationPrompt } from "./generation-prompt";
import type { CloudflareProvider } from "./cloudflare-provider";
import type { PlanPrompt } from "../pathway/plan-prompt";
import type { PlanGenerationStore } from "../pathway/plan-generation.store";

describe("verified reference answer", () => {
  it("persists and streams the grounded answer without dispatching Workers AI", async () => {
    const store = {
      cancelled: jest.fn().mockResolvedValue(false),
      markDispatched: jest.fn(),
      completeVerifiedCss: jest.fn().mockResolvedValue({
        state: "completed",
        assistant_message_id: "message-1",
      }),
    };
    const provider = { stream: jest.fn() };
    const service = new GenerationService(
      store as unknown as GenerationStore,
      { build: jest.fn().mockResolvedValue([]) } as unknown as GenerationPrompt,
      provider as unknown as CloudflareProvider,
      {} as PlanPrompt,
      {} as PlanGenerationStore
    );
    const events = [];
    for await (const event of service.run(
      "account-1",
      "conversation-1",
      "generation-1",
      "How are normal and important user and author CSS declarations ordered in the cascade?",
      14
    ))
      events.push(event);

    expect(events.map((event) => event.event)).toEqual([
      "text_delta",
      "completed",
    ]);
    expect(events[0]).toMatchObject({
      delta: expect.stringContaining("normal author > normal user"),
    });
    expect(store.completeVerifiedCss).toHaveBeenCalledTimes(1);
    expect(store.markDispatched).not.toHaveBeenCalled();
    expect(provider.stream).not.toHaveBeenCalled();
  });

  it("honors a cancellation before the verified response is saved", async () => {
    const store = {
      cancelled: jest.fn().mockResolvedValue(true),
      finish: jest.fn().mockResolvedValue({ state: "cancelled" }),
      completeVerifiedCss: jest.fn(),
      markDispatched: jest.fn(),
    };
    const provider = { stream: jest.fn() };
    const service = new GenerationService(
      store as unknown as GenerationStore,
      { build: jest.fn().mockResolvedValue([]) } as unknown as GenerationPrompt,
      provider as unknown as CloudflareProvider,
      {} as PlanPrompt,
      {} as PlanGenerationStore
    );
    const events = [];
    for await (const event of service.run(
      "account-1",
      "conversation-1",
      "generation-1",
      "How are normal and important user and author CSS declarations ordered in the cascade?",
      14
    ))
      events.push(event);
    expect(events).toEqual([{ event: "cancelled", partial: false }]);
    expect(store.finish).toHaveBeenCalledWith(
      "account-1",
      "generation-1",
      "cancelled",
      ""
    );
    expect(store.completeVerifiedCss).not.toHaveBeenCalled();
    expect(store.markDispatched).not.toHaveBeenCalled();
    expect(provider.stream).not.toHaveBeenCalled();
  });

  it("does not stream an answer when the reservation already timed out", async () => {
    const store = {
      cancelled: jest.fn().mockResolvedValue(false),
      completeVerifiedCss: jest.fn().mockResolvedValue({ state: "abandoned" }),
      markDispatched: jest.fn(),
    };
    const provider = { stream: jest.fn() };
    const service = new GenerationService(
      store as unknown as GenerationStore,
      { build: jest.fn().mockResolvedValue([]) } as unknown as GenerationPrompt,
      provider as unknown as CloudflareProvider,
      {} as PlanPrompt,
      {} as PlanGenerationStore
    );
    const events = [];
    for await (const event of service.run(
      "account-1",
      "conversation-1",
      "generation-1",
      "How are normal and important user and author CSS declarations ordered in the cascade?",
      14
    ))
      events.push(event);
    expect(events).toEqual([
      {
        event: "failed",
        code: "AI_TIMEOUT",
        partial: false,
        canRetry: true,
      },
    ]);
    expect(store.markDispatched).not.toHaveBeenCalled();
    expect(provider.stream).not.toHaveBeenCalled();
  });
});
