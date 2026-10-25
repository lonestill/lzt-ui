"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { MoreHorizontal, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "button inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors duration-150 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "primary bg-[linear-gradient(88deg,rgb(32,118,78)_0%,rgb(42,143,92)_50%,rgb(32,118,78)_100%)] hover:bg-[linear-gradient(88deg,rgb(38,136,90)_0%,rgb(48,162,105)_50%,rgb(38,136,90)_100%)] text-[rgb(245,245,245)] border-0 font-medium rounded-[10px] outline -outline-offset-1 outline-[color-mix(in_srgb,rgb(245,245,245)_16%,transparent_84%)]",
        default:
          "bg-[rgb(30,39,37)] hover:bg-[rgb(36,47,43)] text-[rgb(214,214,214)] hover:text-white border-0 font-medium rounded-[10px]",
        secondary:
          "secondary bg-[rgb(36,47,43)] hover:bg-[rgb(44,58,53)] text-[rgb(214,214,214)] hover:text-white border-0 font-medium rounded-[10px] outline -outline-offset-1 outline-[color-mix(in_srgb,rgb(140,162,154)_40%,transparent_60%)]",
        danger:
          "danger bg-[rgba(241,56,56,0.12)] hover:bg-[rgba(241,56,56,0.2)] text-[rgb(241,56,56)] border border-[rgba(241,56,56,0.3)] rounded-[10px]",
        ghost:
          "text-[rgb(214,214,214)] hover:bg-[rgb(30,39,37)] hover:text-white rounded-[10px]",
        more:
          "dottesStyle buttonStyle bg-[rgb(30,39,37)] hover:bg-[rgb(36,47,43)] text-[rgb(214,214,214)] hover:text-white border-0 rounded-[10px] p-0 w-[36px] h-[34px] outline -outline-offset-1 outline-[rgb(36,47,43)]",
      },
      size: {
        default: "h-[34px] px-[15px] text-sm",
        sm: "h-[28px] px-3 text-xs rounded-[8px]",
        lg: "h-[38px] px-[15px] text-sm rounded-[10px]",
        icon: "h-[34px] w-[34px] rounded-[10px] p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading = false, asChild = false, children, disabled, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{
        className?: string;
        ref?: React.Ref<any>;
      }>;
      return React.cloneElement(child, {
        ...props,
        ref,
        className: cn(buttonVariants({ variant, size }), child.props?.className, className),
      });
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <span className="w-3.5 h-3.5 rounded-full border-2 border-white/25 border-t-white animate-spin shrink-0" />
        )}
        {variant === "more" && !children ? (
          <MoreHorizontal className="w-4 h-4 text-[rgb(140,162,154)]" />
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

/**
 * Кнопка копирования с индикатором успешного копирования
 */
export function CopyButton({
  text,
  className,
  onCopy,
}: {
  text: string;
  className?: string;
  onCopy?: () => void;
}) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={copied ? "Скопировано" : "Скопировать"}
      className={cn(
        "copyButton copyButton--withCheck relative inline-flex items-center justify-center p-1 text-[rgb(140,162,154)] hover:text-[rgb(214,214,214)] cursor-pointer select-none transition-colors",
        copied && "copyButton--copied",
        className
      )}
    >
      <Copy className={cn("w-3.5 h-3.5 transition-opacity duration-200", copied && "opacity-0")} />
      <Check
        className={cn(
          "w-3.5 h-3.5 absolute inset-0 m-auto text-[#00ba78] transition-opacity duration-200 opacity-0 pointer-events-none",
          copied && "opacity-100"
        )}
      />
    </button>
  );
}

export { Button, buttonVariants };
