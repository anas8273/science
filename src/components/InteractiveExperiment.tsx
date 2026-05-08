import { Atom, BatteryCharging, Flame, Magnet, RadioTower, RotateCcw, ShipWheel, SlidersHorizontal, ToggleLeft, ToggleRight } from "lucide-react";
import { useMemo, useState } from "react";
import type { Experiment } from "../types";

interface InteractiveExperimentProps {
  experiment: Experiment;
  onComplete?: (experimentId: string) => void;
}

const materialExamples = [
  { item: "انصهار الجليد", answer: "فيزيائي", hint: "تغيرت الحالة ولم تتكون مادة جديدة." },
  { item: "احتراق الورق", answer: "كيميائي", hint: "تكون رماد وغازات؛ أي مواد جديدة." },
  { item: "ذوبان السكر", answer: "فيزيائي", hint: "يمكن استعادة السكر بالتبخير غالبًا." },
  { item: "صدأ الحديد", answer: "كيميائي", hint: "تكونت مادة جديدة هي الصدأ." },
];

const conductors = [
  { item: "النحاس", answer: "موصل" },
  { item: "الخشب الجاف", answer: "عازل" },
  { item: "الألومنيوم", answer: "موصل" },
  { item: "البلاستيك", answer: "عازل" },
];

export default function InteractiveExperiment({ experiment, onComplete }: InteractiveExperimentProps) {
  const [force, setForce] = useState(45);
  const [closed, setClosed] = useState(false);
  const [density, setDensity] = useState(80);
  const [pressure, setPressure] = useState(35);
  const [coils, setCoils] = useState(5);
  const [protons, setProtons] = useState(6);
  const [electrons, setElectrons] = useState(6);
  const [neutrons, setNeutrons] = useState(6);
  const [seismic, setSeismic] = useState(35);
  const [notebook, setNotebook] = useState("");
  const [classificationFeedback, setClassificationFeedback] = useState<string>("اختاري تصنيفًا لتظهر التغذية الراجعة.");

  const motionDistance = Math.min(78, 12 + force * 0.62);
  const speed = Math.round(force * 1.8);
  const floats = density < 100;
  const eruption = pressure > 72;
  const magnetPower = Math.min(100, coils * 12);
  const atomCharge = protons - electrons;
  const atomMass = protons + neutrons;

  const icon = useMemo(() => {
    if (experiment.kind === "circuit") return BatteryCharging;
    if (experiment.kind === "volcano") return Flame;
    if (experiment.kind === "magnetism") return Magnet;
    if (experiment.kind === "atom-builder") return Atom;
    if (experiment.kind === "seismograph") return RadioTower;
    if (experiment.kind === "buoyancy") return ShipWheel;
    return SlidersHorizontal;
  }, [experiment.kind]);

  const Icon = icon;

  const markDone = () => onComplete?.(experiment.id);

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/6" aria-labelledby={`${experiment.id}-title`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-bold text-ocean dark:text-aqua">
            <Icon className="h-4 w-4" aria-hidden="true" />
            مختبر العلوم التفاعلي
          </p>
          <h3 id={`${experiment.id}-title`} className="mt-1 text-2xl font-extrabold text-ink dark:text-white">
            {experiment.title}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">{experiment.objective}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setForce(45);
            setClosed(false);
            setDensity(80);
            setPressure(35);
            setCoils(5);
            setProtons(6);
            setElectrons(6);
            setNeutrons(6);
            setSeismic(35);
            setNotebook("");
            setClassificationFeedback("أعيدت التجربة. ابدئي من جديد.");
          }}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/10"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          إعادة التجربة
        </button>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <div className="rounded-lg bg-slate-50 p-4 dark:bg-white/5">
            <h4 className="font-extrabold text-ink dark:text-white">الأدوات</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {experiment.tools.map((tool) => (
                <span key={tool} className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-700 dark:bg-ink/40 dark:text-slate-200">
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-slate-50 p-4 dark:bg-white/5">
            <h4 className="font-extrabold text-ink dark:text-white">خطوات التنفيذ</h4>
            <ol className="mt-3 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
              {experiment.steps.map((step, index) => (
                <li key={step} className="flex gap-2">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-aqua/15 text-xs font-extrabold text-ocean dark:text-aqua">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-mist p-5 dark:border-white/10 dark:bg-ink/40">
          {experiment.kind === "force" && (
            <div>
              <label className="text-sm font-bold text-ink dark:text-white" htmlFor={`${experiment.id}-force`}>
                مقدار القوة: {force} نيوتن
              </label>
              <input
                id={`${experiment.id}-force`}
                type="range"
                min="10"
                max="100"
                value={force}
                onChange={(event) => setForce(Number(event.target.value))}
                className="mt-3 w-full accent-teal-500"
              />
              <div className="relative mt-10 h-36 rounded-lg bg-white p-4 dark:bg-white/10">
                <div className="cart-track absolute bottom-12 right-4 left-4 h-1 rounded-full bg-slate-300" />
                <div className="absolute bottom-[38px] h-12 w-16 rounded-lg bg-aqua transition-all duration-500" style={{ right: `${motionDistance}%` }}>
                  <span className="absolute -bottom-2 right-2 h-5 w-5 rounded-full bg-ink" />
                  <span className="absolute -bottom-2 left-2 h-5 w-5 rounded-full bg-ink" />
                </div>
              </div>
              <p className="mt-3 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-700 dark:bg-white/10 dark:text-slate-200">
                السرعة التقريبية: {speed} سم/ث. القوة الأكبر تؤدي إلى تغير أسرع في الحركة.
              </p>
            </div>
          )}

          {experiment.kind === "circuit" && (
            <div>
              <button
                type="button"
                onClick={() => setClosed((value) => !value)}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-extrabold transition ${closed ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-200"}`}
                aria-pressed={closed}
              >
                {closed ? <ToggleRight className="h-5 w-5" aria-hidden="true" /> : <ToggleLeft className="h-5 w-5" aria-hidden="true" />}
                {closed ? "الدائرة مغلقة" : "الدائرة مفتوحة"}
              </button>
              <div className="mt-6 grid place-items-center rounded-lg bg-white p-8 dark:bg-white/10">
                <div className="relative h-52 w-full max-w-md">
                  <div className={`absolute inset-x-10 top-1/2 h-1 ${closed ? "bg-emerald-500" : "bg-slate-300"}`} />
                  <div className="absolute right-4 top-[82px] rounded-lg bg-ink px-4 py-3 text-white">بطارية</div>
                  <div className={`absolute left-8 top-[68px] grid h-20 w-20 place-items-center rounded-full border-4 ${closed ? "border-amber-400 bg-amber-100 text-amber-900 shadow-[0_0_35px_rgba(251,191,36,0.7)]" : "border-slate-300 bg-slate-100 text-slate-500"}`}>
                    مصباح
                  </div>
                </div>
              </div>
              <p className="mt-3 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-700 dark:bg-white/10 dark:text-slate-200">
                {closed ? "إجابة رائعة، الدائرة المغلقة تسمح بمرور التيار فيضيء المصباح." : "الدائرة المفتوحة تقطع مسار التيار فينطفئ المصباح."}
              </p>
            </div>
          )}

          {experiment.kind === "classification" && (
            <div>
              <div className="grid gap-3 md:grid-cols-2">
                {materialExamples.map((example) => (
                  <div key={example.item} className="rounded-lg bg-white p-4 dark:bg-white/10">
                    <p className="font-bold text-ink dark:text-white">{example.item}</p>
                    <div className="mt-3 flex gap-2">
                      {["فيزيائي", "كيميائي"].map((choice) => (
                        <button
                          key={choice}
                          type="button"
                          onClick={() => setClassificationFeedback(choice === example.answer ? `صحيح: ${example.hint}` : `حاولي مرة أخرى: ${example.hint}`)}
                          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/10"
                        >
                          {choice}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 rounded-lg bg-violet/10 px-3 py-2 text-sm font-bold text-violet dark:text-violet-200">{classificationFeedback}</p>
            </div>
          )}

          {experiment.kind === "buoyancy" && (
            <div>
              <label className="text-sm font-bold text-ink dark:text-white" htmlFor={`${experiment.id}-density`}>
                كثافة الجسم مقارنة بالماء: {density}%
              </label>
              <input
                id={`${experiment.id}-density`}
                type="range"
                min="30"
                max="170"
                value={density}
                onChange={(event) => setDensity(Number(event.target.value))}
                className="mt-3 w-full accent-teal-500"
              />
              <div className="relative mt-6 h-56 rounded-lg bg-white p-6 dark:bg-white/10">
                <div className="absolute inset-x-10 bottom-6 h-32 rounded-lg bg-aqua/30" />
                <div
                  className={`absolute left-1/2 h-16 w-16 -translate-x-1/2 rounded-lg border-2 border-ocean bg-amberSoft transition-all duration-500 ${floats ? "bottom-28" : "bottom-10"}`}
                />
              </div>
              <p className="mt-3 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-700 dark:bg-white/10 dark:text-slate-200">
                {floats ? "الجسم أقل كثافة من الماء، لذلك يطفو." : "الجسم أعلى كثافة من الماء، لذلك يغوص."}
              </p>
            </div>
          )}

          {experiment.kind === "volcano" && (
            <div>
              <label className="text-sm font-bold text-ink dark:text-white" htmlFor={`${experiment.id}-pressure`}>
                ضغط الغازات: {pressure}%
              </label>
              <input
                id={`${experiment.id}-pressure`}
                type="range"
                min="10"
                max="100"
                value={pressure}
                onChange={(event) => setPressure(Number(event.target.value))}
                className="mt-3 w-full accent-orange-500"
              />
              <div className="relative mt-6 h-56 overflow-hidden rounded-lg bg-white dark:bg-white/10">
                <div className="absolute bottom-0 left-1/2 h-0 w-0 -translate-x-1/2 border-b-[170px] border-l-[110px] border-r-[110px] border-b-slate-500 border-l-transparent border-r-transparent" />
                <div className={`absolute left-1/2 w-12 -translate-x-1/2 rounded-t-full bg-orange-500 transition-all ${eruption ? "top-8 h-24" : "top-32 h-12"}`} />
                {eruption && <div className="absolute left-1/2 top-4 h-10 w-28 -translate-x-1/2 rounded-full bg-amberSoft/100" />}
              </div>
              <p className="mt-3 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-700 dark:bg-white/10 dark:text-slate-200">
                {eruption ? "زاد الضغط بما يكفي لدفع الصهارة نحو الفوهة." : "الصهارة ترتفع تدريجيًا، لكن الضغط لم يصل إلى مرحلة الثوران."}
              </p>
            </div>
          )}

          {experiment.kind === "magnetism" && (
            <div>
              <label className="text-sm font-bold text-ink dark:text-white" htmlFor={`${experiment.id}-coils`}>
                عدد لفات السلك: {coils}
              </label>
              <input
                id={`${experiment.id}-coils`}
                type="range"
                min="1"
                max="8"
                value={coils}
                onChange={(event) => setCoils(Number(event.target.value))}
                className="mt-3 w-full accent-violet-500"
              />
              <div className="mt-6 rounded-lg bg-white p-6 dark:bg-white/10">
                <div className="mx-auto h-12 max-w-sm rounded-full border-4 border-violet bg-violet/10" style={{ boxShadow: `0 0 ${magnetPower / 2}px rgba(118,97,232,0.7)` }} />
                <div className="mt-8 flex justify-center gap-2">
                  {Array.from({ length: Math.ceil(magnetPower / 20) }).map((_, index) => (
                    <span key={index} className="h-5 w-8 rounded-lg bg-slate-400" />
                  ))}
                </div>
              </div>
              <p className="mt-3 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-700 dark:bg-white/10 dark:text-slate-200">
                قوة الجذب التقريبية: {magnetPower}%. زيادة اللفات تقوي المغناطيس الكهربائي.
              </p>
            </div>
          )}

          {experiment.kind === "atom-builder" && (
            <div>
              <div className="grid gap-4 md:grid-cols-3">
                <RangeControl id={`${experiment.id}-p`} label="البروتونات" value={protons} min={1} max={10} onChange={setProtons} />
                <RangeControl id={`${experiment.id}-e`} label="الإلكترونات" value={electrons} min={1} max={10} onChange={setElectrons} />
                <RangeControl id={`${experiment.id}-n`} label="النيوترونات" value={neutrons} min={0} max={12} onChange={setNeutrons} />
              </div>
              <div className="mt-6 grid place-items-center rounded-lg bg-white p-6 dark:bg-white/10">
                <div className="relative h-48 w-48 rounded-full border border-aqua/60">
                  <div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-amberSoft text-sm font-extrabold text-ink">
                    نواة
                  </div>
                  {Array.from({ length: Math.min(electrons, 10) }).map((_, index) => (
                    <span
                      key={index}
                      className="absolute h-4 w-4 rounded-full bg-aqua"
                      style={{
                        right: `${48 + Math.cos((index / Math.max(electrons, 1)) * Math.PI * 2) * 40}%`,
                        top: `${48 + Math.sin((index / Math.max(electrons, 1)) * Math.PI * 2) * 40}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-3 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-700 dark:bg-white/10 dark:text-slate-200">
                العدد الذري: {protons}، الكتلة التقريبية: {atomMass}، الشحنة: {atomCharge === 0 ? "متعادل" : atomCharge > 0 ? `موجبة +${atomCharge}` : `سالبة ${atomCharge}`}.
              </p>
            </div>
          )}

          {experiment.kind === "seismograph" && (
            <div>
              <label className="text-sm font-bold text-ink dark:text-white" htmlFor={`${experiment.id}-seismic`}>
                شدة الاهتزاز: {seismic}%
              </label>
              <input
                id={`${experiment.id}-seismic`}
                type="range"
                min="5"
                max="100"
                value={seismic}
                onChange={(event) => setSeismic(Number(event.target.value))}
                className="mt-3 w-full accent-orange-500"
              />
              <div className="mt-6 rounded-lg bg-white p-4 dark:bg-white/10">
                <svg viewBox="0 0 520 170" className="h-48 w-full" role="img" aria-label="رسم موجة زلزالية يتغير حسب شدة الاهتزاز">
                  <path d="M0 85 H520" stroke="#cbd5e1" strokeWidth="2" />
                  <polyline
                    fill="none"
                    stroke="#0F5F7A"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={Array.from({ length: 34 })
                      .map((_, index) => {
                        const x = index * 16;
                        const y = 85 + Math.sin(index * 1.3) * (seismic * 0.72);
                        return `${x},${y}`;
                      })
                      .join(" ")}
                  />
                </svg>
              </div>
              <p className="mt-3 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-700 dark:bg-white/10 dark:text-slate-200">
                كلما زادت شدة الاهتزاز زادت سعة الموجة المسجلة في جهاز الرصد.
              </p>
            </div>
          )}

          <div className="mt-5 grid gap-3 rounded-lg bg-white p-4 text-sm dark:bg-white/10">
            {experiment.practicalTools && (
              <div>
                <p className="font-extrabold text-ink dark:text-white">تجربة عملية آمنة بأدوات بسيطة</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {experiment.practicalTools.map((tool) => (
                    <span key={tool} className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 dark:bg-ink/40 dark:text-slate-200">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {experiment.safety && (
              <p className="rounded-lg bg-amber-50 px-3 py-2 font-bold text-amber-900 dark:bg-amber-500/10 dark:text-amber-100">
                تنبيه أمان: {experiment.safety}
              </p>
            )}
            <label className="grid gap-2 font-bold text-ink dark:text-white">
              دفتر الباحثة: توقعي النتيجة أو اكتبي ملاحظتك
              <textarea
                value={notebook}
                onChange={(event) => setNotebook(event.target.value)}
                className="min-h-24 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-ink dark:border-white/10 dark:bg-ink/40 dark:text-white"
                placeholder="مثال: أتوقع أن زيادة القوة تجعل العربة أسرع..."
              />
            </label>
            <p className="font-bold text-ink dark:text-white">ملاحظة الطالبة: {experiment.observation}</p>
            <p className="font-bold text-ocean dark:text-aqua">الاستنتاج: {experiment.conclusion}</p>
            {experiment.sourceUrl && (
              <a
                href={experiment.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center rounded-lg border border-slate-200 px-3 py-2 text-xs font-extrabold text-ocean hover:bg-aqua/10 dark:border-white/10 dark:text-aqua"
              >
                مصدر علمي داعم للتجربة
              </a>
            )}
            <button
              type="button"
              onClick={markDone}
              className="rounded-lg bg-emerald-600 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-700"
            >
              حفظ التجربة كمكتملة
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ConductivityActivity() {
  const [feedback, setFeedback] = useState("صنفي المادة إلى موصلة أو عازلة.");

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
      <h4 className="font-extrabold text-ink dark:text-white">نشاط: موصل أم عازل؟</h4>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {conductors.map((item) => (
          <div key={item.item} className="rounded-lg bg-white p-3 dark:bg-ink/40">
            <p className="font-bold text-slate-800 dark:text-slate-100">{item.item}</p>
            <div className="mt-2 flex gap-2">
              {["موصل", "عازل"].map((choice) => (
                <button
                  key={choice}
                  type="button"
                  onClick={() => setFeedback(choice === item.answer ? `صحيح: ${item.item} مادة ${item.answer}.` : `راجعي خصائص ${item.item} ثم حاولي مرة أخرى.`)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 dark:border-white/10 dark:text-slate-200"
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 rounded-lg bg-aqua/10 px-3 py-2 text-sm font-bold text-ocean dark:text-aqua">{feedback}</p>
    </div>
  );
}

function RangeControl({
  id,
  label,
  value,
  min,
  max,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-ink dark:text-white" htmlFor={id}>
      {label}: {value}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-teal-500"
      />
    </label>
  );
}
