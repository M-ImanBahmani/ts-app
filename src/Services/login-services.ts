import { DUMMY_BASE_URL } from "../Contstans";
import type { loginFormData } from "../Pages/Login/Login";

export const loginApi = async (formData: loginFormData) => {
  const res = await fetch(`${DUMMY_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (res.ok) return data;
  // return Promise.reject(data.message);
  throw Error (data.message)
};

export const fetchMeApi = async (token: string) => {
  const res = await fetch(`${DUMMY_BASE_URL}/auth/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (res.ok) return data;
  // return Promise.reject(data.message);
  throw Error(data.message);
};
