import { TypeOrmPostgresOptions } from "./TypeOrmPostgresOptions";

function getSslOption(options: object): unknown {
  return Reflect.get(options, "ssl");
}

describe("TypeOrmPostgresOptions SSL behavior", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.DYNO;
    delete process.env.POSTGRES_SSL;
    delete process.env.POSTGRES_SSL_REJECT_UNAUTHORIZED;
    process.env.NODE_ENV = "production";
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("defaults rejectUnauthorized=false on Heroku dynos", async () => {
    process.env.DYNO = "web.1";
    const options = await new TypeOrmPostgresOptions().createTypeOrmOptions();

    expect(getSslOption(options)).toEqual({ rejectUnauthorized: false });
  });

  it("defaults rejectUnauthorized=true in non-Heroku production", async () => {
    const options = await new TypeOrmPostgresOptions().createTypeOrmOptions();

    expect(getSslOption(options)).toEqual({ rejectUnauthorized: true });
  });

  it("respects explicit rejectUnauthorized override", async () => {
    process.env.DYNO = "web.1";
    process.env.POSTGRES_SSL_REJECT_UNAUTHORIZED = "true";
    const options = await new TypeOrmPostgresOptions().createTypeOrmOptions();

    expect(getSslOption(options)).toEqual({ rejectUnauthorized: true });
  });

  it("disables SSL when POSTGRES_SSL=false", async () => {
    process.env.POSTGRES_SSL = "false";
    const options = await new TypeOrmPostgresOptions().createTypeOrmOptions();

    expect(getSslOption(options)).toBeUndefined();
  });
});
