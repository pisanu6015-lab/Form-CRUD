"use client";
import { useState, type ChangeEvent, type ReactElement } from "react";
import type { Course } from "@/types/course";
import CourseCard from "@/components/CourseCard";
import CourseForm, { type CourseDraft } from "./Courseform";

const SafeCourseForm = CourseForm as unknown as (props: {
    initialCourse: Course | null | undefined;
    onSave: (draft: CourseDraft) => void;
    onCancel: () => void;
}) => ReactElement;

type CourseExplorerProps = {
    initialCourses?: Course[];
};

export default function CourseExplorer({ initialCourses = [] }: CourseExplorerProps) {
    const [keyword, setKeyword] = useState("");
    const [courses, setCourses] = useState<Course[]>(initialCourses ?? []);
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);

    function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
        setKeyword(event.target.value);
    }

    function handleCreate(draft: CourseDraft) {
        const newCourse: Course = {
            id: crypto.randomUUID(),
            code: draft.code.trim(),
            name: draft.name.trim(),
            credit: Number(draft.credit),
            instructor: draft.instructor.trim(),
        };

        setCourses([...(courses || []), newCourse]);
    }

    function handleDelete(id: string) {
        setCourses((courses || []).filter((course) => course.id !== id));
    }

    function handleUpdate(id: string, draft: CourseDraft) {
        setCourses(
            (courses || []).map((course) =>
                course.id === id
                    ? {
                        ...course,
                        code: draft.code.trim(),
                        name: draft.name.trim(),
                        credit: Number(draft.credit),
                        instructor: draft.instructor.trim(),
                    }
                    : course
            )
        );

        setEditingId(null);
    }

    function handleSave(draft: CourseDraft) {
        if (editingId === null) {
            handleCreate(draft);
            return;
        }

        handleUpdate(editingId, draft);
    }

    const editingCourse = (courses || []).find((course) => course.id === editingId);

    const searchText = keyword.trim().toLowerCase();

    const visibleCourses = (courses || []).filter(
        (course) =>
            course.name.toLowerCase().includes(searchText) ||
            course.code.toLowerCase().includes(searchText)
    );

    function handleToggleFavorite(id: string) {
        setFavoriteIds((prevIds) =>
            prevIds.includes(id)
                ? prevIds.filter((favoriteId) => favoriteId !== id)
                : [...prevIds, id]
        );
    }

    return (
        <div className="space-y-6 rounded-2xl bg-slate-50 p-6 text-slate-900 shadow-sm">
            <input
                type="search"
                aria-label="ค้นหารายวิชา"
                value={keyword}
                onChange={handleKeywordChange}
                placeholder="ค้นหาชื่อวิชาหรือรหัสวิชา"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-900 focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            />
            {/*card loop*/}
            {visibleCourses.length === 0 ? (
                <p className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-500">
                    ไม่พบรายวิชาที่ตรงกับเงื่อนไข
                </p>
            ) : (
                <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {visibleCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            isFavorite={favoriteIds.includes(course.id)}
                            onToggleFavorite={() => handleToggleFavorite(course.id)}
                            onEdit={() => setEditingId(course.id)}
                            onDelete={() => handleDelete(course.id)}
                        />
                    ))}
                </section>
            )}

            <SafeCourseForm
                key={editingId ?? "new"}
                initialCourse={editingCourse}
                onSave={handleSave}
                onCancel={() => setEditingId(null)}
            />
        </div>
    );
}