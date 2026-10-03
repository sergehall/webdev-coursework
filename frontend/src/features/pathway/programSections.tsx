import { TagBadge } from "@/components/tags/TagBadge";

export const programSections = [
  {
    title: "About This Pathway",
    content: (
      <>
        <p>
          The pathway below represents an efficient and effective course taking
          sequence for this program. Individual circumstances might require some
          changes to this pathway. It is <strong>always</strong> recommended
          that you <strong>meet with an academic counselor</strong> to develop a
          personalized educational plan.
        </p>

        <p className="mt-4">
          The courses have been intentionally placed and should be prioritized
          in the order in which they appear. If you are unable to take all the
          courses in a semester, you should prioritize enrolling in the courses
          in the order below. Some courses have been noted as{" "}
          <em>“Appropriate for Intersession”</em> (
          <TagBadge label="Appropriate for Intersession" />
          ). Should you need (or want) to take classes in the summer and/or
          winter intersessions, the program recommends these courses as
          appropriate for the condensed schedule of the intersessions.
        </p>

        <p className="mt-4">
          Some pathways combine a “Certificate of Achievement” and an “Associate
          Degree”. If you are pursuing only the Certificate of Achievement, you
          are only required to take the courses marked{" "}
          <TagBadge label="Program Requirement" />.
        </p>

        <p className="mt-4">
          All pathways include at least one “Gateway Course”{" "}
          <TagBadge label="Gateway Course" /> which introduces you to the
          program and/or field of study and helps you decide if you want to
          continue with this Academic and Career Path.
        </p>

        <p className="mt-4">
          Most Associate degrees (though not Associate Degrees for Transfer)
          require satisfying the SMC Global Citizenship requirement. If the
          Program Requirements do not include a “Global Citizenship course”{" "}
          <TagBadge label="Global Citizenship" />, be sure to select a General
          Education course that also satisfies Global Citizenship.
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
          This program helps students develop skills to design interactive and
          responsive websites and apps. Web developers need to be knowledgeable
          on a variety of technologies such as{" "}
          <strong>HTML, CSS, JavaScript</strong>, programming languages, web
          frameworks, cloud hosting, networking, database management, and
          cybersecurity. They are chiefly responsible for code implementation
          and maintenance of web applications at both the front-end and
          back-end. Web developers are instrumental in the success of an
          organization’s online presence.
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
            Design and develop full stack web apps as well as provide the code
            to make websites interactive or allow users to interact with
            back-end applications and databases.
          </li>
        </ol>
      </>
    ),
  },
];
