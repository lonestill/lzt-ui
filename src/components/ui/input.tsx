import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: "default" | "extraLarge";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, inputSize = "default", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "textCtrl w-full rounded-[6px] border border-[rgb(36,47,43)] bg-[rgb(24,30,28)] px-[12px] text-[13px] text-[rgb(214,214,214)] placeholder:text-[rgb(90,105,99)] outline-none transition-all duration-150 focus:border-[#228e5d] focus:shadow-[0_0_0_1px_#228e5d] disabled:cursor-not-allowed disabled:opacity-50",
          inputSize === "default" ? "h-[34px] leading-[34px]" : "extraLarge h-[38px] min-h-[38px] leading-[38px] px-[14px]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  elastic?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, elastic = false, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "textCtrl w-full rounded-[6px] border border-[rgb(36,47,43)] bg-[rgb(24,30,28)] p-[10px] text-[13px] text-[rgb(214,214,214)] placeholder:text-[rgb(90,105,99)] outline-none transition-all duration-150 focus:border-[#228e5d] focus:shadow-[0_0_0_1px_#228e5d] disabled:cursor-not-allowed disabled:opacity-50 min-h-[72px] resize-y leading-relaxed",
          elastic && "Elastic",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export function InputRelative({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("inputRelative relative inline-block w-full", className)} {...props}>
      {children}
    </div>
  );
}

export function InputRelativeIcon({
  className,
  children,
  onClick,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      onClick={onClick}
      className={cn(
        "inputRelativeIcon absolute right-0 top-1/2 -translate-y-1/2 w-[36px] flex items-center justify-center text-[15px] text-[rgb(140,162,154)] hover:text-[rgb(214,214,214)] cursor-pointer select-none transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Input, Textarea };
