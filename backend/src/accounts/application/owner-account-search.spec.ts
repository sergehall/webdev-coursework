import type { Request } from "express";
import { AccountStore } from "../store/account.store";
import { OwnerAccess, type OwnerAccessContext } from "./owner-access";

describe("administration account search access", () => {
  const req = {} as Request;
  const pageForAdministration = jest.fn().mockResolvedValue({
    page: 1,
    entries: [],
    hasMore: false,
  });
  const audit = jest.fn();
  const access = new OwnerAccess({
    store: { pageForAdministration },
    audit,
  } as unknown as OwnerAccessContext);
  let authorize: jest.SpiedFunction<OwnerAccess["authorize"]>;

  beforeEach(() => {
    jest.clearAllMocks();
    authorize = jest.spyOn(access, "authorize").mockResolvedValue({
      accountId: AccountStore.ROOT_ID,
    } as Awaited<ReturnType<OwnerAccess["authorize"]>>);
  });

  afterEach(() => jest.restoreAllMocks());

  it("authorizes before passing a trimmed bounded search to storage", async () => {
    await access.accountPage(req, "  Taylor@example.test  ", "2");
    expect(authorize).toHaveBeenCalledWith(req, "accounts.list");
    expect(pageForAdministration).toHaveBeenCalledWith(
      "Taylor@example.test",
      2
    );
    await expect(access.accountPage(req, "x".repeat(81))).rejects.toMatchObject(
      { status: 400 }
    );
    await expect(
      access.accountPage(req, ["alex"] as never)
    ).rejects.toMatchObject({
      status: 400,
    });
    await expect(access.accountPage(req, "", "0")).rejects.toMatchObject({
      status: 400,
    });
    await expect(access.accountPage(req, "", "1 OR 1=1")).rejects.toMatchObject(
      { status: 400 }
    );
    await expect(
      access.accountPage(req, "", ["1"] as never)
    ).rejects.toMatchObject({ status: 400 });
    expect(pageForAdministration).toHaveBeenCalledTimes(1);
  });

  it("keeps search inaccessible to another administrator", async () => {
    authorize.mockResolvedValueOnce({
      accountId: "123e4567-e89b-42d3-a456-426614174000",
    } as Awaited<ReturnType<OwnerAccess["authorize"]>>);
    await expect(access.accountPage(req, "Taylor")).rejects.toMatchObject({
      status: 403,
    });
    expect(pageForAdministration).not.toHaveBeenCalled();
  });
});
