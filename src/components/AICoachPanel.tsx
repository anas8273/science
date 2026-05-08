import { Bot, BrainCircuit, FlaskConical, MessageCircle, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";
import { experiments, lessons } from "../data/platformData";
import type { AppView, GradeId, ProgressState } from "../types";

interface AICoachPanelProps {
  currentView: AppView;
  selectedGrade: GradeId;
  progress: ProgressState;
  onNavigate: (view: AppView) => void;
}

export default function AICoachPanel({ currentView, selectedGrade, progress, onNavigate }: AICoachPanelProps) {
  const [open, setOpen] = useState(false);
  const gradeLessons = lessons.filter((lesson) => lesson.gradeId === selectedGrade);
  const nextLesson = gradeLessons.find((lesson) => !progress.completedLessons.includes(lesson.id)) ?? gradeLessons[0];
  const quizScores = Object.values(progress.quizScores);
  const average = quizScores.length ? Math.round(quizScores.reduce((sum, value) => sum + value, 0) / quizScores.length) : 0;
  const message = useMemo(() => {
    if (currentView === "quiz" && average < 70) return "المدرب الذكي يقترح مراجعة بطاقات المفاهيم قبل إعادة الاختبار الشامل.";
    if (currentView === "lab") return "جربي كتابة توقع في دفتر الباحثة قبل تحريك المؤشرات، ثم قارني التوقع بالنتيجة.";
    if (progress.completedLessons.length === 0) return `ابدئي بدرس ${nextLesson?.title ?? "الحركة والقوة"} ثم اختبري نفسك بثلاثة أسئلة.`;
    return `خطوتك التالية المقترحة: ${nextLesson?.title ?? "اختبار شامل"} مع تجربة مرتبطة بالمفهوم.`;
  }, [average, currentView, nextLesson?.title, progress.completedLessons.length]);

  const experimentSuggestion = experiments.find((experiment) => experiment.gradeId === selectedGrade);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <section className="mb-3 w-[min(380px,calc(100vw-2rem))] rounded-lg border border-slate-200 bg-white p-4 shadow-soft dark:border-white/10 dark:bg-[#101c2f]" aria-label="المدرب العلمي الذكي">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-ocean text-white">
                <BrainCircuit className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-extrabold text-ink dark:text-white">المدرب العلمي الذكي</h2>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-300">توصيات ذكية حسب تقدمك</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-600 dark:border-white/10 dark:text-slate-200"
              aria-label="إغلاق المدرب الذكي"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <p className="mt-4 rounded-lg bg-aqua/10 p-3 text-sm font-bold leading-6 text-ocean dark:text-aqua">{message}</p>

          <div className="mt-4 grid gap-2">
            <button
              type="button"
              onClick={() => onNavigate("assistant")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-ocean px-4 py-3 text-sm font-extrabold text-white"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              اسألي المساعد عن مفهوم
            </button>
            <button
              type="button"
              onClick={() => onNavigate("quiz")}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-violet/30 px-4 py-3 text-sm font-extrabold text-violet hover:bg-violet/10"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              افتحي الاختبار الشامل
            </button>
            <button
              type="button"
              onClick={() => onNavigate("lab")}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-aqua/30 px-4 py-3 text-sm font-extrabold text-ocean hover:bg-aqua/10 dark:text-aqua"
            >
              <FlaskConical className="h-4 w-4" aria-hidden="true" />
              تجربة مقترحة: {experimentSuggestion?.title ?? "القوة والحركة"}
            </button>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-lg bg-violet px-5 py-4 text-sm font-extrabold text-white shadow-soft transition hover:-translate-y-0.5"
        aria-expanded={open}
        aria-label="فتح المدرب العلمي الذكي"
      >
        <Bot className="h-5 w-5" aria-hidden="true" />
        مدرب ذكي
      </button>
    </div>
  );
}
