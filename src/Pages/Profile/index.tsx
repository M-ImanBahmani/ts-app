import {
  LoaderCircle,
  Mail,
  UserCircle,
  Terminal,
  CheckCircle2,
} from "lucide-react";
import PageHeader from "../../global/PageHeader";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../Stores/Auth.store";

function Profile() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  if (!sessionStorage.getItem("token")) {
    sessionStorage.removeItem("token");
    navigate("/login");
  }

  if (!user) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-4">
        <div className="flex flex-col items-center gap-6">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-slate-600 bg-slate-800 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            <div
              className="absolute inset-0 animate-ping rounded-full border border-blue-400/50"
              style={{ animationDuration: "1.5s" }}
            ></div>
            <LoaderCircle className="h-10 w-10 animate-spin text-blue-500" />
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <h3 className="animate-pulse text-xl font-bold tracking-wide text-white">
              Loading Profile Data
            </h3>
            <p className="text-sm text-slate-400">
              Please wait while we fetch your information...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] w-full p-4 transition-colors duration-300 sm:p-6 lg:p-8">
      <PageHeader text="User Dashboard" />

      <div className="mx-auto mt-8 max-w-4xl space-y-6">
        {/* هدر پروفایل (سبک کارت‌های شناسایی دیجیتال) */}
        <div className="relative overflow-hidden rounded-4xl border border-white/20 bg-white/40 p-8 shadow-xl backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-800/40">
          {/* افکت‌های نوری پس‌زمینه */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-600/20"></div>
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-600/20"></div>

          <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-liner-to-tr from-blue-600 to-purple-600 blur opacity-70"></div>
              <img
                src={user.image}
                alt="Avatar"
                className="relative h-32 w-32 rounded-full border-4 border-white object-cover shadow-2xl dark:border-slate-800"
              />
              <div className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-green-500 text-white dark:border-slate-800">
                <CheckCircle2 size={16} />
              </div>
            </div>

            <div className="flex flex-1 flex-col items-center pt-2 sm:items-start">
              <span className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">
                Verified Member
              </span>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-lg font-medium text-slate-500 dark:text-slate-400">
                @{user.username}
              </p>
            </div>
          </div>
        </div>

        {/* گرید اطلاعات (Bento Box Style) */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* ایمیل */}
          <div className="flex items-center gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-sm font-bold tracking-wide text-slate-400">
                Email Address
              </p>
              <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
                {user.email}
              </p>
            </div>
          </div>

          {/* جنسیت */}
          <div className="flex items-center gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
              <UserCircle size={24} />
            </div>
            <div>
              <p className="text-sm font-bold tracking-wide text-slate-400">
                Gender
              </p>
              <p className="mt-1 font-semibold capitalize text-slate-800 dark:text-slate-200">
                {user.gender}
              </p>
            </div>
          </div>

          {/* توکن - طراحی ترمینال */}
          <div className="md:col-span-2 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl">
            <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-950 px-6 py-3">
              <Terminal size={16} className="text-slate-500" />
              <span className="text-xs font-mono text-slate-500">
                auth_token.sh
              </span>
            </div>
            <div className="p-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-green-400/70">
                Session Token (Encrypted)
              </p>
              <div className="flex items-center gap-2 font-mono text-sm text-green-400 sm:text-base">
                <span className="select-none text-slate-600">$</span>
                <span className="truncate">
                  {user.accessToken?.substring(0, 40)}...
                </span>
                <span className="h-4 w-2 animate-pulse bg-green-400"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
