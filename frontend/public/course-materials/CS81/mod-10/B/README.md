# Module 10B – Dynamic Profile Search

## Description

This is a React assignment for CS81 – JavaScript Programming.  
The task was to build a dynamic and interactive `Profile` component using **props**, **useState**, and conditional rendering.

We extended the base concept by adding a **searchable profile system** (`DynamicProfileSearch`), personalized profile cards, a toggleable bio section, and UI enhancements like icons and gradient styling.

## Features

- Reusable `Profile` component accepting props: `name`, `occupation`, `funFact`, `bio`, `email`, `github`, and `profileImage`
- `useState` is used to toggle the visibility of the bio and contact information
- Search field to find a profile by name (case-insensitive)
- Visual enhancements:
  - Gradient background
  - Styled buttons and hover effects
  - Icons for GitHub and email (via `react-icons`)
  - Responsive card layout with conditional width expansion

## What I Learned

- How to structure dynamic components using **props** and **state**
- How to build interactive UIs with conditional rendering and `useState`
- How to use external libraries like `react-icons` to improve UI
- How to organize styles cleanly and separate logic into smaller components
- How to provide helpful feedback when no results are found
- How to manage and search arrays of objects in React

## Demo Names for Search

This app is educational and includes a search input. Try typing one of these names:

- `Serge Hall`
- `Ravi Patel`
- `Lina Gomez`
- `Marco Rossi`

---

## Screenshot

<details>
  <summary> Click to view screenshot with comments</summary>

Below is a screenshot showing the `Profile.jsx` here showing a matched profile with visible bio and links:

![Screenshot of commented StudentCard.jsx](./screenshots/profile.png)

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
│   │   ├── AssignmentTemplate.jsx      # Template for assignment components
│   │   ├── ContactCard.jsx            # Optional contact card component
│   │   ├── DynamicProfileSearch.jsx   # Dynamic search for user profiles
│   │   ├── Profile.jsx                # Reusable profile card component
│   │   ├── StudentCard.jsx            # Student card with toggleable bio
│   │   ├── UserList.jsx               # List renderer for user profiles
│   │   ├── UserProfile.jsx            # Class-based profile styling
│   │   └── UserProfileInline.jsx      # Inline CSS version for Assignment 9B
│   ├── data/
│   │   ├── dynamicProfile.js          # Dynamic profile data for search
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
