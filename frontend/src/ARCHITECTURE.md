# Frontend source layout

- `courses/` owns course catalogs, assignment registries, course-specific
  components, fixtures, and types. Put a helper inside its course when only that
  course uses it.
- `features/` owns product areas such as home, projects, pathway, assessment,
  account, and progress. Keep their UI, data, and request logic together.
- `components/` contains UI shared by multiple courses or product areas.
- `layout/` contains the app shell and navigation. `pages/` contains route entry
  points that compose features and shared UI.
- `context/`, `hooks/`, `utils/`, and `data/` contain only cross-domain state,
  helpers, and data. Move a file into its owning domain when its consumers are
  confined to one feature or course.

Split a large file when it holds distinct responsibilities. Keep cohesive
course material and static data intact even when they have many lines. Preserve
public imports, behavior, and assessment content when reorganizing.
