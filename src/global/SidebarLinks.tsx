import { NavLink } from "react-router-dom";
import {
  Home,
  FileText,
  Info,
  Phone,
  UserCircle,
  PlusSquare,
  Package,
} from "lucide-react";

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
  isOpen: boolean;
  isMobileOpen: boolean;
  onLinkClick: () => void;
};

export default function SidebarLinks({
  isOpen,
  isMobileOpen,
  onLinkClick,
}: Props) {
  return (
    <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
      <ul className="flex flex-col gap-2">
        {links.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.link}
              onClick={onLinkClick}
              className={({ isActive }) =>
                `flex items-center rounded-xl transition-all duration-300 ${
                  isOpen || isMobileOpen
                    ? "justify-start px-4 py-3"
                    : "md:justify-center md:p-3 justify-start px-4 py-3"
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
                  isOpen || isMobileOpen
                    ? "ml-4 w-auto opacity-100"
                    : "md:ml-0 md:w-0 md:opacity-0 ml-4 w-auto opacity-100"
                }`}
              >
                {item.title}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
