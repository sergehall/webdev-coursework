import type { AssessmentQuestion } from "@/features/assessment";

export const moduleEightQuizQuestions = [
  {
    id: 1,
    kind: "single",
    points: 1,
    prompt:
      "What is the primary purpose of the .env file in Laravel applications?",
    options: [
      "Store compiled CSS and JavaScript files",
      "Contain Eloquent model relationships",
      "Store application configuration separate from code",
      "Include database schema definitions",
      "Hold migration files for version control",
    ],
    answer: [2],
  },
  {
    id: 2,
    kind: "single",
    points: 1,
    prompt: "Which command creates a new database migration in Laravel?",
    options: [
      "php artisan new:migration",
      "php artisan generate:migration",
      "php artisan make:migration",
      "php artisan build:migration",
      "php artisan create:migration",
    ],
    answer: [2],
  },
  {
    id: 3,
    kind: "single",
    points: 1,
    prompt:
      "In Eloquent naming conventions what table name corresponds to a Post model?",
    options: ["posts", "Post", "post_table", "Posts", "post_models"],
    answer: [0],
  },
  {
    id: 4,
    kind: "single",
    points: 1,
    prompt:
      "Why should database credentials never be committed to version control?",
    options: [
      "Makes debugging easier for developers",
      "Security risk of exposing sensitive information",
      "Enables automatic deployment processes",
      "Improves application performance",
      "Reduces file size in repositories",
    ],
    answer: [1],
  },
  {
    id: 5,
    kind: "single",
    points: 1,
    prompt: "Which command applies all pending migrations to the database?",
    options: [
      "php artisan migrate:run",
      "php artisan migrate",
      "php artisan migrate:apply",
      "php artisan migrate:forward",
      "php artisan migrate:up",
    ],
    answer: [1],
  },
  {
    id: 6,
    kind: "single",
    points: 1,
    prompt: "What is the purpose of the fillable property in Eloquent models?",
    options: [
      "Set default values for model attributes",
      "Configure automatic timestamp handling",
      "Protect against mass assignment vulnerabilities",
      "Specify which attributes are required",
      "Define database table relationships",
    ],
    answer: [2],
  },
  {
    id: 7,
    kind: "single",
    points: 1,
    prompt:
      "Which method creates a new Eloquent model instance and saves it to the database?",
    options: [
      "Post::generate()",
      "Post::build()",
      "Post::insert()",
      "Post::make()",
      "Post::create()",
    ],
    answer: [4],
  },
  {
    id: 8,
    kind: "single",
    points: 1,
    prompt:
      "What does the Post::find(1) method return if no record exists with ID 1?",
    options: ["ModelNotFoundException", "empty array", "null", "false", "zero"],
    answer: [2],
  },
  {
    id: 9,
    kind: "single",
    points: 1,
    prompt:
      "Which method should you call after modifying an existing Eloquent model to persist changes?",
    options: ["store()", "update()", "persist()", "commit()", "save()"],
    answer: [4],
  },
  {
    id: 10,
    kind: "single",
    points: 1,
    prompt:
      "What happens when you call delete() on an Eloquent model with soft deletes enabled?",
    options: [
      "Marks record as inactive",
      "Permanently removes the record from database",
      "Moves record to a backup table",
      "Sets the deleted_at timestamp",
      "Archives the record automatically",
    ],
    answer: [3],
  },
  {
    id: 11,
    kind: "single",
    points: 1,
    prompt: "Which command starts the Laravel Tinker interactive environment?",
    options: [
      "php artisan repl",
      "php artisan shell",
      "php artisan console",
      "php artisan tinker",
      "php artisan interactive",
    ],
    answer: [3],
  },
  {
    id: 12,
    kind: "single",
    points: 1,
    prompt: "What is the N+1 query problem in Eloquent applications?",
    options: [
      "Querying the same record multiple times",
      "Loading relationships without eager loading causing extra queries",
      "Using too many database connections",
      "Having more than one primary key",
      "Executing queries without proper indexing",
    ],
    answer: [1],
  },
  {
    id: 13,
    kind: "single",
    points: 1,
    prompt:
      "Which Eloquent method is used to implement soft deletes in a model?",
    options: [
      "use SafeDelete",
      "use LogicalDelete",
      "use VirtualDelete",
      "use Deletable",
      "use SoftDeletes",
    ],
    answer: [4],
  },
  {
    id: 14,
    kind: "single",
    points: 1,
    prompt: "Which command undoes the last batch of database migrations?",
    options: [
      "php artisan migrate:back",
      "php artisan migrate:rollback",
      "php artisan migrate:reverse",
      "php artisan migrate:revert",
      "php artisan migrate:undo",
    ],
    answer: [1],
  },
  {
    id: 15,
    kind: "single",
    points: 1,
    prompt:
      "What does adding constrained() to a foreign key in migrations accomplish?",
    options: [
      "Validates data before insertion",
      "Prevents the column from being null",
      "Encrypts the column data",
      "Creates automatic foreign key constraints and cascading rules",
      "Adds an index to improve query performance",
    ],
    answer: [3],
  },
  {
    id: 16,
    kind: "single",
    points: 1,
    prompt: "Query scopes in Eloquent models are used to do what?",
    options: [
      "Set validation rules",
      "Limit database access permissions",
      "Encapsulate common query logic for reuse",
      "Define model relationships",
      "Configure caching strategies",
    ],
    answer: [2],
  },
  {
    id: 17,
    kind: "single",
    points: 1,
    prompt:
      "Which Schema Builder method creates a text column for large content?",
    options: ["content()", "longtext()", "text()", "string()", "varchar()"],
    answer: [2],
  },
  {
    id: 18,
    kind: "single",
    points: 1,
    prompt: "How does Eloquent prevent SQL injection attacks by default?",
    options: [
      "Limits query complexity",
      "Encrypts query parameters",
      "Uses prepared statements automatically",
      "Escapes all user input",
      "Validates data types strictly",
    ],
    answer: [2],
  },
  {
    id: 19,
    kind: "single",
    points: 1,
    prompt:
      "Which caching strategy is most effective for expensive database queries that rarely change?",
    options: [
      "Session caching",
      "Database caching",
      "File system caching",
      "Application level caching with Cache::remember()",
      "Browser caching",
    ],
    answer: [3],
  },
  {
    id: 20,
    kind: "single",
    points: 1,
    prompt:
      "What should you always do before running migrations in a production environment?",
    options: [
      "Clear all cached data",
      "Restart the web server",
      "Update all dependencies",
      "Run performance tests",
      "Create a complete database backup",
    ],
    answer: [4],
  },
  {
    id: 21,
    kind: "single",
    points: 1,
    prompt:
      "Database indexes in Laravel migrations are primarily used to do what?",
    options: [
      "Improve query performance",
      "Ensure data uniqueness",
      "Compress stored data",
      "Enable foreign key relationships",
      "Prevent data corruption",
    ],
    answer: [0],
  },
  {
    id: 22,
    kind: "single",
    points: 1,
    prompt:
      "Which Eloquent method increments a numeric column value atomically?",
    options: ["sum()", "add()", "increment()", "plus()", "increase()"],
    answer: [2],
  },
] satisfies readonly AssessmentQuestion[];

export const moduleEightQuizTotalPoints = moduleEightQuizQuestions.reduce(
  (total, question) => total + question.points,
  0
);
