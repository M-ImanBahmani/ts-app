import { LoaderCircle, Mail, ShieldCheck, UserCircle } from "lucide-react";
import PageHeader from "../../global/PageHeader";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../Stores/Auth.store";


function Profile() {
  const { user } = useAuthStore();

  const navigate = useNavigate();

  // const loginApi = async () => {
  //   const res = await fetch(`${DUMMY_BASE_URL}/auth/me`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Pass JWT via Authorization header
  //     },
  //   });
  //   const data = await res.json();
  //   if (res.ok) {
  //     return data;
  //   } else {
  //     return Promise.reject(data.message);
  //   }
  // };

  if (!sessionStorage.getItem("token")) {
    console.log("useEffect is run");
    sessionStorage.removeItem("token");
    navigate("/login");
  }

  if (!user) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-4">
        <div className="flex flex-col items-center gap-6">
          {/* دایره بزرگتر مخصوص عکس پروفایل با افکت نئونی */}
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-slate-600 bg-slate-800 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            {/* موج پالس‌دار اطراف دایره */}
            <div
              className="absolute inset-0 rounded-full border border-blue-400/50 animate-ping"
              style={{ animationDuration: "1.5s" }}
            ></div>

            {/* اسپینر اصلی */}
            <LoaderCircle className="h-10 w-10 animate-spin text-blue-500" />
          </div>

          {/* متن‌های لودینگ */}
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
    <div className="w-full min-h-[80vh] p-4 text-gray-800 transition-colors duration-300 dark:text-gray-200">
      <PageHeader text="Profile" />

      <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
        {/* هدر رنگی پروفایل */}
        <div className="h-32 w-full bg-linear-to-r from-blue-600 to-purple-600"></div>

        <div className="relative px-6 pb-8 text-center md:text-left">
          {/* بخش آواتار و نام */}
          <div className="flex flex-col items-center md:flex-row md:items-end md:gap-6">
            <img
              // استفاده از عکس دریافتی از سرور
              src={user.image}
              alt="Profile Avatar"
              className="-mt-16 h-32 w-32 rounded-full border-4 border-white bg-gray-200 object-cover dark:border-gray-800 dark:bg-gray-700"
            />
            <div className="mt-4 md:mt-0 md:pb-2">
              <h2 className="text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                @{user.username}
              </p>
            </div>
          </div>

          {/* باکس‌های اطلاعات تکمیلی */}
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center gap-4 rounded-xl bg-gray-50 p-4 transition-colors hover:bg-gray-100 dark:bg-gray-900/50 dark:hover:bg-gray-900">
              <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Email Address
                </p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl bg-gray-50 p-4 transition-colors hover:bg-gray-100 dark:bg-gray-900/50 dark:hover:bg-gray-900">
              <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/30">
                <UserCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Gender
                </p>
                {/* Capitalize برای بزرگ کردن حرف اول جنسیت */}
                <p className="font-medium capitalize">{user.gender}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl bg-gray-50 p-4 transition-colors hover:bg-gray-100 md:col-span-2 dark:bg-gray-900/50 dark:hover:bg-gray-900">
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="w-full overflow-hidden">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Access Token (Hidden)
                </p>
                <p className="truncate font-mono text-sm text-gray-400">
                  {user.accessToken?.substring(0, 30)}...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
