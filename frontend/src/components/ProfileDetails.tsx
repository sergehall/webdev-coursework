import { FaEnvelope, FaGithub } from "react-icons/fa";

type Props = {
  bio: string;
  email: string;
  github: string;
};

const ProfileDetails = ({ bio, email, github }: Props) => (
  <div className="mt-4 space-y-2 text-sm">
    <p>{bio}</p>
    {email && (
      <p>
        <FaEnvelope className="mr-1 inline-block" />
        <strong>Email:</strong>{" "}
        <a
          href={`mailto:${email}`}
          className="text-blue-700 underline dark:text-blue-300"
        >
          {email}
        </a>
      </p>
    )}
    {github && (
      <p>
        <FaGithub className="mr-1 inline-block" />
        <strong>GitHub:</strong>{" "}
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline dark:text-blue-300"
        >
          {github}
        </a>
      </p>
    )}
  </div>
);

export default ProfileDetails;
