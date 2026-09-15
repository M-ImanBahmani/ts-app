import { LoaderCircle } from "lucide-react";
import type { ReactElement } from "react";
import Button, { type ButtonProps } from "@mui/material/Button";

interface PropTypes extends Omit<ButtonProps, "color" | "size"> {
  type?: "button" | "submit" | "reset";
  text?: string;
  color?: "gray" | "blue" | "red" | "green" | "black";
  size?: "lg" | "md" | "sm";
  className?: string;
  icon?: ReactElement;
  isLoading?: boolean;
  isDisabled?: boolean;
  justIcon?: boolean;
  tooltip?: string;
  onClick?: () => void;
}

const DsButton = ({
  type = "button",
  text,
  color = "gray",
  size = "md",
  className = "",
  icon,
  isLoading = false,
  isDisabled = false,
  justIcon = false,
  tooltip = "",
  onClick,
  children,
  ...rest
}: PropTypes) => {
  let colorClass = "";
  let sizeClass = "";

  switch (color) {
    case "green":
      colorClass = "bg-green-500 text-white hover:bg-green-700";
      break;
    case "red":
      colorClass = "bg-red-500 text-white hover:bg-red-700";
      break;
    case "blue":
      colorClass = "bg-blue-500 text-white hover:bg-blue-700";
      break;
    case "gray":
      colorClass = "bg-gray-500 text-white hover:bg-gray-700";
      break;
    case "black":
      colorClass = "bg-black-500 text-white hover:bg-black-700";
      break;
  }

  switch (size) {
    case "lg":
      sizeClass = `rounded-lg py-2 px-3 text-xl ${justIcon ? "h-10 w-10 p-0" : ""}`;
      break;
    case "md":
      sizeClass = `rounded-md py-1 px-2 text-base ${justIcon ? "h-8 w-8 p-0" : ""}`;
      break;
    case "sm":
      sizeClass = `rounded-sm py-1 px-1.5 text-sm ${justIcon ? "h-6 w-6 p-0" : ""}`;
      break;
  }

  return (
    <Button
      type={type}
      className={`cursor-pointer transition-all flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed! ${colorClass} ${sizeClass} ${className}`}
      onClick={onClick}
      disabled={isLoading || isDisabled}
      title={tooltip}
      {...rest}
    >
      {!isLoading && icon ? icon : null}
      {isLoading ? (
        <LoaderCircle size={18} className="animate-spin" />
      ) : undefined}
      {text || children}
    </Button>
  );
};

export default DsButton;
