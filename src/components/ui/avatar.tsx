import * as React from "react";
import { cn } from "@/lib/utils";

export type AvatarSize = "mention" | "s" | "m" | "l" | "sm" | "default" | "lg" | "xl";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  fallback?: string;
  size?: AvatarSize;
  isOnline?: boolean;
  status?: "online" | "offline";
  userBadge?: React.ReactNode;
}

const sizeClasses: Record<string, { holder: string; img: string; text: string }> = {
  mention: {
    holder: "w-4 h-4 min-w-4",
    img: "w-4 h-4",
    text: "text-[9px]",
  },
  s: {
    holder: "w-8 h-8 min-w-8",
    img: "w-8 h-8",
    text: "text-xs",
  },
  sm: {
    holder: "w-8 h-8 min-w-8",
    img: "w-8 h-8",
    text: "text-xs",
  },
  default: {
    holder: "w-8 h-8 min-w-8",
    img: "w-8 h-8",
    text: "text-xs",
  },
  m: {
    holder: "w-[66px] h-[66px] min-w-[66px]",
    img: "w-[66px] h-[66px]",
    text: "text-base font-semibold",
  },
  lg: {
    holder: "w-[66px] h-[66px] min-w-[66px]",
    img: "w-[66px] h-[66px]",
    text: "text-base font-semibold",
  },
  l: {
    holder: "w-[96px] h-[96px] min-w-[96px]",
    img: "w-[96px] h-[96px]",
    text: "text-xl font-bold",
  },
  xl: {
    holder: "w-[96px] h-[96px] min-w-[96px]",
    img: "w-[96px] h-[96px]",
    text: "text-xl font-bold",
  },
};

export function Avatar({
  src,
  fallback = "U",
  size = "s",
  isOnline = false,
  status,
  userBadge,
  className,
  ...props
}: AvatarProps) {
  const currentSize = sizeClasses[size] || sizeClasses.s;
  const online = isOnline || status === "online";
  const initials = fallback.slice(0, 2).toUpperCase() || "U";

  return (
    <div
      className={cn(
        "avatarHolder relative inline-block select-none align-middle",
        currentSize.holder,
        className
      )}
      {...props}
    >
      <span className={cn("avatar block overflow-hidden rounded-full", currentSize.holder)}>
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={fallback}
            className={cn(
              "img object-cover rounded-full",
              currentSize.img,
              "[image-rendering:-webkit-optimize-contrast]"
            )}
          />
        ) : (
          <span
            className={cn(
              "img flex items-center justify-center rounded-full bg-[rgb(24,30,28)] text-[rgb(214,214,214)] font-medium",
              currentSize.img,
              currentSize.text
            )}
          >
            {initials}
          </span>
        )}
      </span>

      {/* Online indicator */}
      {online && (
        <span
          className={cn(
            "absolute rounded-full bg-[#00ba78] ring-2 ring-[rgb(17,22,21)]",
            (size === "l" || size === "xl") ? "w-3.5 h-3.5 bottom-1 right-1" : "w-2.5 h-2.5 bottom-0 right-0"
          )}
          title="В сети"
        />
      )}

      {userBadge && (
        <div className="avatarUserBadge absolute -bottom-1 -right-1 z-10 flex items-center justify-center">
          {userBadge}
        </div>
      )}
    </div>
  );
}
