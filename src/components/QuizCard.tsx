import { RotateCcw, Trophy } from "lucide-react";
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

  const answeredCount = Object.keys(answers).length;
  const score = useMemo(() => {
    return questions.reduce((total, question) => {
      const selected = question.options.find((option) => option.id === answers[question.id]);
      return total + (selected?.correct ? 1 : 0);
    }, 0);
  }, [answers, questions]);

  const complete = questions.length > 0 && answeredCount === questions.length;

  useEffect(() => {
    if (complete && !reported) {
      setReported(true);
      onComplete?.(score);
    }
  }, [complete, onComplete, reported, score]);

  const reset = () => {
    setAnswers({});
    setReported(false);
  };

  const encouragement =
    score === questions.length
      ? "ممتاز! إتقان كامل للمفاهيم."
      : score >= Math.ceil(questions.length * 0.7)
        ? "رائع، بقيت مراجعة خفيفة فقط."
        : "بداية جيدة، أعيدي المحاولة بعد مراجعة البطاقات.";

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/6" aria-labelledby={`${quizId}-title`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-violet">اختبار قصير</p>
          <h3 id={`${quizId}-title`} className="mt-1 text-xl font-extrabold text-ink dark:text-white">
            {title}
          </h3>
        </div>
        <div className="min-w-[150px]">
          <div className="mb-2 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-300">
            <span>الإجابات</span>
            <span>
              {answeredCount}/{questions.length}
            </span>
          </div>
          <div className="h-2 rounded-full bg-slate-100 dark:bg-white/10">
            <div className="h-full rounded-full bg-violet transition-all" style={{ width: `${questions.length ? (answeredCount / questions.length) * 100 : 0}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4">
        {questions.map((question, index) => {
          const selectedId = answers[question.id];
          const selected = question.options.find((option) => option.id === selectedId);
          return (
            <article key={question.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
              <h4 className="font-bold text-ink dark:text-white">
                {index + 1}. {question.prompt}
              </h4>
              <div className="mt-3 grid gap-2 md:grid-cols-3" role="radiogroup" aria-label={question.prompt}>
                {question.options.map((option) => {
                  const chosen = selectedId === option.id;
                  const answerClass = chosen
                    ? option.correct
                      ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200"
                      : "border-amber-500 bg-amber-50 text-amber-800 dark:bg-amber-500/15 dark:text-amber-200"
                    : "border-slate-200 bg-white text-slate-700 hover:border-aqua dark:border-white/10 dark:bg-ink/40 dark:text-slate-200";
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={chosen}
                      onClick={() => setAnswers((current) => ({ ...current, [question.id]: option.id }))}
                      className={`rounded-lg border px-3 py-3 text-start text-sm font-semibold transition ${answerClass}`}
                    >
                      {option.text}
                    </button>
                  );
                })}
              </div>
              {selected && (
                <p className={`mt-3 rounded-lg px-3 py-2 text-sm font-semibold ${selected.correct ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200" : "bg-amber-100 text-amber-900 dark:bg-amber-500/15 dark:text-amber-200"}`}>
                  {selected.feedback}
                </p>
              )}
            </article>
          );
        })}
      </div>

      {complete && (
        <div className="mt-5 flex flex-col gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-900 dark:border-emerald-400/20 dark:bg-emerald-500/12 dark:text-emerald-100 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="h-6 w-6" aria-hidden="true" />
            <div>
              <p className="font-extrabold">
                النتيجة: {score} من {questions.length}
              </p>
              <p className="text-sm font-semibold">{encouragement}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-emerald-800 shadow-sm dark:bg-ink dark:text-emerald-100"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            إعادة الاختبار
          </button>
        </div>
      )}
    </section>
  );
}
