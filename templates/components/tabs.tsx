"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type TabsVariant = "forum" | "subTabs" | "pill";

interface TabsContextType {
  value: string;
  onValueChange: (val: string) => void;
  variant: TabsVariant;
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: TabsVariant;
}

export function Tabs({
  value: controlledValue,
  defaultValue,
  onValueChange,
  variant = "forum",
  className,
  children,
  ...props
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || "");
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = React.useCallback(
    (newVal: string) => {
      if (!isControlled) {
        setUncontrolledValue(newVal);
      }
      onValueChange?.(newVal);
    },
    [isControlled, onValueChange]
  );

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange, variant }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabsListProps extends React.HTMLAttributes<HTMLUListElement> {
  variant?: TabsVariant;
}

export function TabsList({ className, variant: listVariant, children, ...props }: TabsListProps) {
  const context = React.useContext(TabsContext);
  const activeVariant = listVariant || context?.variant || "forum";

  if (activeVariant === "pill") {
    return (
      <ul
        className={cn(
          "inline-flex items-center gap-1.5 p-1 rounded-[10px] bg-[rgb(24,30,28)] border border-[rgb(30,39,37)] list-none select-none",
          className
        )}
        {...props}
      >
        {children}
      </ul>
    );
  }

  if (activeVariant === "subTabs") {
    return (
      <ul
        className={cn(
          "tabs subTabs flex items-center w-full bg-[rgb(24,30,28)] border-b border-[rgb(30,39,37)] px-2.5 m-0 list-none overflow-x-auto no-scrollbar select-none",
          className
        )}
        {...props}
      >
        {children}
      </ul>
    );
  }

  return (
    <ul
      className={cn(
        "tabs flex items-center w-full bg-[rgb(17,22,21)] border-b border-[rgb(30,39,37)] px-2.5 m-0 list-none overflow-x-auto no-scrollbar select-none",
        className
      )}
      {...props}
    >
      {children}
    </ul>
  );
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  badge?: React.ReactNode;
  variant?: TabsVariant;
}

export function TabsTrigger({
  value,
  badge,
  variant: triggerVariant,
  className,
  children,
  onClick,
  ...props
}: TabsTriggerProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used inside Tabs");

  const isActive = context.value === value;
  const activeVariant = triggerVariant || context.variant || "forum";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    context.onValueChange(value);
    onClick?.(e);
  };

  if (activeVariant === "pill") {
    return (
      <li className="list-none">
        <button
          type="button"
          role="tab"
          aria-selected={isActive}
          onClick={handleClick}
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1.5 rounded-[8px] text-xs font-medium transition-colors cursor-pointer",
            isActive
              ? "bg-[rgb(30,39,37)] text-white shadow-sm"
              : "text-[rgb(140,162,154)] hover:text-[rgb(214,214,214)] hover:bg-[rgb(30,39,37)]/50",
            className
          )}
          {...props}
        >
          {children}
          {badge !== undefined && (
            <span
              className={cn(
                "rounded-full px-1.5 py-0.2 text-[10px] font-bold font-mono",
                isActive
                  ? "bg-[#00ba78]/20 text-[#00ba78]"
                  : "bg-[rgb(36,47,43)] text-[rgb(140,162,154)]"
              )}
            >
              {badge}
            </span>
          )}
        </button>
      </li>
    );
  }

  return (
    <li className={cn("list-none mx-1 font-semibold", isActive && "active")}>
      <button
        type="button"
        role="tab"
        aria-selected={isActive}
        onClick={handleClick}
        className={cn(
          "inline-flex items-center gap-2 h-[46px] px-3.5 text-sm font-semibold transition-all duration-150 cursor-pointer bg-transparent border-0 outline-none whitespace-nowrap",
          activeVariant === "subTabs" && "h-[36px] text-xs px-2.5",
          isActive
            ? "text-[#00ba78] shadow-[inset_0_-2px_0_0_#00ba78]"
            : "text-[rgb(140,162,154)] hover:text-[rgb(245,245,245)] hover:shadow-[inset_0_-2px_0_0_rgb(30,39,37)]",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        {badge !== undefined && (
          <span
            className={cn(
              "rounded-full px-1.5 py-0.5 text-[11px] font-bold font-mono leading-none",
              isActive
                ? "bg-[#00ba78]/20 text-[#00ba78]"
                : "bg-[rgb(30,39,37)] text-[rgb(140,162,154)]"
            )}
          >
            {badge}
          </span>
        )}
      </button>
    </li>
  );
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({ value, className, children, ...props }: TabsContentProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used inside Tabs");

  if (context.value !== value) return null;

  return (
    <div
      role="tabpanel"
      className={cn("pt-4 animate-in fade-in-0 duration-150", className)}
      {...props}
    >
      {children}
    </div>
  );
}
