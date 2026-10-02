interface CourseBook {
  readonly title: string;
  readonly edition: string;
  readonly authors: string;
  readonly publisher: string;
  readonly year: string;
  readonly isbn: string;
  readonly cover: string;
  readonly url: string;
}

export const courseBooks = [
  {
    title: "Elements of Success 1",
    edition: "1st edition",
    authors: "Anne M. Ediger, Randee Falk, and Mari Vargo",
    publisher: "Oxford University Press",
    year: "2014",
    isbn: "9780194028202",
    cover: "/course-materials/esl10g/books/elements-of-success-1.png",
    url: "https://elt.oup.com/catalogue/items/global/grammar_vocabulary/elements_of_success/elements_of_success_1/9780194028202?cc=us&selLanguage=en&mode=hub&srsltid=AU7gw4WvMd70KZJz1AXSikh6Tn7PnHXMvArghg_1VI8OS53eXtaX-52a",
  },
  {
    title: "Pathways: Listening, Speaking, and Critical Thinking 1",
    edition: "3rd edition",
    authors: "John Hughes and Becky Tarver Chase",
    publisher: "Cengage National Geographic Learning",
    year: "2023",
    isbn: "9780357978733",
    cover:
      "/course-materials/esl10g/books/pathways-listening-speaking-critical-thinking-1.png",
    url: "https://www.eltngl.com/products/9780357978733",
  },
] satisfies readonly CourseBook[];
