import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import DsTypography from "../design-system/DsTypography";
import NavHeader from "../global/NavHeader";

function AppLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    // Box جایگزین div اصلی شده و ارتفاع کل صفحه را قفل می‌کند
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        bgcolor: "background.default",
      }}
    >
      <NavHeader
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* ظرف دربرگیرنده هدر موبایل و محتوای اصلی */}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        {/* AppBar جایگزین header تیلویند شده است (فقط در موبایل نمایش داده می‌شود) */}
        <AppBar
          position="sticky"
          elevation={0} // حذف سایه پیش‌فرض متریال
          sx={{
            display: { xs: "block", md: "none" }, // معادل md:hidden
            bgcolor: "rgba(15, 23, 42, 0.8)", // حالت شیشه‌ای پس‌زمینه
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid",
            borderColor: "divider", // رنگ خط زیرین را از تم می‌خواند
          }}
        >
          <Toolbar sx={{ minHeight: "64px", px: 3, gap: 2 }}>
            <IconButton
              onClick={() => setIsMobileOpen(true)}
              edge="start"
              sx={{
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "12px",
                color: "text.secondary",
                transition: "all 0.3s",
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                },
              }}
            >
              <Menu size={20} />
            </IconButton>

            <DsTypography
              variant="subtitle1"
              sx={{ fontWeight: "bold" }}
              color="text.primary"
            >
              My Dashboard
            </DsTypography>
          </Toolbar>
        </AppBar>

        {/* محتوای اصلی با قابلیت اسکرول مستقل */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: { xs: 3, sm: 4 }, // معادل p-6 و sm:p-8
            color: "text.primary",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default AppLayout;
