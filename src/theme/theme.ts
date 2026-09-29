import { createTheme } from "@mui/material/styles";

// تعریف پالت رنگی پایه برای تم تاریک
export const darkTheme = createTheme({
  palette: {
    mode: "dark", // این گزینه به MUI می‌فهماند که رفتار پیش‌فرض تاریک باشد
    primary: {
      main: "#2563eb", // معادل blue-600 در تیلویند
      light: "#3b82f6",
      dark: "#1d4ed8",
    },
    background: {
      default: "#0f172a", // معادل slate-900 (پس‌زمینه کل سایت)
      paper: "#1e293b", // معادل slate-800 (برای کارت‌ها، فرم‌ها و سایدبار)
    },
    text: {
      primary: "#f8fafc", // متن‌های اصلی (سفید)
      secondary: "#94a3b8", // متن‌های کم‌رنگ (slate-400)
    },
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
  components: {
    // تنظیمات پیش‌فرض کامپوننت‌ها (اینجا دکمه‌ها را کاستوم می‌کنیم)
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // جلوگیری از بزرگ شدن اجباری حروف
          borderRadius: "12px", // گرد کردن لبه دکمه‌ها مثل تیلویند
        },
      },
    },
  },
});
