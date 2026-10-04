# CS81 Module 9B – Custom Profile Component with Inline Styling

This project is part of **Module 9 Assignment 9B** for Santa Monica College's CS81 JavaScript Programming course.  
It demonstrates how to build reusable profile components in React using both **inline CSS styling** and **external class-based styles**, showcasing layout, props, and hover effects.

---

## Description

This React app was created using Vite and renders a set of user profile cards using modular components.  
Each profile includes an image, name, bio, and contact information (email + GitHub). The project demonstrates:

- Usage of **inline CSS** (required by the assignment)
- Dynamic rendering of profiles from external data
- Modular component structure with props
- Optional **hover effects** for interactive feedback
- A second dataset with tech-relevant users

Two profile components are available:

- `UserProfileInline` — inline-styled version (used for assignment submission)
- `UserProfile` — external CSS version (cleaner and more scalable)

---

## Archived standalone project

The [original assignment package](module9b-profile.zip) contains the standalone Vite project and its setup files. Its historical commands and `src/` tree refer to that archive, not to this coursework platform. Use the [platform README](../../../../../../README.md) to run the current application.

---

## What I Learned

- How to build and export modular React components
- How to use props to pass dynamic content (name, image, bio, etc.)
- How to use inline styles to control layout and appearance
- How to implement hover interactions using useState
- How to conditionally switch between data sets and components

---

## Challenges

- Creating clean inline CSS that mimics external class-based styling
- Implementing hover transitions without a stylesheet
- Structuring consistent layout across cards with minimal duplication
- Balancing assignment constraints with scalable component design

---

## Submission Requirements

- [x] Inline-styled component (UserProfileInline)
- [x] External stylesheet component (UserProfile) for comparison
- [x] Contact section with email + GitHub using inline styling
- [x] React map() rendering from imported data file
- [x] Clean component structure and prop usage
- [x] Hover effects on profile and links

---

## License

This project is for educational use only as part of Santa Monica College's CS81 coursework.
