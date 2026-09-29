import type { ReactElement } from "react";
import Tooltip from "@mui/material/Tooltip";

type Props = {
  text: string;
  isExpanded: boolean;
  children: ReactElement; // در MUI حتماً باید ReactElement باشد تا Ref به درستی پاس داده شود
};

function SidebarTooltip({ text, isExpanded, children }: Props) {
  return (
    <Tooltip
      title={text}
      placement="right"
      arrow // یک فلش کوچک و زیبا به تولتیپ اضافه می‌کند
      disableHoverListener={isExpanded} // شاهکار MUI: اگر سایدبار باز بود، کلاً تولتیپ را غیرفعال کن
    >
      {/* MUI به صورت خودکار رویدادهای hover را روی این فرزند مدیریت می‌کند */}
      {children}
    </Tooltip>
  );
}

export default SidebarTooltip;
