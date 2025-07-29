// frontend/src/components/UserProfileListWithContact.tsx
import UserProfileWithContact from "./UserProfileWithContact";

type UserProfileType = {
  name: string;
  bio: string;
  profileImage: string;
  email: string;
  github: string;
};

type Props = {
  users: UserProfileType[];
};

const UserProfileListWithContact = ({ users }: Props) => {
  return (
    <div className="grid w-full grid-cols-1 justify-items-center gap-6 sm:grid-cols-2">
      {users.map((user, index) => (
        <UserProfileWithContact
          key={index}
          name={user.name}
          bio={user.bio}
          profileImage={user.profileImage}
          email={user.email}
          github={user.github}
        />
      ))}
    </div>
  );
};

export default UserProfileListWithContact;
