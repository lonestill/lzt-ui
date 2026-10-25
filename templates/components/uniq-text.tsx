import * as React from "react";
import { cn } from "@/lib/utils";

export type UniqPreset =
  | "scope"
  | "raysmorgan"
  | "extasy"
  | "uniq"
  | "unik"
  | "zelenka"
  | "greatest"
  | "gold"
  | "flame";

export interface UniqTextProps extends React.HTMLAttributes<HTMLElement> {
  preset?: UniqPreset;
  glow?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

const SCOPE_STYLE: React.CSSProperties = {
  color: "#ffa6f7",
  fontWeight: 700,
  textShadow:
    "0px -3px 3px #f900c9, 0px 2px 3px #18132c, 0px -2px 1px #ff02e4, 0px -3px 3px #18132c, 0px -3px 3px #2e00eb, 0px 1px 1px #350d71, 0px 0px 3px #2400b5, 0px 0px 3px #ff00ea, 0px 0px 3px #c400ff, 0px 2px #ff00f4",
};

const RAYSMORGAN_STYLE: React.CSSProperties = {
  color: "#f13838",
  fontWeight: 700,
};

const EXTASY_GRADIENT = "linear-gradient(90deg, rgb(92, 69, 255) 0%, rgb(254, 181, 242) 100%)";

const GOLD_STYLE: React.CSSProperties = {
  color: "#ffd700",
  fontWeight: 700,
  textShadow: "0 0 8px rgba(255, 215, 0, 0.55), 0 0 2px #b8860b",
};

const GRADIENT_PRESETS: Record<string, { bg: string; glow?: string }> = {
  uniq: {
    bg: "linear-gradient(90deg, #007a98 0%, #0bad9a 50%, #0fdc91 100%)",
    glow: "drop-shadow(0 0 8px rgba(15, 220, 145, 0.45))",
  },
  unik: {
    bg: "linear-gradient(90deg, #007a98 0%, #0bad9a 50%, #0fdc91 100%)",
    glow: "drop-shadow(0 0 8px rgba(15, 220, 145, 0.45))",
  },
  zelenka: {
    bg: "linear-gradient(90deg, #228e5d 0%, #00ba78 50%, #37d38d 100%)",
    glow: "drop-shadow(0 0 8px rgba(0, 186, 120, 0.45))",
  },
  greatest: {
    bg: "linear-gradient(90deg, #b7ec5c 0%, #84c317 50%, #70a11d 100%)",
    glow: "drop-shadow(0 0 8px rgba(183, 236, 92, 0.45))",
  },
  flame: {
    bg: "linear-gradient(90deg, #ff4500 0%, #ff8c00 50%, #ffd700 100%)",
    glow: "drop-shadow(0 0 8px rgba(255, 69, 0, 0.45))",
  },
};

export function UniqText({
  preset = "uniq",
  glow = false,
  href,
  target,
  rel,
  children,
  className,
  style,
  ...props
}: UniqTextProps) {
  const Comp = href ? "a" : "span";
  const linkProps = href
    ? {
        href,
        target: target ?? "_blank",
        rel: rel ?? "noopener noreferrer",
      }
    : {};

  if (preset === "scope") {
    return (
      <Comp
        {...linkProps}
        style={{ ...SCOPE_STYLE, ...style }}
        className={cn(
          "styleUserNickname inline-flex items-center select-none tracking-wide",
          href && "hover:opacity-90 cursor-pointer",
          className
        )}
        {...props}
      >
        <span>{children}</span>
      </Comp>
    );
  }

  if (preset === "raysmorgan") {
    return (
      <Comp
        {...linkProps}
        style={{ ...RAYSMORGAN_STYLE, ...style }}
        className={cn(
          "styleUserNickname style3 inline-flex items-center select-none tracking-wide",
          href && "hover:underline cursor-pointer",
          className
        )}
        {...props}
      >
        <span>{children}</span>
      </Comp>
    );
  }

  if (preset === "extasy") {
    return (
      <Comp
        {...linkProps}
        style={{
          backgroundImage: EXTASY_GRADIENT,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          ...style,
        }}
        className={cn(
          "styleUserNickname style350 inline-flex items-center font-bold tracking-wide select-none",
          href && "hover:opacity-90 cursor-pointer",
          className
        )}
        {...props}
      >
        <span>{children}</span>
      </Comp>
    );
  }

  if (preset === "gold") {
    return (
      <Comp
        {...linkProps}
        style={{ ...GOLD_STYLE, ...style }}
        className={cn(
          "styleUserNickname inline-flex items-center select-none tracking-wide",
          href && "hover:opacity-90 cursor-pointer",
          className
        )}
        {...props}
      >
        <span>{children}</span>
      </Comp>
    );
  }

  const grad = GRADIENT_PRESETS[preset] || GRADIENT_PRESETS.uniq;

  return (
    <Comp
      {...linkProps}
      style={{
        backgroundImage: grad.bg,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        filter: glow && grad.glow ? grad.glow : undefined,
        ...style,
      }}
      className={cn(
        "styleUserNickname inline-flex items-center font-bold tracking-wide select-none",
        href && "hover:underline cursor-pointer",
        className
      )}
      {...props}
    >
      <span>{children}</span>
    </Comp>
  );
}

export const UnikText = UniqText;
