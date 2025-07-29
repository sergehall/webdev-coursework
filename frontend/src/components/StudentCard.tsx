import { useState } from "react";

type Props = {
  name: string;
  major: string;
  year: string;
  bio: string;
  imageUrl: string;
};

const StudentCard = ({ name, major, year, bio, imageUrl }: Props) => {
  const [showBio, setShowBio] = useState(false);

  return (
    <div className="mx-auto flex min-h-[420px] w-full max-w-[450px] flex-col items-center justify-between space-y-4 rounded-xl bg-gray-100 p-6 text-center text-gray-800 shadow-2xl dark:bg-gray-800 dark:text-gray-100">
      <div className="flex flex-col items-center space-y-4">
        <img
          src={imageUrl}
          alt={`${name}'s profile`}
          className="h-[160px] w-[160px] rounded-full border-4 border-white object-cover dark:border-gray-200"
        />
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {major} – {year}
        </p>

        <button
          onClick={() => setShowBio(!showBio)}
          className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          {showBio ? "Hide Bio" : "Show Bio"}
        </button>
      </div>

      {showBio && (
        <p className="pt-2 text-sm text-gray-700 dark:text-gray-200">{bio}</p>
      )}
    </div>
  );
};

export default StudentCard;
