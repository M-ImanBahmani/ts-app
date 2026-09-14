import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../Services/login-services";
import { useForm } from "react-hook-form";
import PageHeader from "../../global/PageHeader";
import { Lock, LogIn, User, AlertCircle } from "lucide-react";
import DsButton from "../../design-system/DsButton";
import PagesLayout from "../../global/PagesLayout";

export type loginFormData = {
  username: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormData>({
    defaultValues: { username: "", password: "" },
  });

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      sessionStorage.setItem("token", data.accessToken);
      toast.success("You Logged In Successfully :)");
      navigate("/app/home");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const token = sessionStorage.getItem("token");
  if (token) {
    return <Navigate to={"/app/home"} />;
  }

  const onLogin = (formData: loginFormData) => {
    login({ username: formData.username, password: formData.password });
  };

  return (
    <PagesLayout>
      <main className="flex min-h-[80vh] items-center justify-center px-4">
        <form
          className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/80 p-8 shadow-[0_0_40px_rgba(37,99,235,0.1)] backdrop-blur-xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 sm:p-10"
          onSubmit={handleSubmit(onLogin)}
        >
          <header className="mb-10 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-liner-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/30">
              <LogIn size={28} className="translate-x-0.5" />
            </div>
            <PageHeader text="Welcome Back" />
            <p className="mt-3 text-sm font-medium text-slate-400">
              Please enter your details to sign in.
            </p>
          </header>

          <div className="group relative mb-5">
            <label
              htmlFor="username"
              className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 transition-colors group-focus-within:text-blue-500"
            >
              <span>Username</span>
              {errors.username && (
                <span className="flex animate-pulse items-center gap-1 rounded-md bg-red-500/20 px-2 py-1 text-[11px] font-extrabold uppercase tracking-wide text-red-400">
                  <AlertCircle size={14} /> Required
                </span>
              )}
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 transition-colors group-focus-within:text-blue-500">
                <User size={18} />
              </div>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className={`w-full rounded-xl border bg-slate-800/50 py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:bg-slate-800 focus:outline-none focus:ring-4 transition-all duration-300 ${
                  errors.username
                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/10"
                    : "border-slate-700 focus:border-blue-500 focus:ring-blue-500/10"
                }`}
                {...register("username", { required: true })}
              />
            </div>
          </div>

          <div className="group relative mb-2">
            <label
              htmlFor="password"
              className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 transition-colors group-focus-within:text-blue-500"
            >
              <span>Password</span>
              {errors.password && (
                <span className="flex animate-pulse items-center gap-1 rounded-md bg-red-500/20 px-2 py-1 text-[11px] font-extrabold uppercase tracking-wide text-red-400">
                  <AlertCircle size={14} /> Required
                </span>
              )}
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 transition-colors group-focus-within:text-blue-500">
                <Lock size={18} />
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className={`w-full rounded-xl border bg-slate-800/50 py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:bg-slate-800 focus:outline-none focus:ring-4 transition-all duration-300 ${
                  errors.password
                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/10"
                    : "border-slate-700 focus:border-blue-500 focus:ring-blue-500/10"
                }`}
                {...register("password", { required: true })}
              />
            </div>
          </div>

          <div className="mb-8 flex justify-end">
            <button
              type="button"
              className="text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300 disabled:opacity-50"
              onClick={() => navigate("/reset-pass")}
              disabled={isPending}
            >
              Forgot password?
            </button>
          </div>

          <DsButton
            type="submit"
            color="blue"
            text={isPending ? "Signing in..." : "Sign In"}
            size="lg"
            className="w-full justify-center rounded-xl py-4 font-bold shadow-lg shadow-blue-500/25 transition-transform active:scale-[0.98]"
            isLoading={isPending}
          />
        </form>
      </main>
    </PagesLayout>
  );
}

export default Login;
