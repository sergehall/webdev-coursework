// src/components/UserProfileList.tsx
import UserProfile from "./UserProfile";

type UserProfileType = {
  name: string;
  bio: string;
  profileImage: string;
};

type Props = {
  users: UserProfileType[];
};

const UserProfileList = ({ users }: Props) => {
  return (
    <div className="grid w-full grid-cols-1 justify-items-center gap-6 sm:grid-cols-2">
      {users.map((user, index) => (
        <UserProfile
          key={index}
          name={user.name}
          bio={user.bio}
          profileImage={user.profileImage}
        />
      ))}
    </div>
  );
};

export default UserProfileList;
