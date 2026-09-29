import { NavLink } from "react-router-dom";
import SidebarTooltip from "./SidebarTooltip";
import type { ReactNode } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

type Props = {
  item: { title: string; link: string; icon: ReactNode };
  isExpanded: boolean;
  onClick: () => void;
};

function SidebarNavItem({ item, isExpanded, onClick }: Props) {
  return (
    <ListItem disablePadding sx={{ display: "block", mb: 0.5 }}>
      <SidebarTooltip text={item.title} isExpanded={isExpanded}>
        <ListItemButton
          component={NavLink} // اتصال قدرت روتر به دکمه متریال
          to={item.link}
          onClick={onClick}
          sx={{
            minHeight: 48,
            justifyContent: isExpanded ? "initial" : "center",
            px: 2.5,
            borderRadius: "12px",
            // استایل‌های حالت اکتیو (active) که توسط NavLink اضافه می‌شود
            "&.active": {
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              boxShadow: "0 4px 14px 0 rgba(37, 99, 235, 0.2)",
              "& .MuiListItemIcon-root": {
                color: "primary.contrastText",
              },
            },
            // استایل هاور برای زمانی که لینک اکتیو نیست
            "&:hover:not(.active)": {
              backgroundColor: "background.paper", // استفاده از رنگ‌های تم
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: isExpanded ? 2 : "auto",
              justifyContent: "center",
              color: "text.secondary",
            }}
          >
            {item.icon}
          </ListItemIcon>

          <ListItemText
            primary={item.title}
            sx={{
              opacity: isExpanded ? 1 : 0,
              width: isExpanded ? "auto" : 0,
              overflow: "hidden",
              whiteSpace: "nowrap",
              transition: "all 0.3s ease",
            }}
          />
        </ListItemButton>
      </SidebarTooltip>
    </ListItem>
  );
}

export default SidebarNavItem;
