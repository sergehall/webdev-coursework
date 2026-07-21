import type { AssessmentQuestion } from "@/features/assessment";

export const moduleTenQuizQuestions = [
  {
    id: 1,
    kind: "single",
    points: 1,
    prompt:
      "Middleware in Laravel acts as what type of pattern for HTTP requests?",
    options: ["Gatekeeper", "Observer", "Singleton", "Factory"],
    answer: [0],
  },
  {
    id: 2,
    kind: "single",
    points: 1,
    prompt:
      "Which method is used to protect a single route with authentication in Laravel?",
    options: ["->auth()", "->middleware('auth')", "->protect()", "->secure()"],
    answer: [1],
  },
  {
    id: 3,
    kind: "single",
    points: 1,
    prompt: "What does Auth::user() return when no user is authenticated?",
    options: ["Exception", "Null", "False", "Empty array"],
    answer: [1],
  },
  {
    id: 4,
    kind: "single",
    points: 1,
    prompt:
      "In a one-to-many relationship between User and Post which method belongs in the User model?",
    options: ["belongsToMany()", "hasMany()", "hasOne()", "belongsTo()"],
    answer: [1],
  },
  {
    id: 5,
    kind: "single",
    points: 1,
    prompt: "Which Blade directive shows content only to authenticated users?",
    options: ["@login", "@auth", "@guest", "@user"],
    answer: [1],
  },
  {
    id: 6,
    kind: "single",
    points: 1,
    prompt:
      "Before displaying user-provided data what security step is most important?",
    options: [
      "Verify permissions",
      "Check authentication",
      "Sanitize output",
      "All of the Above",
      "Validate input",
    ],
    answer: [3],
  },
  {
    id: 7,
    kind: "single",
    points: 1,
    prompt:
      "The relationship between users and posts is what type of database relationship?",
    options: ["Polymorphic", "Many-to-many", "One-to-many", "One-to-one"],
    answer: [2],
  },
  {
    id: 8,
    kind: "single",
    points: 1,
    prompt:
      "Laravel Breeze automatically includes protection against which security vulnerability?",
    options: [
      "SQL injection",
      "CSRF attacks",
      "Session hijacking",
      "XSS attacks",
    ],
    answer: [1],
  },
  {
    id: 9,
    kind: "single",
    points: 1,
    prompt: "What should you check before allowing a user to edit a post?",
    options: [
      "User is authenticated",
      "User has valid session",
      "User owns the post",
      "Post exists",
    ],
    answer: [2],
  },
  {
    id: 10,
    kind: "single",
    points: 1,
    prompt: "The N+1 query problem is solved in Laravel using which technique?",
    options: [
      "Lazy loading",
      "Eager loading",
      "Index optimization",
      "Query caching",
    ],
    answer: [1],
  },
  {
    id: 11,
    kind: "single",
    points: 1,
    prompt:
      "Authentication verifies who a user is while authorization determines what?",
    options: [
      "What they can do",
      "Where they can go",
      "When they can access",
      "Why they need access",
    ],
    answer: [0],
  },
  {
    id: 12,
    kind: "single",
    points: 1,
    prompt: "Which command installs Laravel Breeze in a project?",
    options: [
      "php artisan breeze",
      "composer require laravel/breeze",
      "npm install breeze",
      "artisan install:breeze",
    ],
    answer: [1],
  },
  {
    id: 13,
    kind: "single",
    points: 1,
    prompt: "How do you apply middleware to a group of routes in Laravel?",
    options: [
      "Route::group()->middleware()",
      "Route::middleware()->group()",
      "Route::protect()->group()",
      "Route::auth()->group()",
    ],
    answer: [1],
  },
  {
    id: 14,
    kind: "single",
    points: 1,
    prompt:
      "Which attack involves tricking authenticated users into performing unintended actions?",
    options: ["CSRF", "SQL injection", "Session fixation", "XSS"],
    answer: [0],
  },
] satisfies readonly AssessmentQuestion[];

export const moduleTenQuizTotalPoints = moduleTenQuizQuestions.reduce(
  (total, question) => total + question.points,
  0
);
