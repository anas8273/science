import { BookOpen, GraduationCap, Microscope } from "lucide-react";
import type { GradeId } from "../types";

interface GradeSelectorProps {
  selectedGrade: GradeId;
  onSelect: (grade: GradeId) => void;
}

const grades: Array<{ id: GradeId; label: string; description: string; icon: typeof BookOpen; color: string }> = [
  { id: "first", label: "أول متوسط", description: "أساسيات العلم والمادة والأرض", icon: BookOpen, color: "from-blue-500 to-cyan-500" },
  { id: "third", label: "ثالث متوسط", description: "الوراثة والكيمياء والفيزياء", icon: Microscope, color: "from-violet-500 to-purple-500" },
];

export default function GradeSelector({ selectedGrade, onSelect }: GradeSelectorProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/6" aria-labelledby="grade-title">
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
        <div className="grid gap-3 sm:grid-cols-2" role="tablist" aria-label="اختيار الصف الدراسي">
          {grades.map((grade) => {
            const active = selectedGrade === grade.id;
            const Icon = grade.icon;
            return (
              <button
                key={grade.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelect(grade.id)}
                className={`group flex items-center gap-3 rounded-xl border px-5 py-4 text-start transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] ${
                  active
                    ? "border-ocean bg-gradient-to-r from-ocean to-aqua text-white shadow-md"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-aqua dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                }`}
              >
                <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${
                  active ? "bg-white/20" : "bg-gradient-to-br " + grade.color + " text-white"
                }`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="block text-base font-extrabold">{grade.label}</span>
                  <span className={`mt-0.5 block text-xs ${active ? "text-white/80" : "text-slate-500 dark:text-slate-300"}`}>
                    {grade.description}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
