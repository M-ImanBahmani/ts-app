import PageHeader from "../../global/PageHeader";
import PagesLayout from "../../global/PagesLayout";
import DSButton from "../../design-system/DsButton";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();

  return (
    <PagesLayout>
      <main className="flex min-h-[80vh] items-center justify-center px-4">
        <form className="w-full max-w-md rounded-2xl border border-gray-600 bg-gray-800 p-8 shadow-2xl">
          <header className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 text-xl font-bold text-white">
              R
            </div>

            <PageHeader text="Reset Password" />

            <p className="mt-2 text-sm text-gray-400">
              Enter your email to reset your password.
            </p>
          </header>

          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="mb-6 w-full rounded-lg border border-gray-600 bg-gray-900 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />

          <DSButton
            type="submit"
            color="blue"
            text="Reset Password"
            size="lg"
            tooltip="Reset Password"
            className="w-full justify-center py-3 font-semibold"
          />

          <button
            type="button"
            className="mt-5 w-full text-center text-sm text-gray-400 transition hover:text-gray-200"
            onClick={() => navigate("/login")}
          >
            ← Back to Login
          </button>
        </form>
      </main>
    </PagesLayout>
  );
}

export default ResetPassword;
