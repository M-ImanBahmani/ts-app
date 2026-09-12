import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = { to: string; text?: string };

export default function SharedBackButton({ to, text = "Back" }: Props) {
  const navigate = useNavigate();
  return (
    <div className="mx-auto mb-6 max-w-3xl">
      <button
        onClick={() => navigate(to)}
        className="group flex items-center gap-2.5 rounded-full border border-slate-200 bg-white/80 px-6 py-2.5 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-x-2 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-blue-900/50 dark:hover:bg-slate-800 dark:hover:text-blue-400"
      >
        <ArrowLeft
          size={18}
          className="transition-transform duration-300 group-hover:-translate-x-1"
        />
        {text}
      </button>
    </div>
  );
}
