import {
  Activity,
  Atom,
  Dna,
  FlaskConical,
  Gauge,
  Microscope,
  Mountain,
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

const accentClasses: Record<Unit["accent"], string> = {
  blue: "bg-ocean/10 text-ocean dark:bg-aqua/10 dark:text-aqua",
  teal: "bg-aqua/10 text-ocean dark:bg-aqua/10 dark:text-aqua",
  violet: "bg-violet/10 text-violet",
  green: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  amber: "bg-amberSoft/20 text-amber-800 dark:text-amber-200",
};

export default function UnitCard({ unit, completedLessons, onOpen }: UnitCardProps) {
  const Icon = icons[unit.icon as keyof typeof icons] ?? Microscope;
  const progress = unit.lessons.length ? Math.round((completedLessons / unit.lessons.length) * 100) : 0;

  return (
    <motion.article
      layout
      whileHover={{ y: -4 }}
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition dark:border-white/10 dark:bg-white/6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className={`grid h-12 w-12 place-items-center rounded-lg ${accentClasses[unit.accent]}`}>
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-white/10 dark:text-slate-200">
          {unit.lessons.length} درس
        </span>
      </div>
      <h3 className="mt-5 text-xl font-extrabold text-ink dark:text-white">{unit.title}</h3>
      <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-600 dark:text-slate-300">{unit.subtitle}</p>

      <div className="mt-5" aria-label={`نسبة التقدم في ${unit.title}`}>
        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-300">
          <span>التقدم</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-slate-100 dark:bg-white/10">
          <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <button
        type="button"
        onClick={() => onOpen(unit)}
        className="mt-5 w-full rounded-lg bg-ink px-4 py-3 text-sm font-bold text-white transition hover:bg-ocean dark:bg-aqua dark:text-ink"
      >
        فتح الوحدة
      </button>
    </motion.article>
  );
}
