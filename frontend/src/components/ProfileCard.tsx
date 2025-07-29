import { useState } from "react";

import ProfileDetails from "./ProfileDetails";

import type { ProfileProps } from "@/types/profile";

const ProfileCard = (profile: ProfileProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="mx-auto mt-6 max-w-md rounded-xl bg-gradient-to-b from-blue-100 to-white p-6 text-gray-800 shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:text-gray-100 dark:shadow-2xl">
      <div className="flex flex-col items-start space-y-4 pl-4">
        <img
          src={profile.profileImage}
          alt={`${profile.name}'s avatar`}
          className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md"
        />
        <h2 className="text-2xl font-bold">{profile.name}</h2>
        <p>
          <strong>Occupation:</strong> {profile.occupation}
        </p>
        <p>
          <strong>Fun Fact:</strong> {profile.funFact}
        </p>

        <button
          className="mt-2 rounded-md bg-blue-100 px-4 py-1 text-sm text-blue-800 hover:bg-blue-200 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-600"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "Hide Bio ▲" : "Show Bio ▼"}
        </button>

        {showDetails && (
          <ProfileDetails
            bio={profile.bio}
            email={profile.email}
            github={profile.github}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
