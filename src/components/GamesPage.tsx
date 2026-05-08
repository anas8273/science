import { Atom, Brain, CheckCircle2, Clock, Flame, Gamepad2, Lightbulb, RefreshCw, Star, Target, Trophy, Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const speedQuestions = [
  { prompt: "القوة هي...", answer: "دفع أو سحب", choices: ["دفع أو سحب", "لون المعدن", "جزء من DNA"] },
  { prompt: "الدائرة المغلقة تسمح بـ...", answer: "مرور التيار", choices: ["مرور التيار", "تكون صخر", "انقسام الخلية"] },
  { prompt: "الجين هو...", answer: "جزء يؤثر في صفة", choices: ["جزء يؤثر في صفة", "مفتاح كهربائي", "سطح مائل"] },
  { prompt: "الرسوبية تتكون من...", answer: "تراكم الرسوبيات", choices: ["تراكم الرسوبيات", "انتقال الإلكترونات", "إغلاق الدائرة"] },
  { prompt: "البروتون يحدد...", answer: "العدد الذري", choices: ["العدد الذري", "التعرية", "المخدش"] },
  { prompt: "التجوية تعني...", answer: "تفتيت الصخور في مكانها", choices: ["تفتيت الصخور في مكانها", "نقل الفتات", "تكون المركبات"] },
  { prompt: "الصهارة تخرج من...", answer: "فوهة البركان", choices: ["فوهة البركان", "المصباح", "الخلية"] },
  { prompt: "المخلوط يمكن فصله بـ...", answer: "طرق فيزيائية", choices: ["طرق فيزيائية", "الزلازل", "الجينات"] },
  { prompt: "الكروموسومات توجد في...", answer: "النواة", choices: ["النواة", "السلك", "الصخر"] },
  { prompt: "السطح المائل يقلل...", answer: "القوة المطلوبة", choices: ["القوة المطلوبة", "الكتلة", "عدد الذرات"] },
];

const matchPairs = [
  { term: "النواة", definition: "مركز التحكم وفيها المادة الوراثية" },
  { term: "الموصل", definition: "مادة تسمح بمرور التيار" },
  { term: "التعرية", definition: "نقل الفتات الصخري" },
  { term: "التسارع", definition: "تغير السرعة مع الزمن" },
  { term: "الرافعة", definition: "قضيب يدور حول نقطة ارتكاز" },
  { term: "المركب", definition: "مادة من عنصرين أو أكثر مرتبطين كيميائيًا" },
];

const trueFalseQuestions = [
  { statement: "الذرة هي أصغر وحدة بناء في المادة", answer: true, explanation: "صحيح، الذرة هي لبنة بناء المادة الأساسية." },
  { statement: "التغير الكيميائي لا ينتج مواد جديدة", answer: false, explanation: "خطأ، التغير الكيميائي ينتج مواد جديدة مختلفة عن المواد الأصلية." },
  { statement: "الزلازل تحدث غالبًا عند حدود الصفائح", answer: true, explanation: "صحيح، معظم الزلازل تتركز عند حدود الصفائح الأرضية." },
  { statement: "البكرة تزيد من القوة المطلوبة", answer: false, explanation: "خطأ، البكرة تساعد على تغيير اتجاه القوة وقد تقلل من مقدارها." },
  { statement: "DNA يحمل المعلومات الوراثية", answer: true, explanation: "صحيح، DNA هو الجزيء الذي يحمل التعليمات الوراثية في الكائنات الحية." },
  { statement: "الصخور النارية تتكون من تراكم الرسوبيات", answer: false, explanation: "خطأ، الصخور النارية تتكون من تبريد الصهارة أو اللابة." },
  { statement: "المغناطيس الكهربائي يعمل بالتيار", answer: true, explanation: "صحيح، المغناطيس الكهربائي يولد مجالًا مغناطيسيًا عند مرور التيار." },
  { statement: "انصهار الجليد تغير كيميائي", answer: false, explanation: "خطأ، انصهار الجليد تغير فيزيائي لأنه تغير في الحالة فقط." },
];

const sortingItems = [
  { item: "صدأ الحديد", category: "كيميائي" },
  { item: "تقطيع الورق", category: "فيزيائي" },
  { item: "احتراق الخشب", category: "كيميائي" },
  { item: "ذوبان السكر", category: "فيزيائي" },
  { item: "طهي البيض", category: "كيميائي" },
  { item: "كسر الزجاج", category: "فيزيائي" },
  { item: "تعفن الفاكهة", category: "كيميائي" },
  { item: "تبخر الماء", category: "فيزيائي" },
];

export default function GamesPage() {
  return (
    <main className="bg-mist py-8 dark:bg-[#0b1524]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="card-premium rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-white/10 dark:bg-white/[0.04]">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-sm">
              <Gamepad2 className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-ink dark:text-white">الألعاب التعليمية</h1>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">تعلمي بالمنافسة والتحدي</p>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            مجموعة ألعاب تعليمية متنوعة تراجع المفاهيم العلمية بطريقة ممتعة ومحفزة. تحدّي نفسك في سباق المفاهيم، مطابقة المصطلحات، صح أو خطأ، تصنيف المواد، وبناء الذرة!
          </p>
        </section>

        {/* Games Grid */}
        <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <SpeedGame />
          <MatchGame />
          <TrueFalseGame />
          <SortingGame />
          <AtomGame />
          <ChallengeGame />
        </section>
      </div>
    </main>
  );
}

/* ===== Speed Game ===== */
function SpeedGame() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [feedback, setFeedback] = useState("اختاري الإجابة الصحيحة بأسرع وقت!");
  const [timeLeft, setTimeLeft] = useState(15);
  const question = speedQuestions[index];
  const complete = index >= speedQuestions.length;

  useEffect(() => {
    if (complete || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [complete, timeLeft, index]);

  useEffect(() => {
    if (timeLeft === 0 && !complete) {
      setFeedback(`انتهى الوقت! الإجابة: ${question?.answer}`);
      setTimeout(() => { setIndex((v) => v + 1); setTimeLeft(15); setStreak(0); }, 1200);
    }
  }, [timeLeft, complete, question]);

  const choose = (choice: string) => {
    if (choice === question.answer) {
      const newStreak = streak + 1;
      setScore((v) => v + 1 + (newStreak >= 3 ? 1 : 0));
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
      setFeedback(newStreak >= 3 ? `سلسلة ${newStreak} إجابات صحيحة! +2 نقاط` : "إجابة صحيحة!");
    } else {
      setFeedback(`ليست دقيقة. الإجابة: ${question.answer}`);
      setStreak(0);
    }
    setTimeout(() => { setIndex((v) => v + 1); setTimeLeft(15); }, 600);
  };

  return (
    <article className="card-premium rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white">
            <Brain className="h-5 w-5" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-extrabold text-ink dark:text-white">سباق المفاهيم</h2>
        </div>
        {!complete && (
          <div className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold ${timeLeft <= 5 ? "bg-rose-100 text-rose-700 animate-pulse" : "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300"}`}>
            <Clock className="h-3.5 w-3.5" />
            {timeLeft}ث
          </div>
        )}
      </div>

      {complete ? (
        <GameResult
          score={score}
          total={speedQuestions.length}
          extra={`أفضل سلسلة: ${bestStreak}`}
          onReset={() => { setIndex(0); setScore(0); setStreak(0); setBestStreak(0); setTimeLeft(15); setFeedback("اختاري الإجابة الصحيحة بأسرع وقت!"); }}
        />
      ) : (
        <>
          {streak >= 3 && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
              <Flame className="h-3.5 w-3.5" /> سلسلة {streak} إجابات!
            </div>
          )}
          <div className="mt-4 rounded-xl bg-gradient-to-br from-violet/5 to-purple-500/5 p-4 border border-violet/10">
            <p className="text-xs font-bold text-violet">السؤال {index + 1} من {speedQuestions.length}</p>
            <p className="mt-2 text-base font-extrabold text-ink dark:text-white">{question.prompt}</p>
          </div>
          <div className="mt-3 grid gap-2">
            {question.choices.map((choice) => (
              <button
                key={choice}
                type="button"
                onClick={() => choose(choice)}
                className="rounded-xl border border-slate-200/80 px-4 py-3 text-start text-sm font-bold text-slate-700 transition-all hover:border-violet/40 hover:bg-violet/5 hover:scale-[1.01] dark:border-white/10 dark:text-slate-200"
              >
                {choice}
              </button>
            ))}
          </div>
          <p className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500 dark:bg-white/5 dark:text-slate-400">{feedback}</p>
        </>
      )}
    </article>
  );
}

/* ===== Match Game ===== */
function MatchGame() {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("اختاري مصطلحًا ثم التعريف المطابق.");
  const [attempts, setAttempts] = useState(0);

  const chooseDefinition = (definition: string) => {
    const pair = matchPairs.find((item) => item.term === selectedTerm);
    if (!pair) { setFeedback("اختاري المصطلح أولًا."); return; }
    setAttempts((v) => v + 1);
    if (pair.definition === definition) {
      setMatched((current) => [...current, pair.term]);
      setFeedback(`صحيح! ${pair.term} = ${pair.definition}`);
      setSelectedTerm(null);
    } else {
      setFeedback("حاولي مرة أخرى، ركزي على الكلمة المفتاحية.");
    }
  };

  const allMatched = matched.length === matchPairs.length;

  return (
    <article className="card-premium rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-center gap-2">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
        </div>
        <h2 className="text-lg font-extrabold text-ink dark:text-white">مطابقة المصطلحات</h2>
      </div>

      {allMatched ? (
        <GameResult
          score={matchPairs.length}
          total={matchPairs.length}
          extra={`عدد المحاولات: ${attempts}`}
          onReset={() => { setMatched([]); setAttempts(0); setSelectedTerm(null); setFeedback("اختاري مصطلحًا ثم التعريف المطابق."); }}
        />
      ) : (
        <>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="grid gap-2">
              <p className="text-xs font-bold text-slate-400 mb-1">المصطلحات</p>
              {matchPairs.map((pair) => (
                <button
                  key={pair.term}
                  type="button"
                  disabled={matched.includes(pair.term)}
                  onClick={() => setSelectedTerm(pair.term)}
                  className={`rounded-xl px-3 py-2.5 text-sm font-bold transition-all ${
                    matched.includes(pair.term)
                      ? "bg-emerald-100 text-emerald-700 line-through opacity-60 dark:bg-emerald-500/15 dark:text-emerald-300"
                      : selectedTerm === pair.term
                        ? "bg-gradient-to-r from-ocean to-aqua text-white shadow-sm scale-[1.02]"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-200"
                  }`}
                >
                  {pair.term}
                </button>
              ))}
            </div>
            <div className="grid gap-2">
              <p className="text-xs font-bold text-slate-400 mb-1">التعريفات</p>
              {matchPairs.map((pair) => (
                <button
                  key={pair.definition}
                  type="button"
                  disabled={matched.includes(pair.term)}
                  onClick={() => chooseDefinition(pair.definition)}
                  className="rounded-xl border border-slate-200/80 px-3 py-2.5 text-start text-xs font-bold text-slate-600 transition-all hover:border-aqua/40 hover:bg-aqua/5 dark:border-white/10 dark:text-slate-300"
                >
                  {pair.definition}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500 dark:bg-white/5 dark:text-slate-400">{feedback}</p>
        </>
      )}
    </article>
  );
}

/* ===== True/False Game ===== */
function TrueFalseGame() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [answered, setAnswered] = useState(false);
  const question = trueFalseQuestions[index];
  const complete = index >= trueFalseQuestions.length;

  const choose = (answer: boolean) => {
    if (answered) return;
    setAnswered(true);
    if (answer === question.answer) {
      setScore((v) => v + 1);
      setFeedback(`صحيح! ${question.explanation}`);
    } else {
      setFeedback(`خطأ. ${question.explanation}`);
    }
    setTimeout(() => { setIndex((v) => v + 1); setAnswered(false); setFeedback(""); }, 2500);
  };

  return (
    <article className="card-premium rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-center gap-2">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white">
          <Lightbulb className="h-5 w-5" aria-hidden="true" />
        </div>
        <h2 className="text-lg font-extrabold text-ink dark:text-white">صح أو خطأ</h2>
      </div>

      {complete ? (
        <GameResult
          score={score}
          total={trueFalseQuestions.length}
          onReset={() => { setIndex(0); setScore(0); setFeedback(""); setAnswered(false); }}
        />
      ) : (
        <>
          <div className="mt-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 p-4 border border-amber-100 dark:from-amber-500/5 dark:to-orange-500/5 dark:border-amber-500/20">
            <p className="text-xs font-bold text-amber-600 dark:text-amber-400">العبارة {index + 1} من {trueFalseQuestions.length}</p>
            <p className="mt-2 text-base font-extrabold text-ink dark:text-white">{question.statement}</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => choose(true)}
              disabled={answered}
              className="rounded-xl border-2 border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-extrabold text-emerald-700 transition-all hover:bg-emerald-100 hover:scale-[1.02] disabled:opacity-60 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
            >
              <CheckCircle2 className="mx-auto mb-1 h-6 w-6" />
              صح
            </button>
            <button
              type="button"
              onClick={() => choose(false)}
              disabled={answered}
              className="rounded-xl border-2 border-rose-200 bg-rose-50 px-4 py-3 text-sm font-extrabold text-rose-700 transition-all hover:bg-rose-100 hover:scale-[1.02] disabled:opacity-60 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300"
            >
              <Target className="mx-auto mb-1 h-6 w-6" />
              خطأ
            </button>
          </div>
          {feedback && (
            <p className="mt-3 rounded-xl bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-600 animate-fade-in dark:bg-white/5 dark:text-slate-300">{feedback}</p>
          )}
        </>
      )}
    </article>
  );
}

/* ===== Sorting Game ===== */
function SortingGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("صنّفي كل تغير: فيزيائي أم كيميائي؟");
  const item = sortingItems[currentIndex];
  const complete = currentIndex >= sortingItems.length;

  const classify = (category: string) => {
    if (category === item.category) {
      setScore((v) => v + 1);
      setFeedback(`صحيح! ${item.item} تغير ${item.category}.`);
    } else {
      setFeedback(`خطأ. ${item.item} تغير ${item.category}.`);
    }
    setTimeout(() => setCurrentIndex((v) => v + 1), 1000);
  };

  return (
    <article className="card-premium rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-center gap-2">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
          <Target className="h-5 w-5" aria-hidden="true" />
        </div>
        <h2 className="text-lg font-extrabold text-ink dark:text-white">تصنيف التغيرات</h2>
      </div>

      {complete ? (
        <GameResult
          score={score}
          total={sortingItems.length}
          onReset={() => { setCurrentIndex(0); setScore(0); setFeedback("صنّفي كل تغير: فيزيائي أم كيميائي؟"); }}
        />
      ) : (
        <>
          <div className="mt-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4 border border-blue-100 dark:from-blue-500/5 dark:to-indigo-500/5 dark:border-blue-500/20">
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400">المثال {currentIndex + 1} من {sortingItems.length}</p>
            <p className="mt-2 text-lg font-extrabold text-ink dark:text-white">{item.item}</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button type="button" onClick={() => classify("فيزيائي")} className="rounded-xl border-2 border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-extrabold text-cyan-700 transition-all hover:bg-cyan-100 hover:scale-[1.02] dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-300">
              فيزيائي
            </button>
            <button type="button" onClick={() => classify("كيميائي")} className="rounded-xl border-2 border-purple-200 bg-purple-50 px-4 py-3 text-sm font-extrabold text-purple-700 transition-all hover:bg-purple-100 hover:scale-[1.02] dark:border-purple-500/30 dark:bg-purple-500/10 dark:text-purple-300">
              كيميائي
            </button>
          </div>
          <p className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500 dark:bg-white/5 dark:text-slate-400">{feedback}</p>
        </>
      )}
    </article>
  );
}

/* ===== Atom Game ===== */
function AtomGame() {
  const [protons, setProtons] = useState(6);
  const [electrons, setElectrons] = useState(6);
  const [neutrons, setNeutrons] = useState(6);
  const charge = protons - electrons;
  const element = useMemo(() => {
    const names: Record<number, string> = { 1: "هيدروجين (H)", 2: "هيليوم (He)", 3: "ليثيوم (Li)", 4: "بيريليوم (Be)", 5: "بورون (B)", 6: "كربون (C)", 7: "نيتروجين (N)", 8: "أكسجين (O)", 9: "فلور (F)", 10: "نيون (Ne)" };
    return names[protons] ?? "عنصر غير معروف";
  }, [protons]);

  const isStable = charge === 0;

  return (
    <article className="card-premium rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-center gap-2">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
          <Atom className="h-5 w-5" aria-hidden="true" />
        </div>
        <h2 className="text-lg font-extrabold text-ink dark:text-white">بناء الذرة</h2>
      </div>
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">غيّري عدد الجسيمات لبناء ذرة متعادلة</p>
      <div className="mt-4 grid gap-3">
        <GameSlider label="بروتونات (+)" value={protons} setValue={setProtons} color="text-rose-600" max={10} />
        <GameSlider label="إلكترونات (-)" value={electrons} setValue={setElectrons} color="text-blue-600" max={10} />
        <GameSlider label="نيوترونات" value={neutrons} setValue={setNeutrons} color="text-slate-600" min={0} max={12} />
      </div>
      <div className={`mt-4 rounded-xl p-4 border ${isStable ? "border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/5" : "border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/5"}`}>
        <div className="flex items-center gap-3">
          <Zap className={`h-5 w-5 ${isStable ? "text-emerald-600" : "text-amber-600"}`} aria-hidden="true" />
          <div>
            <p className="font-extrabold text-ink dark:text-white">{element}</p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              الكتلة: {protons + neutrons} | الشحنة: {charge === 0 ? "متعادل" : charge > 0 ? `+${charge}` : charge}
            </p>
          </div>
        </div>
        <p className={`mt-2 text-xs font-bold ${isStable ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}`}>
          {isStable ? "ذرة متعادلة ومستقرة!" : "الذرة غير متعادلة، عدّلي الإلكترونات لتساوي البروتونات."}
        </p>
      </div>
    </article>
  );
}

/* ===== Challenge Game ===== */
function ChallengeGame() {
  const allQuestions = useMemo(() => [...speedQuestions].sort(() => Math.random() - 0.5).slice(0, 5), []);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver || timeLeft <= 0) { setGameOver(true); return; }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [gameOver, timeLeft]);

  const choose = (choice: string) => {
    if (gameOver) return;
    if (choice === allQuestions[index]?.answer) setScore((v) => v + 1);
    if (index + 1 >= allQuestions.length) setGameOver(true);
    else setIndex((v) => v + 1);
  };

  return (
    <article className="card-premium rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-white">
            <Flame className="h-5 w-5" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-extrabold text-ink dark:text-white">التحدي السريع</h2>
        </div>
        {!gameOver && (
          <div className={`rounded-lg px-2.5 py-1 text-xs font-bold ${timeLeft <= 10 ? "bg-rose-100 text-rose-700 animate-pulse" : "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300"}`}>
            <Clock className="inline h-3.5 w-3.5 ml-1" />{timeLeft}ث
          </div>
        )}
      </div>

      {gameOver ? (
        <GameResult
          score={score}
          total={allQuestions.length}
          extra={`الوقت المتبقي: ${timeLeft}ث`}
          onReset={() => { setIndex(0); setScore(0); setTimeLeft(60); setGameOver(false); }}
        />
      ) : (
        <>
          <div className="mt-4 rounded-xl bg-gradient-to-br from-rose-50 to-pink-50 p-4 border border-rose-100 dark:from-rose-500/5 dark:to-pink-500/5 dark:border-rose-500/20">
            <p className="text-base font-extrabold text-ink dark:text-white">{allQuestions[index]?.prompt}</p>
          </div>
          <div className="mt-3 grid gap-2">
            {allQuestions[index]?.choices.map((choice) => (
              <button key={choice} type="button" onClick={() => choose(choice)} className="rounded-xl border border-slate-200/80 px-4 py-2.5 text-start text-sm font-bold text-slate-700 transition-all hover:border-rose-300 hover:bg-rose-50 dark:border-white/10 dark:text-slate-200">
                {choice}
              </button>
            ))}
          </div>
        </>
      )}
    </article>
  );
}

/* ===== Shared Components ===== */
function GameSlider({ label, value, setValue, min = 1, max = 8, color = "text-slate-700" }: { label: string; value: number; setValue: (v: number) => void; min?: number; max?: number; color?: string }) {
  return (
    <label className={`grid gap-1.5 text-sm font-bold ${color} dark:text-slate-200`}>
      <span className="flex justify-between">
        <span>{label}</span>
        <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-xs dark:bg-white/10">{value}</span>
      </span>
      <input type="range" min={min} max={max} value={value} onChange={(e) => setValue(Number(e.target.value))} className="accent-aqua" />
    </label>
  );
}

function GameResult({ score, total, extra, onReset }: { score: number; total: number; extra?: string; onReset: () => void }) {
  const percentage = Math.round((score / total) * 100);
  return (
    <div className={`mt-4 rounded-xl p-5 ${percentage >= 70 ? "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/5" : "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/5"}`}>
      <div className="flex items-center gap-3">
        <div className={`grid h-14 w-14 place-items-center rounded-xl ${percentage >= 70 ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300" : "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300"}`}>
          {percentage >= 70 ? <Trophy className="h-7 w-7" /> : <Star className="h-7 w-7" />}
        </div>
        <div>
          <p className="text-2xl font-extrabold text-ink dark:text-white">{score}/{total}</p>
          <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
            {percentage >= 90 ? "أداء ممتاز!" : percentage >= 70 ? "عمل رائع!" : "حاولي مرة أخرى!"}
          </p>
          {extra && <p className="text-xs text-slate-400 mt-0.5">{extra}</p>}
        </div>
      </div>
      <button type="button" onClick={onReset} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:shadow-medium dark:bg-ink dark:text-slate-200">
        <RefreshCw className="h-4 w-4" />
        إعادة اللعب
      </button>
    </div>
  );
}
