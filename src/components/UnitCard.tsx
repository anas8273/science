import {
  Activity,
  Atom,
  BookOpen,
  Dna,
  FlaskConical,
  Gauge,
  Microscope,
  Mountain,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import type { Unit } from "../types";

interface UnitCardProps {
  unit: Unit;
  completedLessons: number;
  onOpen: (unit: Unit) => void;
}

const icons = {
  microscope: Microscope,
  gauge: Gauge,
  wrench: Wrench,
  flask: FlaskConical,
  atom: Atom,
  mountain: Mountain,
  activity: Activity,
  dna: Dna,
  zap: Zap,
};

const gradientClasses: Record<string, string> = {
  blue: "from-blue-500 to-cyan-500",
  teal: "from-teal-500 to-emerald-500",
  violet: "from-violet-500 to-purple-500",
  green: "from-emerald-500 to-teal-500",
  amber: "from-amber-500 to-orange-500",
};

export default function UnitCard({ unit, completedLessons, onOpen }: UnitCardProps) {
  const Icon = icons[unit.icon as keyof typeof icons] ?? Microscope;
  const progress = unit.lessons.length ? Math.round((completedLessons / unit.lessons.length) * 100) : 0;
  const gradient = gradientClasses[unit.accent] || "from-ocean to-aqua";

  return (
    <motion.article
      layout
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-white/6"
    >
      {/* Top gradient accent line */}
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${gradient}`} />

      <div className="flex items-start justify-between gap-4">
        <div className={`grid h-13 w-13 place-items-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-sm`}>
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 dark:bg-white/10 dark:text-slate-200">
          <BookOpen className="h-3 w-3" />
          {unit.lessons.length} درس
        </span>
      </div>

      <h3 className="mt-5 text-xl font-extrabold text-ink dark:text-white">{unit.title}</h3>
      <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-600 dark:text-slate-300">{unit.subtitle}</p>

      {/* Progress */}
      <div className="mt-5" aria-label={`نسبة التقدم في ${unit.title}`}>
        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-300">
          <span className="flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-amber-500" />
            التقدم
          </span>
          <span className={progress > 0 ? "text-emerald-600 dark:text-emerald-400" : ""}>{progress}%</span>
        </div>
        <div className="h-2.5 rounded-full bg-slate-100 dark:bg-white/10">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-500`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => onOpen(unit)}
        className={`mt-5 w-full rounded-xl bg-gradient-to-r ${gradient} px-4 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5`}
      >
        فتح الوحدة
      </button>
    </motion.article>
  );
}
