export type ProjectStatus =
  | "featured"
  | "published"
  | "paused"
  | "draft"
  | "local";

export type ProjectFilter =
  | "Fullstack"
  | "AI"
  | "Cloud"
  | "Security"
  | "Marketplace"
  | "Microservices";

export type ProjectLanguage = "JS" | "TS" | "PHP" | "Java" | "Go";

export type ProjectFramework =
  | "Vite"
  | "Next.js"
  | "NestJS"
  | "AWS"
  | "Spring Boot"
  | "Laravel";

export type BuildContribution = {
  readonly area: "Frontend" | "Backend" | "Infrastructure" | "Security";
  readonly detail: string;
};

export type ProjectGalleryImage = {
  readonly src: string;
  readonly caption: string;
};

export type ProjectShowcaseItem = {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly status: ProjectStatus;
  readonly filters: readonly ProjectFilter[];
  readonly languages: readonly ProjectLanguage[];
  readonly frameworks: readonly ProjectFramework[];
  readonly summary: string;
  readonly imageUrl: string;
  readonly galleryImages?: readonly ProjectGalleryImage[];
  readonly previewLabel: string;
  readonly previewDescription: string;
  readonly architectureTags: readonly string[];
  readonly contributions: readonly BuildContribution[];
  readonly highlights: readonly string[];
  readonly techStack: readonly string[];
  readonly liveUrl?: string;
  readonly videoUrl?: string;
  readonly sourceUrl?: string;
  readonly docsUrl?: string;
  readonly architectureUrl?: string;
};
