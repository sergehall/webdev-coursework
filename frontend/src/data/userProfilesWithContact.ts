// frontend/src/data/userProfilesWithContact.ts
// Define the type for a user profile
export type UserProfileType = {
  name: string;
  bio: string;
  profileImage: string;
  email: string;
  github: string;
};

// Array of user profiles
export const userProfilesWithContact: UserProfileType[] = [
  {
    name: "Serge Hall",
    bio: "Full-stack developer passionate about creating user-friendly applications.",
    profileImage: "https://avatars.githubusercontent.com/u/60080971?v=4",
    email: "serge.hall.dev@example.com",
    github: "https://github.com/sergehall",
  },
  {
    name: "Christie Wu",
    bio: "I'm a concept-driven designer blending culture, design, and tech. I craft playful, inventive visuals across brand, web, and digital products to spark joy and tell engaging stories.",
    profileImage:
      "https://www.smc.edu/academics/academic-departments/design-technology/images/faculty/wu-christie.jpg",
    email: "christie.wu.design@example.com",
    github: "https://github.com/christiewu",
  },
  {
    name: "Dr. Scott Bishop",
    bio: "Computer science education best practices, computer animation, quantum computing, augmented & mixed reality, computer graphics, robotics, machine learning & AI, and more.",
    profileImage:
      "https://www.smc.edu/academics/academic-departments/csis/images/faculty/bishop-scott-profile-web.png",
    email: "scott.bishop.cs@example.com",
    github: "https://github.com/scottbishop",
  },
  {
    name: "Nicole Chan",
    bio: "Creative educator with an MFA in Media Design and a BFA in Graphic Design. I guide students to become empathetic problem solvers through hands-on design challenges.",
    profileImage:
      "https://www.smc.edu/academics/academic-departments/design-technology/images/faculty/chan-nicole.jpg",
    email: "nicole.chan.edu@example.com",
    github: "https://github.com/nicolechan",
  },
];
