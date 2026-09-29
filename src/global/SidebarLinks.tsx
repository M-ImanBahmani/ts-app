import {
  Home,
  FileText,
  Info,
  Phone,
  UserCircle,
  PlusSquare,
  Package,
} from "lucide-react";
import List from "@mui/material/List";
import SidebarNavItem from "./SidebarNavItem";

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
  // فرمول محاسبه باز بودن سایدبار که قبلاً در هدر داشتیم
  const isExpanded = isOpen || isMobileOpen;

  return (
    <List
      sx={{
        flexGrow: 1,
        overflowY: "auto",
        overflowX: "hidden",
        px: 1.5,
        py: 2,
      }}
    >
      {links.map((item, index) => (
        <SidebarNavItem
          key={index}
          item={item}
          isExpanded={isExpanded}
          onClick={onLinkClick}
        />
      ))}
    </List>
  );
}
