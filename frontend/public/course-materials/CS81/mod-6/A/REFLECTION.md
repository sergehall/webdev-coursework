### What was the hardest part to understand?

The most challenging part was understanding how `this` works differently depending on context. For example, inside prototype methods, `this` always refers to the instance of the Playlist, not the method or global object. Clarifying this helped make the object’s behavior more predictable.

### How does this code use `this` to tie data and behavior together?

Each method uses `this` to access or modify the instance’s internal data — such as `this.songs` or `this.currentSong`. This links object data (state) and behavior (methods) into a cohesive unit. By consistently using `this`, the code ensures that methods operate on the correct playlist instance.

### What would you do differently if you wrote this object from scratch?

I would avoid modifying the original songs array in the `skipSong()` method. Instead, I’d use a `currentIndex` to track the song being played. That would preserve the full playlist and allow going back to previous songs too.

### What was improved in this version?

Added detailed, beginner-friendly comments throughout the code to explain how the Playlist object and its methods work. This makes the code easier to read, understand, and maintain — especially for developers new to JavaScript object-oriented patterns.
