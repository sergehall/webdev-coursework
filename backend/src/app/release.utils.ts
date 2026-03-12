type EnvMap = NodeJS.ProcessEnv;

const RELEASE_KEYS = [
  "HEROKU_RELEASE_VERSION",
  "RELEASE_VERSION",
  "HEROKU_BUILD_VERSION",
] as const;

const COMMIT_KEYS = ["SOURCE_VERSION", "HEROKU_SLUG_COMMIT"] as const;

function readNonEmpty(env: EnvMap, key: string): string | null {
  const value = env[key];
  if (typeof value !== "string") {
    return null;
  }
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

function shortCommit(commit: string): string {
  return commit.slice(0, 12);
}

export function getReleaseIdentifier(env: EnvMap = process.env): string {
  for (const key of RELEASE_KEYS) {
    const value = readNonEmpty(env, key);
    if (value) {
      return value;
    }
  }

  for (const key of COMMIT_KEYS) {
    const value = readNonEmpty(env, key);
    if (value) {
      return `commit:${shortCommit(value)}`;
    }
  }

  return "local";
}
