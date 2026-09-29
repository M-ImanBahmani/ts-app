import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

type Props = { to: string; text?: string };

export default function SharedBackButton({ to, text = "Back" }: Props) {
  const navigate = useNavigate();

  return (
    <Box sx={{ mx: "auto", mb: 3, maxWidth: "md" }}>
      <Button
        onClick={() => navigate(to)}
        startIcon={<ArrowLeft size={18} />}
        disableElevation
        sx={{
          borderRadius: "9999px", // کاملاً گرد
          px: 3,
          py: 1,
          fontWeight: "bold",
          textTransform: "none",
          bgcolor: "background.paper", // اتوماتیک در حالت دارک و لایت تنظیم می‌شود
          color: "text.secondary",
          border: "1px solid",
          borderColor: "divider",
          backdropFilter: "blur(12px)", // افکت شیشه‌ای
          transition: "all 0.3s ease",
          boxShadow: 1,
          "& .lucide": {
            // تارگت کردن مستقیم آیکون برای انیمیشن
            transition: "transform 0.3s ease",
          },
          "&:hover": {
            bgcolor: "action.hover",
            borderColor: "primary.main",
            color: "primary.main",
            transform: "translateX(-8px)", // افکت پرش به چپ
            boxShadow: 3,
            "& .lucide": {
              transform: "translateX(-4px)",
            },
          },
        }}
      >
        {text}
      </Button>
    </Box>
  );
}
