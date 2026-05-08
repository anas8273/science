import {
  ArrowLeft,
  Atom,
  CheckCircle2,
  CircleDot,
  Dna,
  FlaskConical,
  Lightbulb,
  Microscope,
  Mountain,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { experiments } from "../data/platformData";
import type { Lesson } from "../types";
import InteractiveExperiment, { ConductivityActivity } from "./InteractiveExperiment";
import QuizCard from "./QuizCard";

interface LessonViewProps {
  lesson: Lesson;
  nextLesson?: Lesson;
  onBack: () => void;
  onComplete: (lessonId: string) => void;
  onExperimentComplete: (experimentId: string) => void;
  onQuizComplete: (quizId: string, score: number) => void;
  onNext: (lesson: Lesson) => void;
}

export default function LessonView({
  lesson,
  nextLesson,
  onBack,
  onComplete,
  onExperimentComplete,
  onQuizComplete,
  onNext,
}: LessonViewProps) {
  const linkedExperiment = useMemo(() => {
    if (lesson.kind === "force-motion") return experiments.find((experiment) => experiment.kind === "force");
    if (lesson.kind === "matter") return experiments.find((experiment) => experiment.kind === "classification");
    if (lesson.kind === "electricity") return experiments.find((experiment) => experiment.kind === "circuit");
    if (lesson.kind === "earthquakes") return experiments.find((experiment) => experiment.kind === "volcano");
    return undefined;
  }, [lesson.kind]);

  return (
    <main className="bg-mist py-8 dark:bg-[#0b1524]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-white/10 dark:bg-white/6 dark:text-slate-200"
        >
          الرجوع إلى الوحدات
        </button>

        <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/6">
            <p className="inline-flex items-center gap-2 text-sm font-bold text-ocean dark:text-aqua">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              درس تفاعلي
            </p>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight text-ink dark:text-white">{lesson.title}</h1>
            <div className="mt-5 rounded-lg bg-ocean/10 p-4 dark:bg-aqua/10">
              <h2 className="font-extrabold text-ocean dark:text-aqua">هدف الدرس</h2>
              <p className="mt-2 leading-7 text-slate-700 dark:text-slate-200">{lesson.objective}</p>
            </div>
            <div className="mt-5 grid gap-3 text-base leading-8 text-slate-700 dark:text-slate-200">
              {lesson.summary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>

          <LessonIllustration kind={lesson.kind} title={lesson.title} />
        </section>

        <section className="grid gap-4 md:grid-cols-3" aria-label="مفاهيم أساسية">
          {lesson.concepts.map((concept) => (
            <article key={concept.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/6">
              <h3 className="text-lg font-extrabold text-ink dark:text-white">{concept.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{concept.description}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/6">
            <p className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-300">
              <Lightbulb className="h-4 w-4" aria-hidden="true" />
              مثال من الحياة اليومية
            </p>
            <p className="mt-3 leading-7 text-slate-700 dark:text-slate-200">{lesson.dailyExample}</p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 shadow-sm dark:border-amber-300/20 dark:bg-amber-500/10">
            <p className="inline-flex items-center gap-2 text-sm font-bold text-amber-800 dark:text-amber-200">
              <CircleDot className="h-4 w-4" aria-hidden="true" />
              سؤال تفكير
            </p>
            <p className="mt-3 leading-7 text-amber-950 dark:text-amber-100">{lesson.thinkingQuestion}</p>
          </div>
        </section>

        <ActivityBlock lesson={lesson} />

        {linkedExperiment && <InteractiveExperiment experiment={linkedExperiment} onComplete={onExperimentComplete} />}

        <QuizCard
          quizId={`lesson-${lesson.id}`}
          title={`اختبار ${lesson.title}`}
          questions={lesson.quiz}
          onComplete={(score) => onQuizComplete(`lesson-${lesson.id}`, score)}
        />

        <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/6 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => onComplete(lesson.id)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-700"
          >
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            إنهاء الدرس
          </button>
          {nextLesson ? (
            <button
              type="button"
              onClick={() => onNext(nextLesson)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-ocean px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#0d536b]"
            >
              الدرس التالي: {nextLesson.title}
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <span className="rounded-lg bg-slate-100 px-4 py-3 text-sm font-bold text-slate-600 dark:bg-white/10 dark:text-slate-200">
              وصلتِ إلى نهاية هذه الوحدة
            </span>
          )}
        </div>
      </div>
    </main>
  );
}

function LessonIllustration({ kind, title }: { kind: Lesson["kind"]; title: string }) {
  const iconMap = {
    inquiry: Microscope,
    "force-motion": Sparkles,
    "simple-machines": CircleDot,
    matter: FlaskConical,
    atoms: Atom,
    rocks: Mountain,
    earthquakes: Mountain,
    cells: Dna,
    electricity: Zap,
    generic: Lightbulb,
  };
  const Icon = iconMap[kind];

  return (
    <aside className="relative overflow-hidden rounded-lg border border-slate-200 bg-ink p-6 text-white shadow-soft dark:border-white/10" aria-label={`رسم توضيحي لدرس ${title}`}>
      <div className="absolute inset-0 opacity-40 science-grid" />
      <div className="relative">
        <p className="text-sm font-bold text-aqua">رسم علمي تفاعلي</p>
        <h2 className="mt-2 text-xl font-extrabold">{title}</h2>
        <div className="mt-8 grid h-64 place-items-center rounded-lg border border-white/10 bg-white/10">
          <motion.div
            animate={{ rotate: kind === "atoms" ? 360 : 0, y: kind === "force-motion" ? [0, -12, 0] : 0 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="grid h-32 w-32 place-items-center rounded-full border border-aqua/50 bg-aqua/15"
          >
            <Icon className="h-16 w-16 text-aqua" aria-hidden="true" />
          </motion.div>
        </div>
      </div>
    </aside>
  );
}

function ActivityBlock({ lesson }: { lesson: Lesson }) {
  if (lesson.kind === "force-motion") return <ForceActivity />;
  if (lesson.kind === "matter") return <MatterActivity />;
  if (lesson.kind === "rocks") return <RockActivity />;
  if (lesson.kind === "earthquakes") return <EarthquakeActivity />;
  if (lesson.kind === "cells") return <CellActivity />;
  if (lesson.kind === "electricity") return <ConductivityActivity />;
  if (lesson.kind === "simple-machines") return <SimpleMachineActivity />;
  if (lesson.kind === "atoms") return <AtomActivity />;
  return <InquiryActivity />;
}

function ForceActivity() {
  const [feedback, setFeedback] = useState("صنفي المثال إلى تغير في السرعة أو تغير في الاتجاه.");
  const items = [
    { text: "زيادة دفع العربة", answer: "تغير في السرعة" },
    { text: "ركل الكرة من الجانب", answer: "تغير في الاتجاه" },
    { text: "الضغط على فرامل الدراجة", answer: "تغير في السرعة" },
  ];

  return (
    <section className="rounded-lg border border-violet/20 bg-violet/10 p-5 dark:bg-violet/10">
      <h2 className="text-xl font-extrabold text-ink dark:text-white">نشاط تفاعلي: أثر القوة</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.text} className="rounded-lg bg-white p-4 dark:bg-ink/40">
            <p className="font-bold text-slate-800 dark:text-slate-100">{item.text}</p>
            <div className="mt-3 grid gap-2">
              {["تغير في السرعة", "تغير في الاتجاه"].map((choice) => (
                <button
                  key={choice}
                  type="button"
                  onClick={() => setFeedback(choice === item.answer ? `صحيح: ${item.text} يؤدي إلى ${item.answer}.` : "حاولي مرة أخرى، راقبي هل تغير المقدار أم المسار.")}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 dark:border-white/10 dark:text-slate-200"
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 rounded-lg bg-white px-4 py-3 text-sm font-bold text-violet dark:bg-ink/50 dark:text-violet-200">{feedback}</p>
    </section>
  );
}

function MatterActivity() {
  const [feedback, setFeedback] = useState("اختاري نوع التغير لكل مثال.");
  const items = [
    { text: "انصهار الجليد", answer: "فيزيائي", reason: "تغيرت الحالة فقط." },
    { text: "احتراق الورق", answer: "كيميائي", reason: "تكونت مواد جديدة." },
    { text: "صدأ الحديد", answer: "كيميائي", reason: "تكونت مادة الصدأ." },
    { text: "ذوبان السكر", answer: "فيزيائي", reason: "لم تتكون مادة جديدة غالبًا." },
  ];

  return (
    <section className="rounded-lg border border-violet/20 bg-violet/10 p-5 dark:bg-violet/10">
      <h2 className="text-xl font-extrabold text-ink dark:text-white">نشاط تصنيف: فيزيائي أم كيميائي؟</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.text} className="rounded-lg bg-white p-4 dark:bg-ink/40">
            <p className="font-bold text-slate-800 dark:text-slate-100">{item.text}</p>
            <div className="mt-3 flex gap-2">
              {["فيزيائي", "كيميائي"].map((choice) => (
                <button
                  key={choice}
                  type="button"
                  onClick={() => setFeedback(choice === item.answer ? `صحيح: ${item.reason}` : `حاولي مرة أخرى: ${item.reason}`)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 dark:border-white/10 dark:text-slate-200"
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 rounded-lg bg-white px-4 py-3 text-sm font-bold text-violet dark:bg-ink/50 dark:text-violet-200">{feedback}</p>
    </section>
  );
}

function RockActivity() {
  const [selected, setSelected] = useState("اختاري خاصية معدنية أو نوع صخر لعرض المعلومة.");
  const rocks = [
    ["نارية", "تتكون من تبريد الصهارة أو اللابة."],
    ["رسوبية", "تتكون من تراكم الرسوبيات وضغطها."],
    ["متحولة", "تتغير بفعل الحرارة والضغط."],
    ["القساوة", "تقيس مقاومة المعدن للخدش."],
    ["البريق", "يصف طريقة انعكاس الضوء عن سطح المعدن."],
    ["المخدش", "لون مسحوق المعدن عند حكه بلوح خاص."],
  ];
  return (
    <section className="rounded-lg border border-violet/20 bg-violet/10 p-5 dark:bg-violet/10">
      <h2 className="text-xl font-extrabold text-ink dark:text-white">نشاط مقارنة الصخور والمعادن</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {rocks.map(([label, text]) => (
          <button
            key={label}
            type="button"
            onClick={() => setSelected(`${label}: ${text}`)}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 dark:border-white/10 dark:bg-ink/40 dark:text-slate-200"
          >
            {label}
          </button>
        ))}
      </div>
      <p className="mt-4 rounded-lg bg-white px-4 py-3 text-sm font-bold text-violet dark:bg-ink/50 dark:text-violet-200">{selected}</p>
    </section>
  );
}

function EarthquakeActivity() {
  const steps = ["تتحرك الصفائح", "تتراكم الطاقة في الصخور", "تنكسر الصخور فجأة", "تنتشر الموجات الزلزالية"];
  const [current, setCurrent] = useState(0);
  return (
    <section className="rounded-lg border border-violet/20 bg-violet/10 p-5 dark:bg-violet/10">
      <h2 className="text-xl font-extrabold text-ink dark:text-white">نشاط ترتيب حدوث الزلزال</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        {steps.map((step, index) => (
          <button
            key={step}
            type="button"
            onClick={() => setCurrent(index)}
            className={`rounded-lg border px-3 py-4 text-sm font-bold transition ${current === index ? "border-violet bg-violet text-white" : "border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-ink/40 dark:text-slate-200"}`}
          >
            {index + 1}. {step}
          </button>
        ))}
      </div>
      <div className="mt-5 rounded-lg bg-white p-4 dark:bg-ink/50">
        <div className="relative h-20 overflow-hidden rounded-lg bg-slate-100 dark:bg-white/10">
          <motion.div
            className="absolute bottom-0 right-0 h-12 w-1/2 bg-ocean"
            animate={{ x: current >= 2 ? -16 : 0 }}
            transition={{ type: "spring", stiffness: 120 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 h-12 w-1/2 bg-amberSoft"
            animate={{ x: current >= 2 ? 16 : 0 }}
            transition={{ type: "spring", stiffness: 120 }}
          />
        </div>
        <p className="mt-3 text-sm font-bold text-slate-700 dark:text-slate-200">الخطوة الحالية: {steps[current]}</p>
      </div>
    </section>
  );
}

function CellActivity() {
  const [feedback, setFeedback] = useState("طابقي المصطلح بالتعريف المناسب.");
  const pairs = [
    { term: "النواة", definition: "مركز التحكم وفيها DNA" },
    { term: "الجين", definition: "جزء يؤثر في صفة محددة" },
    { term: "الكروموسوم", definition: "تركيب يحمل جينات كثيرة" },
  ];

  return (
    <section className="rounded-lg border border-violet/20 bg-violet/10 p-5 dark:bg-violet/10">
      <h2 className="text-xl font-extrabold text-ink dark:text-white">رسم تفاعلي للخلية ومطابقة المفاهيم</h2>
      <div className="mt-4 grid gap-4 lg:grid-cols-[260px_1fr]">
        <div className="grid h-64 place-items-center rounded-lg bg-white dark:bg-ink/40">
          <div className="relative h-48 w-48 rounded-full border-4 border-emerald-500 bg-emerald-100 dark:bg-emerald-500/10">
            <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/40" />
            <div className="absolute right-8 top-8 h-8 w-12 rounded-full bg-aqua/70" />
            <div className="absolute bottom-8 left-8 h-8 w-10 rounded-full bg-amberSoft/100" />
          </div>
        </div>
        <div className="grid gap-3">
          {pairs.map((pair) => (
            <div key={pair.term} className="rounded-lg bg-white p-3 dark:bg-ink/40">
              <p className="font-extrabold text-ink dark:text-white">{pair.term}</p>
              <button
                type="button"
                onClick={() => setFeedback(`${pair.term}: ${pair.definition}.`)}
                className="mt-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 dark:border-white/10 dark:text-slate-200"
              >
                عرض التعريف
              </button>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 rounded-lg bg-white px-4 py-3 text-sm font-bold text-violet dark:bg-ink/50 dark:text-violet-200">{feedback}</p>
    </section>
  );
}

function SimpleMachineActivity() {
  const [load, setLoad] = useState(70);
  const effort = Math.round(load * 0.42);
  return (
    <section className="rounded-lg border border-violet/20 bg-violet/10 p-5 dark:bg-violet/10">
      <h2 className="text-xl font-extrabold text-ink dark:text-white">محاكاة سطح مائل</h2>
      <label className="mt-4 block text-sm font-bold text-slate-700 dark:text-slate-200" htmlFor="load-slider">
        وزن الجسم الافتراضي: {load} وحدة
      </label>
      <input id="load-slider" type="range" min="20" max="100" value={load} onChange={(event) => setLoad(Number(event.target.value))} className="mt-3 w-full accent-violet-500" />
      <div className="mt-4 rounded-lg bg-white p-4 text-sm font-bold text-violet dark:bg-ink/50 dark:text-violet-200">
        باستخدام سطح مائل طويل، تصبح القوة المطلوبة تقريبًا {effort} وحدة بدل رفع الجسم مباشرة.
      </div>
    </section>
  );
}

function AtomActivity() {
  const [active, setActive] = useState("العنصر");
  const details: Record<string, string> = {
    العنصر: "مادة نقية مكونة من نوع واحد من الذرات.",
    المركب: "مادة تنتج من اتحاد عنصرين أو أكثر كيميائيًا.",
    المخلوط: "مواد مجتمعة يمكن فصلها غالبًا بطرق فيزيائية.",
  };
  return (
    <section className="rounded-lg border border-violet/20 bg-violet/10 p-5 dark:bg-violet/10">
      <h2 className="text-xl font-extrabold text-ink dark:text-white">نشاط تمييز: عنصر، مركب، مخلوط</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {Object.keys(details).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setActive(key)}
            className={`rounded-lg px-4 py-2 text-sm font-bold ${active === key ? "bg-violet text-white" : "bg-white text-slate-700 dark:bg-ink/40 dark:text-slate-200"}`}
          >
            {key}
          </button>
        ))}
      </div>
      <p className="mt-4 rounded-lg bg-white px-4 py-3 text-sm font-bold text-violet dark:bg-ink/50 dark:text-violet-200">{details[active]}</p>
    </section>
  );
}

function InquiryActivity() {
  const [open, setOpen] = useState("الملاحظة");
  const items: Record<string, string> = {
    الملاحظة: "اكتبي ما ترينه أو تقيسينه دون تفسير متسرع.",
    الفرضية: "توقعي علاقة يمكن اختبارها مثل: إذا زاد الضوء زاد نمو النبات.",
    التجربة: "غيّري عاملًا واحدًا فقط، وثبتي بقية العوامل قدر الإمكان.",
  };
  return (
    <section className="rounded-lg border border-violet/20 bg-violet/10 p-5 dark:bg-violet/10">
      <h2 className="text-xl font-extrabold text-ink dark:text-white">Accordion: خطوات الاستقصاء</h2>
      <div className="mt-4 grid gap-2">
        {Object.entries(items).map(([title, text]) => (
          <button
            key={title}
            type="button"
            onClick={() => setOpen(title)}
            className="rounded-lg bg-white p-4 text-start dark:bg-ink/40"
            aria-expanded={open === title}
          >
            <span className="font-extrabold text-ink dark:text-white">{title}</span>
            {open === title && <span className="mt-2 block text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</span>}
          </button>
        ))}
      </div>
    </section>
  );
}
