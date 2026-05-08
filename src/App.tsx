import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Filter, FlaskConical, GraduationCap, LayoutGrid, Search, Sparkles } from "lucide-react";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import AICoachPanel from "./components/AICoachPanel";
import Footer from "./components/Footer";
import GradeSelector from "./components/GradeSelector";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Modal from "./components/Modal";
import ToastStack from "./components/ToastStack";
import UnitCard from "./components/UnitCard";
import { experiments, lessons, standaloneQuizzes, units } from "./data/platformData";
import type { AppView, GradeId, Lesson, ProgressState, ToastMessage, Unit } from "./types";

const EvidencePage = lazy(() => import("./components/EvidencePage"));
const GamesPage = lazy(() => import("./components/GamesPage"));
const InteractiveExperiment = lazy(() => import("./components/InteractiveExperiment"));
const LessonView = lazy(() => import("./components/LessonView"));
const ProgressDashboard = lazy(() => import("./components/ProgressDashboard"));
const QuizCard = lazy(() => import("./components/QuizCard"));
const ResourcesPage = lazy(() => import("./components/ResourcesPage"));
const SmartAssistant = lazy(() => import("./components/SmartAssistant"));

const initialProgress: ProgressState = {
  completedLessons: [],
  completedExperiments: [],
  quizScores: {},
};

const readProgress = (): ProgressState => {
  try {
    const stored = window.localStorage.getItem("smart-science-progress");
    return stored ? { ...initialProgress, ...JSON.parse(stored) } : initialProgress;
  } catch {
    return initialProgress;
  }
};

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>("home");
  const [selectedGrade, setSelectedGrade] = useState<GradeId>("first");
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [contentFilter, setContentFilter] = useState("الكل");
  const [isDark, setIsDark] = useState(false);
  const [progress, setProgress] = useState<ProgressState>(readProgress);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    window.localStorage.setItem("smart-science-progress", JSON.stringify(progress));
  }, [progress]);

  const addToast = (message: string, type: ToastMessage["type"] = "success") => {
    const id = Date.now();
    setToasts((current) => [...current, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3600);
  };

  const navigate = (view: AppView) => {
    setCurrentView(view);
    setSelectedLesson(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const completeLesson = (lessonId: string) => {
    setProgress((current) => ({
      ...current,
      completedLessons: current.completedLessons.includes(lessonId) ? current.completedLessons : [...current.completedLessons, lessonId],
    }));
    addToast("تم حفظ الدرس ضمن تقدمك. عمل مرتب!");
  };

  const completeExperiment = (experimentId: string) => {
    setProgress((current) => ({
      ...current,
      completedExperiments: current.completedExperiments.includes(experimentId)
        ? current.completedExperiments
        : [...current.completedExperiments, experimentId],
    }));
    addToast("تم تسجيل التجربة كمكتملة.");
  };

  const completeQuiz = (quizId: string, score: number, total = 100) => {
    const percentage = total === 100 ? score : Math.round((score / total) * 100);
    setProgress((current) => ({
      ...current,
      quizScores: { ...current.quizScores, [quizId]: percentage },
    }));
    addToast(`تم حفظ نتيجة الاختبار: ${percentage}%.`, percentage >= 70 ? "success" : "info");
  };

  const currentUnits = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return units.filter((unit) => {
      const byGrade = unit.gradeId === selectedGrade;
      const text = `${unit.title} ${unit.subtitle} ${unit.lessons.map((lesson) => lesson.title).join(" ")}`.toLowerCase();
      const bySearch = !query || text.includes(query);
      return byGrade && bySearch;
    });
  }, [searchQuery, selectedGrade]);

  const gradeUnits = useMemo(() => units.filter((unit) => unit.gradeId === selectedGrade), [selectedGrade]);

  const nextLesson = selectedLesson ? lessons.find((lesson, index, all) => all[index - 1]?.id === selectedLesson.id && lesson.gradeId === selectedLesson.gradeId) : undefined;

  if (selectedLesson) {
    return (
      <>
        <Header
          currentView={currentView}
          isDark={isDark}
          searchQuery={searchQuery}
          onNavigate={navigate}
          onSearch={setSearchQuery}
          onToggleTheme={() => setIsDark((value) => !value)}
        />
        <Suspense fallback={<PageLoader />}>
          <LessonView
            lesson={selectedLesson}
            nextLesson={nextLesson}
            onBack={() => {
              setSelectedLesson(null);
              setCurrentView("learn");
            }}
            onComplete={completeLesson}
            onExperimentComplete={completeExperiment}
            onQuizComplete={(quizId, score) => completeQuiz(quizId, score, selectedLesson.quiz.length)}
            onNext={setSelectedLesson}
          />
        </Suspense>
        <Footer />
        <AICoachPanel currentView={currentView} selectedGrade={selectedGrade} progress={progress} onNavigate={navigate} />
        <ToastStack messages={toasts} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-mist text-ink dark:bg-[#0b1524] dark:text-white">
      <Header
        currentView={currentView}
        isDark={isDark}
        searchQuery={searchQuery}
        onNavigate={navigate}
        onSearch={setSearchQuery}
        onToggleTheme={() => setIsDark((value) => !value)}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22 }}
        >
          <Suspense fallback={<PageLoader />}>
            {currentView === "home" && <HomePage onNavigate={navigate} onSelectGrade={setSelectedGrade} selectedGrade={selectedGrade} units={currentUnits} onOpenUnit={setSelectedUnit} progress={progress} />}
            {currentView === "learn" && (
              <LearningPage
                selectedGrade={selectedGrade}
                onSelectGrade={setSelectedGrade}
                allUnits={gradeUnits}
                units={currentUnits}
                searchQuery={searchQuery}
                onSearch={setSearchQuery}
                contentFilter={contentFilter}
                onFilter={setContentFilter}
                progress={progress}
                onOpenUnit={setSelectedUnit}
              />
            )}
            {currentView === "lab" && <LabPage selectedGrade={selectedGrade} onSelectGrade={setSelectedGrade} onComplete={completeExperiment} />}
            {currentView === "games" && <GamesPage />}
            {currentView === "assistant" && <SmartAssistant />}
            {currentView === "quiz" && <QuizPage selectedGrade={selectedGrade} onSelectGrade={setSelectedGrade} onComplete={completeQuiz} />}
            {currentView === "progress" && <ProgressDashboard progress={progress} />}
            {currentView === "resources" && <ResourcesPage />}
            {currentView === "evidence" && <EvidencePage />}
          </Suspense>
        </motion.div>
      </AnimatePresence>

      <Footer />
      <AICoachPanel currentView={currentView} selectedGrade={selectedGrade} progress={progress} onNavigate={navigate} />
      <ToastStack messages={toasts} />

      {selectedUnit && (
        <Modal title={selectedUnit.title} onClose={() => setSelectedUnit(null)}>
          <div className="grid gap-4">
            <p className="leading-7 text-slate-600 dark:text-slate-300">{selectedUnit.subtitle}</p>
            <div className="grid gap-3">
              {selectedUnit.lessons.map((lesson) => {
                const done = progress.completedLessons.includes(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    type="button"
                    onClick={() => {
                      setSelectedLesson(lesson);
                      setCurrentView("learn");
                      setSelectedUnit(null);
                    }}
                    className="rounded-lg border border-slate-200 p-4 text-start transition hover:border-aqua hover:bg-aqua/10 dark:border-white/10"
                  >
                    <span className="flex flex-wrap items-center justify-between gap-3">
                      <span className="font-extrabold text-ink dark:text-white">{lesson.title}</span>
                      <span className={`rounded-lg px-3 py-1 text-xs font-extrabold ${done ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200" : "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-200"}`}>
                        {done ? "مكتمل" : "جاهز"}
                      </span>
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-slate-600 dark:text-slate-300">{lesson.objective}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function PageLoader() {
  return (
    <div className="grid min-h-[320px] place-items-center bg-mist px-4 py-16 dark:bg-[#0b1524]">
      <div className="rounded-lg border border-slate-200 bg-white px-5 py-4 text-sm font-extrabold text-ocean shadow-sm dark:border-white/10 dark:bg-white/6 dark:text-aqua">
        جار تحميل التجربة التفاعلية...
      </div>
    </div>
  );
}

function HomePage({
  onNavigate,
  onSelectGrade,
  selectedGrade,
  units: visibleUnits,
  onOpenUnit,
  progress,
}: {
  onNavigate: (view: AppView) => void;
  onSelectGrade: (grade: GradeId) => void;
  selectedGrade: GradeId;
  units: Unit[];
  onOpenUnit: (unit: Unit) => void;
  progress: ProgressState;
}) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <main className="bg-mist py-10 dark:bg-[#0b1524]">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
          <GradeSelector selectedGrade={selectedGrade} onSelect={onSelectGrade} />
          <section>
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-ocean dark:text-aqua">وحدات مقترحة</p>
                <h2 className="text-2xl font-extrabold text-ink dark:text-white">ابدئي من وحدة مناسبة</h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate("learn")}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 dark:border-white/10 dark:bg-white/6 dark:text-slate-200"
              >
                عرض كل الدروس
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {visibleUnits.slice(0, 3).map((unit) => (
                <UnitCard
                  key={unit.id}
                  unit={unit}
                  completedLessons={unit.lessons.filter((lesson) => progress.completedLessons.includes(lesson.id)).length}
                  onOpen={onOpenUnit}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

function LearningPage({
  selectedGrade,
  onSelectGrade,
  allUnits,
  units: visibleUnits,
  searchQuery,
  onSearch,
  contentFilter,
  onFilter,
  progress,
  onOpenUnit,
}: {
  selectedGrade: GradeId;
  onSelectGrade: (grade: GradeId) => void;
  allUnits: Unit[];
  units: Unit[];
  searchQuery: string;
  onSearch: (value: string) => void;
  contentFilter: string;
  onFilter: (filter: string) => void;
  progress: ProgressState;
  onOpenUnit: (unit: Unit) => void;
}) {
  const filters = ["الكل", "الدروس", "التجارب", "الاختبارات"];

  return (
    <main className="bg-mist py-10 dark:bg-[#0b1524]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/6">
          <p className="inline-flex items-center gap-2 text-sm font-bold text-ocean dark:text-aqua">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            الدروس والوحدات
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-ink dark:text-white">اختاري الصف ثم افتحي الوحدة</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">تبويبات للصفوف، وبحث للمفاهيم، وبطاقات وحدات تفتح تفاصيل الدروس في نافذة منظمة.</p>
        </section>

        <GradeSelector selectedGrade={selectedGrade} onSelect={onSelectGrade} />

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/6" aria-label="خريطة وحدات الصف">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="inline-flex items-center gap-2 text-sm font-extrabold text-ocean dark:text-aqua">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              خريطة وحدات الصف
            </p>
            <span className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-extrabold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
              {allUnits.length} وحدات مكتملة المحتوى
            </span>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {allUnits.map((unit, index) => (
              <button
                key={unit.id}
                type="button"
                onClick={() => onOpenUnit(unit)}
                className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-start transition hover:border-aqua hover:bg-aqua/10 dark:border-white/10 dark:bg-white/5"
                aria-label={`فتح وحدة ${unit.title}`}
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-ocean text-xs font-extrabold text-white">{index + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-extrabold text-ink dark:text-white">{unit.title}</span>
                  <span className="mt-1 block text-xs font-semibold text-slate-500 dark:text-slate-300">{unit.lessons.length} درس تفاعلي</span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/6">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
            <label className="flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-white/10 dark:bg-white/5">
              <Search className="h-4 w-4 text-slate-500" aria-hidden="true" />
              <input
                value={searchQuery}
                onChange={(event) => onSearch(event.target.value)}
                className="w-full bg-transparent px-2 text-sm text-ink placeholder:text-slate-500 focus:outline-none dark:text-white"
                placeholder="ابحثي مثل: القوة، الخلية، الصخور..."
                aria-label="بحث داخل الوحدات"
              />
            </label>
            <div className="flex flex-wrap items-center gap-2" aria-label="فلترة نوع المحتوى">
              <span className="inline-flex items-center gap-1 text-sm font-bold text-slate-500 dark:text-slate-300">
                <Filter className="h-4 w-4" aria-hidden="true" />
                فلترة
              </span>
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => onFilter(filter)}
                  className={`rounded-lg px-3 py-2 text-sm font-bold ${contentFilter === filter ? "bg-ocean text-white" : "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200"}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        {contentFilter === "التجارب" ? (
          <div className="rounded-lg border border-aqua/30 bg-aqua/10 p-5 text-sm font-bold text-ocean dark:text-aqua">
            افتحي صفحة المختبر من التنقل العلوي لمشاهدة التجارب كاملة حسب الصف.
          </div>
        ) : contentFilter === "الاختبارات" ? (
          <div className="rounded-lg border border-violet/30 bg-violet/10 p-5 text-sm font-bold text-violet dark:text-violet-200">
            افتحي صفحة اختبري نفسك من التنقل العلوي للوصول إلى اختبارات الوحدات.
          </div>
        ) : (
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleUnits.map((unit) => (
              <UnitCard
                key={unit.id}
                unit={unit}
                completedLessons={unit.lessons.filter((lesson) => progress.completedLessons.includes(lesson.id)).length}
                onOpen={onOpenUnit}
              />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

function LabPage({
  selectedGrade,
  onSelectGrade,
  onComplete,
}: {
  selectedGrade: GradeId;
  onSelectGrade: (grade: GradeId) => void;
  onComplete: (experimentId: string) => void;
}) {
  const visible = experiments.filter((experiment) => experiment.gradeId === selectedGrade);
  return (
    <main className="bg-mist py-10 dark:bg-[#0b1524]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/6">
          <p className="inline-flex items-center gap-2 text-sm font-bold text-ocean dark:text-aqua">
            <FlaskConical className="h-4 w-4" aria-hidden="true" />
            مختبر العلوم التفاعلي
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-ink dark:text-white">تجارب ومحاكاة قابلة للتجربة</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">كل تجربة تحتوي هدفًا وأدوات وخطوات ومنطقة تفاعل وملاحظة واستنتاج.</p>
        </section>
        <GradeSelector selectedGrade={selectedGrade} onSelect={onSelectGrade} />
        {visible.map((experiment) => (
          <InteractiveExperiment key={experiment.id} experiment={experiment} onComplete={onComplete} />
        ))}
      </div>
    </main>
  );
}

function QuizPage({
  selectedGrade,
  onSelectGrade,
  onComplete,
}: {
  selectedGrade: GradeId;
  onSelectGrade: (grade: GradeId) => void;
  onComplete: (quizId: string, score: number, total: number) => void;
}) {
  const visible = standaloneQuizzes.filter((quiz) => quiz.gradeId === selectedGrade && quiz.questions.length > 0);
  return (
    <main className="bg-mist py-10 dark:bg-[#0b1524]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/6">
          <p className="inline-flex items-center gap-2 text-sm font-bold text-ocean dark:text-aqua">
            <LayoutGrid className="h-4 w-4" aria-hidden="true" />
            اختبري نفسك
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-ink dark:text-white">اختبارات شاملة بتصحيح فوري</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">اختبار شامل طويل لكل صف، واختبارات وحدات قصيرة، وكل سؤال يعرض سبب صحة أو خطأ الإجابة فورًا.</p>
        </section>
        <GradeSelector selectedGrade={selectedGrade} onSelect={onSelectGrade} />
        <div className="grid gap-6">
          {visible.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quizId={quiz.id}
              title={quiz.title}
              questions={quiz.questions}
              onComplete={(score) => onComplete(quiz.id, score, quiz.questions.length)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
