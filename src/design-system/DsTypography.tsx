import type { ElementType, ReactNode } from "react";
import Typography, { type TypographyProps } from "@mui/material/Typography";

// ارث‌بری از پراپ‌های تایپوگرافی MUI و جایگزین کردن component با element شما
interface PropTypes extends Omit<TypographyProps, "component"> {
  element?: ElementType; // استفاده از تایپ استاندارد ری‌اکت به جای any
  className?: string;
  children: ReactNode; // ReactNode شامل متن، تگ‌های HTML، آرایه‌ها و... می‌شود
}

const DsTypography = ({
  element = "span",
  className = "",
  children,
  ...rest // دریافت پراپ‌های بی‌نظیر MUI مثل variant، color، align، fontWeight
}: PropTypes) => {
  return (
    <Typography
      component={element} // تگ HTML نهایی (مثل h1, p, div)
      className={className} // حفظ پشتیبانی از کلاس‌های تیلویند
      {...rest}
    >
      {children}
    </Typography>
  );
};

export default DsTypography;
