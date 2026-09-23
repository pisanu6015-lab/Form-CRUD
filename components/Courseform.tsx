"use client";

import { Course } from "@/types/course";
import { ChangeEvent, FormEvent, useState } from "react";

export type CourseDraft = {
  code: string;
  name: string;
  credit: string;
  instructor: string;
};

const emptyDraft: CourseDraft = {
  code: "",
  name: "",
  credit: "",
  instructor: "",
};

type CourseFormProps = {
  initialCourse?: Course;
  onSave: (draft: CourseDraft) => void;
  onCancel: () => void;
};

function toDraft(course?: Course): CourseDraft {
  if (!course) {
    return emptyDraft;
  }

  return {
    code: course.code,
    name: course.name,
    credit: String(course.credit),
    instructor: course.instructor,
  };
}

export default function CourseForm({ initialCourse, onSave, onCancel }: CourseFormProps) {
  const [draft, setDraft] = useState<CourseDraft>(toDraft(initialCourse));
  const [errors, setErrors] = useState<FormErrors>({});

  type FormErrors = Partial<Record<keyof CourseDraft, string>>;

  function validate(value: CourseDraft): FormErrors {
    const nextErrors: FormErrors = {};

    if (value.code.trim() === "") {
      nextErrors.code = "กรุณาระบุรหัสวิชา";
    }

    if (value.name.trim() === "") {
      nextErrors.name = "กรุณาระบุชื่อวิชา";
    }

    const credit = Number(value.credit);
    if (!Number.isInteger(credit) || credit < 1 || credit > 6) {
      nextErrors.credit = "หน่วยกิตต้องเป็นจำนวนเต็มตั้งแต่ 1 ถึง 6";
    }

    return nextErrors;
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(draft);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSave(draft);
    setDraft(emptyDraft);
    setErrors({});
  } // <--- จบฟังก์ชัน handleSubmit ตรงนี้ครับ

  // return ของตัว Component CourseForm
  return (
    <form onSubmit={handleSubmit} noValidate className="course-form">
      <div className="course-form__field">
        <label htmlFor="code" className="course-form__label">รหัสวิชา</label>
        <input id="code" name="code" type="text" className="course-form__input" value={draft.code} onChange={handleChange} aria-invalid={!!errors.code} aria-describedby={errors.code ? "code-error" : undefined} />
        {errors.code ? <p id="code-error" className="course-form__error">{errors.code}</p> : null}
      </div>
      <div className="course-form__field">
        <label htmlFor="name" className="course-form__label">ชื่อวิชา</label>
        <input id="name" name="name" type="text" className="course-form__input" value={draft.name} onChange={handleChange} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
        {errors.name ? <p id="name-error" className="course-form__error">{errors.name}</p> : null}
      </div>
      <div className="course-form__field">
        <label htmlFor="credit" className="course-form__label">หน่วยกิต</label>
        <input id="credit" name="credit" type="number" className="course-form__input" inputMode="numeric" min="1" max="6" value={draft.credit} onChange={handleChange} aria-invalid={!!errors.credit} aria-describedby={errors.credit ? "credit-error" : undefined} />
        {errors.credit ? <p id="credit-error" className="course-form__error">{errors.credit}</p> : null}
      </div>
      <div className="course-form__field">
        <label htmlFor="instructor" className="course-form__label">ผู้สอน</label>
        <input id="instructor" name="instructor" type="text" className="course-form__input" value={draft.instructor} onChange={handleChange} aria-invalid={!!errors.instructor} aria-describedby={errors.instructor ? "instructor-error" : undefined} />
        {errors.instructor ? <p id="instructor-error" className="course-form__error">{errors.instructor}</p> : null}
      </div>
      <div className="course-form__actions">
        <button type="submit" className="course-form__button course-form__button--primary">บันทึก</button>
        {initialCourse ? <button type="button" className="course-form__button course-form__button--secondary" onClick={onCancel}>ยกเลิก</button> : null}
      </div>
      <style jsx>{`
        .course-form { max-width: 520px; margin: 0 auto; padding: 24px; border-radius: 16px; background: #fff; box-shadow: 0 8px 24px rgba(15, 23, 42, .1); }
        .course-form__field { margin-bottom: 16px; }
        .course-form__label { display: block; margin-bottom: 6px; color: #334155; font-weight: 600; }
        .course-form__input { width: 100%; box-sizing: border-box; padding: 11px 13px; border: 1px solid #cbd5e1; border-radius: 9px; font-size: 1rem; outline: none; transition: border-color .2s, box-shadow .2s; }
        .course-form__input:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37, 99, 235, .15); }
        .course-form__input[aria-invalid="true"] { border-color: #dc2626; }
        .course-form__error { margin: 5px 0 0; color: #dc2626; font-size: .875rem; }
        .course-form__actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 24px; }
        .course-form__button { border: 0; border-radius: 9px; padding: 11px 22px; font-size: 1rem; font-weight: 700; cursor: pointer; transition: transform .15s, opacity .15s; }
        .course-form__button:hover { transform: translateY(-1px); opacity: .9; }
        .course-form__button--primary { color: #fff; background: #2563eb; }
        .course-form__button--secondary { color: #334155; background: #e2e8f0; }
      `}</style>
    </form>
  );
}