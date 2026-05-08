import { ArrowLeft, Award, Beaker, BookOpen, Brain, ClipboardCheck, FlaskConical, Gamepad2, Gauge, GraduationCap, PlayCircle, Sparkles, Star, TrendingUp, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import type { AppView } from "../types";

interface HeroProps {
  onNavigate: (view: AppView) => void;
}

const features = [
  { title: "دروس تفاعلية", icon: Sparkles, text: "شرح مبسط مع أنشطة تطبيقية داخل كل درس.", color: "from-blue-500 to-cyan-500" },
  { title: "تجارب ومحاكاة", icon: FlaskConical, text: "مختبر افتراضي بمحاكاة واقعية للتجارب.", color: "from-teal-500 to-emerald-500" },
  { title: "مساعد ذكي AI", icon: Brain, text: "ذكاء اصطناعي يجيب ويشرح بأسلوب مناسب.", color: "from-violet-500 to-purple-500" },
  { title: "اختبارات ذكية", icon: ClipboardCheck, text: "تقويم فوري مع تحليل الأداء والتوصيات.", color: "from-amber-500 to-orange-500" },
  { title: "ألعاب تعليمية", icon: Gamepad2, text: "تعلم بالمنافسة مع مستويات وتحديات.", color: "from-pink-500 to-rose-500" },
  { title: "تتبع التقدم", icon: Gauge, text: "إحصائيات مفصلة وشارات إنجاز تحفيزية.", color: "from-indigo-500 to-blue-500" },
];

const stats = [
  { value: "20+", label: "درس تفاعلي", icon: BookOpen },
  { value: "8+", label: "تجربة محاكاة", icon: FlaskConical },
  { value: "100+", label: "سؤال تقويم", icon: ClipboardCheck },
  { value: "AI", label: "مساعد ذكي", icon: Brain },
];

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="science-grid overflow-hidden bg-mist dark:bg-[#0b1524]">
      {/* Main Hero */}
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-aqua/20 bg-gradient-to-r from-aqua/10 to-violet/10 px-4 py-2 text-sm font-bold text-ocean shadow-sm dark:bg-white/5 dark:text-aqua">
            <Star className="h-4 w-4 text-amberSoft" aria-hidden="true" />
            منصة تعليمية ذكية للصف الأول والثالث متوسط
          </div>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.3] text-ink dark:text-white md:text-5xl lg:text-[3.2rem]">
            تعلّمي العلوم بطريقة{" "}
            <span className="gradient-text">ذكية وتفاعلية</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            منصة تعليمية عربية متكاملة تجمع بين الدروس المبسطة، المحاكاة العلمية، الذكاء الاصطناعي، والتقويم الذكي في تجربة تعليمية واحدة مصممة خصيصًا لطالبات المرحلة المتوسطة.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate("learn")}
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-ocean to-aqua px-6 py-3.5 text-sm font-bold text-white shadow-medium transition-all hover:-translate-y-0.5 hover:shadow-large"
            >
              ابدئي رحلة التعلم
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate("lab")}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-aqua/30 bg-white/80 px-6 py-3.5 text-sm font-bold text-ocean backdrop-blur transition-all hover:-translate-y-0.5 hover:border-aqua hover:bg-aqua/5 dark:bg-white/5 dark:text-aqua"
            >
              <FlaskConical className="h-4 w-4" aria-hidden="true" />
              المختبر الافتراضي
            </button>
            <button
              type="button"
              onClick={() => onNavigate("assistant")}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-violet/25 bg-white/80 px-6 py-3.5 text-sm font-bold text-violet backdrop-blur transition-all hover:-translate-y-0.5 hover:border-violet hover:bg-violet/5 dark:bg-white/5"
            >
              <Brain className="h-4 w-4" aria-hidden="true" />
              المساعد الذكي
            </button>
          </div>

          {/* Stats Row */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white/60 px-4 py-3 backdrop-blur dark:border-white/10 dark:bg-white/5">
                  <Icon className="h-5 w-5 text-ocean dark:text-aqua" aria-hidden="true" />
                  <div>
                    <p className="text-lg font-extrabold text-ink dark:text-white">{stat.value}</p>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="hero-visual rounded-3xl p-6 text-white shadow-large"
          aria-label="رسم علمي تفاعلي يوضح الذرة والمختبر والقياس"
        >
          <div className="relative h-full min-h-[380px]">
            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-6 top-6 rounded-2xl bg-white/12 p-4 backdrop-blur-md border border-white/10"
            >
              <p className="text-xs text-white/70">محاكاة اليوم</p>
              <p className="mt-1 text-xl font-extrabold">القوة والحركة</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-1.5 w-20 rounded-full bg-white/20">
                  <div className="h-full w-4/5 rounded-full bg-aqua" />
                </div>
                <span className="text-xs text-aqua">80%</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute left-4 top-10 rounded-2xl bg-white/12 p-3 backdrop-blur-md border border-white/10"
            >
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amberSoft" />
                <span className="text-sm font-bold">شارة الباحثة</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute left-8 bottom-28 rounded-2xl bg-white/12 p-3 backdrop-blur-md border border-white/10"
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emeraldSoft" />
                <span className="text-sm font-bold">تقدم ممتاز</span>
              </div>
            </motion.div>

            {/* Animated Cart */}
            <div className="absolute inset-x-6 bottom-8 h-28 rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
              <div className="cart-track mt-14 h-1 rounded-full bg-white/20" />
              <motion.div
                className="absolute bottom-8 right-10 h-12 w-16 rounded-xl bg-gradient-to-br from-aqua to-teal-400 shadow-lg"
                animate={{ x: [-10, -100, -10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="absolute -bottom-2 right-2 h-5 w-5 rounded-full bg-white shadow-sm" />
                <span className="absolute -bottom-2 left-2 h-5 w-5 rounded-full bg-white shadow-sm" />
              </motion.div>
            </div>

            {/* Atom Animation */}
            <div className="absolute left-1/2 top-[45%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15">
              <span className="atom-orbit" style={{ "--rotate": "18deg" } as React.CSSProperties} />
              <span className="atom-orbit" style={{ "--rotate": "75deg" } as React.CSSProperties} />
              <span className="atom-orbit" style={{ "--rotate": "132deg" } as React.CSSProperties} />
              <span className="pulse-dot absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-amberSoft to-orange-400 shadow-lg" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="mx-auto grid max-w-7xl gap-4 px-4 pb-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 xl:grid-cols-6 lg:px-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="card-premium rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]"
            >
              <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-sm`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="mt-4 text-base font-extrabold text-ink dark:text-white">{feature.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{feature.text}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
