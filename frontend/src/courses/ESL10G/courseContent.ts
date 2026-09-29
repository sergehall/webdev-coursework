export type CourseWeek = {
  number: number;
  dates: string;
  title: string;
  topics: readonly string[];
  milestone?: string;
};

// Summarized from the Fall 2026 ESL 10G syllabus. Canvas remains the source
// for current assignments and due dates because the syllabus may change.
export const courseWeeks: readonly CourseWeek[] = [
  {
    number: 1,
    dates: "Sep 1 & 3",
    title: "Introductions and foundations",
    topics: [
      "Syllabus, introductions, and diagnostic",
      "Elements of Success 1: the verb be and parts of speech",
    ],
  },
  {
    number: 2,
    dates: "Sep 8 & 10",
    title: "Exploring work",
    topics: ["Pathways 1: Exploring Work", "The verb be and parts of speech"],
    milestone: "Quiz",
  },
  {
    number: 3,
    dates: "Sep 15 & 17",
    title: "Present simple",
    topics: [
      "Exploring Work",
      "Simple present, sentence order, object pronouns, and frequency adverbs",
    ],
    milestone: "Presentation 1 assignment introduced",
  },
  {
    number: 4,
    dates: "Sep 22 & 24",
    title: "Questions and present progressive",
    topics: [
      "Pathways 3: The Marketing Machine",
      "Questions, present progressive, and non-action verbs",
    ],
    milestone: "Test 1",
  },
  {
    number: 5,
    dates: "Sep 29 & Oct 1",
    title: "The Marketing Machine",
    topics: ["Questions, present progressive, and non-action verbs"],
    milestone: "Presentation 1",
  },
  {
    number: 6,
    dates: "Oct 6 & 8",
    title: "Present progressive practice",
    topics: ["The Marketing Machine", "Questions and non-action verbs"],
    milestone: "Quiz",
  },
  {
    number: 7,
    dates: "Oct 13 & 15",
    title: "Good Times, Good Feelings",
    topics: ["Pathways 2: Good Times, Good Feelings", "Past tense"],
    milestone: "Test 2",
  },
  {
    number: 8,
    dates: "Oct 20 & 22",
    title: "Past tense",
    topics: ["Good Times, Good Feelings", "Past tense practice"],
    milestone: "Quiz",
  },
  {
    number: 9,
    dates: "Oct 27 & 29",
    title: "Past time",
    topics: ["Past time clauses and past progressive"],
    milestone: "Test 3; Presentation 2 introduced",
  },
  {
    number: 10,
    dates: "Nov 3 & 5",
    title: "Food on the Move",
    topics: ["Pathways 5: Food on the Move", "Count and noncount nouns"],
  },
  {
    number: 11,
    dates: "Nov 10 & 12",
    title: "Food and quantities",
    topics: ["Count and noncount nouns", "There is / there are"],
    milestone: "Presentation 2; quiz",
  },
  {
    number: 12,
    dates: "Nov 17 & 19",
    title: "Food and compound sentences",
    topics: [
      "Pathways 5 food topics",
      "Count and noncount nouns, there is / there are, compound sentences",
    ],
    milestone: "Test 4",
  },
  {
    number: 13,
    dates: "Nov 24 & 26",
    title: "Housing for the Future",
    topics: ["Pathways 6: Housing for the Future", "Modals"],
    milestone: "Quiz",
  },
  {
    number: 14,
    dates: "Week of Dec 1",
    title: "Talking about the future",
    topics: ["Housing for the Future", "Future forms and adverbs of certainty"],
  },
  {
    number: 15,
    dates: "Dec 8 & 10",
    title: "Review and speaking final",
    topics: ["Vocabulary, listening, grammar, and speaking review"],
    milestone: "Test 5; oral final on Dec 10",
  },
  {
    number: 16,
    dates: "Dec 15",
    title: "Comprehensive final",
    topics: ["Listening, vocabulary, and grammar"],
    milestone: "Final exam on Dec 15",
  },
];

// Verbatim transcript of Presentation_1.pdf; only PDF line wrapping is removed.
export const presentationTextParagraphs = [
  "Good morning, everyone. My name is Sergei. Today I would like to tell you a little about myself.",
  "I am from Belarus. Belarus is a small country in Eastern Europe. It is near Russia, Poland, Lithuania, and Ukraine.",
  "I came to the United States more than five years ago. For my first three years, I lived in Brooklyn, New York. New York was a good place to start because many people there speak Russian, Ukrainian, or Belarusian. When I arrived in the United States, I did not speak English at all.",
  "At first, I thought learning English would be easy. I thought I could start learning it whenever I wanted. But it was much more difficult than I expected. I worked as a waiter and bartender in a Ukrainian restaurant, and most of our customers spoke Russian or Ukrainian. Because of this, I did not use English very much.",
  "Later, I decided to move to Los Angeles. I had only a few friends here, so I had to use English much more.",
  "I started taking free ESL classes at Santa Monica College. I started from the beginning and continued to higher levels. I also study Web Development at SMC. I enjoy programming, and during the last two years, I have worked on different programming projects.",
  "English is very important for my education, but I have another important goal. I want to understand American culture better and become a part of American life. For me, learning English is an important part of this goal.",
  "I like to work on my programming projects by myself. One of my favorite activities in California is hiking. California has many beautiful trails. I can choose easy trails or more difficult ones. In the past, I also played soccer and ran a lot.",
  "I also enjoy meeting people in our class. We have students from many different countries, and I think we can learn a lot from each other.",
  "Learning English is not always easy, but this challenge motivates me to continue learning and improving.",
  "Thank you very much for listening. If you have any questions, I will be happy to answer them.",
] as const;

export const storySlides = [
  {
    title: "Where I’m from",
    image: "belarus",
    alt: "A map of Europe highlighting Belarus",
    text: "I am from Belarus. Belarus is a small country in Eastern Europe.",
  },
  {
    title: "My first years in the U.S.",
    image: "brooklyn",
    alt: "A street scene in Brooklyn, New York",
    text: "For my first three years, I lived in Brooklyn, New York.",
  },
  {
    title: "Working in New York",
    image: "restaurant",
    alt: "A collage of restaurant staff and musicians at a Ukrainian restaurant",
    text: "I worked as a waiter and bartender in a Ukrainian restaurant.",
  },
  {
    title: "A new start in Los Angeles",
    image: "los-angeles",
    alt: "A view of Los Angeles",
    text: "Later, I decided to move to Los Angeles. I had to use English much more.",
  },
  {
    title: "Learning English at SMC",
    image: "classroom",
    alt: "Students learning together in a classroom",
    text: "I started taking free ESL classes at Santa Monica College.",
  },
  {
    title: "Web Development",
    image: "web-development-video-poster",
    video: "web-development.mp4",
    alt: "Code being typed and scrolled on a laptop and monitor",
    text: "I also study Web Development at SMC. I enjoy programming.",
  },
  {
    title: "Life in California",
    image: "hiking",
    alt: "A collage of mountain views and a hiker in California",
    text: "One of my favorite activities in California is hiking. California has many beautiful trails.",
  },
  {
    title: "Learning together",
    image: "learning-together",
    alt: "Students talking together on the Santa Monica College campus",
    text: "I also enjoy meeting people in our class. We have students from many different countries, and I think we can learn a lot from each other.",
  },
] as const;

export const presentationSlides = [
  {
    kind: "opening",
    title: "A little about myself",
    text: "From Belarus to California — and what I learned along the way.",
  },
  ...storySlides,
  {
    kind: "closing",
    title: "Thank you for listening!",
    text: "Different journeys. One classroom. We learn more together.",
  },
] as const;
