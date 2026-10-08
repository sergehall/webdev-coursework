import { TagBadge } from "@/components/tags/TagBadge";

export const programSections = [
  {
    title: "About This Pathway",
    content: (
      <>
        <p>
          The pathway below provides a recommended course-taking sequence for
          this program. Your individual circumstances may require adjustments.
          We recommend that you <strong>meet with an academic counselor</strong>{" "}
          to develop a personalized educational plan.
        </p>

        <p className="mt-4">
          Courses are listed in the recommended order. If you cannot take all
          the courses in a semester, prioritize them in the order shown below.
          Courses marked <em>“Appropriate for Intersession”</em> (
          <TagBadge label="Appropriate for Intersession" />) are recommended for
          the shorter summer or winter sessions.
        </p>

        <p className="mt-4">
          This pathway includes both a Certificate of Achievement and an
          Associate in Science (AS) degree. If you are pursuing only the
          certificate, you need to complete the courses marked{" "}
          <em>“Program Requirement”</em> (
          <TagBadge label="Program Requirement" />
          ).
        </p>

        <p className="mt-4">
          A <em>“Gateway Course”</em> (<TagBadge label="Gateway Course" />)
          introduces you to the program or field of study and helps you decide
          whether to continue along this academic and career path.
        </p>

        <p className="mt-4">
          Most SMC associate degrees, excluding Associate Degrees for Transfer,
          require you to satisfy the Global Citizenship requirement. If your
          major requirements do not include a course with the{" "}
          <em>“Global Citizenship”</em> designation (
          <TagBadge label="Global Citizenship" />
          ), choose a general education course that also satisfies this
          requirement.
        </p>
      </>
    ),
  },
  {
    title: "Program Description",
    content: (
      <>
        <p className="font-semibold">Effective Fall 2023</p>
        <p className="mt-4">
          This program helps students develop the skills to design interactive,
          responsive websites and applications. Web developers need to be
          knowledgeable about technologies such as{" "}
          <strong>HTML, CSS, and JavaScript</strong>, as well as programming
          languages, web frameworks, cloud hosting, networking, database
          management, and cybersecurity. They are primarily responsible for
          implementing and maintaining both the front end and the back end of
          web applications. Their work supports the success of an organization’s
          online presence.
        </p>
      </>
    ),
  },
  {
    title: "Program Learning Outcomes",
    content: (
      <>
        <p>Upon completion of the program, students will:</p>
        <ol className="mt-4 list-decimal space-y-3 pl-6">
          <li>
            Design and develop full-stack web applications, write code that
            makes websites interactive, and enable users to interact with
            back-end applications and databases.
          </li>
        </ol>
      </>
    ),
  },
];
