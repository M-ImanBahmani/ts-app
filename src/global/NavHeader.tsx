import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  LogOutIcon,
  LucideUser2,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  X,
} from "lucide-react";

import { useAuthStore } from "../Stores/Auth.store";
import { useCartStore } from "../Stores/Cart.store";
import { fetchMeApi } from "../Services/login-services";

import DsButton from "../design-system/DsButton";
import DsTypography from "../design-system/DsTypography";
import SidebarTooltip from "./SidebarTooltip";
import SidebarLinks from "./SidebarLinks";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";

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
    onSuccess: (data) => setUser(data),
    onError: (error: Error) => {
      handleLogout();
      toast.error(error.message || "Session Expired");
    },
  });

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) navigate("/login");
    else if (!user) mutate(token);
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
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          width: 80,
          height: "100vh",
          borderRight: 1,
          borderColor: "divider",
          bgcolor: "background.default",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const drawerContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <IconButton
        onClick={() => setIsMobileOpen(false)}
        sx={{
          display: { xs: "flex", md: "none" },
          position: "absolute",
          right: 8,
          top: 8,
          color: "text.secondary",
        }}
      >
        <X size={20} />
      </IconButton>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pb: 2,
          pt: 4,
          flexShrink: 0,
        }}
      >
        <DsTypography
          element="h2"
          variant="h6"
          color="text.primary"
          sx={{
            fontWeight: "bold",
            opacity: isExpanded ? 1 : 0,
            width: isExpanded ? "auto" : 0,
            transition: "all 0.3s",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          My Dashboard
        </DsTypography>

        {cartItems.length > 0 && (
          <SidebarTooltip text="Cart" isExpanded={isExpanded}>
            <Box
              sx={{
                mt: 3,
                width: isExpanded ? "80%" : 40,
                transition: "width 0.3s",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Badge badgeContent={cartItems.length} color="error">
                <DsButton
                  text={isExpanded ? "Cart" : ""}
                  icon={<ShoppingCart size={isExpanded ? 18 : 20} />}
                  color="blue"
                  justIcon={!isExpanded}
                  className={
                    isExpanded
                      ? "w-full py-2.5 shadow-lg shadow-blue-900/20"
                      : "h-10 w-10 p-0 shadow-lg shadow-blue-900/20"
                  }
                  onClick={() => {
                    navigate("/app/cart");
                    setIsMobileOpen(false);
                  }}
                />
              </Badge>
            </Box>
          </SidebarTooltip>
        )}
      </Box>

      <SidebarLinks
        isOpen={isOpen}
        isMobileOpen={isMobileOpen}
        onLinkClick={() => setIsMobileOpen(false)}
      />

      <Divider />

      <Box sx={{ p: 2, flexShrink: 0 }}>
        <SidebarTooltip text="Profile" isExpanded={isExpanded}>
          <Box
            onClick={gotoProfile}
            sx={{
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: isExpanded ? "flex-start" : "center",
              gap: isExpanded ? 1.5 : 0,
              p: 1,
              borderRadius: 3,
              cursor: "pointer",
              bgcolor: "background.paper",
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <LucideUser2 size={24} className="text-blue-400 shrink-0" />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                opacity: isExpanded ? 1 : 0,
                width: isExpanded ? "auto" : 0,
                transition: "all 0.3s",
                whiteSpace: "nowrap",
              }}
            >
              <DsTypography
                element="span"
                variant="body2"
                color="text.primary"
                sx={{ fontWeight: "bold" }}
              >
                {user.firstName}
              </DsTypography>
              <DsTypography
                element="span"
                variant="caption"
                color="text.secondary"
              >
                {user.lastName}
              </DsTypography>
            </Box>
          </Box>
        </SidebarTooltip>

        <SidebarTooltip text="Logout" isExpanded={isExpanded}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <DsButton
              text={isExpanded ? "Logout" : ""}
              icon={<LogOutIcon size={20} />}
              color="red"
              justIcon={!isExpanded}
              className={isExpanded ? "w-full py-2" : "h-10 w-10 p-0"}
              onClick={handleLogout}
            />
          </Box>
        </SidebarTooltip>
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 256,
            bgcolor: "background.default",
            backgroundImage: "none",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component="aside"
        sx={{
          width: isOpen ? 256 : 80,
          transition: "width 0.3s ease-in-out",
          flexShrink: 0,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          height: "100vh",
          borderRight: "1px solid",
          borderColor: "divider",
          bgcolor: "background.default",
          position: "relative",
        }}
      >
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            position: "absolute",
            right: -14,
            top: 24,
            zIndex: 50,
            width: 28,
            height: 28,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            "&:hover": {
              bgcolor: "primary.main",
              color: "primary.contrastText",
            },
          }}
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </IconButton>

        {drawerContent}
      </Box>
    </>
  );
}

export default NavHeader;
