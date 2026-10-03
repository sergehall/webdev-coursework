# Projects feature

`data/projectShowcase.ts` owns the published project catalog and filter values.
`data/projectShowcase.types.ts` owns its contracts. Detailed project records
live in `data/projects/`. Project components and `project-presentation.ts`
consume those files; other features import the catalog through this domain.

Keep new project records and project-only metadata in `features/projects/data`
instead of the top-level `src/data` folder.
