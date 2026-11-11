import type { PresentationSlides } from "./domain/playback";
import { versionedPresentationImageUrl } from "./imageUrl";

// Verbatim PDF paragraphs, with line wrapping removed.
export const presentation2Slides = [
  {
    kind: "opening",
    title: "The Flowers We Shouldn’t Have Taken",
    text: "",
    image: "cover-v1",
    alt: "Comic cover showing three childhood friends with tulips beside a greenhouse",
  },
  {
    kind: "image",
    title: "Introduction",
    text: "Good morning, everyone. Today I would like to share a memorable story from my childhood. It happened many years ago in Belarus, around International Women's Day. At that time, my friends and I wanted to do something nice, but we made a big mistake.",
    image: "introduction-v1",
    alt: "Comic chapter 1: Introduction",
  },
  {
    kind: "image",
    title: "Our Plan",
    text: "In Belarus, we celebrate International Women's Day on March 8. When I was in fifth or sixth grade, my friends and I decided to give flowers to the girls in our class. We lived in a small town with many private houses. We didn't have much money, so we decided to walk around the neighborhood and ask people for free flowers.",
    image: "our-plan-v1",
    alt: "Comic chapter 2: Our Plan",
  },
  {
    kind: "image",
    title: "The Flowers",
    text: "While we were walking around the neighborhood, we found a private house with a greenhouse full of beautiful tulips. We were excited because we thought we had found the perfect place. We asked an elderly couple if they could give us some flowers for our classmates. Unfortunately, they said no. We were disappointed, but we didn't want to give up.",
    image: "the-flowers-v1",
    alt: "Comic chapter 3: The Flowers",
  },
  {
    kind: "image",
    title: "Our Night Adventure",
    text: "Later that night, we decided to return to the greenhouse. It was dark, and everyone was sleeping. We quietly picked some tulips without permission. I remember feeling nervous and excited at the same time. We were trying to be quiet because we didn't want anyone to see us. After we got the flowers, we ran away as fast as we could. At that moment, it felt like a funny adventure, and we didn't think about the consequences.",
    image: "night-adventure-v1",
    alt: "Comic chapter 4: Our Night Adventure",
  },
  {
    kind: "image",
    title: "The Next Day",
    text: "The next day, we brought the flowers to school and gave them to our classmates. The girls were surprised and very happy. Their smiles made us happy, too. We felt proud because our plan worked. Nobody knew where the flowers came from.",
    image: "next-day-v1",
    alt: "Comic chapter 5: The Next Day",
  },
  {
    kind: "image",
    title: "What I Learned",
    text: "Today, this memory reminds me of an important lesson. We made our classmates happy, but we probably made someone else unhappy. We wanted to do something good, but stealing flowers was wrong. Good intentions don't always lead to good actions. It's better to use our creativity and determination in positive ways. Thank you for listening.",
    image: "what-i-learned-v1",
    alt: "Comic chapter 6: What I Learned",
  },
  {
    kind: "closing",
    title: "The End",
    text: "",
    image: "ending-v1",
    alt: "Comic finale with a childhood photograph and the words The End",
  },
] as const satisfies PresentationSlides;

export const presentation2ImageUrl = (image: string) =>
  versionedPresentationImageUrl(
    `/course-materials/esl10g/presentation-2/${image}.webp`
  );

const storyWordCount = presentation2Slides
  .slice(1, -1)
  .reduce((total, slide) => total + slide.text.split(/\s+/).length, 0);

export const presentation2Duration = (index: number) => {
  if (index === 0 || index === presentation2Slides.length - 1) return 10_000;
  return (
    (190_000 * presentation2Slides[index].text.split(/\s+/).length) /
    storyWordCount
  );
};
