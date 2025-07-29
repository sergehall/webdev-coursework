# Module 9A – Build Your First React Component

## Description

This is a React app created using Vite that renders one or more `UserProfile` components. The initial component was written with inline styles and later enhanced to follow Tailwind CSS conventions across the project. The component displays a user's name, photo, and short bio inside a styled card layout.

## What I Learned

- How to set up a modern React application using Vite
- How to create and structure functional React components
- How to use JSX syntax and manage props
- How to render a component conditionally and dynamically
- How to replace inline styles with utility-first Tailwind CSS classes for consistency and reusability
- How to display a dynamic list of user profiles using arrays and `.map()`
- How to build reusable UI patterns like modals and buttons

## Challenges

Initially, the `UserProfile` component used inline styles as shown in the starter code. This conflicted with our Tailwind-based design system, so we refactored the component to use Tailwind classes.

We also extended the component to support dynamic rendering of multiple user profiles via props, instead of hardcoding a single profile. Alignment and responsiveness were improved in the modal layout to support any number of users.

## Screenshot

Here is an example of the final component rendering multiple users inside a responsive modal:

[View Screenshot](/sandbox/mod-9/A/user-profiles.png)

---

## Bonus Challenge Completed

- [x] Changed name, bio, and image
- [x] Added multiple profiles
- [x] Created a reusable modal layout with consistent styling
