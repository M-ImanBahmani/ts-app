import { useNavigate } from "react-router-dom";
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
  X,
} from "lucide-react";
import { DUMMY_BASE_URL } from "../Contstans";
import { useAuthStore } from "../Stores/Auth.store";
import { useCartStore } from "../Stores/Cart.store";
import SidebarNavItem from "./SidebarNavItem";
import SidebarTooltip from "./SidebarTooltip";
import { useMutation } from "@tanstack/react-query";
import { fetchMeApi } from "../Services/login-services";
import { toast } from "react-toastify";

const links = [
  { title: "Home", link: "/app/home", icon: <Home size={22} /> },
  { title: "Posts", link: "/app/posts", icon: <FileText size={22} /> },
  { title: "About Us", link: "/app/about-Us", icon: <Info size={22} /> },
  { title: "Contact Us", link: "/app/contact-Us", icon: <Phone size={22} /> },
  { title: "Profile", link: "/app/profile", icon: <UserCircle size={22} /> },
  { title: "Counter", link: "/app/counter", icon: <PlusSquare size={22} /> },
  { title: "Products", link: "/app/products", icon: <Package size={22} /> },
];

type Props = {
  isMobileOpen: boolean;
  setIsMobileOpen: (isOpen: boolean) => void;
};

function NavHeader({ isMobileOpen, setIsMobileOpen }: Props) {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const { cartItems, clearCart } = useCartStore();

  const [isOpen, setIsOpen] = useState(true);
  const isExpanded = isOpen || isMobileOpen;

  const { mutate } = useMutation({
    mutationFn: fetchMeApi,
    onSuccess: (data) => {
      setUser(data);
    },
    onError: (error: Error) => {
      handleLogout();
      toast.error(error.message || "Session Expired");
    },
  });

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else if (!user) {
      mutate(token);
    }
  }, [navigate, mutate, user]);

  const handleLogout = () => {
    clearCart();
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const gotoProfile = () => {
    navigate("/app/profile");
    setIsMobileOpen(false);
  };

  if (!user) {
    return (
      <aside className="hidden h-screen w-20 flex-col items-center justify-center border-r border-slate-800 bg-slate-900 md:flex sm:w-64 shrink-0">
        <LoaderCircle className="h-8 w-8 animate-spin text-blue-500" />
      </aside>
    );
  }

  return (
    <>
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm md:hidden"
        ></div>
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-60 flex h-screen shrink-0 flex-col border-r border-slate-800 bg-slate-900 transition-all duration-300 ease-in-out md:relative md:translate-x-0 ${
          isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full"
        } ${isOpen ? "md:w-64" : "md:w-20"}`}
      >
        <button
          onClick={() => setIsMobileOpen(false)}
          className="absolute right-4 top-4 text-slate-400 hover:text-white md:hidden"
        >
          <X size={20} />
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-6 z-50 hidden h-7 w-7 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-300 transition-colors hover:bg-blue-600 hover:text-white md:flex"
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        <div className="flex flex-col items-center justify-center pb-4 pt-8 shrink-0">
          <h2
            className={`overflow-hidden whitespace-nowrap font-bold text-white transition-all duration-300 ${
              isExpanded
                ? "w-auto text-xl opacity-100"
                : "h-0 w-0 text-[0px] opacity-0"
            }`}
          >
            My Dashboard
          </h2>

          {cartItems.length > 0 && (
            <SidebarTooltip text="Cart" isExpanded={isExpanded}>
              <div
                className={`relative mx-auto mt-6 flex justify-center transition-all duration-300 ${
                  isExpanded ? "w-4/5" : "w-10"
                }`}
              >
                <DsButton
                  text={isExpanded ? "Cart" : ""}
                  icon={<ShoppingCart size={isExpanded ? 18 : 20} />}
                  color="blue"
                  justIcon={!isExpanded}
                  className={`flex items-center justify-center rounded-xl shadow-lg shadow-blue-900/20 transition-all duration-300 ${
                    isExpanded ? "w-full py-2.5" : "h-10 w-10 p-0"
                  }`}
                  onClick={() => {
                    navigate("/app/cart");
                    setIsMobileOpen(false);
                  }}
                />
                <span className="pointer-events-none absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border-2 border-slate-900 bg-red-500 text-[11px] font-bold text-white shadow-sm">
                  {cartItems.length}
                </span>
              </div>
            </SidebarTooltip>
          )}
        </div>

        {/* با برگرداندن کلاس overflow-y-auto، قابلیت اسکرول فقط در لیست منو اعمال می‌شود */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
          <ul className="flex flex-col gap-2">
            {links.map((item, index) => (
              <SidebarNavItem
                key={index}
                item={item}
                isExpanded={isExpanded}
                onClick={() => setIsMobileOpen(false)}
              />
            ))}
          </ul>
        </nav>

        <div className="border-t border-slate-800 p-4 shrink-0">
          <SidebarTooltip text="Profile" isExpanded={isExpanded}>
            <div
              onClick={gotoProfile}
              className={`mb-4 flex cursor-pointer items-center rounded-xl bg-slate-800 p-2 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white ${
                isExpanded ? "justify-start gap-3 px-3" : "justify-center gap-0"
              }`}
            >
              <LucideUser2 size={24} className="shrink-0 text-blue-400" />
              <div
                className={`flex flex-col overflow-hidden whitespace-nowrap transition-all duration-300 ${
                  isExpanded ? "w-auto opacity-100" : "w-0 opacity-0"
                }`}
              >
                <span className="text-sm font-semibold">{user.firstName}</span>
                <span className="text-xs text-slate-500">{user.lastName}</span>
              </div>
            </div>
          </SidebarTooltip>

          <SidebarTooltip text="Logout" isExpanded={isExpanded}>
            <DsButton
              text={isExpanded ? "Logout" : ""}
              icon={<LogOutIcon size={20} />}
              color="red"
              justIcon={!isExpanded}
              className={`mx-auto flex items-center justify-center transition-all duration-300 ${
                isExpanded
                  ? "w-full rounded-xl py-2"
                  : "h-10 w-10 p-0 rounded-xl"
              }`}
              onClick={handleLogout}
            />
          </SidebarTooltip>
        </div>
      </aside>
    </>
  );
}

export default NavHeader;
