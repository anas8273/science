import { Activity, ExternalLink, Globe2, RefreshCw, Satellite } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchArabicWikiSummary, fetchNasaApod, fetchRecentEarthquakes, type EarthquakeItem, type NasaApod, type WikiSummary } from "../services/scienceApi";

const concepts = ["القوة", "الخلية", "الزلازل", "الذرة", "الكهرباء"];

export default function LiveScienceHub() {
  const [earthquakes, setEarthquakes] = useState<EarthquakeItem[]>([]);
  const [apod, setApod] = useState<NasaApod | null>(null);
  const [wikiTerm, setWikiTerm] = useState("القوة");
  const [wiki, setWiki] = useState<WikiSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");

  const loadLiveData = async (term = wikiTerm) => {
    setLoading(true);
    setNotice("");
    const results = await Promise.allSettled([
      fetchRecentEarthquakes(),
      fetchNasaApod(),
      fetchArabicWikiSummary(term),
    ]);

    if (results[0].status === "fulfilled") setEarthquakes(results[0].value);
    if (results[1].status === "fulfilled") setApod(results[1].value);
    if (results[2].status === "fulfilled") setWiki(results[2].value);
    if (results.some((result) => result.status === "rejected")) {
      setNotice("تعذر تحديث بعض البيانات المباشرة مؤقتًا، وبقيت المصادر التعليمية الأساسية متاحة.");
    }
    setLoading(false);
  };

  useEffect(() => {
    void loadLiveData();
  }, []);

  const chooseConcept = (term: string) => {
    setWikiTerm(term);
    void loadLiveData(term);
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/6" aria-labelledby="live-science-title">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-bold text-ocean dark:text-aqua">
            <Satellite className="h-4 w-4" aria-hidden="true" />
            بيانات علمية مباشرة
          </p>
          <h2 id="live-science-title" className="mt-1 text-2xl font-extrabold text-ink dark:text-white">
            مختبر معرفة متصل بمصادر عالمية
          </h2>
        </div>
        <button
          type="button"
          onClick={() => void loadLiveData()}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/10"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
          تحديث البيانات
        </button>
      </div>

      {notice && <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm font-bold text-amber-900 dark:bg-amber-500/10 dark:text-amber-100">{notice}</p>}

      <div className="mt-5 grid gap-4 xl:grid-cols-3">
        <article className="rounded-lg bg-slate-50 p-4 dark:bg-white/5">
          <h3 className="inline-flex items-center gap-2 font-extrabold text-ink dark:text-white">
            <Activity className="h-5 w-5 text-amber-600" aria-hidden="true" />
            زلازل اليوم من USGS
          </h3>
          <div className="mt-3 grid gap-2">
            {earthquakes.length ? (
              earthquakes.map((quake) => (
                <a
                  key={quake.id}
                  href={quake.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-white p-3 text-sm font-semibold text-slate-700 transition hover:bg-aqua/10 dark:bg-ink/40 dark:text-slate-200"
                >
                  <span className="block font-extrabold text-ink dark:text-white">قوة {quake.magnitude.toFixed(1)}</span>
                  <span className="block">{quake.place}</span>
                  <span className="mt-1 block text-xs text-slate-500 dark:text-slate-300">{quake.time}</span>
                </a>
              ))
            ) : (
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">جار تحميل بيانات الزلازل...</p>
            )}
          </div>
        </article>

        <article className="rounded-lg bg-slate-50 p-4 dark:bg-white/5">
          <h3 className="inline-flex items-center gap-2 font-extrabold text-ink dark:text-white">
            <Globe2 className="h-5 w-5 text-ocean dark:text-aqua" aria-hidden="true" />
            مفهوم من موسوعة عربية
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {concepts.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => chooseConcept(term)}
                className={`rounded-lg px-3 py-2 text-xs font-extrabold ${wikiTerm === term ? "bg-ocean text-white" : "bg-white text-slate-700 dark:bg-ink/40 dark:text-slate-200"}`}
              >
                {term}
              </button>
            ))}
          </div>
          <h4 className="mt-4 text-lg font-extrabold text-ink dark:text-white">{wiki?.title ?? wikiTerm}</h4>
          <p className="mt-2 line-clamp-5 text-sm leading-6 text-slate-600 dark:text-slate-300">{wiki?.extract ?? "جار تحميل الملخص..."}</p>
          {wiki?.url && (
            <a href={wiki.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-extrabold text-ocean dark:text-aqua">
              قراءة المزيد
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </article>

        <article className="rounded-lg bg-slate-50 p-4 dark:bg-white/5">
          <h3 className="inline-flex items-center gap-2 font-extrabold text-ink dark:text-white">
            <Satellite className="h-5 w-5 text-violet" aria-hidden="true" />
            صورة علمية من NASA
          </h3>
          {apod?.url ? (
            <div className="mt-3">
              {apod.mediaType === "image" && <img src={apod.url} alt={apod.title} className="h-40 w-full rounded-lg object-cover" />}
              <h4 className="mt-3 font-extrabold text-ink dark:text-white">{apod.title}</h4>
              <p className="mt-2 line-clamp-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{apod.explanation}</p>
            </div>
          ) : (
            <p className="mt-3 text-sm font-semibold text-slate-600 dark:text-slate-300">جار تحميل إثراء NASA...</p>
          )}
        </article>
      </div>
    </section>
  );
}
