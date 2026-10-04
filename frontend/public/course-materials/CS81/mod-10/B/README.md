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

## Archived standalone project

The [original assignment package](module10a-profile.zip) contains the standalone Vite project and its setup files. Its historical commands and `src/` tree refer to that archive, not to this coursework platform. Use the [platform README](../../../../../../README.md) to run the current application.

---

## License

This project is for educational use only as part of Santa Monica College's CS81 coursework.
