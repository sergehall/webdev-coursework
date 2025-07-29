// src/components/UserProfileWithContact.tsx
import ContactCard from "./ContactCard";

type Props = {
  name: string;
  bio: string;
  profileImage: string;
  email: string;
  github: string;
};

const UserProfileWithContact = ({
  name,
  bio,
  profileImage,
  email,
  github,
}: Props) => {
  return (
    <div className="flex min-h-[420px] w-full max-w-[450px] flex-col items-center justify-between space-y-4 rounded-xl bg-gray-100 p-6 text-center text-gray-800 shadow-2xl dark:bg-gray-800 dark:text-gray-100">
      <div className="flex flex-col items-center space-y-4">
        <img
          src={profileImage}
          alt={`${name}'s profile`}
          className="h-[160px] w-[160px] rounded-full border-4 border-white object-cover dark:border-gray-200"
        />
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">{bio}</p>
      </div>

      <div className="w-full border-t border-gray-300 pt-4 dark:border-gray-600">
        <ContactCard email={email} github={github} />
      </div>
    </div>
  );
};

export default UserProfileWithContact;
