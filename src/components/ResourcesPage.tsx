import { BookMarked, ChevronDown, ExternalLink, Lightbulb, Search, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { resources } from "../data/platformData";
import LiveScienceHub from "./LiveScienceHub";

export default function ResourcesPage() {
  const [filter, setFilter] = useState("الكل");
  const [query, setQuery] = useState("");
  const [openFaq, setOpenFaq] = useState("كيف أختار مصدرًا مناسبًا؟");
  const filters = ["الكل", ...Array.from(new Set(resources.map((item) => item.type)))];
  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return resources.filter((item) => {
      const byFilter = filter === "الكل" || item.type === filter;
      const text = `${item.title} ${item.text} ${item.source}`.toLowerCase();
      return byFilter && (!normalized || text.includes(normalized));
    });
  }, [filter, query]);
  const faqs = {
    "كيف أختار مصدرًا مناسبًا؟": "ابدئي بالمصادر الرسمية للمقرر، ثم استخدمي المحاكاة والإثراءات لفهم المفهوم بصريًا.",
    "هل كل الروابط هنا حقيقية؟": "نعم، الروابط تشير إلى مواقع رسمية أو تعليمية موثوقة مثل وزارة التعليم، عين، PhET، NASA، وUSGS.",
    "كيف أستخدم المصدر داخل الدرس؟": "افتحي المصدر بعد قراءة الدرس، ثم اكتبي ملاحظة واحدة وسؤالًا واحدًا في دفتر الباحثة داخل المختبر.",
  };

  return (
    <main className="bg-mist py-10 dark:bg-[#0b1524]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/6">
          <p className="inline-flex items-center gap-2 text-sm font-bold text-ocean dark:text-aqua">
            <BookMarked className="h-4 w-4" aria-hidden="true" />
            مصادر حقيقية موثوقة
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-ink dark:text-white">مراجع ومحاكاة تدعم التعلم الحقيقي</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            مصادر رسمية ومحاكاة علمية وبيانات مباشرة يمكن للطالبة والمعلمة الاستفادة منها في المراجعة والتجارب والإثراء.
          </p>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/6">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
            <label className="flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-white/10 dark:bg-white/5">
              <Search className="h-4 w-4 text-slate-500" aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full bg-transparent px-2 text-sm text-ink placeholder:text-slate-500 focus:outline-none dark:text-white"
                placeholder="ابحثي في المصادر: الزلازل، الدائرة، الذرة..."
                aria-label="البحث في المصادر الحقيقية"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              {filters.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={`rounded-lg px-4 py-2 text-sm font-bold ${filter === item ? "bg-ocean text-white" : "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        <LiveScienceHub />

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((resource) => (
            <article key={resource.url} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/6">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-lg bg-aqua/10 px-3 py-1 text-xs font-extrabold text-ocean dark:text-aqua">{resource.type}</span>
                <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-xs font-extrabold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  {resource.source}
                </span>
              </div>
              <h2 className="mt-4 text-xl font-extrabold text-ink dark:text-white">{resource.title}</h2>
              <p className="mt-2 min-h-[72px] text-sm leading-6 text-slate-600 dark:text-slate-300">{resource.text}</p>
              <a
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-ocean px-4 py-2 text-sm font-bold text-white transition hover:bg-[#0d536b]"
              >
                فتح المصدر
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-lg border border-amber-200 bg-amber-50 p-5 dark:border-amber-300/20 dark:bg-amber-500/10">
            <Lightbulb className="h-7 w-7 text-amber-700 dark:text-amber-200" aria-hidden="true" />
            <h2 className="mt-3 text-xl font-extrabold text-amber-950 dark:text-amber-100">طريقة استفادة ذكية</h2>
            <p className="mt-2 leading-7 text-amber-900 dark:text-amber-100">
              اختاري مصدرًا واحدًا بعد كل درس، افتحيه، ثم اكتبي: فكرة تعلمتها، سؤالًا جديدًا، وتجربة صغيرة يمكن تنفيذها بأدوات آمنة.
            </p>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/6">
            <h2 className="text-xl font-extrabold text-ink dark:text-white">أسئلة شائعة</h2>
            <div className="mt-4 grid gap-2">
              {Object.entries(faqs).map(([question, answer]) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => setOpenFaq(question)}
                  className="rounded-lg border border-slate-200 p-4 text-start dark:border-white/10"
                  aria-expanded={openFaq === question}
                >
                  <span className="flex items-center justify-between gap-3 font-extrabold text-ink dark:text-white">
                    {question}
                    <ChevronDown className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {openFaq === question && <span className="mt-2 block text-sm leading-6 text-slate-600 dark:text-slate-300">{answer}</span>}
                </button>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
