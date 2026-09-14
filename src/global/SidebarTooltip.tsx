import { useState, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  text: string;
  isExpanded: boolean;
  children: ReactNode;
};

function SidebarTooltip({ text, isExpanded, children }: Props) {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (isExpanded) return;
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (rect) {
      setCoords({
        top: rect.top + rect.height / 2,
        left: rect.right + 12, // فاصله از دکمه
      });
      setShow(true);
    }
  };

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShow(false)}
      className="w-full"
    >
      {children}

      {/* انتقال تولتیپ به بیرون از اسکرول منو با استفاده از Portal */}
      {show &&
        !isExpanded &&
        createPortal(
          <div
            style={{ top: coords.top, left: coords.left }}
            className="pointer-events-none fixed z-99999 -translate-y-1/2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm font-semibold text-white shadow-xl animate-in zoom-in-95 fade-in duration-200"
          >
            {text}
          </div>,
          document.body
        )}
    </div>
  );
}

export default SidebarTooltip;