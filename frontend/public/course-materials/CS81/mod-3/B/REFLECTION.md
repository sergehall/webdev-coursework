# Reflection

This assignment was a great opportunity to explore how JavaScript functions can be structured and used to create a practical toolkit. By building my own math library step-by-step, I gained a better understanding of both syntax and logical reasoning in JavaScript.

I started with a simple function, `double(n)`, which was straightforward but set the tone for how I'd structure all the others. As I continued with `square(n)` and `isEven(n)`, I began recognizing patterns — such as how reusable logic can be generalized and reused across many scenarios.

The function `isEven(n)` was a good example of clean, readable logic, but it also made me think about edge cases like negative numbers or zero. Similarly, `isOdd(n)` required careful comparison logic, and I was reminded how a small change in a condition (`!==` vs `===`) can completely flip the outcome.

The most interesting shift for me happened when I implemented `multiply(a, b)`. Unlike the earlier functions with one parameter, this one introduced multiple inputs and reinforced the importance of clear naming and parameter handling. It also got me thinking about how these functions could be chained together or used in combination in more advanced applications.

One of the biggest takeaways was how essential testing is. I wrote out predictions before testing each function, which helped me clarify what I expected. Sometimes the results matched exactly, and other times I found small errors like a missing `return`, which silently broke functionality. This experience taught me to test early and test often.

In the real world, a math toolkit like this could be extremely useful in many areas—building a calculator app, game logic, financial tools, or any project where numerical operations are frequent. This assignment helped me better appreciate how useful small utility functions can be when they’re clean, focused, and reliable.

Finally, using Git throughout the process gave me a clearer sense of how developers manage version control. Each commit served as a snapshot of my thought process, and being able to track my progress helped reinforce the idea that code evolves through small, meaningful steps.
