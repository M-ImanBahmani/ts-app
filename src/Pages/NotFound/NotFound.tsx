import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

function NotFound() {
  const navigate = useNavigate();

  return (
    // استفاده مستقیم از رنگ‌های تیره برای پس‌زمینه و متن کل صفحه
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 px-4 text-center text-slate-100">
      <div className="relative">
        {/* عدد 404 با رنگ تیره جذاب و سایه */}
        <h1 className="text-9xl font-extrabold tracking-widest text-slate-800 drop-shadow-2xl sm:text-[12rem]">
          404
        </h1>
        {/* لیبل آبی رنگ روی عدد */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded bg-blue-600 px-4 py-1 text-sm font-bold text-white shadow-lg shadow-blue-900/50">
          Page Not Found
        </div>
      </div>

      <h2 className="mt-8 text-2xl font-bold text-slate-200 md:text-3xl">
        Looks like you've lost your way.
      </h2>

      <p className="mt-4 max-w-md text-slate-400">
        The page you are looking for doesn't exist, has been removed, or is
        temporarily unavailable.
      </p>

      {/* دکمه بازگشت به هوم پیج با هاور انیمیشنی */}
      <button
        onClick={() => navigate("/app/home")}
        className="group mt-10 flex items-center gap-2.5 rounded-full bg-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500 hover:shadow-blue-500/40"
      >
        <Home
          size={18}
          className="transition-transform duration-300 group-hover:-translate-y-0.5"
        />
        Back to Home
      </button>
    </div>
  );
}

export default NotFound;
