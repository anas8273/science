import { ArrowLeft, Beaker, Brain, ClipboardCheck, FlaskConical, Gamepad2, Gauge, PlayCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { AppView } from "../types";

interface HeroProps {
  onNavigate: (view: AppView) => void;
}

const features = [
  { title: "دروس تفاعلية", icon: Sparkles, text: "شرح مختصر، مفاهيم، وأنشطة داخل كل درس." },
  { title: "تجارب ومحاكاة", icon: FlaskConical, text: "مختبر افتراضي بالقوة والكهرباء والبراكين." },
  { title: "مساعد ذكي", icon: Brain, text: "إجابات فورية محاكاة حسب المفهوم العلمي." },
  { title: "اختبارات فورية", icon: ClipboardCheck, text: "أسئلة قصيرة مع سبب صحة الإجابة." },
  { title: "ألعاب علمية", icon: Gamepad2, text: "تدريب بالمطابقة وبناء الذرة وسباق المفاهيم." },
  { title: "متابعة التقدم", icon: Gauge, text: "شارات، نسب إنجاز، ومتوسط نتائج الاختبارات." },
];

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="science-grid overflow-hidden bg-mist dark:bg-[#0b1524]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-16">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-aqua/30 bg-white px-3 py-2 text-sm font-semibold text-ocean shadow-sm dark:bg-white/10 dark:text-aqua">
            <Beaker className="h-4 w-4" aria-hidden="true" />
            تعلم علوم ديناميكي للصف الأول والثالث متوسط
          </div>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-ink dark:text-white md:text-5xl">
            تعلمي العلوم بطريقة ذكية وتفاعلية
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700 dark:text-slate-200">
            منصة تعليمية عربية تجمع الدروس المبسطة، المحاكاة العلمية، الأنشطة، الاختبارات، والمساعد العلمي الذكي في تجربة واحدة واضحة ومناسبة لطالبات المرحلة المتوسطة.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate("learn")}
              className="inline-flex items-center gap-2 rounded-lg bg-ocean px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#0d536b]"
            >
              ابدئي التعلم
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate("lab")}
              className="inline-flex items-center gap-2 rounded-lg border border-aqua/35 bg-white px-5 py-3 text-sm font-bold text-ocean transition hover:-translate-y-0.5 hover:bg-aqua/10 dark:bg-white/10 dark:text-aqua"
            >
              <FlaskConical className="h-4 w-4" aria-hidden="true" />
              استكشفي التجارب
            </button>
            <button
              type="button"
              onClick={() => onNavigate("quiz")}
              className="inline-flex items-center gap-2 rounded-lg border border-violet/25 bg-white px-5 py-3 text-sm font-bold text-violet transition hover:-translate-y-0.5 hover:bg-violet/10 dark:bg-white/10"
            >
              <PlayCircle className="h-4 w-4" aria-hidden="true" />
              اختبري نفسك
            </button>
            <button
              type="button"
              onClick={() => onNavigate("games")}
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/25 bg-white px-5 py-3 text-sm font-bold text-emerald-700 transition hover:-translate-y-0.5 hover:bg-emerald-50 dark:bg-white/10 dark:text-emerald-200"
            >
              <Gamepad2 className="h-4 w-4" aria-hidden="true" />
              العبي وتدرّبي
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="hero-visual rounded-lg p-6 text-white shadow-soft"
          aria-label="رسم علمي تفاعلي يوضح الذرة والمختبر والقياس"
        >
          <div className="relative h-full min-h-[320px]">
            <div className="absolute right-8 top-8 rounded-lg bg-white/12 p-4 backdrop-blur">
              <p className="text-xs text-white/70">محاكاة اليوم</p>
              <p className="mt-1 text-2xl font-extrabold">القوة والحركة</p>
            </div>
            <div className="absolute left-6 top-12 rounded-lg bg-white/12 p-3 backdrop-blur">
              <p className="text-xs text-white/70">إتقان المفاهيم</p>
              <div className="mt-2 h-2 w-36 rounded-full bg-white/20">
                <div className="h-full w-3/4 rounded-full bg-aqua" />
              </div>
            </div>
            <div className="absolute inset-x-8 bottom-12 h-28 rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="cart-track mt-12 h-1 rounded-full bg-white/30" />
              <motion.div
                className="absolute bottom-10 right-12 h-12 w-16 rounded-lg bg-aqua shadow-lg"
                animate={{ x: [-10, -90, -10] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="absolute -bottom-2 right-2 h-5 w-5 rounded-full bg-white" />
                <span className="absolute -bottom-2 left-2 h-5 w-5 rounded-full bg-white" />
              </motion.div>
            </div>
            <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20">
              <span className="atom-orbit" style={{ "--rotate": "18deg" } as React.CSSProperties} />
              <span className="atom-orbit" style={{ "--rotate": "75deg" } as React.CSSProperties} />
              <span className="atom-orbit" style={{ "--rotate": "132deg" } as React.CSSProperties} />
              <span className="pulse-dot absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amberSoft" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-4 px-4 pb-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 xl:grid-cols-6 lg:px-8">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.article
              key={feature.title}
              whileHover={{ y: -4 }}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/6"
            >
              <Icon className="h-7 w-7 text-ocean dark:text-aqua" aria-hidden="true" />
              <h2 className="mt-4 text-base font-extrabold text-ink dark:text-white">{feature.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{feature.text}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
