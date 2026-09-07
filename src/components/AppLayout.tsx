import { Outlet } from "react-router-dom";
import NavHeader from "../global/NavHeader";

function AppLayout() {

  return (
    <div className="flex flex-row min-h-screen bg-slate-900">
      <NavHeader />
      <main className="flex-1 p-8 text-gray-200">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
