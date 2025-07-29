// frontend/src/components/DynamicProfile.tsx
import { useState } from "react";

import SearchBar from "./SearchBar";

import ProfileCard from "@/components/ProfileCard";
import dynamicProfile from "@/data/dynamicProfile";
import type { ProfileProps } from "@/types/profile";

const DynamicProfile = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<ProfileProps | null | false>(null);

  const handleSearch = () => {
    const name = query.trim().toLowerCase();
    if (!name) {
      setResult(null);
      return;
    }
    const match = dynamicProfile.find((p) =>
      p.name.toLowerCase().includes(name)
    );
    setResult(match || false);
  };

  return (
    <div className="flex w-full flex-col items-center space-y-6">
      <SearchBar value={query} onChange={setQuery} onSearch={handleSearch} />

      {typeof result === "object" && result !== null ? (
        <ProfileCard {...result} />
      ) : result === false ? (
        <p className="mt-4 text-sm font-medium text-red-500 dark:text-red-400">
          No profile with that name was found.
        </p>
      ) : null}
    </div>
  );
};

export default DynamicProfile;
