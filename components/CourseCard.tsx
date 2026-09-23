import type { Course } from "@/types/course";
import Link from "next/link";

type CourseCardProps = { 
  course: Course;
  description?: string; 
  isFavorite: boolean; 
  onToggleFavorite: (id: string) => void; 
  onEdit: () => void;
  onDelete: () => void;

}; 
 
export default function CourseCard({ course, description, onEdit, onDelete, isFavorite, onToggleFavorite }: CourseCardProps) {
  const isOpen = "isOpen" in course ? Boolean(course.isOpen) : false;

  return ( 
    <article className="course-card">
      <header className="course-card__header">
        <h2 className="course-card__title"><Link href={`/courses/${course.id}`}>{course.name}</Link></h2>
        <span className={`course-card__status ${isOpen ? "course-card__status--open" : "course-card__status--closed"}`}>
          {isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}
        </span>
      </header>

      <div className="course-card__details">
        <p>รหัสวิชา: {course.code}</p>
        <p>{course.credit} หน่วยกิต</p>
        {description && <p className="course-card__description">{description}</p>}
      </div>

      <footer className="course-card__actions">
        <button className="course-card__button course-card__button--edit" type="button" onClick={onEdit} aria-label="แก้ไขรายวิชา" title="แก้ไขรายวิชา">
          ✏️ แก้ไข
        </button>
        <button className="course-card__button course-card__button--delete" type="button" onClick={onDelete} aria-label="ลบรายวิชา" title="ลบรายวิชา">
          🗑️ ลบ
        </button>
        <button className="course-card__button course-card__button--favorite" type="button" onClick={() => onToggleFavorite(course.id)}>
          {isFavorite ? "ลบจากรายการโปรด" : "เพิ่มไปยังรายการโปรด"}
        </button>
      </footer>
    </article>
  );
}