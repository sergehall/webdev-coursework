# Module 10A – StudentCard Code Review

## Description

This is a React code review assignment for CS81 – JavaScript Programming.  
The task involved analyzing a pre-written `StudentCard` component and adding inline comments to explain the logic behind **props**, **state**, and **interactivity** using `useState`.

The component renders student profile cards with an image, name, major, year, and a toggleable biography section.

## What I Learned

- How props are used to pass data like `name`, `bio`, `imageUrl` from a parent to a child component
- How state (`useState`) can control UI behavior (like toggling bio visibility)
- How to write meaningful inline comments to explain JSX logic
- How to improve readability and maintainability in React components

---

## Commented Code

You can view the fully commented `StudentCard.jsx` component [here](./src/components/StudentCard.jsx).  
It contains clear explanations of props, state, `useState` hook usage, and interactivity logic.

---

## Screenshot

<details>
  <summary> Click to view screenshot with comments</summary>

Below is a screenshot showing the `StudentCard` running in the browser, along with inline comments explaining how props, state, and toggle functionality work:

![Screenshot of commented StudentCard.jsx](./screenshots/studentcard-comments.png)

</details>

---

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/sergehall/module10a-studentcard-review
cd module10a-studentcard-review
```

2. **Install Node.js** (if not already installed)

- Visit https://nodejs.org and download for your system.

3. **Install dependencies**

```bash
npm install
```

4. **Start the development server**

```bash
npm run dev
```

## Repository Structure

```
.
├── public/
│   └── my-new-favicon.ico
├── screenshots/
│   └── studentcard-comments.png    # Screenshot of comments + running component
├── src/
│   ├── assets/                        # Optional static assets (e.g. images)
│   ├── components/
│   │   ├── Assignment9A.jsx           # Module 9A: reusable profile cards
│   │   ├── Assignment9B.jsx           # Module 9B: tech-focused profiles
│   │   ├── Assignment10B.jsx          # Module 10A: StudentCard review
│   │   ├── AssignmentHeader.jsx       # Shared assignment header component
│   │   ├──AssignmentTemplate.jsx      # Template for assignment components
│   │   ├── ContactCard.jsx            # Optional contact card component
│   │   ├── StudentCard.jsx            # Student card with toggleable bio
│   │   ├── UserList.jsx               # List renderer for user profiles
│   │   ├── UserProfile.jsx            # Class-based profile styling
│   │   └── UserProfileInline.jsx      # Inline CSS version for Assignment 9B
│   ├── data/
│   │   ├── userProfiles.js            # Sample profiles for Assignment 9A
│   │   ├── frontendProfiles.js        # Tech-focused profiles for Assignment 9B
│   │   └── studentData.js             # Data for Module 10A
│   ├── styles/
│   │   └── styles.css                 # Global component-specific styles
│   ├── App.jsx                        # Root application component
│   ├── index.css                      # Base styles for the app
│   └── main.jsx                       # Entry point for React (Vite)
├── index.html                         # HTML entry point
├── vite.config.js                     # Vite configuration
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

## License

This project is for educational use only as part of Santa Monica College's CS81 coursework.
