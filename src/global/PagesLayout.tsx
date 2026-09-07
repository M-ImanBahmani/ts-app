import type { FC, PropsWithChildren } from "react";

const PagesLayout : FC<PropsWithChildren> = ({ children }) =>{
  return (
    <main className="flex flex-col min-h-screen bg-slate-900 justify-center items-center text-gray-200 p-8">
      {children}
    </main>
  );
}
export default PagesLayout;
