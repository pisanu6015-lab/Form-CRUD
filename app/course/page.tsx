import CourseCard from "../../components/CourseCard";
import { courses } from "../../data/coursedata";
import CourseExplorer from "@/components/CourseExplorer";





export default function CoursesPage() {
  return (
    <>
      

      <CourseExplorer />


      {/* <section className="p-4">
        <h1 className="text-xl font-bold mb-4">รายการรายวิชา</h1>
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </section> */}
    </>
  );
}