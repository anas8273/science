import { Bot, BookOpen, Brain, ClipboardCheck, FlaskConical, Lightbulb, MessageCircle, Send, Sparkles, UserRound, Wifi, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { askScienceTutor } from "../services/scienceApi";

interface Message {
  id: number;
  role: "assistant" | "user";
  text: string;
  provider?: "openai" | "fallback";
  timestamp?: string;
}


// Local fallback answers when server is unavailable
const localFallbackAnswers: Record<string, string> = {
  "u0627u0644u0642u0648u0629": "u0627u0644u0642u0648u0629 u0647u064a u062fu0641u0639 u0623u0648 u0633u062du0628 u064au0624u062bu0631 u0639u0644u0649 u062cu0633u0645 u0645u0627. u062au0642u0627u0633 u0628u0648u062du062fu0629 u0627u0644u0646u064au0648u062au0646 (N).\n\nu0623u0646u0648u0627u0639 u0627u0644u0642u0648u0649:\nu2022 u0642u0648u0629 u0627u0644u062cu0627u0630u0628u064au0629: u062au062cu0630u0628 u0627u0644u0623u062cu0633u0627u0645 u0646u062du0648 u0627u0644u0623u0631u0636\nu2022 u0642u0648u0629 u0627u0644u0627u062du062au0643u0627u0643: u062au0642u0627u0648u0645 u062du0631u0643u0629 u0627u0644u0623u062cu0633u0627u0645\nu2022 u0627u0644u0642u0648u0629 u0627u0644u0645u063au0646u0627u0637u064au0633u064au0629\nu2022 u0627u0644u0642u0648u0629 u0627u0644u0643u0647u0631u0628u0627u0626u064au0629",
  "u0627u0644u0630u0631u0629": "u0627u0644u0630u0631u0629 u0647u064a u0623u0635u063au0631 u0648u062du062fu0629 u0628u0646u0627u0621 u0641u064a u0627u0644u0645u0627u062fu0629.\n\nu0645u0643u0648u0646u0627u062a u0627u0644u0630u0631u0629:\nu2022 u0627u0644u0628u0631u0648u062au0648u0646u0627u062a: u0645u0648u062cu0628u0629 u0641u064a u0627u0644u0646u0648u0627u0629\nu2022 u0627u0644u0646u064au0648u062au0631u0648u0646u0627u062a: u0645u062au0639u0627u062fu0644u0629 u0641u064a u0627u0644u0646u0648u0627u0629\nu2022 u0627u0644u0625u0644u0643u062au0631u0648u0646u0627u062a: u0633u0627u0644u0628u0629 u062au062fu0648u0631 u062du0648u0644 u0627u0644u0646u0648u0627u0629\n\nu0627u0644u0639u062fu062f u0627u0644u0630u0631u064a = u0639u062fu062f u0627u0644u0628u0631u0648u062au0648u0646u0627u062a",
  "u0627u0644u0643u0647u0631u0628u0627u0621": "u0627u0644u0643u0647u0631u0628u0627u0621 u0647u064a u062au062fu0641u0642 u0627u0644u0625u0644u0643u062au0631u0648u0646u0627u062a u0639u0628u0631 u0645u0648u0635u0644.\n\nu0645u0641u0627u0647u064au0645 u0623u0633u0627u0633u064au0629:\nu2022 u0627u0644u062au064au0627u0631 (u0623u0645u0628u064au0631)\nu2022 u0627u0644u062cu0647u062f (u0641u0648u0644u062a)\nu2022 u0627u0644u0645u0642u0627u0648u0645u0629 (u0623u0648u0645)\n\nu0627u0644u062fu0627u0626u0631u0629 u0627u0644u0643u0647u0631u0628u0627u0626u064au0629 u062au062du062au0627u062c: u0628u0637u0627u0631u064au0629u060c u0623u0633u0644u0627u0643u060c u062du0645u0644u060c u0648u0645u0641u062au0627u062d",
  "u0627u0644u0632u0644u0627u0632u0644": "u0627u0644u0632u0644u0627u0632u0644 u0647u064a u0627u0647u062au0632u0627u0632u0627u062a u0645u0641u0627u062cu0626u0629 u0641u064a u0627u0644u0642u0634u0631u0629 u0627u0644u0623u0631u0636u064au0629.\n\nu0645u0641u0627u0647u064au0645:\nu2022 u0627u0644u0628u0624u0631u0629: u0646u0642u0637u0629 u0627u0644u0628u062fu0627u064au0629 u062au062du062a u0627u0644u0623u0631u0636\nu2022 u0645u0642u064au0627u0633 u0631u064au062eu062au0631: u064au0642u064au0633 u0627u0644u0634u062fu0629\nu2022 u0627u0644u0635u0641u0627u0626u062d u0627u0644u062au0643u062au0648u0646u064au0629: u0633u0628u0628 u0627u0644u0632u0644u0627u0632u0644",
  "u0627u0644u062eu0644u064au0629": "u0627u0644u062eu0644u064au0629 u0647u064a u0627u0644u0648u062du062fu0629 u0627u0644u0623u0633u0627u0633u064au0629 u0644u0644u062du064au0627u0629.\n\nu0639u0636u064au0627u062a u0627u0644u062eu0644u064au0629:\nu2022 u0627u0644u0646u0648u0627u0629: u0645u0631u0643u0632 u0627u0644u062au062du0643u0645 (DNA)\nu2022 u0627u0644u0645u064au062au0648u0643u0648u0646u062fu0631u064au0627: u0645u062du0637u0629 u0627u0644u0637u0627u0642u0629\nu2022 u0627u0644u063au0634u0627u0621 u0627u0644u0628u0644u0627u0632u0645u064a: u064au062au062du0643u0645 u0628u0627u0644u0646u0641u0627u0630u064au0629",
};

function getLocalAnswer(question: string): string {
  const q = question;
  if (q.includes("u0642u0648u0629") || q.includes("u062fu0641u0639") || q.includes("u0633u062du0628") || q.includes("u0646u064au0648u062au0646")) return localFallbackAnswers["u0627u0644u0642u0648u0629"];
  if (q.includes("u062du0631u0643u0629") || q.includes("u0633u0631u0639u0629") || q.includes("u062au0633u0627u0631u0639")) return localFallbackAnswers["u0627u0644u0642u0648u0629"];
  if (q.includes("u0630u0631u0629") || q.includes("u0628u0631u0648u062au0648u0646") || q.includes("u0625u0644u0643u062au0631u0648u0646") || q.includes("u0639u0646u0635u0631")) return localFallbackAnswers["u0627u0644u0630u0631u0629"];
  if (q.includes("u0643u0647u0631u0628u0627u0621") || q.includes("u062au064au0627u0631") || q.includes("u062fu0627u0626u0631u0629") || q.includes("u0628u0637u0627u0631u064au0629")) return localFallbackAnswers["u0627u0644u0643u0647u0631u0628u0627u0621"];
  if (q.includes("u0632u0644u0632u0627u0644") || q.includes("u0628u0631u0643u0627u0646") || q.includes("u0635u0641u0627u0626u062d")) return localFallbackAnswers["u0627u0644u0632u0644u0627u0632u0644"];
  if (q.includes("u062eu0644u064au0629") || q.includes("u0646u0648u0627u0629") || q.includes("DNA") || q.includes("u0648u0631u0627u062b")) return localFallbackAnswers["u0627u0644u062eu0644u064au0629"];
  return "u0634u0643u0631u064bu0627 u0639u0644u0649 u0633u0624u0627u0644u0643! u064au0645u0643u0646u0643 u062au0635u0641u062d u0627u0644u062fu0631u0648u0633 u0627u0644u062au0641u0627u0639u0644u064au0629 u0644u0644u062du0635u0648u0644 u0639u0644u0649 u0625u062cu0627u0628u0629 u0645u0641u0635u0644u0629u060c u0623u0648 u062du0627u0648u0644u064a u0635u064au0627u063au0629 u0633u0624u0627u0644u0643 u0628u0634u0643u0644 u0623u0643u062bu0631 u062au062du062fu064au062fu064bu0627.";
}
const categories = [
  { label: "شرح درس", icon: BookOpen, color: "from-blue-500 to-cyan-500", suggestions: ["اشرحي لي درس القوة والحركة", "ما هي الآلات البسيطة؟", "اشرحي الذرة والعناصر"] },
  { label: "تجربة عملية", icon: FlaskConical, color: "from-teal-500 to-emerald-500", suggestions: ["اقترحي تجربة آمنة عن الكثافة", "كيف أعمل دائرة كهربائية؟", "تجربة بركان بسيطة"] },
  { label: "خطة مراجعة", icon: ClipboardCheck, color: "from-violet-500 to-purple-500", suggestions: ["اعملي لي خطة مراجعة للاختبار", "كيف أذاكر الزلازل والبراكين؟", "خطة أسبوعية لمراجعة العلوم"] },
  { label: "سؤال سريع", icon: Zap, color: "from-amber-500 to-orange-500", suggestions: ["لماذا تحدث الزلازل؟", "ما الفرق بين التغير الفيزيائي والكيميائي؟", "كيف تعمل الخلية؟"] },
];

export default function SmartAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text: "مرحبًا! أنا المساعد العلمي الذكي المدعوم بالذكاء الاصطناعي. يمكنني مساعدتك في:\n\n• شرح أي درس أو مفهوم علمي\n• اقتراح تجارب آمنة وممتعة\n• إعداد خطة مراجعة مخصصة\n• الإجابة على أسئلتك العلمية\n\nاختاري فئة من الأسفل أو اكتبي سؤالك مباشرة!",
      timestamp: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState<"openai" | "fallback" | "ready">("ready");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (value = input) => {
    const trimmed = value.trim();
    if (!trimmed || loading) return;

    const now = new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" });
    const userMessage: Message = { id: Date.now(), role: "user", text: trimmed, timestamp: now };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setActiveCategory(null);
    setLoading(true);

    try {
      const result = await askScienceTutor(trimmed, {
        page: "assistant",
        audience: "طالبات المرحلة المتوسطة",
        requestType: "detailed_explanation",
      });
      setProvider(result.provider ?? "openai");
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: result.answer,
          provider: result.provider,
          timestamp: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch {
      setProvider("fallback");
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: getLocalAnswer(trimmed),
          provider: "fallback",
          timestamp: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-mist py-8 dark:bg-[#0b1524]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
        {/* Sidebar */}
        <aside className="space-y-5">
          {/* Info Card */}
          <section className="card-premium rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-sm">
                <Brain className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-ink dark:text-white">المساعد الذكي</h1>
                <p className="text-xs font-medium text-slate-400">مدعوم بالذكاء الاصطناعي</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
              مساعد تعليمي ذكي مصمم خصيصًا لمنهج العلوم. يقدم شروحات مبسطة، خطط مراجعة، واقتراحات تجارب آمنة بأسلوب مناسب لمستواك.
            </p>
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5 dark:bg-emerald-500/10">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                {provider === "openai" ? "متصل بالذكاء الاصطناعي" : provider === "fallback" ? "وضع الإجابات المحلية" : "جاهز للمساعدة"}
              </span>
            </div>
          </section>

          {/* Categories */}
          <section className="card-premium rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
            <h2 className="mb-4 text-sm font-extrabold text-ink dark:text-white">اختاري نوع المساعدة</h2>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat, idx) => {
                const Icon = cat.icon;
                const isActive = activeCategory === idx;
                return (
                  <button
                    key={cat.label}
                    type="button"
                    onClick={() => setActiveCategory(isActive ? null : idx)}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-all ${
                      isActive
                        ? "border-violet/30 bg-violet/5 text-violet dark:border-violet/40"
                        : "border-slate-200/80 bg-slate-50/50 text-slate-600 hover:border-aqua/30 hover:bg-aqua/5 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                    }`}
                  >
                    <div className={`grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br ${cat.color} text-white`}>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-bold">{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Category Suggestions */}
            {activeCategory !== null && (
              <div className="mt-4 space-y-2 animate-fade-in">
                <p className="text-xs font-bold text-slate-400">اقتراحات:</p>
                {categories[activeCategory].suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => void send(suggestion)}
                    className="w-full rounded-xl border border-slate-200/80 px-3 py-2.5 text-start text-xs font-bold text-slate-600 transition-all hover:border-aqua/40 hover:bg-aqua/5 dark:border-white/10 dark:text-slate-300"
                  >
                    <Lightbulb className="ml-2 inline h-3.5 w-3.5 text-amberSoft" />
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Tips */}
          <section className="rounded-2xl border border-amber-200/60 bg-gradient-to-br from-amber-50 to-orange-50 p-4 dark:border-amber-500/20 dark:from-amber-500/5 dark:to-orange-500/5">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-800 dark:text-amber-300">
              <Lightbulb className="h-4 w-4" />
              نصيحة
            </div>
            <p className="mt-2 text-xs leading-5 text-amber-700 dark:text-amber-200/80">
              للحصول على أفضل إجابة، حددي اسم الدرس أو المفهوم بوضوح. مثال: "اشرحي لي الفرق بين التغير الفيزيائي والكيميائي مع أمثلة".
            </p>
          </section>
        </aside>

        {/* Chat Section */}
        <section className="flex min-h-[700px] flex-col rounded-2xl border border-slate-200/80 bg-white shadow-soft overflow-hidden dark:border-white/10 dark:bg-white/[0.04]" aria-label="محادثة المساعد العلمي">
          {/* Chat Header */}
          <div className="flex items-center gap-3 border-b border-slate-200/60 bg-gradient-to-l from-ocean/5 to-transparent p-4 dark:border-white/10">
            <div className="relative">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-ocean to-aqua text-white shadow-sm">
                <Bot className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="absolute -bottom-0.5 -left-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 dark:border-ink" />
            </div>
            <div>
              <h2 className="font-extrabold text-ink dark:text-white">روبوت العلوم الذكي</h2>
              <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                {loading ? "يكتب الإجابة..." : "متصل ومستعد للمساعدة"}
              </p>
            </div>
            <div className="mr-auto flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 dark:bg-white/10">
              <MessageCircle className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{messages.length} رسالة</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-auto bg-slate-50/50 p-5 dark:bg-ink/20">
            {messages.map((message) => {
              const assistant = message.role === "assistant";
              return (
                <div key={message.id} className={`chat-bubble flex items-end gap-3 ${assistant ? "justify-start" : "justify-end"}`}>
                  {assistant && (
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-ocean to-aqua text-white shadow-sm">
                      <Bot className="h-4 w-4" aria-hidden="true" />
                    </span>
                  )}
                  <div className={`max-w-[80%] ${assistant ? "" : ""}`}>
                    <p className={`rounded-2xl px-4 py-3 text-sm font-medium leading-7 whitespace-pre-wrap ${
                      assistant
                        ? "rounded-br-md bg-white text-slate-700 shadow-sm border border-slate-100 dark:bg-white/10 dark:border-white/5 dark:text-slate-200"
                        : "rounded-bl-md bg-gradient-to-r from-violet to-purple-600 text-white shadow-sm"
                    }`}>
                      {message.text}
                    </p>
                    {message.timestamp && (
                      <p className={`mt-1 text-[10px] font-medium text-slate-400 ${assistant ? "text-start" : "text-end"}`}>
                        {message.timestamp}
                      </p>
                    )}
                  </div>
                  {!assistant && (
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-violet to-purple-600 text-white shadow-sm">
                      <UserRound className="h-4 w-4" aria-hidden="true" />
                    </span>
                  )}
                </div>
              );
            })}
            {loading && (
              <div className="chat-bubble flex items-end gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-ocean to-aqua text-white shadow-sm">
                  <Bot className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="rounded-2xl rounded-br-md bg-white px-5 py-4 shadow-sm border border-slate-100 dark:bg-white/10 dark:border-white/5">
                  <div className="typing-indicator flex gap-1.5">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            className="flex gap-3 border-t border-slate-200/60 bg-white p-4 dark:border-white/10 dark:bg-ink/40"
            onSubmit={(event) => {
              event.preventDefault();
              void send();
            }}
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="min-w-0 flex-1 rounded-xl border border-slate-200/80 bg-slate-50/80 px-4 py-3 text-sm text-ink placeholder:text-slate-400 transition-all focus:border-aqua/50 focus:bg-white focus:ring-2 focus:ring-aqua/20 focus:outline-none dark:border-white/10 dark:bg-ink/40 dark:text-white dark:focus:border-aqua/40"
              placeholder="اكتبي سؤالك العلمي هنا..."
              aria-label="سؤال للمساعد العلمي"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-ocean to-aqua px-5 py-3 text-sm font-bold text-white shadow-sm transition-all hover:shadow-medium disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              إرسال
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
