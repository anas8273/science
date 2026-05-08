import { BookOpen, Brain, Camera, CheckCircle2, ClipboardCheck, FlaskConical, MessageSquare, Star, TrendingUp } from "lucide-react";
import { useState } from "react";

const evidenceItems = [
  {
    title: "واجهة المنصة",
    description: "لقطة شاشة للصفحة الرئيسية توضح تصميم المنصة وأقسامها المتعددة: الدروس، المختبر، الألعاب، والمساعد الذكي.",
    icon: Camera,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-500/10",
    tips: "التقطي صورة للصفحة الرئيسية مع إظهار شريط التنقل وبطاقات الميزات.",
  },
  {
    title: "درس تفاعلي",
    description: "توثيق لدرس كامل يشمل الشرح المبسط، المفاهيم الأساسية، الأمثلة من الحياة اليومية، وسؤال التفكير.",
    icon: BookOpen,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-500/10",
    tips: "وثقي درس الحركة والقوة مع إظهار هدف الدرس والمفاهيم الثلاثة.",
  },
  {
    title: "نشاط تصنيف",
    description: "توثيق لنشاط تفاعلي داخل الدرس يتطلب من الطالبة تصنيف أمثلة حسب نوعها (تغير سرعة / تغير اتجاه).",
    icon: ClipboardCheck,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50 dark:bg-amber-500/10",
    tips: "التقطي صورة للنشاط التفاعلي مع إظهار الأزرار والتصنيفات.",
  },
  {
    title: "تجربة افتراضية",
    description: "توثيق لتجربة المختبر الافتراضي مع شريط التحكم بالقوة، العربة المتحركة، ومؤشر السرعة.",
    icon: FlaskConical,
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50 dark:bg-violet-500/10",
    tips: "وثقي التجربة عند قوة مختلفة وأظهري الاستنتاج والملاحظة.",
  },
  {
    title: "المساعد الذكي",
    description: "توثيق لمحادثة مع المساعد الذكي (عالِمة) يوضح قدرته على شرح المفاهيم وتقديم أمثلة مبسطة.",
    icon: Brain,
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50 dark:bg-pink-500/10",
    tips: "اسألي المساعد عن مفهوم علمي ووثقي الإجابة التفصيلية.",
  },
  {
    title: "اختبار قصير",
    description: "توثيق لاختبار تقويمي يظهر الأسئلة والخيارات مع التصحيح الفوري وعرض سبب الإجابة الصحيحة.",
    icon: ClipboardCheck,
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-500/10",
    tips: "أجيبي على 3 أسئلة ووثقي التصحيح الفوري مع التفسير.",
  },
  {
    title: "نتيجة طالبة",
    description: "توثيق لصفحة التقدم تظهر نسبة الإكمال، الرسم البياني، الشارات المكتسبة، وملخص الإنجاز.",
    icon: TrendingUp,
    color: "from-teal-500 to-emerald-500",
    bgColor: "bg-teal-50 dark:bg-teal-500/10",
    tips: "أكملي بعض الدروس ثم وثقي لوحة التقدم مع الشارات.",
  },
  {
    title: "بطاقة تغذية راجعة",
    description: "توثيق للتغذية الراجعة الفورية بعد الاختبار مع تحليل الأداء والتوصيات لتحسين المستوى.",
    icon: MessageSquare,
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-50 dark:bg-cyan-500/10",
    tips: "أنهي اختبارًا ووثقي شاشة النتيجة مع التوصيات.",
  },
];

export default function EvidencePage() {
  const [completedCards, setCompletedCards] = useState<number[]>([]);

  const toggleComplete = (index: number) => {
    setCompletedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <main className="bg-mist py-10 dark:bg-[#0b1524]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/6">
          <p className="inline-flex items-center gap-2 text-sm font-bold text-ocean dark:text-aqua">
            <Camera className="h-4 w-4" aria-hidden="true" />
            الشواهد الرقمية
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-ink dark:text-white">مواد جاهزة لتوثيق استخدام البرنامج التقني</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            بطاقات منظمة يمكن استخدامها لاحقًا في تقرير الشواهد: واجهة، درس، نشاط، تجربة، مساعد، اختبار، نتيجة، وتغذية راجعة. كل بطاقة تتضمن وصفًا ونصائح للتوثيق.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-extrabold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
              <CheckCircle2 className="h-4 w-4" />
              {completedCards.length} / {evidenceItems.length} مكتمل
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg bg-ocean/10 px-3 py-2 text-xs font-extrabold text-ocean dark:text-aqua">
              <Star className="h-4 w-4" />
              {evidenceItems.length} شواهد متاحة
            </span>
          </div>
        </section>

        {/* Progress Bar */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-slate-600 dark:text-slate-300">تقدم التوثيق</span>
            <span className="text-sm font-extrabold text-ocean dark:text-aqua">
              {Math.round((completedCards.length / evidenceItems.length) * 100)}%
            </span>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-ocean to-aqua transition-all duration-500"
              style={{ width: `${(completedCards.length / evidenceItems.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Evidence Cards Grid */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {evidenceItems.map((card, index) => {
            const Icon = card.icon;
            const isCompleted = completedCards.includes(index);
            return (
              <article
                key={card.title}
                className={`group relative rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-white/6 ${
                  isCompleted
                    ? "border-emerald-300 dark:border-emerald-400/30"
                    : "border-slate-200 dark:border-white/10"
                }`}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between gap-3">
                  <span className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${card.color} text-white shadow-sm`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-600 dark:bg-white/10 dark:text-slate-200">
                    شاهد {index + 1}
                  </span>
                </div>

                {/* Card Content */}
                <h2 className="mt-4 text-lg font-extrabold text-ink dark:text-white">{card.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {card.description}
                </p>

                {/* Tips */}
                <div className="mt-3 rounded-lg bg-amber-50 p-3 dark:bg-amber-500/10">
                  <p className="text-xs font-bold text-amber-700 dark:text-amber-300">
                    <Star className="mb-0.5 inline h-3 w-3" /> نصيحة: {card.tips}
                  </p>
                </div>

                {/* Action Button */}
                <button
                  type="button"
                  onClick={() => toggleComplete(index)}
                  className={`mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all ${
                    isCompleted
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200"
                      : "bg-ocean/10 text-ocean hover:bg-ocean/20 dark:bg-aqua/10 dark:text-aqua"
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {isCompleted ? "تم التوثيق" : "تحديد كمكتمل"}
                </button>
              </article>
            );
          })}
        </section>

        {/* Instructions Section */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/6">
          <h2 className="text-xl font-extrabold text-ink dark:text-white">كيفية إعداد ملف الشواهد</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-ocean text-xs font-extrabold text-white">1</span>
                <h3 className="font-bold text-ink dark:text-white">التقاط الشاشة</h3>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">استخدمي أداة لقطة الشاشة لتوثيق كل عنصر من عناصر المنصة.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-ocean text-xs font-extrabold text-white">2</span>
                <h3 className="font-bold text-ink dark:text-white">كتابة الوصف</h3>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">أضيفي وصفًا مختصرًا لكل لقطة يوضح العنصر وأثره التعليمي.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-ocean text-xs font-extrabold text-white">3</span>
                <h3 className="font-bold text-ink dark:text-white">تجميع الملف</h3>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">رتبي الشواهد في ملف واحد مع ترقيمها وإضافة ملاحظاتك التربوية.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
