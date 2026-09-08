import { NavLink, useNavigate } from "react-router-dom";
import DsButton from "../design-system/DsButton";
import { useEffect, useState } from "react";
import {
  LogOutIcon,
  LucideUser2,
  LoaderCircle,
  ChevronLeft,
  ChevronRight,
  Home,
  FileText,
  Info,
  Phone,
  UserCircle,
  PlusSquare,
  Package,
  ShoppingCart,
} from "lucide-react";
import { DUMMY_BASE_URL } from "../Contstans";
import { useAuthStore } from "../Stores/Auth.store";
import { useCartStore } from "../Stores/Cart.store";

// اضافه شدن آیکون به لینک‌ها برای زیبایی در حالت سایدبار بسته
const links = [
  { title: "Home", link: "/app/home", icon: <Home size={22} /> },
  { title: "Posts", link: "/app/posts", icon: <FileText size={22} /> },
  { title: "About Us", link: "/app/about-Us", icon: <Info size={22} /> },
  { title: "Contact Us", link: "/app/contact-Us", icon: <Phone size={22} /> },
  { title: "Profile", link: "/app/profile", icon: <UserCircle size={22} /> },
  { title: "Counter", link: "/app/counter", icon: <PlusSquare size={22} /> },
  { title: "Products", link: "/app/products", icon: <Package size={22} /> },
];

function NavHeader() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const { cartItems, clearCart } = useCartStore();

  // استیت برای کنترل باز و بسته بودن منو
  const [isOpen, setIsOpen] = useState(true);

  const loginApi = async () => {
    const res = await fetch(`${DUMMY_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    if (res.ok) return data;
    return Promise.reject(data.message);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await loginApi();
        setUser(data);
      } catch (error) {
        console.log("Token validation failed:", error);
        handleLogout();
      }
    };

    if (!sessionStorage.getItem("token")) {
      sessionStorage.removeItem("token");
      navigate("/login");
    } else {
      fetchUserData();
    }
  }, []);

  const handleLogout = () => {
    clearCart();
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const gotoProfile = () => {
    navigate("/app/profile");
  };

  if (!user) {
    return (
      <aside className="flex h-screen w-20 sm:w-64 flex-col items-center justify-center border-r border-slate-800 bg-slate-900 sticky top-0">
        <LoaderCircle className="h-8 w-8 animate-spin text-blue-500" />
      </aside>
    );
  }

  return (
    <aside
      className={`sticky top-0 flex h-screen flex-col border-r border-slate-800 bg-slate-900 transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* دکمه باز و بسته کردن منو */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-6 flex h-7 w-7 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-300 transition-colors hover:bg-blue-600 hover:text-white focus:outline-none z-50"
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* هدر سایدبار */}
      <div className="flex flex-col items-center justify-center pt-8 pb-4">
        <h2
          className={`font-bold text-white transition-all duration-300 overflow-hidden whitespace-nowrap ${isOpen ? "text-xl opacity-100" : "text-[0px] opacity-0"}`}
        >
          My Dashboard
        </h2>
        {cartItems.length > 0 && (
          <div
            className={`mt-6 relative flex justify-center ${isOpen ? "mx-4" : "mx-auto"}`}
          >
            <DsButton
              text={isOpen ? "Cart" : ""}
              icon={<ShoppingCart size={isOpen ? 18 : 20} />}
              color="blue"
              className={`w-full ${isOpen ? "justify-center py-2.5" : "justify-center h-10 w-10 p-0"} rounded-xl shadow-lg shadow-blue-900/20`}
              onClick={() => navigate("/app/cart")}
            />

            {/* نشانگر عدد ثابت در گوشه بالا-راست */}
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border-2 border-slate-900 bg-red-500 text-[11px] font-bold text-white shadow-sm pointer-events-none">
              {cartItems.length}
            </span>
          </div>
        )}
      </div>

      {/* لینک‌های منو */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
        <ul className="flex flex-col gap-2">
          {links.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  `flex items-center rounded-xl transition-all duration-300 ${
                    isOpen ? "justify-start px-4 py-3" : "justify-center p-3"
                  } ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <span className="shrink-0">{item.icon}</span>
                <span
                  className={`font-medium transition-all duration-300 overflow-hidden whitespace-nowrap ${
                    isOpen ? "ml-4 w-auto opacity-100" : "ml-0 w-0 opacity-0"
                  }`}
                >
                  {item.title}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* پروفایل و خروج */}
      <div className="border-t border-slate-800 p-4">
        <div
          onClick={gotoProfile}
          className={`mb-4 flex cursor-pointer items-center justify-center rounded-xl bg-slate-800 p-2 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white ${isOpen ? "gap-3" : "gap-0"}`}
        >
          <LucideUser2 size={24} className="shrink-0 text-blue-400" />
          <div
            className={`flex flex-col overflow-hidden whitespace-nowrap transition-all duration-300 ${isOpen ? "w-auto opacity-100" : "w-0 opacity-0"}`}
          >
            <span className="text-sm font-semibold">{user.firstName}</span>
            <span className="text-xs text-slate-500">{user.lastName}</span>
          </div>
        </div>

        <DsButton
          text={isOpen ? "Logout" : ""}
          icon={<LogOutIcon size={20} />}
          color="red"
          className={`w-full justify-center rounded-xl transition-all ${isOpen ? "py-2" : "h-10 w-10 p-0"}`}
          onClick={handleLogout}
        />
      </div>
    </aside>
  );
}

export default NavHeader;
