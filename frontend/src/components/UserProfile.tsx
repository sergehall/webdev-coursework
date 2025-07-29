// src/components/UserProfile.tsx
type Props = {
  name: string;
  bio: string;
  profileImage: string;
};

const UserProfile = ({ name, bio, profileImage }: Props) => {
  return (
    <div className="flex w-full max-w-[450px] flex-col items-center space-y-4 rounded-xl bg-gray-100 p-6 text-center text-gray-800 shadow-2xl dark:bg-gray-800 dark:text-gray-100">
      <img
        src={profileImage}
        alt={`${name}'s profile`}
        className="h-[160px] w-[160px] rounded-full border-4 border-white object-cover dark:border-gray-200"
      />
      <h1 className="text-2xl font-bold">{name}</h1>
      <p className="text-gray-600 dark:text-gray-300">{bio}</p>
    </div>
  );
};

export default UserProfile;
