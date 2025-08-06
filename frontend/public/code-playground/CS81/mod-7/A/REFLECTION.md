# REFLECTION.md

## 1. What part of the code was most confusing and why?

The most confusing part initially was understanding how `setInterval` interacts with the loop, especially how and when it should be stopped using `clearInterval`. It wasn't immediately obvious how the frame index and cycle counting would sync up. After tracing the flow of `index % frames.length` and `cycleCount`, I understood how the loop progresses over time.

## 2. How does the animation help visualize asynchronous behavior?

The animation shows that JavaScript doesn't block the page while updating — instead, it schedules updates every 500ms using `setInterval`. This is a clear example of asynchronous behavior in the browser: while the animation is running, the rest of the page remains responsive. It's a good illustration of how asynchronous loops operate outside of the main execution stack.

## 3. What did you change or improve, and what effect did it have?

I made several changes:

- Added background music that plays during the loading animation and stops when it ends.
- Introduced a "Start Loading" button to satisfy browser autoplay policies.
- Added a background color transition that starts as soft blue and gradually changes to green as the animation progresses.
- Included a more diverse set of emoji frames for visual variety.

These changes made the animation more interactive and visually appealing. The button makes it feel more user-driven, and the background/music effects provide a stronger sense of progress and completion.

## 4. Credit

Background music used in this project:

- Title: Vapor
- Artist: Maksym Malko
- Source: [Pixabay](https://pixabay.com/music/ambient-vapor-334863/)
