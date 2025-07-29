// StudentCardList.tsx

import StudentCard from "@/components/StudentCard";
import type { StudentType } from "@/data/studentData";

type Props = {
  students: StudentType[];
};

const StudentCardList = ({ students }: Props) => {
  return (
    <div className="flex w-full items-center justify-center">
      {students.map((student, index) => (
        <StudentCard
          key={index}
          name={student.name}
          major={student.major}
          year={student.year}
          bio={student.bio}
          imageUrl={student.imageUrl}
        />
      ))}
    </div>
  );
};

export default StudentCardList;
