"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { UniqText, type UniqPreset } from "./uniq-text";

/* -------------------------------------------------------------------------------------------------
 * Context & Primitives for Generic XenForo .Menu
 * -----------------------------------------------------------------------------------------------*/

interface DropdownContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownContext = React.createContext<DropdownContextType | undefined>(undefined);

export interface DropdownMenuProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function DropdownMenu({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: DropdownMenuProps) {
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
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block text-left">{children}</div>
    </DropdownContext.Provider>
  );
}

export interface DropdownMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export function DropdownMenuTrigger({
  asChild,
  children,
  onClick,
  ...props
}: DropdownMenuTriggerProps) {
  const context = React.useContext(DropdownContext);
  if (!context) throw new Error("DropdownMenuTrigger must be inside DropdownMenu");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    context.setOpen(!context.open);
  };

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{
      onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    }>;
    return React.cloneElement(child, {
      ...props,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        child.props?.onClick?.(e);
        context.setOpen(!context.open);
      },
    });
  }

  return (
    <button type="button" onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Кнопка опций с тремя точками (.dottesStyle)
 * -----------------------------------------------------------------------------------------------*/

export interface DottesTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const DottesTrigger = React.forwardRef<HTMLButtonElement, DottesTriggerProps>(
  ({ className, active, ...props }, ref) => {
    const context = React.useContext(DropdownContext);
    const isOpen = active ?? context?.open ?? false;

    return (
      <button
        ref={ref}
        type="button"
        aria-label="Опции темы"
        onClick={(e) => {
          props.onClick?.(e);
          context?.setOpen(!context.open);
        }}
        className={cn(
          "dottesStyle buttonStyle group relative inline-flex items-center justify-center w-[36px] h-[34px] rounded-[10px] bg-[rgb(30,39,37)] hover:bg-[rgb(36,47,43)] outline -outline-offset-1 outline-[rgb(36,47,43)] transition-colors duration-150 cursor-pointer select-none shrink-0",
          isOpen && "bg-[rgb(36,47,43)] outline-[rgb(44,58,53)]",
          className
        )}
        {...props}
      >
        <span className="flex items-center justify-center gap-[3px]">
          <span
            className={cn(
              "w-[3.5px] h-[3.5px] rounded-full bg-[rgb(140,162,154)] transition-colors duration-150 group-hover:bg-[#eaeaea]",
              isOpen && "bg-white"
            )}
          />
          <span
            className={cn(
              "w-[3.5px] h-[3.5px] rounded-full bg-[rgb(140,162,154)] transition-colors duration-150 group-hover:bg-[#eaeaea]",
              isOpen && "bg-white"
            )}
          />
          <span
            className={cn(
              "w-[3.5px] h-[3.5px] rounded-full bg-[rgb(140,162,154)] transition-colors duration-150 group-hover:bg-[#eaeaea]",
              isOpen && "bg-white"
            )}
          />
        </span>
      </button>
    );
  }
);
DottesTrigger.displayName = "DottesTrigger";

export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "right";
  width?: string;
}

export function DropdownMenuContent({
  align = "right",
  width = "w-[220px]",
  className,
  children,
  ...props
}: DropdownMenuContentProps) {
  const context = React.useContext(DropdownContext);
  if (!context) throw new Error("DropdownMenuContent must be inside DropdownMenu");

  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!context.open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") context.setOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.parentElement?.contains(e.target as Node)) {
        context.setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [context]);

  if (!context.open) return null;

  return (
    <div
      ref={menuRef}
      className={cn(
        "Menu absolute top-[calc(100%+6px)] z-50 rounded-[12px] border border-[rgb(30,39,37)] bg-[rgb(17,22,21)] shadow-[0_12px_40px_rgb(15,20,20)] py-1.5 overflow-hidden anim-lzt-dropdown-in select-none text-left",
        align === "right" ? "right-0" : "left-0",
        width,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownMenuHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "menuHeader px-3.5 py-2 text-[11px] font-semibold text-[rgb(140,162,154)] uppercase tracking-wider border-b border-[rgb(30,39,37)] mb-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface DropdownMenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "danger";
  icon?: React.ReactNode;
}

export function DropdownMenuItem({
  variant = "default",
  icon,
  className,
  children,
  onClick,
  ...props
}: DropdownMenuItemProps) {
  const context = React.useContext(DropdownContext);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    context?.setOpen(false);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "w-full flex items-center gap-3 px-3.5 py-2 text-[13px] font-medium transition-colors duration-100 cursor-pointer text-left border-0 bg-transparent group",
        variant === "default" &&
          "text-[rgb(214,214,214)] hover:bg-[rgb(30,39,37)] hover:text-white",
        variant === "danger" &&
          "text-[rgb(241,56,56)] hover:bg-[rgba(241,56,56,0.12)] hover:text-[rgb(255,80,80)]",
        className
      )}
      {...props}
    >
      {icon && (
        <span
          className={cn(
            "w-4 h-4 shrink-0 flex items-center justify-center text-[rgb(140,162,154)] transition-colors duration-100",
            variant === "default" && "group-hover:text-[#00ba78]",
            variant === "danger" && "text-[rgb(241,56,56)] group-hover:text-[rgb(255,80,80)]"
          )}
        >
          {icon}
        </span>
      )}
      <span className="truncate flex-1">{children}</span>
    </button>
  );
}

export function DropdownMenuDivider({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("h-[1px] bg-[rgb(30,39,37)] my-1", className)}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------------------------------
 * Триггер профиля пользователя в шапке (.accountPopup)
 * -----------------------------------------------------------------------------------------------*/

export function AccountTrigger({
  username = "Пользователь",
  balance = "0",
  avatarUrl,
  className,
  onClick,
}: {
  username?: string;
  balance?: string | number;
  avatarUrl?: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "navLink accountPopup inline-flex items-center gap-2.5 px-3 h-[40px] rounded-full bg-transparent hover:bg-[rgb(24,30,28)] transition-colors duration-150 cursor-pointer text-left border-0 select-none",
        className
      )}
    >
      <b className="accountUsername text-sm font-bold text-[#0fdc91] leading-none">
        {username}
      </b>
      <span className="balanceLabel text-xs text-[rgb(140,162,154)] font-mono leading-none flex items-center gap-0.5">
        <span>{balance}</span>
        <span>₽</span>
      </span>
      <div className="relative w-[34px] h-[34px] rounded-full shrink-0 overflow-hidden bg-[rgb(30,39,37)] flex items-center justify-center">
        <span className="text-[rgb(140,162,154)] text-xs font-semibold select-none">
          {username.slice(0, 2).toUpperCase()}
        </span>
        {avatarUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt=""
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = "none";
            }}
            className="absolute inset-0 w-full h-full object-cover rounded-full"
          />
        )}
      </div>
    </button>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Меню профиля (#AccountMenu)
 * -----------------------------------------------------------------------------------------------*/

export interface AccountMenuUser {
  name: string;
  avatar?: string;
  statusText?: string;
  balance?: number | string;
  uniqPreset?: UniqPreset;
  secondaryAccount?: {
    name: string;
    avatar?: string;
    balance?: string;
    unreadCount?: number;
  };
}

export interface AccountMenuProps {
  user?: AccountMenuUser;
  onDeposit?: () => void;
  onPayout?: () => void;
  onTransfer?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
  onClose?: () => void;
  className?: string;
}

const DEFAULT_ACCOUNT_USER: AccountMenuUser = {
  name: "Пользователь",
  statusText: "",
  balance: 0,
};

export function AccountMenu({
  user = DEFAULT_ACCOUNT_USER,
  onDeposit,
  onPayout,
  onTransfer,
  onSettings,
  onLogout,
  onClose,
  className,
}: AccountMenuProps) {
  const [showBalance, setShowBalance] = React.useState(true);

  return (
    <div
      id="AccountMenu"
      className={cn(
        "Menu HeaderMenu mobile-switch-menu w-[310px] rounded-[12px] border border-[rgb(30,39,37)] bg-[rgb(17,22,21)] shadow-[0_12px_40px_rgb(15,20,20)] text-[rgb(214,214,214)] select-none overflow-hidden text-left",
        className
      )}
    >
      <div className="menuBlock max-h-[92vh] overflow-y-auto">
        {/* 1. Profile Background Block */}
        <div className="profileBackground flex flex-col items-center px-5 pt-6 pb-4 relative">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 text-[rgb(140,162,154)] hover:text-white transition cursor-pointer"
              title="Закрыть"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          <div className="imageBlock flex flex-col items-center gap-3 w-full">
            <div className="avatarGroup relative">
              <span className="menuAvatar w-[72px] h-[72px] rounded-full bg-[rgb(30,39,37)] text-[rgb(214,214,214)] text-xl font-bold flex items-center justify-center [mask-image:radial-gradient(circle_at_right_12px_bottom_12px,transparent_16px,#000_17px)] [-webkit-mask-image:radial-gradient(circle_at_right_12px_bottom_12px,transparent_16px,#000_17px)]">
                {user.name.slice(0, 2).toUpperCase()}
              </span>
              {user.avatar && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.avatar}
                  alt=""
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = "none";
                  }}
                  className="menuAvatar absolute inset-0 w-[72px] h-[72px] rounded-full block object-cover [mask-image:radial-gradient(circle_at_right_12px_bottom_12px,transparent_16px,#000_17px)] [-webkit-mask-image:radial-gradient(circle_at_right_12px_bottom_12px,transparent_16px,#000_17px)]"
                />
              )}
              <a
                href="#"
                className="addAccount absolute bottom-0 right-0 w-[24px] h-[24px] rounded-full bg-white/20 backdrop-blur-[2px] hover:bg-white/30 active:opacity-70 flex items-center justify-center text-white transition-all duration-100"
                title="Привязать аккаунт"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5V19M5 12H19" />
                </svg>
              </a>
            </div>

            <div className="aboutUser grid gap-1 text-center w-full">
              <div className="username text-base font-semibold leading-tight">
                {user.uniqPreset ? (
                  <UniqText preset={user.uniqPreset}>{user.name}</UniqText>
                ) : (
                  <span className="text-[rgb(245,245,245)]">{user.name}</span>
                )}
              </div>
              {user.statusText && (
                <div className="userBlurb text-xs text-[rgb(140,162,154)] break-words leading-relaxed px-2">
                  {user.statusText}
                </div>
              )}
            </div>
          </div>

          <a
            href="#"
            className="button mt-3.5 inline-flex items-center justify-center h-[34px] px-4 rounded-[10px] bg-[rgb(30,39,37)] hover:bg-[rgb(36,47,43)] text-[rgb(214,214,214)] hover:text-white text-xs font-medium transition cursor-pointer"
          >
            Перейти в профиль
          </a>
        </div>

        {/* 2. Balance Block */}
        <div className="balanceBlock mx-3 p-4 rounded-[16px] bg-[rgb(24,30,28)] border border-[#242f2b] flex flex-col gap-3.5">
          <div className="amountBlock flex flex-col gap-1.5 w-full">
            <span className="muted text-xs text-[rgb(140,162,154)]">Баланс</span>
            <div className="amount flex items-center justify-between w-full">
              <div className="balanceLabel balanceAmount flex items-baseline gap-1 font-mono text-xl font-semibold leading-none">
                <span
                  className={cn(
                    "balanceValue text-white transition-all duration-200",
                    !showBalance && "filter blur-[6px]"
                  )}
                >
                  {showBalance ? user.balance : "888"}
                </span>
                <span className="svgIcon--rub text-base text-[rgb(140,162,154)]">₽</span>
              </div>

              <button
                type="button"
                onClick={() => setShowBalance(!showBalance)}
                className="text-[rgb(140,162,154)] hover:text-white transition cursor-pointer p-1"
                title="Показать / скрыть баланс"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {showBalance ? (
                    <>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </>
                  ) : (
                    <>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* 3 Action Buttons: Пополнить, Вывести, Перевести */}
          <div className="actionsBlock flex items-center gap-2 w-full">
            <div className="buttonContainer flex flex-col gap-1.5 items-center w-full">
              <button
                type="button"
                onClick={onDeposit}
                className="button secondary w-full h-[40px] rounded-[12px] bg-[rgb(55,211,141,0.12)] hover:bg-[rgb(55,211,141,0.18)] outline -outline-offset-1 outline-[color-mix(in_srgb,rgb(55,211,141)_40%,transparent)] flex items-center justify-center transition cursor-pointer"
                title="Пополнить"
              >
                <div className="SvgIcon flex items-center justify-center text-[#37D38D]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z"
                    />
                  </svg>
                </div>
              </button>
              <span className="text-[12px] text-[rgb(214,214,214)]">Пополнить</span>
            </div>

            <div className="buttonContainer flex flex-col gap-1.5 items-center w-full">
              <button
                type="button"
                onClick={onPayout}
                className="button w-full h-[40px] rounded-[12px] bg-[rgb(30,39,37)] hover:bg-[rgb(36,47,43)] outline -outline-offset-1 outline-[rgb(44,58,53)] flex items-center justify-center transition cursor-pointer"
                title="Вывести"
              >
                <div className="SvgIcon flex items-center justify-center text-[rgb(214,214,214)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM12 7C12.5523 7 13 7.44772 13 8V13.5858L15.2929 11.2929C15.6834 10.9024 16.3166 10.9024 16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929C7.68342 10.9024 8.31658 10.9024 8.70711 11.2929L11 13.5858V8C11 7.44772 11.4477 7 12 7Z"
                    />
                  </svg>
                </div>
              </button>
              <span className="text-[12px] text-[rgb(214,214,214)]">Вывести</span>
            </div>

            <div className="buttonContainer flex flex-col gap-1.5 items-center w-full">
              <button
                type="button"
                onClick={onTransfer}
                className="button w-full h-[40px] rounded-[12px] bg-[rgb(30,39,37)] hover:bg-[rgb(36,47,43)] outline -outline-offset-1 outline-[rgb(44,58,53)] flex items-center justify-center transition cursor-pointer"
                title="Перевести"
              >
                <div className="SvgIcon flex items-center justify-center text-[rgb(214,214,214)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.3373 3.13945C10.6304 2.77982 11.0734 2.57605 11.5372 2.58756C11.9438 2.59765 12.2509 2.80142 12.4055 2.91148C12.5703 3.0288 12.758 3.18969 12.9441 3.34925C12.9532 3.35707 12.9623 3.36489 12.9714 3.3727L21.4618 10.6501C21.5662 10.7396 21.6875 10.8435 21.7853 10.9431C21.8959 11.0558 22.0507 11.2348 22.1434 11.4929C22.2611 11.8207 22.2611 12.1793 22.1434 12.5071C22.0507 12.7652 21.8959 12.9442 21.7853 13.0569C21.6875 13.1565 21.5662 13.2604 21.4618 13.3498L12.944 20.6508C12.758 20.8103 12.5703 20.9712 12.4055 21.0885C12.2509 21.1986 11.9438 21.4023 11.5372 21.4124C11.0734 21.4239 10.6304 21.2202 10.3373 20.8605C10.0803 20.5452 10.0352 20.1795 10.0181 19.9905C9.99991 19.7889 9.99995 19.5418 10 19.2966L10 16.1964C9.0578 16.3593 8.14001 16.6517 7.27329 17.0675C5.92197 17.7158 4.72673 18.6485 3.76944 19.8017C3.5003 20.1259 3.05681 20.2466 2.66047 20.1035C2.26413 19.9605 2 19.5843 2 19.163V18.551C2.00136 15.9302 2.96754 13.4012 4.71418 11.4474C6.1266 9.86742 7.9694 8.75269 10 8.22851V4.73936C10 4.72736 10 4.71536 10 4.70334C9.99995 4.45822 9.99991 4.21104 10.0181 4.00952C10.0352 3.82049 10.0803 3.45473 10.3373 3.13945Z"
                    />
                  </svg>
                </div>
              </button>
              <span className="text-[12px] text-[rgb(214,214,214)]">Перевести</span>
            </div>
          </div>
        </div>

        {/* 3. 2-Column Grid Navigation: .manageItems */}
        <div className="manageItems grid grid-cols-2 gap-2 p-3">
          {/* 1. Мои аккаунты */}
          <a
            href="https://lzt.market/user/orders"
            className="manageItem flex items-center gap-3 p-2.5 h-[52px] rounded-[10px] bg-[rgb(24,30,28)] border border-[rgb(30,39,37)] hover:bg-[rgb(30,39,37)] text-[rgb(214,214,214)] group transition-colors duration-200"
          >
            <div className="SvgIcon shrink-0 text-[rgb(140,162,154)] group-hover:text-[#37D38D] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M17 8.99994C17 8.48812 16.8047 7.9763 16.4142 7.58579C16.0237 7.19526 15.5118 7 15 7M15 15C18.3137 15 21 12.3137 21 9C21 5.68629 18.3137 3 15 3C11.6863 3 9 5.68629 9 9C9 9.27368 9.01832 9.54308 9.05381 9.80704C9.11218 10.2412 9.14136 10.4583 9.12172 10.5956C9.10125 10.7387 9.0752 10.8157 9.00469 10.9419C8.937 11.063 8.81771 11.1823 8.57913 11.4209L3.46863 16.5314C3.29568 16.7043 3.2092 16.7908 3.14736 16.8917C3.09253 16.9812 3.05213 17.0787 3.02763 17.1808C3 17.2959 3 17.4182 3 17.6627V19.4C3 19.9601 3 20.2401 3.10899 20.454C3.20487 20.6422 3.35785 20.7951 3.54601 20.891C3.75992 21 4.03995 21 4.6 21H7V19H9V17H11L12.5791 15.4209C12.8177 15.1823 12.937 15.063 13.0581 14.9953C13.1843 14.9248 13.2613 14.8987 13.4044 14.8783C13.7588 14.8878 13.5417 14.8586 14.193 14.9462C14.4569 14.9817 14.7263 15 15 15Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-xs font-medium leading-tight group-hover:text-[#37D38D] transition-colors">
              Мои аккаунты
            </span>
          </a>

          {/* 2. Мои покупки */}
          <a
            href="https://lzt.market/user/purchases"
            className="manageItem flex items-center gap-3 p-2.5 h-[52px] rounded-[10px] bg-[rgb(24,30,28)] border border-[rgb(30,39,37)] hover:bg-[rgb(30,39,37)] text-[rgb(214,214,214)] group transition-colors duration-200"
          >
            <div className="SvgIcon shrink-0 text-[rgb(140,162,154)] group-hover:text-[#37D38D] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5.52 2.64L3.96 4.72C3.65102 5.13198 3.49652 5.33797 3.50011 5.51039C3.50323 5.66044 3.57358 5.80115 3.69175 5.89368C3.82754 6 4.08503 6 4.6 6H19.4C19.915 6 20.1725 6 20.3083 5.89368C20.4264 5.80115 20.4968 5.66044 20.4999 5.51039C20.5035 5.33797 20.349 5.13198 20.04 4.72L18.48 2.64M5.52 2.64C5.696 2.40533 5.784 2.288 5.89552 2.20338C5.9943 2.12842 6.10616 2.0725 6.22539 2.03845C6.36 2 6.50667 2 6.8 2H17.2C17.4933 2 17.64 2 17.7746 2.03845C17.8938 2.0725 18.0057 2.12842 18.1045 2.20338C18.216 2.288 18.304 2.40533 18.48 2.64M5.52 2.64L3.64 5.14666C3.40254 5.46328 3.28381 5.62159 3.1995 5.79592C3.12469 5.95062 3.07012 6.11431 3.03715 6.28296C3 6.47301 3 6.6709 3 7.06666L3 18.8C3 19.9201 3 20.4802 3.21799 20.908C3.40973 21.2843 3.71569 21.5903 4.09202 21.782C4.51984 22 5.07989 22 6.2 22L17.8 22C18.9201 22 19.4802 22 19.908 21.782C20.2843 21.5903 20.5903 21.2843 20.782 20.908C21 20.4802 21 19.9201 21 18.8V7.06667C21 6.6709 21 6.47301 20.9628 6.28296C20.9299 6.11431 20.8753 5.95062 20.8005 5.79592C20.7162 5.62159 20.5975 5.46328 20.36 5.14667L18.48 2.64M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-xs font-medium leading-tight group-hover:text-[#37D38D] transition-colors">
              Мои покупки
            </span>
          </a>

          {/* 3. Мои темы */}
          <a
            href="#"
            className="manageItem flex items-center gap-3 p-2.5 h-[52px] rounded-[10px] bg-[rgb(24,30,28)] border border-[rgb(30,39,37)] hover:bg-[rgb(30,39,37)] text-[rgb(214,214,214)] group transition-colors duration-200"
          >
            <div className="SvgIcon shrink-0 text-[rgb(140,162,154)] group-hover:text-[#37D38D] transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M2.5 10H17.5M2.5 5H17.5M2.5 15H12.5"
                  stroke="currentColor"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-xs font-medium leading-tight group-hover:text-[#37D38D] transition-colors">
              Мои темы
            </span>
          </a>

          {/* 4. Мои сообщения */}
          <a
            href="#"
            className="manageItem flex items-center gap-3 p-2.5 h-[52px] rounded-[10px] bg-[rgb(24,30,28)] border border-[rgb(30,39,37)] hover:bg-[rgb(30,39,37)] text-[rgb(214,214,214)] group transition-colors duration-200"
          >
            <div className="SvgIcon shrink-0 text-[rgb(140,162,154)] group-hover:text-[#37D38D] transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M5.07603 9.35863C5.02424 9.02482 4.99736 8.68285 4.99736 8.33464C4.99736 4.65274 8.00177 1.66797 11.7079 1.66797C15.414 1.66797 18.4184 4.65274 18.4184 8.33464C18.4184 9.16636 18.2651 9.96251 17.985 10.6967C17.9269 10.8492 17.8978 10.9255 17.8846 10.985C17.8715 11.044 17.8664 11.0854 17.865 11.1458C17.8636 11.2068 17.8718 11.2739 17.8884 11.4082L18.2239 14.1334C18.2602 14.4284 18.2783 14.5759 18.2293 14.6832C18.1863 14.7771 18.1099 14.8517 18.015 14.8926C17.9066 14.9391 17.7596 14.9176 17.4655 14.8745L14.8111 14.4854C14.6725 14.4651 14.6032 14.4549 14.5401 14.4553C14.4777 14.4556 14.4345 14.4602 14.3734 14.4731C14.3116 14.4861 14.2327 14.5156 14.0749 14.5747C13.3388 14.8504 12.5411 15.0013 11.7079 15.0013C11.3594 15.0013 11.0171 14.9749 10.6829 14.924M6.35704 18.3346C8.82779 18.3346 10.8307 16.2826 10.8307 13.7513C10.8307 11.22 8.82779 9.16797 6.35704 9.16797C3.8863 9.16797 1.88336 11.22 1.88336 13.7513C1.88336 14.2601 1.96429 14.7496 2.11369 15.2069C2.17684 15.4002 2.20841 15.4969 2.21878 15.5629C2.2296 15.6319 2.23149 15.6706 2.22746 15.7402C2.2236 15.807 2.20691 15.8824 2.17352 16.0332L1.66406 18.3346L4.15973 17.9938C4.29595 17.9752 4.36406 17.9659 4.42354 17.9663C4.48616 17.9667 4.5194 17.9701 4.58082 17.9824C4.63915 17.994 4.72586 18.0246 4.89929 18.0858C5.35622 18.2471 5.84665 18.3346 6.35704 18.3346Z"
                  stroke="currentColor"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-xs font-medium leading-tight group-hover:text-[#37D38D] transition-colors">
              Мои сообщения
            </span>
          </a>

          {/* 5. Мои тикеты */}
          <a
            href="#"
            className="manageItem flex items-center gap-3 p-2.5 h-[52px] rounded-[10px] bg-[rgb(24,30,28)] border border-[rgb(30,39,37)] hover:bg-[rgb(30,39,37)] text-[rgb(214,214,214)] group transition-colors duration-200"
          >
            <div className="SvgIcon shrink-0 text-[rgb(140,162,154)] group-hover:text-[#37D38D] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12v4c0 1.1.9 2 2 2h2v-8H4v-2c0-4.41 3.59-8 8-8s8 3.59 8 8v2h-2v8h2c1.1 0 2-.9 2-2v-4c0-5.52-4.48-10-10-10z" />
              </svg>
            </div>
            <span className="text-xs font-medium leading-tight group-hover:text-[#37D38D] transition-colors">
              Мои тикеты
            </span>
          </a>

          {/* 6. Мои закладки */}
          <a
            href="#"
            className="manageItem flex items-center gap-3 p-2.5 h-[52px] rounded-[10px] bg-[rgb(24,30,28)] border border-[rgb(30,39,37)] hover:bg-[rgb(30,39,37)] text-[rgb(214,214,214)] group transition-colors duration-200"
          >
            <div className="SvgIcon shrink-0 text-[rgb(140,162,154)] group-hover:text-[#37D38D] transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4.16406 6.5C4.16406 5.09987 4.16406 4.3998 4.43655 3.86502C4.67623 3.39462 5.05868 3.01217 5.52909 2.77248C6.06387 2.5 6.76393 2.5 8.16406 2.5H11.8307C13.2309 2.5 13.9309 2.5 14.4657 2.77248C14.9361 3.01217 15.3186 3.39462 15.5582 3.86502C15.8307 4.3998 15.8307 5.09987 15.8307 6.5V17.5L9.9974 14.1667L4.16406 17.5V6.5Z"
                  stroke="currentColor"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-xs font-medium leading-tight group-hover:text-[#37D38D] transition-colors">
              Мои закладки
            </span>
          </a>

          {/* 7. FAQ */}
          <a
            href="#"
            className="manageItem flex items-center gap-3 p-2.5 h-[52px] rounded-[10px] bg-[rgb(24,30,28)] border border-[rgb(30,39,37)] hover:bg-[rgb(30,39,37)] text-[rgb(214,214,214)] group transition-colors duration-200"
          >
            <div className="SvgIcon shrink-0 text-[rgb(140,162,154)] group-hover:text-[#37D38D] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 19V16H7C5.34315 16 4 17.3431 4 19M8.8 22H16.8C17.9201 22 18.4802 22 18.908 21.782C19.2843 21.5903 19.5903 21.2843 19.782 20.908C20 20.4802 20 19.9201 20 18.8V5.2C20 4.07989 20 3.51984 19.782 3.09202C19.5903 2.71569 19.2843 2.40973 18.908 2.21799C18.4802 2 17.9201 2 16.8 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-xs font-medium leading-tight group-hover:text-[#37D38D] transition-colors">
              FAQ
            </span>
          </a>

          {/* 8. Switch to English */}
          <button
            type="button"
            className="manageItem flex items-center gap-3 p-2.5 h-[52px] rounded-[10px] bg-[rgb(24,30,28)] border border-[rgb(30,39,37)] hover:bg-[rgb(30,39,37)] text-[rgb(214,214,214)] group transition-colors duration-200 text-left cursor-pointer"
          >
            <div className="SvgIcon shrink-0 text-[rgb(140,162,154)] group-hover:text-[#37D38D] transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10.7583 14.1667H16.7365M10.7583 14.1667L9.16406 17.5M10.7583 14.1667L13.146 9.17419C13.3384 8.77189 13.4346 8.57075 13.5662 8.50718C13.6807 8.4519 13.8141 8.4519 13.9286 8.50718C14.0602 8.57075 14.1564 8.77189 14.3488 9.17419L16.7365 14.1667M16.7365 14.1667L18.3307 17.5M1.66406 4.16667H6.66406M6.66406 4.16667H9.58073M6.66406 4.16667V2.5M9.58073 4.16667H11.6641M9.58073 4.16667C9.16728 6.63107 8.20788 8.86349 6.80202 10.737M8.33073 11.6667C7.82029 11.4373 7.2996 11.1184 6.80202 10.737M6.80202 10.737C5.67491 9.87314 4.66636 8.68886 4.16406 7.5M6.80202 10.737C5.46478 12.5191 3.72359 13.9765 1.66406 15"
                  stroke="currentColor"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-xs font-medium leading-tight group-hover:text-[#37D38D] transition-colors">
              Switch to English
            </span>
          </button>
        </div>

        {/* 4. Profile Switcher Row: .profileSwitchBlock */}
        {user.secondaryAccount && (
          <div className="profileSwitchBlock px-3 pb-3">
            <div className="profileContainer flex flex-col gap-1.5 p-1.5 rounded-[16px] bg-[rgb(24,30,28)] border border-[#242f2b]">
              <a
                href="#switch"
                className="profileItem flex items-center justify-between gap-2 p-2 rounded-[14px] hover:bg-[#1e2725] transition-colors duration-200"
              >
                <div className="aboutUserBlock flex items-center gap-3 w-full min-w-0">
                  <div className="avatarBlock relative shrink-0">
                    {user.secondaryAccount.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={user.secondaryAccount.avatar}
                        alt={user.secondaryAccount.name}
                        className="w-[32px] h-[32px] rounded-full object-cover"
                      />
                    ) : (
                      <span className="w-[32px] h-[32px] rounded-full bg-[rgb(30,39,37)] text-[rgb(140,162,154)] text-xs font-semibold flex items-center justify-center">
                        {user.secondaryAccount.name.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                    {user.secondaryAccount.unreadCount && (
                      <span className="itemCount absolute -top-0.5 -right-0.5 px-1 min-w-[14px] h-[14px] rounded-full bg-[#228e5d] text-[#f5f5f5] text-[9px] font-bold flex items-center justify-center border-2 border-[#0c0f0e]">
                        {user.secondaryAccount.unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="profileInfoBlock flex items-center justify-between w-full min-w-0 pr-1">
                    <span className="username text-sm font-bold text-[rgb(245,245,245)] truncate">
                      {user.secondaryAccount.name}
                    </span>
                    <div className="amountBlock flex items-center gap-1 font-mono text-xs text-[rgb(140,162,154)] shrink-0">
                      <span>{user.secondaryAccount.balance}</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-0.5 text-[rgb(140,162,154)]"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        )}

        {/* 5. Sticky Footer Block: .footerBlock */}
        <div className="footerBlock sticky bottom-0 w-full flex items-center justify-between gap-3 p-3 bg-[rgb(17,22,21)] border-t border-[rgb(30,39,37)]">
          <a
            href="#"
            onClick={onSettings}
            className="footerItem flex-1 flex items-center gap-2 px-3 h-[40px] rounded-[10px] bg-white/[0.08] hover:bg-white/[0.12] text-xs font-medium text-[rgb(214,214,214)] hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <div className="SvgIcon shrink-0 text-[rgb(140,162,154)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9.39504 19.3711L9.97949 20.6856C10.1532 21.0768 10.4368 21.4093 10.7957 21.6426C11.1547 21.8759 11.5736 22.0001 12.0017 22C12.4298 22.0001 12.8488 21.8759 13.2077 21.6426C13.5667 21.4093 13.8502 21.0768 14.0239 20.6856L14.6084 19.3711C14.8164 18.9047 15.1664 18.5159 15.6084 18.26C16.0532 18.0034 16.5677 17.8941 17.0784 17.9478L18.5084 18.1C18.934 18.145 19.3636 18.0656 19.7451 17.8713C20.1265 17.6771 20.4434 17.3763 20.6573 17.0056C20.8714 16.635 20.9735 16.2103 20.951 15.7829C20.9285 15.3555 20.7825 14.9438 20.5306 14.5978L19.6839 13.4344C19.3825 13.0171 19.2214 12.5148 19.2239 12C19.2238 11.4866 19.3864 10.9864 19.6884 10.5711L20.535 9.40778C20.7869 9.06175 20.933 8.65007 20.9554 8.22267C20.9779 7.79528 20.8759 7.37054 20.6617 7C20.4478 6.62923 20.1309 6.32849 19.7495 6.13423C19.3681 5.93997 18.9385 5.86053 18.5128 5.90556L17.0828 6.05778C16.5722 6.11141 16.0576 6.00212 15.6128 5.74556C15.1699 5.48825 14.8199 5.09736 14.6128 4.62889L14.0239 3.31444C13.8502 2.92317 13.5667 2.59072 13.2077 2.3574C12.8488 2.12408 12.4298 1.99993 12.0017 2C11.5736 1.99993 11.1547 2.12408 10.7957 2.3574C10.4368 2.59072 10.1532 2.92317 9.97949 3.31444L9.39504 4.62889C9.18797 5.09736 8.83792 5.48825 8.39504 5.74556C7.95026 6.00212 7.43571 6.11141 6.92504 6.05778L5.4906 5.90556C5.06493 5.86053 4.63534 5.93997 4.25391 6.13423C3.87249 6.32849 3.55561 6.62923 3.34171 7C3.12753 7.37054 3.02549 7.79528 3.04798 8.22267C3.07046 8.65007 3.2165 9.06175 3.46838 9.40778L4.31504 10.5711C4.61698 10.9864 4.77958 11.4866 4.77949 12C4.77958 12.5134 4.61698 13.0137 4.31504 13.4289L3.46838 14.5922C3.2165 14.9382 3.07046 15.3499 3.04798 15.7773C3.02549 16.2047 3.12753 16.6295 3.34171 17C3.55582 17.3706 3.87274 17.6712 4.25411 17.8654C4.63548 18.0596 5.06496 18.1392 5.4906 18.0944L6.9206 17.9422C7.43127 17.8886 7.94581 17.9979 8.3906 18.2544C8.83513 18.511 9.18681 18.902 9.39504 19.3711Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <span>Настройки</span>
          </a>

          <button
            type="button"
            onClick={onLogout}
            className="footerItem red w-[40px] h-[40px] rounded-[10px] bg-[rgb(255,86,86,0.14)] hover:bg-[rgb(255,86,86,0.22)] outline -outline-offset-1 outline-[color-mix(in_srgb,rgb(229,136,136,0.28)_40%,transparent)] flex items-center justify-center text-[#ff5656] transition-colors duration-200 cursor-pointer shrink-0"
            title="Выйти из аккаунта"
          >
            <div className="SvgIcon flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M16 17.0001L21 12.0001M21 12.0001L16 7.00006M21 12.0001H9M12 17.0001C12 17.2956 12 17.4434 11.989 17.5715C11.8748 18.902 10.8949 19.9969 9.58503 20.2573C9.45903 20.2824 9.31202 20.2987 9.01835 20.3314L7.99694 20.4448C6.46248 20.6153 5.69521 20.7006 5.08566 20.5055C4.27293 20.2455 3.60942 19.6516 3.26118 18.8725C3 18.2883 3 17.5163 3 15.9724V8.02776C3 6.48383 3 5.71186 3.26118 5.12758C3.60942 4.34854 4.27293 3.75467 5.08566 3.49459C5.69521 3.29953 6.46246 3.38478 7.99694 3.55528L9.01835 3.66877C9.31212 3.70141 9.45901 3.71773 9.58503 3.74279C10.8949 4.00322 11.8748 5.0981 11.989 6.42867C12 6.5567 12 6.70449 12 7.00006"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
