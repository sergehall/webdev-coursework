// Define the type for a user profile
export type UserProfileType = {
  name: string;
  bio: string;
  profileImage: string;
};

// Array of user profiles
export const userProfiles: UserProfileType[] = [
  {
    name: "Serge Hall",
    bio: "Full-stack developer passionate about creating user-friendly applications.",
    profileImage: "https://avatars.githubusercontent.com/u/60080971?v=4",
  },
  {
    name: "Christie Wu",
    bio: "I'm a concept-driven designer blending culture, design, and tech. I craft playful, inventive visuals across brand, web, and digital products to spark joy and tell engaging stories.",
    profileImage:
      "https://www.smc.edu/academics/academic-departments/design-technology/images/faculty/wu-christie.jpg",
  },
  {
    name: "Dr. Scott Bishop",
    bio: "Computer science education best practicies, computer animation, quantum computing, augmented & mixed reality, computer graphics, computer vision, robotics, machine learning & artificial intelligence, scientific visualization and advanced manufacturing technologies (e.g. 3D printing, etc.).",
    profileImage:
      "https://www.smc.edu/academics/academic-departments/csis/images/faculty/bishop-scott-profile-web.png",
  },
  {
    name: "Nicole Chan",
    bio: "Creative educator with an MFA in Media Design and a BFA in Graphic Design, I guide students to become empathetic problem solvers through hands-on design challenges. Passionate about real-world impact, critical thinking, and adventure—on the trail and around the globe.",
    profileImage:
      "https://www.smc.edu/academics/academic-departments/design-technology/images/faculty/chan-nicole.jpg",
  },
];
