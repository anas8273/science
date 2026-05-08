import { Award, Beaker, BookOpen, Brain, FlaskConical, Gamepad2, GraduationCap, Heart, Shield, Sparkles } from "lucide-react";
import type { AppView } from "../types";

interface FooterProps {
  onNavigate?: (view: AppView) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNav = (view: AppView) => {
    if (onNavigate) {
      onNavigate(view);
    }
  };

  return (
    <footer className="border-t border-slate-200/60 bg-white dark:border-white/10 dark:bg-ink/80">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-ocean to-aqua text-white shadow-sm">
                <Beaker className="h-6 w-6" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-base font-extrabold text-ink dark:text-white">منصة العلوم الذكية</span>
                <span className="block text-xs font-medium text-slate-400">تعلم تفاعلي بالذكاء الاصطناعي</span>
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400">
              منصة تعليمية عربية متكاملة تهدف إلى تبسيط مادة العلوم لطالبات المرحلة المتوسطة من خلال الذكاء الاصطناعي، التجارب التفاعلية، والتقويم الذكي.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                <Shield className="h-3.5 w-3.5" />
                محتوى موثوق ومراجع
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-violet/10 px-3 py-1.5 text-xs font-bold text-violet">
                <Brain className="h-3.5 w-3.5" />
                مدعوم بالذكاء الاصطناعي
              </span>
            </div>
          </div>
          {/* Quick Links - Interactive */}
          <div>
            <h3 className="text-sm font-extrabold text-ink dark:text-white">أقسام المنصة</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <button type="button" onClick={() => handleNav("learn")} className="group flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-500 transition-all hover:bg-ocean/5 hover:text-ocean dark:text-slate-400 dark:hover:bg-aqua/10 dark:hover:text-aqua">
                  <BookOpen className="h-3.5 w-3.5 text-ocean transition-transform group-hover:scale-110" />
                  <span>الدروس التفاعلية</span>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav("lab")} className="group flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-500 transition-all hover:bg-emerald-50 hover:text-emerald-600 dark:text-slate-400 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400">
                  <FlaskConical className="h-3.5 w-3.5 text-emerald-500 transition-transform group-hover:scale-110" />
                  <span>المختبر الافتراضي</span>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav("assistant")} className="group flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-500 transition-all hover:bg-violet/5 hover:text-violet dark:text-slate-400 dark:hover:bg-violet/10 dark:hover:text-violet">
                  <Brain className="h-3.5 w-3.5 text-violet transition-transform group-hover:scale-110" />
                  <span>المساعد الذكي</span>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav("games")} className="group flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-500 transition-all hover:bg-rose-50 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-400">
                  <Gamepad2 className="h-3.5 w-3.5 text-rose-500 transition-transform group-hover:scale-110" />
                  <span>الألعاب التعليمية</span>
                </button>
              </li>
            </ul>
          </div>
          {/* Info */}
          <div>
            <h3 className="text-sm font-extrabold text-ink dark:text-white">معلومات</h3>
            <ul className="mt-3 space-y-2.5">
              <li className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <GraduationCap className="h-3.5 w-3.5 text-ocean" />
                المنهج: علوم المرحلة المتوسطة
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Award className="h-3.5 w-3.5 text-amber-500" />
                الصفوف: الأول والثالث متوسط
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Sparkles className="h-3.5 w-3.5 text-violet" />
                المصادر: مناهج وزارة التعليم
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Shield className="h-3.5 w-3.5 text-emerald-500" />
                محتوى آمن ومناسب للطالبات
              </li>
            </ul>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center gap-3 border-t border-slate-200/60 pt-6 dark:border-white/10 sm:flex-row sm:justify-between">
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
            جميع الحقوق محفوظة &copy; {new Date().getFullYear()} - منصة العلوم الذكية التفاعلية
          </p>
          <p className="flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-slate-500">
            صُنع بـ <Heart className="h-3.5 w-3.5 text-rose-500" /> لطالبات المرحلة المتوسطة
          </p>
        </div>
      </div>
    </footer>
  );
}
