import type { Request } from "express";
import type { AnalyticsService } from "../../analytics/analytics.service";
import { AccountStore } from "../../accounts/store/account.store";
import { MentorAdminController } from "./mentor-admin.controller";
import type { MentorAdminStore } from "./mentor-admin.store";

describe("Mentor administration authorization", () => {
  const req = {} as Request;
  const authorize = jest.fn();
  const assertOrigin = jest.fn();
  const usage = jest.fn();
  const setGenerationEnabled = jest.fn();
  const controller = new MentorAdminController(
    { authorize, assertOrigin } as unknown as AnalyticsService,
    { usage, setGenerationEnabled } as unknown as MentorAdminStore
  );
  const clientId = "123e4567-e89b-42d3-a456-426614174000";

  beforeEach(() => {
    jest.clearAllMocks();
    usage.mockResolvedValue({ entries: [] });
    setGenerationEnabled.mockResolvedValue({ enabled: false });
  });

  it("does not reveal usage to a client or another administrator", async () => {
    authorize.mockRejectedValueOnce(new Error("Owner access required"));
    await expect(controller.usage(req)).rejects.toThrow(
      "Owner access required"
    );
    authorize.mockResolvedValueOnce({ accountId: clientId });
    await expect(controller.usage(req)).rejects.toMatchObject({ status: 403 });
    expect(usage).not.toHaveBeenCalled();
  });

  it("requires trusted Origin and primary administration for access changes", async () => {
    assertOrigin.mockImplementationOnce(() => {
      throw new Error("Untrusted origin");
    });
    await expect(
      controller.setGenerationEnabled(req, clientId, { enabled: false })
    ).rejects.toThrow("Untrusted origin");
    expect(authorize).not.toHaveBeenCalled();
    authorize.mockResolvedValueOnce({ accountId: clientId });
    await expect(
      controller.setGenerationEnabled(req, clientId, { enabled: false })
    ).rejects.toMatchObject({ status: 403 });
    expect(setGenerationEnabled).not.toHaveBeenCalled();
  });

  it("validates inputs and allows the primary administrator", async () => {
    authorize.mockResolvedValue({ accountId: AccountStore.ROOT_ID });
    await expect(controller.usage(req, "90", "1")).rejects.toMatchObject({
      status: 400,
    });
    await controller.usage(req, "7", "2");
    expect(usage).toHaveBeenCalledWith(7, 2);
    await expect(
      controller.setGenerationEnabled(req, clientId, { enabled: "false" })
    ).rejects.toMatchObject({ status: 400 });
    await controller.setGenerationEnabled(req, clientId, { enabled: false });
    expect(setGenerationEnabled).toHaveBeenCalledWith(
      clientId,
      false,
      AccountStore.ROOT_ID
    );
  });
});
