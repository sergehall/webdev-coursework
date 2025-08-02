# Reflection – Module 4A: readingTracker.js

**What was the most helpful aspect of this code’s structure?**  
The most helpful aspect was how the data was organized using an array of objects. Each entry followed a consistent structure with clear keys (`day`, `book`, `minutes`), making it easy to loop through and apply logic. Splitting each function into its own module also made the code more manageable and easier to test and understand in isolation.

**What part was confusing or took longer to understand?**  
Understanding the logic behind finding the "most read book" took slightly longer. The use of an object to count book occurrences was a new pattern at first, and tracing how that data was tallied and then used to find the maximum required a bit of extra focus. Also, realizing the importance of input validation (e.g., `book` must be a string) became clearer only after manually introducing bad data to test robustness.
