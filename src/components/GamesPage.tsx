import { Atom, Brain, CheckCircle2, Gamepad2, RefreshCw, Trophy, Zap } from "lucide-react";
import { useMemo, useState } from "react";

const speedQuestions = [
  { prompt: "القوة هي...", answer: "دفع أو سحب", choices: ["دفع أو سحب", "لون المعدن", "جزء من DNA"] },
  { prompt: "الدائرة المغلقة تسمح بـ...", answer: "مرور التيار", choices: ["مرور التيار", "تكون صخر", "انقسام الخلية"] },
  { prompt: "الجين هو...", answer: "جزء يؤثر في صفة", choices: ["جزء يؤثر في صفة", "مفتاح كهربائي", "سطح مائل"] },
  { prompt: "الرسوبية تتكون من...", answer: "تراكم الرسوبيات", choices: ["تراكم الرسوبيات", "انتقال الإلكترونات", "إغلاق الدائرة"] },
  { prompt: "البروتون يحدد...", answer: "العدد الذري", choices: ["العدد الذري", "التعرية", "المخدش"] },
];

const matchPairs = [
  { term: "النواة", definition: "مركز التحكم وفيها المادة الوراثية" },
  { term: "الموصل", definition: "مادة تسمح بمرور التيار" },
  { term: "التعرية", definition: "نقل الفتات الصخري" },
  { term: "التسارع", definition: "تغير السرعة مع الزمن" },
];

export default function GamesPage() {
  return (
    <main className="bg-mist py-10 dark:bg-[#0b1524]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/6">
          <p className="inline-flex items-center gap-2 text-sm font-bold text-violet">
            <Gamepad2 className="h-4 w-4" aria-hidden="true" />
            ألعاب تعليمية تفاعلية
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-ink dark:text-white">تعلمي بالمنافسة واللعب الهادف</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            ألعاب قصيرة تراجع المفاهيم بسرعة: سباق مفاهيم، مطابقة مصطلحات، وبناء ذرة مع تغذية راجعة فورية.
          </p>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <SpeedGame />
          <MatchGame />
          <AtomGame />
        </section>
      </div>
    </main>
  );
}

function SpeedGame() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("اختاري الإجابة الصحيحة للانتقال للسؤال التالي.");
  const question = speedQuestions[index];
  const complete = index >= speedQuestions.length;

  const choose = (choice: string) => {
    if (choice === question.answer) {
      setScore((value) => value + 1);
      setFeedback("إجابة صحيحة، انتقال للسؤال التالي.");
    } else {
      setFeedback(`ليست دقيقة. الإجابة الأنسب: ${question.answer}.`);
    }
    window.setTimeout(() => setIndex((value) => value + 1), 450);
  };

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/6">
      <Brain className="h-8 w-8 text-violet" aria-hidden="true" />
      <h2 className="mt-3 text-xl font-extrabold text-ink dark:text-white">سباق المفاهيم</h2>
      {complete ? (
        <Result score={score} total={speedQuestions.length} onReset={() => { setIndex(0); setScore(0); setFeedback("اختاري الإجابة الصحيحة للانتقال للسؤال التالي."); }} />
      ) : (
        <>
          <div className="mt-4 rounded-lg bg-violet/10 p-4">
            <p className="text-sm font-bold text-violet">السؤال {index + 1} من {speedQuestions.length}</p>
            <p className="mt-2 text-lg font-extrabold text-ink dark:text-white">{question.prompt}</p>
          </div>
          <div className="mt-4 grid gap-2">
            {question.choices.map((choice) => (
              <button
                key={choice}
                type="button"
                onClick={() => choose(choice)}
                className="rounded-lg border border-slate-200 px-4 py-3 text-start text-sm font-bold text-slate-700 transition hover:border-violet hover:bg-violet/10 dark:border-white/10 dark:text-slate-200"
              >
                {choice}
              </button>
            ))}
          </div>
          <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-sm font-bold text-slate-600 dark:bg-white/10 dark:text-slate-200">{feedback}</p>
        </>
      )}
    </article>
  );
}

function MatchGame() {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("اختاري مصطلحًا ثم التعريف المطابق له.");

  const chooseDefinition = (definition: string) => {
    const pair = matchPairs.find((item) => item.term === selectedTerm);
    if (!pair) {
      setFeedback("اختاري المصطلح أولًا.");
      return;
    }
    if (pair.definition === definition) {
      setMatched((current) => [...current, pair.term]);
      setFeedback(`صحيح: ${pair.term} طابق التعريف.`);
      setSelectedTerm(null);
    } else {
      setFeedback("حاولي مرة أخرى، قارني الكلمة المفتاحية في التعريف.");
    }
  };

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/6">
      <CheckCircle2 className="h-8 w-8 text-emerald-600" aria-hidden="true" />
      <h2 className="mt-3 text-xl font-extrabold text-ink dark:text-white">مطابقة المصطلحات</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-1">
        <div className="grid gap-2">
          {matchPairs.map((pair) => (
            <button
              key={pair.term}
              type="button"
              disabled={matched.includes(pair.term)}
              onClick={() => setSelectedTerm(pair.term)}
              className={`rounded-lg px-4 py-3 text-sm font-bold transition ${
                matched.includes(pair.term)
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200"
                  : selectedTerm === pair.term
                    ? "bg-ocean text-white"
                    : "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200"
              }`}
            >
              {pair.term}
            </button>
          ))}
        </div>
        <div className="grid gap-2">
          {matchPairs.map((pair) => (
            <button
              key={pair.definition}
              type="button"
              onClick={() => chooseDefinition(pair.definition)}
              className="rounded-lg border border-slate-200 px-4 py-3 text-start text-sm font-bold text-slate-700 hover:border-aqua dark:border-white/10 dark:text-slate-200"
            >
              {pair.definition}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-sm font-bold text-slate-600 dark:bg-white/10 dark:text-slate-200">{feedback}</p>
    </article>
  );
}

function AtomGame() {
  const [protons, setProtons] = useState(3);
  const [electrons, setElectrons] = useState(3);
  const [neutrons, setNeutrons] = useState(4);
  const charge = protons - electrons;
  const element = useMemo(() => {
    const names: Record<number, string> = { 1: "هيدروجين", 2: "هيليوم", 3: "ليثيوم", 4: "بيريليوم", 5: "بورون", 6: "كربون", 7: "نيتروجين", 8: "أكسجين" };
    return names[protons] ?? "عنصر افتراضي";
  }, [protons]);

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/6">
      <Atom className="h-8 w-8 text-ocean dark:text-aqua" aria-hidden="true" />
      <h2 className="mt-3 text-xl font-extrabold text-ink dark:text-white">لعبة بناء الذرة</h2>
      <div className="mt-4 grid gap-3">
        <GameSlider label="بروتونات" value={protons} setValue={setProtons} />
        <GameSlider label="إلكترونات" value={electrons} setValue={setElectrons} />
        <GameSlider label="نيوترونات" value={neutrons} setValue={setNeutrons} min={0} />
      </div>
      <div className="mt-5 rounded-lg bg-slate-50 p-4 dark:bg-white/10">
        <div className="flex items-center gap-3">
          <Zap className="h-5 w-5 text-amber-600" aria-hidden="true" />
          <p className="font-extrabold text-ink dark:text-white">{element}</p>
        </div>
        <p className="mt-2 text-sm font-bold text-slate-600 dark:text-slate-200">
          الكتلة التقريبية: {protons + neutrons}، الشحنة: {charge === 0 ? "متعادل" : charge > 0 ? `موجبة +${charge}` : `سالبة ${charge}`}.
        </p>
      </div>
    </article>
  );
}

function GameSlider({ label, value, setValue, min = 1 }: { label: string; value: number; setValue: (value: number) => void; min?: number }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
      {label}: {value}
      <input type="range" min={min} max="8" value={value} onChange={(event) => setValue(Number(event.target.value))} className="accent-violet" />
    </label>
  );
}

function Result({ score, total, onReset }: { score: number; total: number; onReset: () => void }) {
  return (
    <div className="mt-5 rounded-lg bg-emerald-50 p-4 text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-100">
      <Trophy className="h-8 w-8" aria-hidden="true" />
      <p className="mt-2 text-lg font-extrabold">نتيجتك: {score} من {total}</p>
      <p className="mt-1 text-sm font-bold">{score >= total - 1 ? "ممتاز، سرعة وفهم واضح." : "راجعي المفاهيم ثم أعيدي السباق."}</p>
      <button type="button" onClick={onReset} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-extrabold text-emerald-800 dark:bg-ink dark:text-emerald-100">
        <RefreshCw className="h-4 w-4" aria-hidden="true" />
        إعادة اللعب
      </button>
    </div>
  );
}
