"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DialogContext = React.createContext<DialogContextType | undefined>(undefined);

export function Dialog({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (action: React.SetStateAction<boolean>) => {
      const next = typeof action === "function" ? action(open) : action;
      if (!isControlled) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, open, onOpenChange]
  );

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({
  asChild,
  children,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const context = React.useContext(DialogContext);
  if (!context) throw new Error("DialogTrigger must be used inside Dialog");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    context.setOpen(true);
  };

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{
      onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    }>;
    return React.cloneElement(child, {
      ...props,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        child.props?.onClick?.(e);
        context.setOpen(true);
      },
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

export function DialogClose({
  asChild,
  children,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const context = React.useContext(DialogContext);
  if (!context) throw new Error("DialogClose must be used inside Dialog");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    context.setOpen(false);
  };

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{
      onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    }>;
    return React.cloneElement(child, {
      ...props,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        child.props?.onClick?.(e);
        context.setOpen(false);
      },
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

export function DialogContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const context = React.useContext(DialogContext);
  if (!context) throw new Error("DialogContent must be used inside Dialog");

  const [mounted, setMounted] = React.useState(false);
  const [rendered, setRendered] = React.useState(context.open);
  const [isClosing, setIsClosing] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (context.open) {
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
  }, [context.open, rendered]);

  const handleClose = React.useCallback(() => {
    context.setOpen(false);
  }, [context]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (rendered) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [rendered, handleClose]);

  if (!rendered || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <div
        id="exposeMask"
        className={cn(
          "fixed inset-0 bg-black/75 backdrop-blur-[2px]",
          isClosing ? "anim-lzt-backdrop-out" : "anim-lzt-backdrop-in"
        )}
        onClick={handleClose}
      />

      <div
        className={cn(
          "xenOverlay formOverlay relative z-50 w-full max-w-lg rounded-[12px] border border-[rgb(30,39,37)] bg-[rgb(17,22,21)] shadow-2xl overflow-hidden text-[rgb(214,214,214)] [&>*:not(.heading):not(.submitUnit):not(.close):not(.formOverlayContent)]:px-5 [&>*:not(.heading):not(.submitUnit):not(.close):not(.formOverlayContent)]:py-4",
          isClosing ? "anim-lzt-modal-out" : "anim-lzt-modal-in",
          className
        )}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Закрыть"
          className="close OverlayCloser absolute right-3.5 top-3.5 z-20 flex h-7 w-7 items-center justify-center rounded-[10px] bg-white/[0.09] shadow-[0_0_0_1px_rgba(233,233,233,0.2)] hover:shadow-[0_0_0_1px_rgba(233,233,233,0.5)] backdrop-blur-[2px] text-[#e9e9e9] opacity-80 hover:opacity-100 transition-all duration-150 cursor-pointer"
        >
          <X className="w-3.5 h-3.5 text-[rgb(214,214,214)]" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

export function DialogHeader({
  variant = "default",
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "error" | "warning" | "security";
}) {
  return (
    <div
      className={cn(
        "heading",
        variant === "default" && "bg-[rgb(24,30,28)] px-5 py-4 border-b border-[rgb(30,39,37)]",
        (variant === "warning" || variant === "security") &&
          "bg-[linear-gradient(140deg,rgb(184,115,18)_0%,rgb(110,68,11)_100%)] px-5 py-4 border-b border-[rgba(184,115,18,0.3)] text-[rgb(245,245,245)]",
        variant === "error" &&
          "bg-[linear-gradient(140deg,rgb(142,34,34)_0%,rgb(85,20,20)_100%)] px-5 py-4 border-b border-[rgba(142,34,34,0.3)] text-[rgb(245,245,245)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function DialogTitle({
  className,
  children,
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-[15px] font-medium text-[rgb(245,245,245)] leading-snug",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function DialogDescription({
  className,
  children,
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-xs text-[rgb(140,162,154)] mt-1", className)}
    >
      {children}
    </p>
  );
}

export function DialogFooter({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "ctrlUnit submitUnit flex items-center justify-end gap-2.5 p-4 border-t border-[rgb(30,39,37)] bg-[rgb(24,30,28)]/40",
        className
      )}
    >
      {children}
    </div>
  );
}

export function DialogBody({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("formOverlayContent p-5 space-y-4 text-[14px]", className)}
      {...props}
    >
      {children}
    </div>
  );
}
