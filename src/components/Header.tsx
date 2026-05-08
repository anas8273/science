import {
  Beaker,
  Bot,
  ClipboardCheck,
  Gamepad2,
  Gauge,
  Home,
  LayoutDashboard,
  Menu,
  Moon,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { useState } from "react";
import type { AppView } from "../types";

interface HeaderProps {
  currentView: AppView;
  isDark: boolean;
  searchQuery: string;
  onNavigate: (view: AppView) => void;
  onSearch: (value: string) => void;
  onToggleTheme: () => void;
}

const navItems: Array<{ view: AppView; label: string; icon: typeof Home }> = [
  { view: "home", label: "الرئيسية", icon: Home },
  { view: "learn", label: "الدروس", icon: Sparkles },
  { view: "lab", label: "المختبر", icon: Beaker },
  { view: "games", label: "الألعاب", icon: Gamepad2 },
  { view: "quiz", label: "اختبري نفسك", icon: ClipboardCheck },
  { view: "assistant", label: "المساعد الذكي", icon: Bot },
  { view: "progress", label: "التقدم", icon: Gauge },
  { view: "resources", label: "المصادر", icon: LayoutDashboard },
  { view: "evidence", label: "الشواهد", icon: ShieldCheck },
];

export default function Header({
  currentView,
  isDark,
  searchQuery,
  onNavigate,
  onSearch,
  onToggleTheme,
}: HeaderProps) {
  const [open, setOpen] = useState(false);

  const renderNav = (compact = false) => (
    <nav className={compact ? "grid gap-1.5" : "hidden items-center gap-0.5 lg:flex"} aria-label="التنقل الرئيسي">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = currentView === item.view;
        return (
          <button
            key={item.view}
            type="button"
            onClick={() => {
              onNavigate(item.view);
              setOpen(false);
            }}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200 ${
              active
                ? "bg-gradient-to-r from-ocean to-aqua text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-ocean dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-aqua"
            }`}
            aria-current={active ? "page" : undefined}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {item.label}
          </button>
        );
      })}
    </nav>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-ink/80">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex min-w-fit items-center gap-3 rounded-xl text-start transition-transform hover:scale-[1.02]"
          aria-label="العودة إلى الصفحة الرئيسية"
        >
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-ocean to-aqua text-white shadow-sm">
            <Beaker className="h-6 w-6" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-base font-extrabold text-ink dark:text-white">منصة العلوم الذكية</span>
            <span className="block text-[11px] font-medium text-slate-400 dark:text-slate-400">تعلم تفاعلي بالذكاء الاصطناعي</span>
          </span>
        </button>

        {/* Search */}
        <div className="hidden min-w-[240px] flex-1 items-center rounded-xl border border-slate-200/80 bg-slate-50/80 px-3 py-2.5 backdrop-blur dark:border-white/10 dark:bg-white/5 md:flex">
          <Search className="h-4 w-4 text-slate-400" aria-hidden="true" />
          <input
            value={searchQuery}
            onChange={(event) => onSearch(event.target.value)}
            className="w-full bg-transparent px-2 text-sm text-ink placeholder:text-slate-400 focus:outline-none dark:text-white"
            placeholder="ابحثي عن درس أو مفهوم..."
            aria-label="البحث في الدروس والمفاهيم"
          />
        </div>

        {renderNav()}

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={onToggleTheme}
          className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200/80 text-slate-600 transition-all hover:bg-slate-100 hover:text-ocean dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-aqua"
          aria-label={isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
        >
          {isDark ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
        </button>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200/80 text-slate-600 transition-all hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10 lg:hidden"
          aria-label="فتح قائمة التنقل"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-slate-200/60 bg-white/95 px-4 py-4 shadow-large backdrop-blur-xl dark:border-white/10 dark:bg-ink/95 lg:hidden">
          <div className="mb-3 flex items-center rounded-xl border border-slate-200/80 bg-slate-50/80 px-3 py-2.5 dark:border-white/10 dark:bg-white/5">
            <Search className="h-4 w-4 text-slate-400" aria-hidden="true" />
            <input
              value={searchQuery}
              onChange={(event) => onSearch(event.target.value)}
              className="w-full bg-transparent px-2 text-sm text-ink placeholder:text-slate-400 focus:outline-none dark:text-white"
              placeholder="ابحثي عن درس..."
              aria-label="البحث في الدروس من قائمة الجوال"
            />
          </div>
          {renderNav(true)}
        </div>
      )}
    </header>
  );
}
