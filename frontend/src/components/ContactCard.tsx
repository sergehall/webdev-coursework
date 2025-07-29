// src/components/ContactCard.tsx
type Props = {
  email: string;
  github: string;
};

const ContactCard = ({ email, github }: Props) => {
  return (
    <div className="flex min-h-[72px] flex-col justify-center space-y-2 px-2 text-left text-sm">
      <div>
        <span className="font-semibold">Email:</span>{" "}
        <a
          href={`mailto:${email}`}
          className="text-gray-800 no-underline transition-colors hover:text-blue-800 hover:underline dark:text-gray-100 dark:hover:text-blue-300"
        >
          {email}
        </a>
      </div>
      <div>
        <span className="font-semibold">GitHub:</span>{" "}
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          className="text-gray-800 no-underline transition-colors hover:text-blue-800 hover:underline dark:text-gray-100 dark:hover:text-blue-300"
        >
          {github}
        </a>
      </div>
    </div>
  );
};

export default ContactCard;
