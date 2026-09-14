import { Outlet } from "react-router-dom";
import NavHeader from "../global/NavHeader";
import { useState } from "react";
import { Menu } from "lucide-react";

function AppLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    // ثابت کردن ارتفاع کل صفحه و جلوگیری از اسکرول خوردن کادر اصلی
    <div className="flex h-screen w-full overflow-hidden bg-slate-900">
      <NavHeader
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-900/80 px-6 backdrop-blur-md md:hidden">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:bg-blue-600 hover:text-white"
            >
              <Menu size={20} />
            </button>
            <span className="font-bold text-white">My Dashboard</span>
          </div>
        </header>

        {/* محتوای اصلی به صورت مستقل اسکرول می‌خورد */}
        <main className="flex-1 overflow-y-auto p-6 text-gray-200 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
