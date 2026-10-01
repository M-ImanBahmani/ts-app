import type { ReactElement } from "react";
import Tooltip from "@mui/material/Tooltip";

type Props = {
  text: string;
  isExpanded: boolean;
  children: ReactElement;
};

function SidebarTooltip({ text, isExpanded, children }: Props) {
  return (
    <Tooltip
      title={text}
      placement="right"
      arrow
      disableHoverListener={isExpanded} //اگر سایدبار باز بود، کلاً تولتیپ را غیرفعال کن
    >
      {/* MUI به صورت خودکار رویدادهای hover را روی این فرزند مدیریت می‌کند */}
      {children}
    </Tooltip>
  );
}

export default SidebarTooltip;
