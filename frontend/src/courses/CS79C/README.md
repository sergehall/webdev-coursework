# CS 79C

Compute Engines in Amazon Web Services.

The course material follows the Spring 2026 syllabus and is organized as:

- Module 1: Introduction to Computing Services
- Module 2: S3, EBS, and EFS Storage
- Module 3: EC2 and Linux 101
- Module 4: Auto Scaling and Elastic Load Balancing
- Module 5: Docker and ECS
- Module 6: Kubernetes and Amazon EKS
- Module 7: Lambda and Function as a Service
- Module 8: Elastic Beanstalk
- Module 9: CloudFormation
- Module 10: Final Project

The course UI and data live in this directory; downloadable source material
lives under `frontend/public/course-materials/CS79C/`. The
[root README](../../../../README.md) owns installation and development
instructions.

## Module 10 final exam data

`data/modules/module10Quiz.ts` assembles the Final Exam from
`module10QuizQuestions.ts` and `module10QuizAnswers.ts`. Keep the 55 question
IDs aligned with their answer entries. Preserve wording, option order, point
values, and answer keys when reorganizing the data; follow the
[assessment standard](../../../../docs/quiz-assessment-standard.md) for
assessment changes.

## Final project HTML report

`frontend/public/course-materials/CS79C/final-project/final-report.html` is a
standalone report offered as an individual download from Module 10. Its inline
CSS makes the document portable and preserves its appearance when opened outside
the course app. Keep the report self-contained while it is distributed as a
single HTML file. A multi-file version would require updated download
instructions.
