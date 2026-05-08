import { CheckCircle2, Info, TriangleAlert } from "lucide-react";
import type { ToastMessage } from "../types";

interface ToastStackProps {
  messages: ToastMessage[];
}

export default function ToastStack({ messages }: ToastStackProps) {
  const icons = {
    success: CheckCircle2,
    info: Info,
    warning: TriangleAlert,
  };

  return (
    <div className="fixed bottom-4 left-4 z-[60] grid w-[min(360px,calc(100vw-2rem))] gap-2" aria-live="polite" aria-atomic="true">
      {messages.map((toast) => {
        const Icon = icons[toast.type];
        return (
          <div key={toast.id} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-semibold text-ink shadow-soft dark:border-white/10 dark:bg-[#101c2f] dark:text-white">
            <Icon className={`mt-0.5 h-5 w-5 ${toast.type === "success" ? "text-emerald-600" : toast.type === "warning" ? "text-amber-600" : "text-ocean"}`} aria-hidden="true" />
            <span>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
}
