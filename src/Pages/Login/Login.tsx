import DSButton from "../../design-system/DsButton";
import PageHeader from "../../global/PageHeader";
import PagesLayout from "../../global/PagesLayout";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { DUMMY_BASE_URL } from "../../Contstans";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  type FormDataType = {
    username: string;
    password: string;
  };
  const [formData, setformData] = useState<FormDataType>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const token = sessionStorage.getItem("token");

  if (token) {
    return <Navigate to={"/app/home"} />;
  }

  const loginHandeler = async () => {
    const res = await fetch(`${DUMMY_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.ok) {
      sessionStorage.setItem("token", data.accessToken);
      return data;
    } else {
      return Promise.reject(data.message);
    }
  };

  const submitHandeler = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const data = await loginHandeler();
      if (data) {
        toast.success("You Logined In Successfuly :)");
        navigate("/app/home");
        console.log("true");
      } else {
        console.log(data.message);
        toast.error("failed");
      }
    } catch (err) {
      console.log(err);
      toast.error(err as string);
      console.log("catch");
    } finally {
      setisLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <PagesLayout>
      <main className="flex min-h-[80vh] items-center justify-center px-4">
        <form
          className="w-full max-w-md rounded-2xl border border-gray-600 bg-gray-800 p-8 shadow-2xl"
          onSubmit={(e) => submitHandeler(e)}
        >
          <header className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 text-xl font-bold text-white">
              L
            </div>

            <PageHeader text="Login" />

            <p className="mt-2 text-sm text-gray-400">
              Welcome back! Please enter your details.
            </p>
          </header>

          <label
            htmlFor="username"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Username
          </label>

          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            value={formData?.username}
            onChange={handleChange}
            className="mb-5 w-full rounded-lg border border-gray-600 bg-gray-900 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            required
          />

          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full rounded-lg border border-gray-600 bg-gray-900 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            required
          />

          <DSButton
            type="button"
            text="Forgot password?"
            className="mt-3 mb-6 block ml-auto text-sm text-blue-400 transition hover:text-blue-300"
            onClick={() => navigate("/reset-pass")}
            isDisabled={isLoading}
          />

          <DSButton
            type="submit"
            color="blue"
            text="Login"
            size="lg"
            tooltip="Login"
            className="w-full justify-center py-3 font-semibold"
            isLoading={isLoading}
          />

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <button
              type="button"
              className="font-medium text-blue-400 transition hover:text-blue-300 cursor-pointer"
              disabled
            >
              Sign up
            </button>
          </p>
        </form>
      </main>
    </PagesLayout>
  );
}

export default Login;
