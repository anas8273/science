import { Award, BarChart3, CheckCircle2, Clock, Lightbulb, RotateCcw, Star, Target, Trophy, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { QuizQuestion } from "../types";

interface QuizCardProps {
  quizId: string;
  title: string;
  questions: QuizQuestion[];
  onComplete?: (score: number) => void;
}

export default function QuizCard({ quizId, title, questions, onComplete }: QuizCardProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [reported, setReported] = useState(false);
  const [startTime] = useState(Date.now());
  const [endTime, setEndTime] = useState<number | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const score = useMemo(() => {
    return questions.reduce((total, question) => {
      const selected = question.options.find((option) => option.id === answers[question.id]);
      return total + (selected?.correct ? 1 : 0);
    }, 0);
  }, [answers, questions]);

  const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
  const complete = questions.length > 0 && answeredCount === questions.length;

  useEffect(() => {
    if (complete && !reported) {
      setReported(true);
      setEndTime(Date.now());
      onComplete?.(score);
    }
  }, [complete, onComplete, reported, score]);

  const reset = () => {
    setAnswers({});
    setReported(false);
    setEndTime(null);
    setShowAnalysis(false);
  };

  const timeTaken = endTime ? Math.round((endTime - startTime) / 1000) : 0;
  const avgTimePerQuestion = timeTaken > 0 && questions.length > 0 ? Math.round(timeTaken / questions.length) : 0;

  const performanceLevel = percentage >= 90 ? "ممتاز" : percentage >= 70 ? "جيد جدًا" : percentage >= 50 ? "جيد" : "يحتاج مراجعة";
  const performanceColor = percentage >= 90 ? "emerald" : percentage >= 70 ? "blue" : percentage >= 50 ? "amber" : "rose";

  const encouragement =
    percentage >= 90
      ? "أداء متميز! أثبتِ إتقانك الكامل للمفاهيم العلمية."
      : percentage >= 70
        ? "عمل رائع! بقيت مراجعة بسيطة للوصول إلى الإتقان."
        : percentage >= 50
          ? "بداية جيدة! راجعي المفاهيم الأساسية وأعيدي المحاولة."
          : "لا تقلقي! راجعي الدرس مرة أخرى ثم أعيدي الاختبار.";

  const wrongAnswers = questions.filter((q) => {
    const selected = q.options.find((o) => o.id === answers[q.id]);
    return selected && !selected.correct;
  });

  return (
    <section className="card-premium rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-white/10 dark:bg-white/[0.04]" aria-labelledby={`${quizId}-title`}>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-sm">
            <Target className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-bold text-violet">اختبار تقويمي</p>
            <h3 id={`${quizId}-title`} className="text-lg font-extrabold text-ink dark:text-white">
              {title}
            </h3>
          </div>
        </div>
        <div className="min-w-[180px]">
          <div className="mb-2 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <BarChart3 className="h-3.5 w-3.5" />
              التقدم
            </span>
            <span className="text-violet">{answeredCount}/{questions.length}</span>
          </div>
          <div className="h-2.5 rounded-full bg-slate-100 dark:bg-white/10">
            <div
              className="progress-bar-animated h-full rounded-full bg-gradient-to-r from-violet to-purple-500 transition-all duration-500"
              style={{ width: `${questions.length ? (answeredCount / questions.length) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="mt-6 grid gap-4">
        {questions.map((question, index) => {
          const selectedId = answers[question.id];
          const selected = question.options.find((option) => option.id === selectedId);
          const isCorrect = selected?.correct;
          return (
            <article key={question.id} className={`rounded-xl border p-4 transition-all ${
              selectedId
                ? isCorrect
                  ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-500/20 dark:bg-emerald-500/5"
                  : "border-rose-200 bg-rose-50/50 dark:border-rose-500/20 dark:bg-rose-500/5"
                : "border-slate-200/80 bg-slate-50/50 dark:border-white/10 dark:bg-white/5"
            }`}>
              <div className="flex items-start gap-3">
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-extrabold ${
                  selectedId
                    ? isCorrect
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                      : "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300"
                    : "bg-violet/10 text-violet"
                }`}>
                  {selectedId ? (isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />) : index + 1}
                </span>
                <h4 className="font-bold text-ink dark:text-white leading-7">{question.prompt}</h4>
              </div>
              <div className="mt-3 mr-10 grid gap-2 md:grid-cols-3" role="radiogroup" aria-label={question.prompt}>
                {question.options.map((option) => {
                  const chosen = selectedId === option.id;
                  const showCorrect = selectedId && option.correct;
                  const answerClass = chosen
                    ? option.correct
                      ? "border-emerald-400 bg-emerald-100 text-emerald-800 ring-2 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-200 dark:ring-emerald-500/30"
                      : "border-rose-400 bg-rose-100 text-rose-800 ring-2 ring-rose-200 dark:bg-rose-500/15 dark:text-rose-200 dark:ring-rose-500/30"
                    : showCorrect
                      ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                      : "border-slate-200/80 bg-white text-slate-700 hover:border-violet/40 hover:bg-violet/5 dark:border-white/10 dark:bg-ink/40 dark:text-slate-200";
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={chosen}
                      disabled={!!selectedId}
                      onClick={() => setAnswers((current) => ({ ...current, [question.id]: option.id }))}
                      className={`rounded-xl border px-3 py-3 text-start text-sm font-semibold transition-all ${answerClass} ${!selectedId ? "cursor-pointer" : "cursor-default"}`}
                    >
                      {option.text}
                    </button>
                  );
                })}
              </div>
              {selected && (
                <div className={`mt-3 mr-10 flex items-start gap-2 rounded-xl px-3 py-2.5 text-sm font-medium ${
                  selected.correct
                    ? "bg-emerald-100/80 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-200"
                    : "bg-amber-100/80 text-amber-900 dark:bg-amber-500/10 dark:text-amber-200"
                }`}>
                  <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{selected.feedback}</span>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Results Section */}
      {complete && (
        <div className="mt-6 space-y-4">
          {/* Score Card */}
          <div className={`rounded-2xl border p-5 ${
            performanceColor === "emerald" ? "border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 dark:border-emerald-500/20 dark:from-emerald-500/10 dark:to-teal-500/5" :
            performanceColor === "blue" ? "border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 dark:border-blue-500/20 dark:from-blue-500/10 dark:to-cyan-500/5" :
            performanceColor === "amber" ? "border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 dark:border-amber-500/20 dark:from-amber-500/10 dark:to-orange-500/5" :
            "border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50 dark:border-rose-500/20 dark:from-rose-500/10 dark:to-pink-500/5"
          }`}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className={`grid h-16 w-16 place-items-center rounded-2xl ${
                  performanceColor === "emerald" ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300" :
                  performanceColor === "blue" ? "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300" :
                  performanceColor === "amber" ? "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300" :
                  "bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300"
                }`}>
                  {percentage >= 70 ? <Trophy className="h-8 w-8" /> : <Target className="h-8 w-8" />}
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-ink dark:text-white">{percentage}%</p>
                  <p className="text-sm font-bold text-slate-600 dark:text-slate-300">{score} من {questions.length} إجابة صحيحة</p>
                  <p className={`mt-1 text-xs font-bold ${
                    performanceColor === "emerald" ? "text-emerald-700 dark:text-emerald-300" :
                    performanceColor === "blue" ? "text-blue-700 dark:text-blue-300" :
                    performanceColor === "amber" ? "text-amber-700 dark:text-amber-300" :
                    "text-rose-700 dark:text-rose-300"
                  }`}>{performanceLevel}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAnalysis(!showAnalysis)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 dark:border-white/10 dark:bg-ink dark:text-slate-200"
                >
                  <BarChart3 className="h-4 w-4" />
                  تحليل الأداء
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet to-purple-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:shadow-medium"
                >
                  <RotateCcw className="h-4 w-4" />
                  إعادة
                </button>
              </div>
            </div>
            <p className="mt-4 text-sm font-medium leading-6 text-slate-600 dark:text-slate-300">{encouragement}</p>
          </div>

          {/* Performance Analysis */}
          {showAnalysis && (
            <div className="animate-slide-up rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
              <h4 className="flex items-center gap-2 text-base font-extrabold text-ink dark:text-white">
                <BarChart3 className="h-5 w-5 text-violet" />
                تحليل مفصل للأداء
              </h4>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-3 dark:bg-white/5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <Clock className="h-3.5 w-3.5" />
                    الوقت المستغرق
                  </div>
                  <p className="mt-1 text-lg font-extrabold text-ink dark:text-white">{timeTaken} ثانية</p>
                  <p className="text-xs text-slate-400">~{avgTimePerQuestion} ث/سؤال</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 dark:bg-white/5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    الإجابات الصحيحة
                  </div>
                  <p className="mt-1 text-lg font-extrabold text-emerald-600 dark:text-emerald-400">{score}</p>
                  <p className="text-xs text-slate-400">من أصل {questions.length}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 dark:bg-white/5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <Star className="h-3.5 w-3.5 text-amberSoft" />
                    مستوى الأداء
                  </div>
                  <p className="mt-1 text-lg font-extrabold text-ink dark:text-white">{performanceLevel}</p>
                  <p className="text-xs text-slate-400">{percentage}% نسبة النجاح</p>
                </div>
              </div>

              {/* Recommendations */}
              {wrongAnswers.length > 0 && (
                <div className="mt-4 rounded-xl border border-amber-200/60 bg-amber-50/50 p-4 dark:border-amber-500/20 dark:bg-amber-500/5">
                  <h5 className="flex items-center gap-2 text-sm font-bold text-amber-800 dark:text-amber-300">
                    <Lightbulb className="h-4 w-4" />
                    توصيات للتحسين
                  </h5>
                  <ul className="mt-2 space-y-1.5">
                    {wrongAnswers.slice(0, 3).map((q) => (
                      <li key={q.id} className="text-xs font-medium text-amber-700 dark:text-amber-200/80">
                        • راجعي مفهوم: {q.prompt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {percentage >= 90 && (
                <div className="mt-4 flex items-center gap-3 rounded-xl bg-emerald-50 p-3 dark:bg-emerald-500/10">
                  <Award className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">شارة الإتقان</p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">حصلتِ على شارة إتقان هذا الاختبار!</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
