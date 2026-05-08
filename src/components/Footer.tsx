import { Beaker, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 dark:border-white/10 dark:bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-ocean text-white">
            <Beaker className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-extrabold text-ink dark:text-white">منصة العلوم الذكية التفاعلية</p>
          <p className="text-sm text-slate-500 dark:text-slate-300">منصة تفاعلية بمصادر حقيقية وتجارب واختبارات وألعاب.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-sm text-slate-500 dark:text-slate-300">
          <span className="rounded-lg bg-slate-100 px-3 py-2 dark:bg-white/10">مصادر رسمية ومحاكاة موثوقة</span>
          <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-2 dark:bg-white/10">
            جاهزة للنشر
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </footer>
  );
}
