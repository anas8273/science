import { Award, BadgeCheck, Beaker, BookOpenCheck, ClipboardCheck, Flame, Gauge, Lightbulb, Medal, Microscope, Sparkles, Star, Target, Trophy } from "lucide-react";
import { Bar, BarChart, PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { experiments, lessons } from "../data/platformData";
import type { ProgressState } from "../types";
import { useState } from "react";

interface ProgressDashboardProps {
  progress: ProgressState;
}

export default function ProgressDashboard({ progress }: ProgressDashboardProps) {
  const completedLessons = progress.completedLessons.length;
  const completedExperiments = progress.completedExperiments.length;
  const quizValues = Object.values(progress.quizScores);
  const average = quizValues.length ? Math.round(quizValues.reduce((sum, value) => sum + value, 0) / quizValues.length) : 0;
  const lessonPercent = lessons.length ? Math.round((completedLessons / lessons.length) * 100) : 0;
  const chartData = [{ name: "التقدم", value: lessonPercent, fill: "#28B7B6" }];
  const bars = [
    { name: "الدروس", value: completedLessons },
    { name: "التجارب", value: completedExperiments },
    { name: "الاختبارات", value: quizValues.length },
  ];

  const badges = [
    { title: "مستكشفة العلوم", description: "أكملي درسًا واحدًا على الأقل", icon: Microscope, active: completedLessons >= 1, requirement: "1 درس" },
    { title: "خبيرة التجارب", description: "أنجزي تجربتين أو أكثر", icon: Beaker, active: completedExperiments >= 2, requirement: "2 تجربة" },
    { title: "عالمة صغيرة", description: "احصلي على متوسط 70% في الاختبارات", icon: Star, active: average >= 70, requirement: "70% متوسط" },
    { title: "متقنة المفاهيم", description: "أكملي نصف الدروس المتاحة", icon: Trophy, active: lessonPercent >= 50, requirement: "50% دروس" },
    { title: "باحثة متميزة", description: "أكملي 5 دروس أو أكثر", icon: Medal, active: completedLessons >= 5, requirement: "5 دروس" },
    { title: "نجمة العلوم", description: "احصلي على 90% أو أكثر في اختبار", icon: Flame, active: quizValues.some(v => v >= 90), requirement: "90% في اختبار" },
  ];

  const totalProgress = Math.round(
    ((completedLessons / Math.max(lessons.length, 1)) * 40) +
    ((completedExperiments / Math.max(experiments.length, 1)) * 30) +
    ((average / 100) * 30)
  );

  const [selectedBadge, setSelectedBadge] = useState<number | null>(null);

  // Motivational message based on progress
  const getMotivation = () => {
    if (totalProgress >= 80) return "أداء استثنائي! أنتِ نجمة العلوم بلا منازع.";
    if (totalProgress >= 60) return "تقدم رائع! استمري بهذا المستوى الممتاز.";
    if (totalProgress >= 30) return "بداية جيدة! كل خطوة تقربك من الهدف.";
    return "ابدئي رحلتك العلمية الآن! كل درس يفتح آفاقًا جديدة.";
  };

  return (
    <main className="bg-mist py-10 dark:bg-[#0b1524]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/6">
          <p className="inline-flex items-center gap-2 text-sm font-bold text-ocean dark:text-aqua">
            <Gauge className="h-4 w-4" aria-hidden="true" />
            لوحة تقدم الطالبة
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-ink dark:text-white">تقدمك العلمي في مكان واحد</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">تعرض اللوحة الدروس المكتملة والتجارب والاختبارات والشارات التشجيعية.</p>
          {/* Motivation Banner */}
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-gradient-to-r from-aqua/10 to-violet/10 p-4 border border-aqua/20 dark:from-aqua/5 dark:to-violet/5 dark:border-aqua/10">
            <Lightbulb className="h-5 w-5 text-amberSoft shrink-0" />
            <p className="text-sm font-bold text-ocean dark:text-aqua">{getMotivation()}</p>
          </div>
        </section>

        {/* Overall Progress Bar */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-violet" />
              <h2 className="text-lg font-extrabold text-ink dark:text-white">التقدم الإجمالي</h2>
            </div>
            <span className="text-2xl font-extrabold text-violet">{totalProgress}%</span>
          </div>
          <div className="h-4 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet to-purple-500 transition-all duration-700 ease-out"
              style={{ width: `${totalProgress}%` }}
            />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-blue-50 px-2 py-1.5 dark:bg-blue-500/10">
              <p className="text-xs font-bold text-blue-600 dark:text-blue-300">الدروس 40%</p>
            </div>
            <div className="rounded-lg bg-teal-50 px-2 py-1.5 dark:bg-teal-500/10">
              <p className="text-xs font-bold text-teal-600 dark:text-teal-300">التجارب 30%</p>
            </div>
            <div className="rounded-lg bg-amber-50 px-2 py-1.5 dark:bg-amber-500/10">
              <p className="text-xs font-bold text-amber-600 dark:text-amber-300">الاختبارات 30%</p>
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Metric icon={BookOpenCheck} title="الدروس المكتملة" value={`${completedLessons}/${lessons.length}`} color="text-ocean" bgColor="bg-blue-50 dark:bg-blue-500/10" />
          <Metric icon={Beaker} title="التجارب المنجزة" value={`${completedExperiments}/${experiments.length}`} color="text-violet" bgColor="bg-violet-50 dark:bg-violet-500/10" />
          <Metric icon={ClipboardCheck} title="الاختبارات المنجزة" value={`${quizValues.length}`} color="text-emerald-600" bgColor="bg-emerald-50 dark:bg-emerald-500/10" />
          <Metric icon={Award} title="متوسط النتيجة" value={`${average}%`} color="text-amber-600" bgColor="bg-amber-50 dark:bg-amber-500/10" />
        </section>

        {/* Charts */}
        <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/6">
            <h2 className="flex items-center gap-2 text-xl font-extrabold text-ink dark:text-white">
              <Sparkles className="h-5 w-5 text-aqua" />
              نسبة التقدم
            </h2>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="62%" outerRadius="90%" data={chartData} startAngle={90} endAngle={-270}>
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <RadialBar dataKey="value" background cornerRadius={8} />
                  <Tooltip />
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-ink text-3xl font-extrabold dark:fill-white">
                    {lessonPercent}%
                  </text>
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/6">
            <h2 className="flex items-center gap-2 text-xl font-extrabold text-ink dark:text-white">
              <Target className="h-5 w-5 text-violet" />
              ملخص الإنجاز
            </h2>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bars}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#7661E8" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>
        </section>

        {/* Badges - Interactive */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/6">
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-ink dark:text-white">
            <Medal className="h-5 w-5 text-amberSoft" />
            شارات الإنجاز
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">اضغطي على أي شارة لمعرفة تفاصيلها</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {badges.map((badge, idx) => {
              const Icon = badge.icon;
              const isSelected = selectedBadge === idx;
              return (
                <button
                  key={badge.title}
                  type="button"
                  onClick={() => setSelectedBadge(isSelected ? null : idx)}
                  className={`rounded-xl border p-4 text-start transition-all hover:-translate-y-1 hover:shadow-md active:scale-[0.98] ${
                    badge.active
                      ? "border-emerald-300 bg-emerald-50 dark:border-emerald-400/20 dark:bg-emerald-500/10"
                      : "border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5"
                  } ${isSelected ? "ring-2 ring-violet/30 shadow-md" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`grid h-10 w-10 place-items-center rounded-xl ${
                      badge.active
                        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300"
                        : "bg-slate-200 text-slate-400 dark:bg-white/10 dark:text-slate-500"
                    }`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className={`font-extrabold ${badge.active ? "text-emerald-900 dark:text-emerald-100" : "text-slate-500 dark:text-slate-300"}`}>
                        {badge.title}
                      </p>
                      <p className={`text-xs mt-0.5 ${badge.active ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}>
                        {badge.active ? "مفعلة" : badge.requirement}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="mt-3 rounded-lg bg-white/80 px-3 py-2 text-xs font-medium leading-5 text-slate-600 dark:bg-ink/40 dark:text-slate-300 animate-fade-in">
                      {badge.description}
                      {badge.active && <span className="block mt-1 text-emerald-600 dark:text-emerald-400 font-bold">تهانينا! حصلتِ على هذه الشارة.</span>}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Tips Section */}
        <section className="rounded-2xl border border-amber-200/60 bg-gradient-to-r from-amber-50 to-orange-50 p-5 dark:border-amber-500/20 dark:from-amber-500/5 dark:to-orange-500/5">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-amber-900 dark:text-amber-100">
            <Lightbulb className="h-5 w-5 text-amber-600" />
            نصائح لتحسين تقدمك
          </h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white/80 p-3 dark:bg-ink/30">
              <p className="text-sm font-bold text-amber-800 dark:text-amber-200">أكملي الدروس بالترتيب</p>
              <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">كل درس يبني على ما قبله</p>
            </div>
            <div className="rounded-lg bg-white/80 p-3 dark:bg-ink/30">
              <p className="text-sm font-bold text-amber-800 dark:text-amber-200">جربي التجارب بعد كل وحدة</p>
              <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">التطبيق يثبت المعلومة</p>
            </div>
            <div className="rounded-lg bg-white/80 p-3 dark:bg-ink/30">
              <p className="text-sm font-bold text-amber-800 dark:text-amber-200">أعيدي الاختبار لتحسين النتيجة</p>
              <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">التكرار يعزز الفهم</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Metric({ icon: Icon, title, value, color, bgColor }: { icon: typeof Gauge; title: string; value: string; color: string; bgColor: string }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-white/6">
      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${bgColor}`}>
        <Icon className={`h-6 w-6 ${color}`} aria-hidden="true" />
      </div>
      <p className="mt-4 text-sm font-bold text-slate-500 dark:text-slate-300">{title}</p>
      <p className="mt-1 text-3xl font-extrabold text-ink dark:text-white">{value}</p>
    </article>
  );
}
