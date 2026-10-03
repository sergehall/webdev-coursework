import type { DataSource } from "typeorm";

import { AccountStore } from "./account.store";

describe("account credential lookup", () => {
  it("binds the supplied identity as data in both username and email lookups", async () => {
    const query = jest.fn().mockResolvedValue([]);
    const store = new AccountStore({ query } as unknown as DataSource);
    const identity = "student' OR '1'='1";

    await expect(store.byLogin(identity)).resolves.toBeNull();
    expect(query).toHaveBeenCalledTimes(1);
    const [sql, parameters] = query.mock.calls[0] as [string, string[]];
    expect(sql).toContain("lower(username)=lower($1)");
    expect(sql).toContain("lower(email)=lower($1)");
    expect(sql).not.toContain(identity);
    expect(parameters).toEqual([identity]);
  });
});
