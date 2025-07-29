type DynamicProfile = {
  id: number;
  name: string;
  bio: string;
  profileImage: string;
  occupation: string;
  funFact: string;
  email: string;
  github: string;
};

const dynamicProfile: DynamicProfile[] = [
  {
    id: 1,
    name: "Serge Hall",
    bio: "Full-stack developer passionate about creating user-friendly applications.",
    profileImage: "https://avatars.githubusercontent.com/u/60080971?v=4",
    occupation: "React Developer",
    funFact: "Once built a fully accessible design system in 3 days!",
    email: "serge.hall.dev@gmail.com",
    github: "https://github.com/SergeHall",
  },
  {
    id: 2,
    name: "Ravi Patel",
    occupation: "Frontend Engineer",
    funFact:
      "Fun Fact: Can write CSS with eyes closed — media queries, gradients, and even centering divs with pixel-perfect precision.",
    bio: "Frontend engineer specializing in component libraries and state management with React and Redux.",
    profileImage: "https://randomuser.me/api/portraits/men/22.jpg",
    email: "ravi.patel@example.com",
    github: "https://github.com/rpateldev",
  },
  {
    id: 3,
    name: "Lina Gomez",
    occupation: "Creative Technologist",
    funFact: "Once redesigned a site using only keyboard navigation.",
    bio: "Creative technologist using Vite and React to build modern, scalable web interfaces.",
    profileImage: "https://randomuser.me/api/portraits/women/68.jpg",
    email: "lina.gomez@example.com",
    github: "https://github.com/linagomez",
  },
  {
    id: 4,
    name: "Marco Rossi",
    occupation: "JavaScript Educator",
    funFact: "Loves explaining React to total beginners in memes.",
    bio: "JavaScript enthusiast and educator building interactive UIs with React Hooks and Vite.",
    profileImage: "https://randomuser.me/api/portraits/men/65.jpg",
    email: "marco.rossi@example.com",
    github: "https://github.com/marcorossi",
  },
];

export default dynamicProfile;
