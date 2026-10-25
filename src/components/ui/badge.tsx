"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type UserGroupKey =
  | "novoreg"
  | "local"
  | "resident"
  | "expert"
  | "guru"
  | "ai"
  | "greatest"
  | "uniq"
  | "unik"
  | "legend"
  | "supreme"
  | "sponsor"
  | "admin"
  | "chief_designer"
  | "headDesigner"
  | "designer"
  | "chief_arbitr"
  | "headArbitrator"
  | "arbitr"
  | "arbitrator"
  | "chief_moder"
  | "headModerator"
  | "moder"
  | "moderator"
  | "developer"
  | "curator"
  | "editor"
  | "banned";

interface BannerStyle {
  background: string;
  color: string;
  boxShadow?: string;
  border?: string;
  borderRadius?: string;
  textShadow?: string;
}

const BANNER_STYLES: Partial<Record<UserGroupKey, BannerStyle>> = {
  greatest: {
    background:
      "radial-gradient(125.5% 299.51% at 26.25% 0%, rgb(183, 236, 92) 0%, rgb(132, 195, 23) 53.85%, rgb(73, 115, 0) 100%), rgb(183, 236, 92)",
    boxShadow:
      "rgba(255, 255, 255, 0.81) 0px 4px 9.7px 0px inset, rgba(183, 236, 92, 0.34) 0px -4px 24.6px 0px",
    color: "rgb(0, 19, 0)",
  },
  ai: {
    background: "rgb(255, 0, 118)",
    color: "rgb(245, 245, 245)",
  },
  uniq: {
    background: "linear-gradient(13deg, rgb(0, 122, 152), rgb(15, 220, 145))",
    color: "rgb(245, 245, 245)",
  },
  unik: {
    background: "linear-gradient(13deg, rgb(0, 122, 152), rgb(15, 220, 145))",
    color: "rgb(245, 245, 245)",
  },
  legend: {
    background:
      "linear-gradient(90deg, rgb(0, 149, 221) 0%, rgb(241, 9, 75) 100%, rgb(0, 149, 221))",
    color: "rgb(245, 245, 245)",
  },
  supreme: {
    background:
      "linear-gradient(90deg, rgb(167, 36, 187) 0%, rgb(255, 66, 247) 100%)",
    boxShadow: "0 0 10px rgba(255, 66, 247, 0.35)",
    color: "rgb(255, 255, 255)",
  },
  editor: {
    background: "rgb(0, 135, 255)",
    color: "rgb(245, 245, 245)",
  },
  admin: {
    background: "rgb(109, 51, 54)",
    color: "rgb(245, 245, 245)",
  },
  chief_designer: {
    background:
      "linear-gradient(90deg, rgb(92, 69, 255) 0%, rgb(230, 156, 217) 100%)",
    color: "rgb(245, 245, 245)",
  },
  headDesigner: {
    background:
      "linear-gradient(90deg, rgb(92, 69, 255) 0%, rgb(230, 156, 217) 100%)",
    color: "rgb(245, 245, 245)",
  },
  designer: {
    background: "rgb(0, 117, 173)",
    color: "rgb(245, 245, 245)",
  },
  chief_arbitr: {
    background:
      "linear-gradient(98.26deg, rgb(255, 66, 247) 2.08%, rgb(255, 36, 207) 100%)",
    color: "rgb(56, 56, 56)",
  },
  headArbitrator: {
    background:
      "linear-gradient(98.26deg, rgb(255, 66, 247) 2.08%, rgb(255, 36, 207) 100%)",
    color: "rgb(56, 56, 56)",
  },
  arbitr: {
    background: "rgb(255, 154, 252)",
    color: "rgb(56, 56, 56)",
  },
  arbitrator: {
    background: "rgb(255, 154, 252)",
    color: "rgb(56, 56, 56)",
  },
  chief_moder: {
    background: "rgb(46, 162, 74)",
    color: "rgb(245, 245, 245)",
  },
  headModerator: {
    background: "rgb(46, 162, 74)",
    color: "rgb(245, 245, 245)",
  },
  moder: {
    background: "rgb(18, 71, 13)",
    color: "rgb(245, 245, 245)",
  },
  moderator: {
    background: "rgb(18, 71, 13)",
    color: "rgb(245, 245, 245)",
  },
  developer: {
    background: "rgb(191, 110, 4)",
    color: "rgb(245, 245, 245)",
  },
  curator: {
    background: "rgba(0, 255, 196, 0.43)",
    color: "rgb(245, 245, 245)",
  },
  sponsor: {
    background: "rgb(229, 217, 163)",
    color: "rgb(56, 56, 56)",
  },
};

const TAG_STYLES: Partial<Record<UserGroupKey, { color: string; border?: string }>> = {
  novoreg: { color: "rgb(148, 148, 148)" },
  local: { color: "rgb(148, 148, 148)" },
  resident: { color: "rgb(214, 214, 214)" },
  expert: { color: "rgb(179, 94, 222)", border: "rgba(179, 94, 222, 0.3)" },
  guru: { color: "rgb(255, 168, 175)", border: "rgba(255, 168, 175, 0.3)" },
  ai: { color: "rgb(255, 0, 118)", border: "rgba(255, 0, 118, 0.3)" },
  greatest: { color: "#b7ec5c", border: "rgba(183, 236, 92, 0.4)" },
  uniq: { color: "#0fdc91", border: "rgba(15, 220, 145, 0.4)" },
  unik: { color: "#0fdc91", border: "rgba(15, 220, 145, 0.4)" },
  legend: { color: "#0095dd", border: "rgba(0, 149, 221, 0.4)" },
  supreme: { color: "rgb(255, 66, 247)", border: "rgba(255, 66, 247, 0.4)" },
  sponsor: { color: "rgb(229, 217, 163)", border: "rgba(229, 217, 163, 0.4)" },
  admin: { color: "rgb(241, 56, 56)", border: "rgba(241, 56, 56, 0.4)" },
  chief_designer: { color: "rgb(230, 156, 217)", border: "rgba(92, 69, 255, 0.4)" },
  headDesigner: { color: "rgb(230, 156, 217)", border: "rgba(92, 69, 255, 0.4)" },
  designer: { color: "rgb(0, 117, 173)", border: "rgba(0, 117, 173, 0.4)" },
  chief_arbitr: { color: "rgb(255, 66, 247)", border: "rgba(255, 66, 247, 0.4)" },
  headArbitrator: { color: "rgb(255, 66, 247)", border: "rgba(255, 66, 247, 0.4)" },
  arbitr: { color: "rgb(255, 154, 252)", border: "rgba(255, 154, 252, 0.4)" },
  arbitrator: { color: "rgb(255, 154, 252)", border: "rgba(255, 154, 252, 0.4)" },
  chief_moder: { color: "rgb(46, 162, 74)", border: "rgba(46, 162, 74, 0.4)" },
  headModerator: { color: "rgb(46, 162, 74)", border: "rgba(46, 162, 74, 0.4)" },
  moder: { color: "rgb(18, 71, 13)", border: "rgba(18, 71, 13, 0.4)" },
  moderator: { color: "rgb(18, 71, 13)", border: "rgba(18, 71, 13, 0.4)" },
  developer: { color: "rgb(191, 110, 4)", border: "rgba(191, 110, 4, 0.4)" },
  curator: { color: "rgb(0, 255, 196)", border: "rgba(0, 255, 196, 0.4)" },
  editor: { color: "rgb(0, 135, 255)", border: "rgba(0, 135, 255, 0.4)" },
  banned: { color: "rgb(140, 162, 154)" },
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  group?: UserGroupKey;
  variant?: "banner" | "tag" | "pill";
  active?: boolean;
  onRemove?: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function Badge({
  group = "resident",
  variant = "tag",
  active = false,
  onRemove,
  icon,
  className,
  style,
  children,
  ...props
}: BadgeProps) {
  // 1. User Banner (.banner)
  if (variant === "banner") {
    const bannerStyle = BANNER_STYLES[group] || {
      background: "rgb(30, 39, 37)",
      color: "rgb(214, 214, 214)",
    };

    return (
      <div
        style={{
          background: bannerStyle.background,
          color: bannerStyle.color,
          boxShadow: bannerStyle.boxShadow,
          borderRadius: bannerStyle.borderRadius,
          textShadow: bannerStyle.textShadow,
          ...style,
        }}
        className={cn(
          "userBanner inline-flex items-center justify-center px-3 py-1 text-xs font-semibold select-none border-0 shadow-sm leading-tight",
          bannerStyle.borderRadius ? "" : "rounded-[5px]",
          className
        )}
        {...props}
      >
        <span>{children}</span>
      </div>
    );
  }

  // 2. Market Filter Pill (.pill)
  if (variant === "pill") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1.5 h-[28px] rounded-[1000px] px-3 text-xs font-medium transition-all select-none border",
          active
            ? "bg-[#00ba78]/15 border-[#00ba78]/40 text-[#00ba78]"
            : "bg-[rgb(30,39,37)] hover:bg-[rgb(36,47,43)] text-[rgb(214,214,214)] hover:text-white border-transparent",
          onRemove && "pr-2",
          className
        )}
        style={style}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="truncate">{children}</span>
        {onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="ml-0.5 rounded-full p-0.5 text-[rgb(140,162,154)] hover:text-white hover:bg-[rgba(255,255,255,0.1)] transition"
          >
            <X className="w-3 h-3 stroke-[2.2]" />
            <span className="sr-only">Удалить</span>
          </button>
        )}
      </div>
    );
  }

  // 4. Default User Group Tag (.tag)
  const tagStyle = TAG_STYLES[group] || { color: "rgb(214, 214, 214)" };

  return (
    <div
      style={{
        color: tagStyle.color,
        borderColor: tagStyle.border || "rgb(36, 47, 43)",
        ...style,
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-[6px] px-2.5 py-0.5 text-xs font-semibold select-none border bg-[rgb(24,30,28)] transition-colors",
        group === "banned" && "line-through",
        className
      )}
      {...props}
    >
      <span>{children}</span>
    </div>
  );
}
