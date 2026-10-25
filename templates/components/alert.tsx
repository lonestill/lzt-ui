"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type AlertVariant = "error" | "destructive" | "warning" | "success" | "default";

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: AlertVariant;
  title?: React.ReactNode;
  onClose?: () => void;
  isModal?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  shake?: boolean;
}

const HEADER_STYLES: Record<
  AlertVariant,
  { bg: string; defaultTitle: string }
> = {
  error: {
    bg: "bg-[linear-gradient(140deg,rgb(142,34,34)_0%,rgb(85,20,20)_100%)]",
    defaultTitle: "Произошла ошибка:",
  },
  destructive: {
    bg: "bg-[linear-gradient(140deg,rgb(142,34,34)_0%,rgb(85,20,20)_100%)]",
    defaultTitle: "Произошла ошибка:",
  },
  warning: {
    bg: "bg-[linear-gradient(140deg,rgb(184,115,18)_0%,rgb(110,68,11)_100%)]",
    defaultTitle: "Внимание:",
  },
  success: {
    bg: "bg-[linear-gradient(140deg,rgb(32,118,78)_0%,rgb(20,74,49)_100%)]",
    defaultTitle: "Успешно:",
  },
  default: {
    bg: "bg-[rgb(24,30,28)] border-b border-[rgb(30,39,37)]",
    defaultTitle: "Информация:",
  },
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = "error",
      title,
      onClose,
      isModal = false,
      open = true,
      onOpenChange,
      shake,
      children,
      ...props
    },
    ref
  ) => {
    const [mounted, setMounted] = React.useState(false);
    const [rendered, setRendered] = React.useState(open);
    const [isClosing, setIsClosing] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    // Smooth exit animation before unmounting
    React.useEffect(() => {
      if (open) {
        setRendered(true);
        setIsClosing(false);
      } else if (rendered) {
        setIsClosing(true);
        const timer = setTimeout(() => {
          setRendered(false);
          setIsClosing(false);
        }, 160);
        return () => clearTimeout(timer);
      }
    }, [open, rendered]);

    const handleClose = React.useCallback(() => {
      onClose?.();
      onOpenChange?.(false);
    }, [onClose, onOpenChange]);

    React.useEffect(() => {
      if (!isModal || !rendered) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          handleClose();
        }
      };

      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [isModal, rendered, handleClose]);

    if (!rendered) return null;

    const config = HEADER_STYLES[variant] || HEADER_STYLES.error;
    const resolvedTitle = title !== undefined ? title : config.defaultTitle;
    const showCloseButton = Boolean(onClose || onOpenChange || isModal);
    const shouldShake = shake !== undefined ? shake : (variant === "error" || variant === "destructive");

    const alertContent = (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "errorOverlay relative w-full overflow-hidden rounded-[12px] border border-[rgb(30,39,37)] bg-[rgb(17,22,21)] shadow-2xl text-[rgb(214,214,214)] select-none",
          isModal && "max-w-[560px] z-50",
          isModal && (isClosing ? "anim-lzt-modal-out" : "anim-lzt-modal-in"),
          isModal && shouldShake && !isClosing && "anim-lzt-error-shake",
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {resolvedTitle && (
          <div
            className={cn(
              "heading flex items-center justify-between px-5 py-[15px] font-semibold text-sm text-[rgb(245,245,245)] leading-tight",
              config.bg,
              showCloseButton && "pr-14"
            )}
          >
            <span className="font-semibold text-[14px]">{resolvedTitle}</span>
          </div>
        )}

        {showCloseButton && (
          <button
            type="button"
            onClick={handleClose}
            aria-label="Закрыть"
            className="close OverlayCloser absolute right-3.5 top-3.5 flex h-7 w-7 items-center justify-center rounded-[10px] bg-white/[0.09] shadow-[0_0_0_1px_rgba(233,233,233,0.2)] hover:shadow-[0_0_0_1px_rgba(233,233,233,0.5)] backdrop-blur-[2px] text-[#e9e9e9] opacity-80 hover:opacity-100 transition-all duration-150 cursor-pointer"
          >
            <X className="w-3.5 h-3.5 text-[rgb(214,214,214)]" />
          </button>
        )}

        <div className="errorDetails p-5 text-sm leading-relaxed text-[rgb(214,214,214)]">
          {children}
        </div>
      </div>
    );

    if (isModal) {
      if (!mounted) return null;
      return createPortal(
        <div
          className={cn(
            "xenOverlay fixed inset-0 z-[10000] flex items-start justify-center pt-24 sm:pt-32 p-4 bg-black/75 backdrop-blur-[2px]",
            isClosing ? "anim-lzt-backdrop-out" : "anim-lzt-backdrop-in"
          )}
          onClick={handleClose}
        >
          {alertContent}
        </div>,
        document.body
      );
    }

    return alertContent;
  }
);
Alert.displayName = "Alert";

export interface AlertModalProps extends Omit<AlertProps, "isModal"> {
  open: boolean;
  onClose: () => void;
}

export function AlertModal({ open, onClose, ...props }: AlertModalProps) {
  return <Alert isModal open={open} onClose={onClose} {...props} />;
}

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("font-semibold text-[14px] text-[rgb(245,245,245)]", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-[rgb(214,214,214)] text-sm leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };

/**
 * Плашка важного сообщения (.importantMessage)
 */
export interface ImportantMessageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "warning" | "error" | "success";
  children: React.ReactNode;
}

export function ImportantMessage({
  variant = "default",
  className,
  children,
  ...props
}: ImportantMessageProps) {
  const borderStyles = {
    default: "border-[rgb(36,47,43)] border-l-[rgb(34,142,93)]",
    warning: "border-[rgb(36,47,43)] border-l-[#e68c17]",
    error: "border-[rgb(36,47,43)] border-l-[#f13838]",
    success: "border-[rgb(36,47,43)] border-l-[#00ba78]",
  };

  return (
    <div
      role="note"
      className={cn(
        "importantMessage blockMessage my-2.5 rounded-[8px] border bg-[rgb(24,30,28)] px-4 py-3 text-[14px] leading-relaxed text-[rgb(214,214,214)] border-l-[3px]",
        borderStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
