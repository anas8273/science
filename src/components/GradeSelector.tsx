import { GraduationCap } from "lucide-react";
import type { GradeId } from "../types";

interface GradeSelectorProps {
  selectedGrade: GradeId;
  onSelect: (grade: GradeId) => void;
}

const grades: Array<{ id: GradeId; label: string; description: string }> = [
  { id: "first", label: "أول متوسط", description: "أساسيات العلم والمادة والأرض" },
  { id: "third", label: "ثالث متوسط", description: "الوراثة والكيمياء والفيزياء" },
];

export default function GradeSelector({ selectedGrade, onSelect }: GradeSelectorProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/6" aria-labelledby="grade-title">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-bold text-ocean dark:text-aqua">
            <GraduationCap className="h-4 w-4" aria-hidden="true" />
            اختيار الصف
          </p>
          <h2 id="grade-title" className="mt-1 text-2xl font-extrabold text-ink dark:text-white">
            اختاري مسارك التعليمي
          </h2>
        </div>
        <div className="grid gap-2 sm:grid-cols-2" role="tablist" aria-label="اختيار الصف الدراسي">
          {grades.map((grade) => {
            const active = selectedGrade === grade.id;
            return (
              <button
                key={grade.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelect(grade.id)}
                className={`rounded-lg border px-5 py-3 text-start transition ${
                  active
                    ? "border-ocean bg-ocean text-white shadow-sm"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-aqua dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                }`}
              >
                <span className="block text-base font-extrabold">{grade.label}</span>
                <span className={`mt-1 block text-xs ${active ? "text-white/100" : "text-slate-500 dark:text-slate-300"}`}>
                  {grade.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
