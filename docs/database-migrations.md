# Database migration organization

TypeORM owns schema migration history. Source migrations live in
`backend/src/db/migrations/YYYY/MM/<timestamp>-<PascalCaseName>.ts`.
The year and two-digit month come from the filename's Unix timestamp in
**UTC**, so every developer and CI runner uses the same directory regardless
of their local timezone. Timestamps use milliseconds, not seconds.

Existing migrations have been moved into `2026/05` and `2026/10` without changing
SQL, filenames, class names, or explicit migration names. These identities must
remain unchanged after a migration has been applied. Moving a file does not
require rerunning its SQL or editing the database migration history.

## Add a migration

From the repository root:

```sh
# Empty TypeScript migration; no database connection needed.
yarn workspace backend migration:create AddUserPreferences

# Compare the configured database schema with TypeORM entities.
# Set DATABASE_URL and the appropriate SSL settings before generating.
yarn workspace backend migration:generate AddUserPreferences

# Check directory dates, filenames, unique timestamps, and class identities.
yarn workspace backend migration:check
```

Pass only the PascalCase name. The wrapper supplies the path and current Unix
timestamp to TypeORM, creates the correct UTC year/month directory, and formats
the generated file with the shared Prettier configuration. At a timestamp
collision, it uses the next millisecond; a clock older than the latest migration
is rejected. Do not supply a directory, file extension, or custom timestamp.
`migration:generate` also accepts `--pretty`, `--dryrun`, and `--check`.

Review generated SQL and complete `up`/`down` before committing. TypeORM generation
compares only registered entities; it does not infer changes to account tables
managed through handwritten SQL migrations. Use `migration:create` for those
changes. `migration:check` is included in the backend `check` command.

## Load and run migrations

The CLI data source already searches recursively with
`migrations/**/*.{ts,js}`, covering nested source files and compiled files.
`yarn workspace backend build` cleans old build output before compiling, avoiding
stale flat copies under `dist/db/migrations`.

TypeORM runs migrations in timestamp order. The explicit account/QR release
allowlist in `backend/scripts/run-account-migrations.cjs` remains in place;
new account migrations must also be added there and to the relevant integration
tests. A new file is discovered by the general CLI, but it is **not** automatically
approved for the account-only release runner.

Use the existing dedicated local or account-only migration command for the
intended database. Folder organization and creation do not apply migrations.
Do not run a general migration runner against an account-only database.

See TypeORM's [migration creation](https://typeorm.io/docs/migrations/creating/)
and [execution order](https://typeorm.io/docs/migrations/executing/) documentation.
