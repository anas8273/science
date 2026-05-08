import { Bot, Send, Sparkles, UserRound, Wifi } from "lucide-react";
import { useState } from "react";
import { askScienceTutor } from "../services/scienceApi";

interface Message {
  id: number;
  role: "assistant" | "user";
  text: string;
  provider?: "openai" | "fallback";
}

const suggestions = ["اعملي لي خطة مراجعة", "اشرح القوة مع مثال", "اقترح تجربة آمنة", "كيف تعمل الدائرة الكهربائية؟", "لماذا تحدث الزلازل؟"];

export default function SmartAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text: "مرحبًا، أنا المساعد العلمي الذكي. اسأليني عن الدروس أو التجارب أو الاختبارات، وسأجيبك بخطوات مناسبة للمرحلة المتوسطة.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState<"openai" | "fallback" | "ready">("ready");

  const send = async (value = input) => {
    const trimmed = value.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = { id: Date.now(), role: "user", text: trimmed };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const result = await askScienceTutor(trimmed, {
        page: "assistant",
        audience: "طالبات المرحلة المتوسطة",
      });
      setProvider(result.provider ?? "openai");
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: result.answer,
          provider: result.provider,
        },
      ]);
    } catch {
      setProvider("fallback");
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: "تعذر الاتصال بالمساعد الذكي الآن. أعيدي المحاولة بعد لحظات أو افتحي المختبر والاختبارات حتى يعود الاتصال.",
          provider: "fallback",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-mist py-10 dark:bg-[#0b1524]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/6">
          <p className="inline-flex items-center gap-2 text-sm font-bold text-violet">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            مساعد تعليمي ذكي
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-ink dark:text-white">المساعد العلمي الذكي</h1>
          <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
            اسألي عن أي درس أو تجربة أو اختبار، وسيحوّل سؤالك إلى شرح مبسط وخطوات عملية وخطة مراجعة مناسبة لمستواك.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-extrabold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
            <Wifi className="h-4 w-4" aria-hidden="true" />
            {provider === "ready" ? "جاهز للإجابة" : "جاهز لدعم تعلمك"}
          </div>
          <div className="mt-6 grid gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => void send(suggestion)}
                className="rounded-lg border border-slate-200 px-4 py-3 text-start text-sm font-bold text-slate-700 transition hover:border-aqua hover:bg-aqua/10 dark:border-white/10 dark:text-slate-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </section>

        <section className="flex min-h-[620px] flex-col rounded-lg border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/6" aria-label="محادثة المساعد العلمي">
          <div className="flex items-center gap-3 border-b border-slate-200 p-4 dark:border-white/10">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-ocean text-white">
              <Bot className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-extrabold text-ink dark:text-white">روبوت العلوم</h2>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-300">{loading ? "يفكر في الإجابة..." : "جاهز للإجابة"}</p>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-auto bg-slate-50 p-4 dark:bg-ink/30">
            {messages.map((message) => {
              const assistant = message.role === "assistant";
              return (
                <div key={message.id} className={`flex items-start gap-3 ${assistant ? "justify-start" : "justify-end"}`}>
                  {assistant && (
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-ocean text-white">
                      <Bot className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                  <p className={`max-w-[78%] rounded-lg px-4 py-3 text-sm font-semibold leading-6 ${assistant ? "bg-white text-slate-700 shadow-sm dark:bg-white/10 dark:text-slate-200" : "bg-violet text-white"}`}>
                    {message.text}
                  </p>
                  {!assistant && (
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-violet text-white">
                      <UserRound className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </div>
              );
            })}
            {loading && (
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-ocean text-white">
                  <Bot className="h-5 w-5 animate-pulse" aria-hidden="true" />
                </span>
                <p className="rounded-lg bg-white px-4 py-3 text-sm font-bold text-slate-600 dark:bg-white/10 dark:text-slate-200">جار إعداد إجابة تعليمية...</p>
              </div>
            )}
          </div>

          <form
            className="flex gap-2 border-t border-slate-200 p-4 dark:border-white/10"
            onSubmit={(event) => {
              event.preventDefault();
              void send();
            }}
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-500 dark:border-white/10 dark:bg-ink/40 dark:text-white"
              placeholder="اكتبي سؤالك العلمي..."
              aria-label="سؤال للمساعد العلمي"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-ocean px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#0d536b] disabled:cursor-not-allowed disabled:opacity-60"
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
