import ResourceDirectory from "@/features/resources/ResourceDirectory";
import ResourcesHero from "@/features/resources/ResourcesHero";

export default function ResourcesPage() {
  return (
    <div className="relative min-h-full overflow-x-hidden px-2 pt-1 pb-3 sm:pt-2 sm:pb-4">
      <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-5">
        <ResourcesHero />
        <ResourceDirectory />
      </div>
    </div>
  );
}
