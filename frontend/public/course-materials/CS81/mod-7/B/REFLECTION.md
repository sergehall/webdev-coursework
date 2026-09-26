# Reflection – Daily Schedule Simulator

## What was your approach to designing the schedule?

I wanted the schedule to reflect a creative, slightly idealized version of a productive day. I chose activities like journaling a dream, sketching, writing, walking, and meditating—things I enjoy or aspire to do. Each event had a time assigned to simulate the feeling of living through a full day, from early morning to night.

## What was one challenge or unexpected behavior you encountered?

The challenge was balancing timing with visual pacing. Since I used `setTimeout` with random delays between events, sometimes the animation felt too fast or too slow. Also, working with background color transitions required calculating progression smoothly between two colors based on how far along the day was.

## What does this assignment teach you about async code?

It shows how asynchronous code can simulate real time in a browser. Unlike regular scripts that run immediately from top to bottom, using `setTimeout` introduces deliberate pauses and sequencing. This models time passing and helps visualize async flow clearly in a creative and interactive way.

## What creative element did you add?

I added a few enhancements:

- A background color that gradually changes from morning blue to evening red
- Randomized "twists" using emojis and mood-based surprises
- A styled layout with animated sections for each activity
  These touches made the simulation more dynamic and personal.

## How does this project simulate or differ from real-world schedules?

It simulates the **structure** of a real schedule well—events are time-based and spaced out, with small surprises or delays. However, real life is more unpredictable, and people often multitask or adjust plans on the fly. Still, the randomness in delay and mood helps reflect that variability in a simple, visual way.
