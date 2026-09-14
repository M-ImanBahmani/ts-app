import { NavLink } from "react-router-dom";
import SidebarTooltip from "./SidebarTooltip";
import type { ReactNode } from "react";

type Props = {
  item: { title: string; link: string; icon: ReactNode };
  isExpanded: boolean;
  onClick: () => void;
};

function SidebarNavItem({ item, isExpanded, onClick }: Props) {
  return (
    <li>
      <SidebarTooltip text={item.title} isExpanded={isExpanded}>
        <NavLink
          to={item.link}
          onClick={onClick}
          className={({ isActive }) =>
            `group relative flex items-center rounded-xl transition-all duration-300 ${
              isExpanded ? "justify-start px-4 py-3" : "justify-center p-3"
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
              isExpanded ? "ml-4 w-auto opacity-100" : "ml-0 w-0 opacity-0"
            }`}
          >
            {item.title}
          </span>
        </NavLink>
      </SidebarTooltip>
    </li>
  );
}

export default SidebarNavItem;
