"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------------------------------
 * Types & Context
 * -----------------------------------------------------------------------------------------------*/

export type TimedMessageVariant = "success" | "error";

export interface TimedMessageItem {
  id: string;
  message: string;
  variant?: TimedMessageVariant;
  duration?: number;
  isExiting?: boolean;
}

export interface StackAlertItem {
  id: string;
  message: string;
  duration?: number;
  isExiting?: boolean;
}

interface ToastContextType {
  timedMessage: (
    message: string,
    options?: { variant?: TimedMessageVariant; duration?: number }
  ) => void;
  stackAlert: (message: string, options?: { duration?: number }) => void;
  toast: (
    message: string,
    options?: { variant?: TimedMessageVariant; duration?: number }
  ) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

/* -------------------------------------------------------------------------------------------------
 * ToastProvider: Mounts .xenOverlay.timedMessage & #StackAlerts
 * -----------------------------------------------------------------------------------------------*/

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [timedItem, setTimedItem] = React.useState<TimedMessageItem | null>(null);
  const [alerts, setAlerts] = React.useState<StackAlertItem[]>([]);
  const timedTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const exitTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const dismissTimed = React.useCallback(() => {
    if (timedTimeoutRef.current) clearTimeout(timedTimeoutRef.current);
    if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);

    setTimedItem((cur) => (cur ? { ...cur, isExiting: true } : null));

    exitTimeoutRef.current = setTimeout(() => {
      setTimedItem(null);
    }, 180);
  }, []);

  const showTimedMessage = React.useCallback(
    (
      message: string,
      options?: { variant?: TimedMessageVariant; duration?: number }
    ) => {
      const id = Math.random().toString(36).slice(2, 9);
      const duration = options?.duration ?? 3000;
      const variant = options?.variant ?? "success";

      if (timedTimeoutRef.current) clearTimeout(timedTimeoutRef.current);
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);

      setTimedItem({ id, message, variant, duration, isExiting: false });

      if (duration > 0) {
        timedTimeoutRef.current = setTimeout(() => {
          setTimedItem((cur) => (cur?.id === id ? { ...cur, isExiting: true } : cur));

          exitTimeoutRef.current = setTimeout(() => {
            setTimedItem((cur) => (cur?.id === id ? null : cur));
          }, 180);
        }, duration);
      }
    },
    []
  );

  const dismissStackAlert = React.useCallback((id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isExiting: true } : a))
    );

    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    }, 160);
  }, []);

  const showStackAlert = React.useCallback(
    (message: string, options?: { duration?: number }) => {
      const id = Math.random().toString(36).slice(2, 9);
      const duration = options?.duration ?? 3500;

      setAlerts((prev) => [...prev, { id, message, duration, isExiting: false }]);

      if (duration > 0) {
        setTimeout(() => {
          dismissStackAlert(id);
        }, duration);
      }
    },
    [dismissStackAlert]
  );

  return (
    <ToastContext.Provider
      value={{
        timedMessage: showTimedMessage,
        stackAlert: showStackAlert,
        toast: showTimedMessage,
      }}
    >
      {children}

      {timedItem && (
        <div
          role="status"
          className={cn(
            "xenOverlay timedMessage fixed top-[52px] left-0 w-full z-[15000] flex justify-center pointer-events-none select-none",
            timedItem.isExiting ? "anim-timed-out" : "anim-timed-in"
          )}
        >
          <div
            onClick={dismissTimed}
            className="content pointer-events-auto bg-[#111615] border border-[#1e2725] rounded-[50px] shadow-[0_5px_26px_0_rgba(0,0,0,0.32)] font-semibold text-[13px] text-[rgb(214,214,214)] px-[15px] py-[10px] w-fit flex items-center cursor-pointer hover:bg-[rgb(24,30,28)] transition-colors"
          >
            {timedItem.variant === "error" ? (
              <span className="timedMessage-icon timedMessage-icon--error w-[18px] h-[18px] mr-2 inline-flex shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    opacity="0.12"
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    fill="#FF4B4E"
                  />
                  <path
                    d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                    stroke="#FF4B4E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            ) : (
              <span className="timedMessage-icon timedMessage-icon--success w-[18px] h-[18px] mr-2 inline-flex shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    opacity="0.12"
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    fill="#00BA78"
                  />
                  <path
                    d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                    stroke="#00BA78"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
            <span>{timedItem.message}</span>
          </div>
        </div>
      )}

      <div
        id="StackAlerts"
        className="fixed bottom-[35px] left-[65px] z-[9999] max-h-[50%] overflow-y-auto pointer-events-none select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex flex-col"
      >
        {alerts.map((item) => (
          <div
            key={item.id}
            onClick={() => dismissStackAlert(item.id)}
            role="status"
            className={cn(
              "stackAlert pointer-events-auto relative w-[250px] bg-[rgb(39,39,39)] p-[15px_20px] rounded-[8px] mt-[15px] text-[14px] leading-[1.3] text-[rgb(214,214,214)] cursor-pointer transition-colors duration-150 hover:opacity-90 shadow-lg",
              item.isExiting ? "anim-stack-out" : "anim-stack-in"
            )}
          >
            <div className="stackAlertContent break-words">{item.message}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    // Graceful fallback for SSR/prerender or standalone usage
    return {
      timedMessage: () => {},
      stackAlert: () => {},
      toast: () => {},
    };
  }
  return context;
}

export const useTimedMessage = useToast;
export const useStackAlert = useToast;
