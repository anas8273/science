import { Bot, BrainCircuit, FlaskConical, Gamepad2, MessageCircle, Sparkles, TrendingUp, X } from "lucide-react";
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
  const completionPercent = gradeLessons.length ? Math.round((progress.completedLessons.length / gradeLessons.length) * 100) : 0;

  const message = useMemo(() => {
    if (currentView === "quiz" && average < 70) return "المدرب الذكي يقترح مراجعة بطاقات المفاهيم قبل إعادة الاختبار الشامل.";
    if (currentView === "lab") return "جربي كتابة توقع في دفتر الباحثة قبل تحريك المؤشرات، ثم قارني التوقع بالنتيجة.";
    if (currentView === "games") return "الألعاب طريقة ممتازة لتثبيت المفاهيم! حاولي تحقيق سلسلة إجابات صحيحة.";
    if (progress.completedLessons.length === 0) return `ابدئي بدرس ${nextLesson?.title ?? "الحركة والقوة"} ثم اختبري نفسك بثلاثة أسئلة.`;
    if (completionPercent >= 80) return "أداء ممتاز! جربي الاختبار الشامل لتأكيد إتقانك للمادة.";
    return `خطوتك التالية: ${nextLesson?.title ?? "اختبار شامل"} مع تجربة مرتبطة بالمفهوم.`;
  }, [average, currentView, nextLesson?.title, progress.completedLessons.length, completionPercent]);

  const experimentSuggestion = experiments.find((experiment) => experiment.gradeId === selectedGrade);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <section className="mb-3 w-[min(400px,calc(100vw-2rem))] animate-scale-in rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-large backdrop-blur-xl dark:border-white/10 dark:bg-ink/95" aria-label="المدرب العلمي الذكي">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-sm">
                <BrainCircuit className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-extrabold text-ink dark:text-white">المدرب الذكي</h2>
                <p className="text-xs font-medium text-slate-400">توصيات مخصصة لتقدمك</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200/80 text-slate-400 transition-colors hover:text-slate-600 dark:border-white/10 dark:text-slate-400"
              aria-label="إغلاق المدرب الذكي"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Progress Mini Bar */}
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-white/5">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            <div className="flex-1">
              <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                <span>تقدمك</span>
                <span className="text-violet">{completionPercent}%</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-slate-200 dark:bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-violet to-purple-500 transition-all" style={{ width: `${completionPercent}%` }} />
              </div>
            </div>
          </div>

          <p className="mt-3 rounded-xl bg-gradient-to-r from-aqua/10 to-violet/5 p-3 text-sm font-bold leading-6 text-ocean dark:text-aqua">{message}</p>

          <div className="mt-4 grid gap-2">
            <button
              type="button"
              onClick={() => { onNavigate("assistant"); setOpen(false); }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-ocean to-aqua px-4 py-3 text-sm font-bold text-white shadow-sm transition-all hover:shadow-medium"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              اسألي المساعد الذكي
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => { onNavigate("quiz"); setOpen(false); }}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-violet/20 px-3 py-2.5 text-xs font-bold text-violet transition-all hover:bg-violet/5"
              >
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                اختبار
              </button>
              <button
                type="button"
                onClick={() => { onNavigate("games"); setOpen(false); }}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-200 px-3 py-2.5 text-xs font-bold text-rose-600 transition-all hover:bg-rose-50 dark:border-rose-500/20 dark:text-rose-400"
              >
                <Gamepad2 className="h-3.5 w-3.5" aria-hidden="true" />
                ألعاب
              </button>
            </div>
            <button
              type="button"
              onClick={() => { onNavigate("lab"); setOpen(false); }}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-aqua/20 px-4 py-2.5 text-xs font-bold text-ocean transition-all hover:bg-aqua/5 dark:text-aqua"
            >
              <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
              تجربة: {experimentSuggestion?.title ?? "القوة والحركة"}
            </button>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="fab-pulse inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet to-purple-600 px-5 py-4 text-sm font-bold text-white shadow-large transition-all hover:-translate-y-1 hover:shadow-xl"
        aria-expanded={open}
        aria-label="فتح المدرب العلمي الذكي"
      >
        <Bot className="h-5 w-5" aria-hidden="true" />
        المدرب الذكي
      </button>
    </div>
  );
}
