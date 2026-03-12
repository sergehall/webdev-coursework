import { TypeOrmPostgresOptions } from "./TypeOrmPostgresOptions";

function getSslOption(options: object): unknown {
  return Reflect.get(options, "ssl");
}

function getSynchronizeOption(options: object): unknown {
  return Reflect.get(options, "synchronize");
}

function getUrlOption(options: object): unknown {
  return Reflect.get(options, "url");
}

function getRetryAttemptsOption(options: object): unknown {
  return Reflect.get(options, "retryAttempts");
}

function getRetryDelayOption(options: object): unknown {
  return Reflect.get(options, "retryDelay");
}

function getExtraOptions(options: object): Record<string, unknown> {
  return (Reflect.get(options, "extra") as Record<string, unknown>) ?? {};
}

describe("TypeOrmPostgresOptions", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.DYNO;
    delete process.env.POSTGRES_SSL;
    delete process.env.POSTGRES_SSL_REJECT_UNAUTHORIZED;
    process.env.DATABASE_URL = "postgres://postgres:postgres@localhost:5432/app";
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

  it("keeps synchronize disabled by default", async () => {
    const options = await new TypeOrmPostgresOptions().createTypeOrmOptions();

    expect(getSynchronizeOption(options)).toBe(false);
  });

  it("enables synchronize only when TYPEORM_SYNCHRONIZE=true", async () => {
    process.env.TYPEORM_SYNCHRONIZE = "true";
    const options = await new TypeOrmPostgresOptions().createTypeOrmOptions();

    expect(getSynchronizeOption(options)).toBe(true);
  });

  it("uses DATABASE_URL as the connection source", async () => {
    process.env.DATABASE_URL = "postgres://user:pass@db.example.com:5432/prod";
    const options = await new TypeOrmPostgresOptions().createTypeOrmOptions();

    expect(getUrlOption(options)).toBe(
      "postgres://user:pass@db.example.com:5432/prod"
    );
  });

  it("throws when DATABASE_URL is missing", async () => {
    delete process.env.DATABASE_URL;

    await expect(
      new TypeOrmPostgresOptions().createTypeOrmOptions()
    ).rejects.toThrow(
      "DATABASE_URL is required for database connection configuration"
    );
  });

  it("applies safe defaults for connection pool and statement timeout", async () => {
    delete process.env.TYPEORM_POOL_MAX;
    delete process.env.TYPEORM_STATEMENT_TIMEOUT_MS;

    const options = await new TypeOrmPostgresOptions().createTypeOrmOptions();
    const extra = getExtraOptions(options);

    expect(extra.max).toBe(10);
    expect(extra.statement_timeout).toBe(15000);
  });

  it("clamps pool and timeout values to minimum safe positive integer", async () => {
    process.env.TYPEORM_POOL_MAX = "0";
    process.env.TYPEORM_STATEMENT_TIMEOUT_MS = "-5";

    const options = await new TypeOrmPostgresOptions().createTypeOrmOptions();
    const extra = getExtraOptions(options);

    expect(extra.max).toBe(1);
    expect(extra.statement_timeout).toBe(1);
  });

  it("keeps retry configuration safe and positive", async () => {
    process.env.TYPEORM_RETRY_ATTEMPTS = "0";
    process.env.TYPEORM_RETRY_DELAY_MS = "-100";

    const options = await new TypeOrmPostgresOptions().createTypeOrmOptions();

    expect(getRetryAttemptsOption(options)).toBe(1);
    expect(getRetryDelayOption(options)).toBe(1);
  });
});
