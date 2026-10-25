"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  placement?: "top" | "bottom" | "left" | "right";
  variant?: "default" | "dark" | "darkGreen" | "statusTip";
  delay?: number;
  className?: string;
}

export function Tooltip({
  content,
  children,
  placement = "top",
  variant = "dark",
  delay = 120,
  className,
}: TooltipProps) {
  const [visible, setVisible] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [coords, setCoords] = React.useState<{ top: number; left: number; transform: string } | null>(null);
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    setMounted(true);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const updatePosition = React.useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();

    switch (placement) {
      case "top":
        setCoords({
          top: rect.top - 8,
          left: rect.left + rect.width / 2,
          transform: "translate(-50%, -100%)",
        });
        break;
      case "bottom":
        setCoords({
          top: rect.bottom + 8,
          left: rect.left + rect.width / 2,
          transform: "translate(-50%, 0)",
        });
        break;
      case "left":
        setCoords({
          top: rect.top + rect.height / 2,
          left: rect.left - 8,
          transform: "translate(-100%, -50%)",
        });
        break;
      case "right":
        setCoords({
          top: rect.top + rect.height / 2,
          left: rect.right + 8,
          transform: "translate(0, -50%)",
        });
        break;
    }
  }, [placement]);

  const show = () => {
    updatePosition();
    timeoutRef.current = setTimeout(() => {
      updatePosition();
      setVisible(true);
    }, delay);
  };

  const hide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setVisible(false);
  };

  const variantStyles = {
    default: "bg-[rgb(30,39,37)] border-[rgb(69,69,70)] text-[rgb(214,214,214)]",
    dark: "bg-[rgb(17,22,21)] border-[rgb(36,47,43)] text-[rgb(214,214,214)] shadow-xl",
    darkGreen: "bg-[rgb(18,76,50)] border-[rgb(34,142,93)] text-[rgb(245,245,245)]",
    statusTip: "statusTip bg-[rgb(30,39,37)] border-[rgb(69,69,70)] text-[rgb(214,214,214)] w-[250px] whitespace-normal leading-[17px] p-[5px_10px]",
  };

  const arrowStyles = {
    top: "bottom-[-5px] left-1/2 -translate-x-1/2 border-t-[5px] border-x-[5px] border-b-0 border-x-transparent",
    bottom: "top-[-5px] left-1/2 -translate-x-1/2 border-b-[5px] border-x-[5px] border-t-0 border-x-transparent",
    left: "right-[-5px] top-1/2 -translate-y-1/2 border-l-[5px] border-y-[5px] border-r-0 border-y-transparent",
    right: "left-[-5px] top-1/2 -translate-y-1/2 border-r-[5px] border-y-[5px] border-l-0 border-y-transparent",
  };

  const arrowColorStyles = {
    default: {
      top: "border-t-[rgb(30,39,37)]",
      bottom: "border-b-[rgb(30,39,37)]",
      left: "border-l-[rgb(30,39,37)]",
      right: "border-r-[rgb(30,39,37)]",
    },
    dark: {
      top: "border-t-[rgb(17,22,21)]",
      bottom: "border-b-[rgb(17,22,21)]",
      left: "border-l-[rgb(17,22,21)]",
      right: "border-r-[rgb(17,22,21)]",
    },
    darkGreen: {
      top: "border-t-[rgb(18,76,50)]",
      bottom: "border-b-[rgb(18,76,50)]",
      left: "border-l-[rgb(18,76,50)]",
      right: "border-r-[rgb(18,76,50)]",
    },
    statusTip: {
      top: "border-t-[rgb(30,39,37)]",
      bottom: "border-b-[rgb(30,39,37)]",
      left: "border-l-[rgb(30,39,37)]",
      right: "border-r-[rgb(30,39,37)]",
    },
  };

  return (
    <div
      ref={triggerRef}
      className="relative inline-flex items-center"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}

      {visible && mounted && content && coords && createPortal(
        <div
          role="tooltip"
          style={{
            position: "fixed",
            top: coords.top,
            left: coords.left,
            transform: coords.transform,
          }}
          className={cn(
            "xenTooltip pointer-events-none z-[15000] whitespace-nowrap rounded-[8px] border px-2.5 py-1 text-xs font-normal leading-tight transition-opacity duration-150 animate-in fade-in-0",
            variantStyles[variant],
            className
          )}
        >
          {content}
          <div
            className={cn(
              "arrow absolute h-0 w-0 border-solid",
              arrowStyles[placement],
              arrowColorStyles[variant][placement]
            )}
          />
        </div>,
        document.body
      )}
    </div>
  );
}
