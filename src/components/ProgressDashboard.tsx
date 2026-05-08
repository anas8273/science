import { Award, BadgeCheck, Beaker, BookOpenCheck, ClipboardCheck, Gauge } from "lucide-react";
import { Bar, BarChart, PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { experiments, lessons } from "../data/platformData";
import type { ProgressState } from "../types";

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
    { title: "مستكشفة العلوم", active: completedLessons >= 1 },
    { title: "خبيرة التجارب", active: completedExperiments >= 2 },
    { title: "عالمة صغيرة", active: average >= 70 },
    { title: "متقنة المفاهيم", active: lessonPercent >= 50 },
  ];

  return (
    <main className="bg-mist py-10 dark:bg-[#0b1524]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/6">
          <p className="inline-flex items-center gap-2 text-sm font-bold text-ocean dark:text-aqua">
            <Gauge className="h-4 w-4" aria-hidden="true" />
            لوحة تقدم الطالبة
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-ink dark:text-white">تقدمك العلمي في مكان واحد</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">تعرض اللوحة الدروس المكتملة والتجارب والاختبارات والشارات التشجيعية.</p>
        </section>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Metric icon={BookOpenCheck} title="الدروس المكتملة" value={`${completedLessons}/${lessons.length}`} color="text-ocean" />
          <Metric icon={Beaker} title="التجارب المنجزة" value={`${completedExperiments}/${experiments.length}`} color="text-violet" />
          <Metric icon={ClipboardCheck} title="الاختبارات المنجزة" value={`${quizValues.length}`} color="text-emerald-600" />
          <Metric icon={Award} title="متوسط النتيجة" value={`${average}%`} color="text-amber-600" />
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/6">
            <h2 className="text-xl font-extrabold text-ink dark:text-white">نسبة التقدم</h2>
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

          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/6">
            <h2 className="text-xl font-extrabold text-ink dark:text-white">ملخص الإنجاز</h2>
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

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/6">
          <h2 className="text-xl font-extrabold text-ink dark:text-white">شارات الإنجاز</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {badges.map((badge) => (
              <div key={badge.title} className={`rounded-lg border p-4 ${badge.active ? "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-100" : "border-slate-200 bg-slate-50 text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"}`}>
                <BadgeCheck className="h-6 w-6" aria-hidden="true" />
                <p className="mt-3 font-extrabold">{badge.title}</p>
                <p className="mt-1 text-sm">{badge.active ? "مفعلة" : "واصلي التعلم لفتحها"}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Metric({ icon: Icon, title, value, color }: { icon: typeof Gauge; title: string; value: string; color: string }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/6">
      <Icon className={`h-7 w-7 ${color}`} aria-hidden="true" />
      <p className="mt-4 text-sm font-bold text-slate-500 dark:text-slate-300">{title}</p>
      <p className="mt-1 text-3xl font-extrabold text-ink dark:text-white">{value}</p>
    </article>
  );
}
