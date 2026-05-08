import { X } from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ title, children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-ink/55 p-0 backdrop-blur-sm sm:place-items-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        className="max-h-[88vh] w-full overflow-auto rounded-t-lg bg-white p-5 shadow-soft dark:bg-[#101c2f] sm:max-w-3xl sm:rounded-lg"
      >
        <div className="sticky top-0 z-10 mb-4 flex items-center justify-between gap-3 border-b border-slate-200 bg-white pb-4 dark:border-white/10 dark:bg-[#101c2f]">
          <h2 id="modal-title" className="text-xl font-extrabold text-ink dark:text-white">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/10"
            aria-label="إغلاق النافذة"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
}
