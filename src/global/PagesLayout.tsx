import type { FC, PropsWithChildren } from "react";
import Box from "@mui/material/Box";

const PagesLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default", // جایگزین bg-slate-900
        justifyContent: "center",
        alignItems: "center",
        color: "text.primary",
        p: 4, // در MUI مقدار p:4 معادل ۳۲ پیکسل (همان p-8 تیلویند) است
      }}
    >
      {children}
    </Box>
  );
};

export default PagesLayout;
