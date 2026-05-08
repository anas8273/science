import { Camera, CheckCircle2, ClipboardList } from "lucide-react";
import { evidenceCards } from "../data/platformData";

export default function EvidencePage() {
  return (
    <main className="bg-mist py-10 dark:bg-[#0b1524]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/6">
          <p className="inline-flex items-center gap-2 text-sm font-bold text-ocean dark:text-aqua">
            <Camera className="h-4 w-4" aria-hidden="true" />
            الشواهد الرقمية
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-ink dark:text-white">مواد جاهزة لتوثيق استخدام البرنامج التقني</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            بطاقات منظمة يمكن استخدامها لاحقًا في تقرير الشواهد: واجهة، درس، نشاط، تجربة، مساعد، اختبار، نتيجة، وتغذية راجعة.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {evidenceCards.map((card, index) => (
            <article key={card} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/6">
              <div className="flex items-center justify-between gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-ocean/10 text-ocean dark:bg-aqua/10 dark:text-aqua">
                  <ClipboardList className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-600 dark:bg-white/10 dark:text-slate-200">
                  شاهد {index + 1}
                </span>
              </div>
              <h2 className="mt-5 text-lg font-extrabold text-ink dark:text-white">{card}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                مساحة توثيق مختصرة تشمل وصفًا، لقطة شاشة مستقبلية، وملاحظة تربوية عن أثر العنصر.
              </p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-extrabold text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-200">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                جاهز للتوثيق
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
