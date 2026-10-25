"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  group?: string;
  icon?: React.ReactNode;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  size?: "default" | "extraLarge";
  className?: string;
}

export function Select({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = "Выберите...",
  disabled = false,
  searchable,
  size = "default",
  className,
}: SelectProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string | undefined>(
    defaultValue || (options.length > 0 ? options[0]?.value : undefined)
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : uncontrolledValue;
  const selectedOption = options.find((opt) => opt.value === currentValue);

  const isSearchable = searchable !== undefined ? searchable : options.length > 7;

  const filteredOptions = React.useMemo(() => {
    if (!searchQuery.trim()) return options;
    const q = searchQuery.toLowerCase();
    return options.filter(
      (opt) => opt.label.toLowerCase().includes(q) || opt.group?.toLowerCase().includes(q)
    );
  }, [options, searchQuery]);

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      if (isSearchable) {
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, isSearchable]);

  const handleSelect = (val: string) => {
    if (!isControlled) {
      setUncontrolledValue(val);
    }
    onChange?.(val);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "chosen-container chosen-container-single textCtrl relative inline-block w-full select-none rounded-[10px] bg-[rgb(24,30,28)] text-[14px] transition-all duration-150",
        size === "extraLarge" ? "extraLarge min-h-[38px]" : "min-h-[34px]",
        isOpen && "chosen-container-active chosen-with-drop shadow-[0_0_0_2px_rgb(46,97,74)]",
        disabled && "chosen-disabled cursor-not-allowed opacity-50",
        className
      )}
    >
      <a
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!disabled) setIsOpen(!isOpen);
          } else if (e.key === "Escape") {
            setIsOpen(false);
          }
        }}
        className={cn(
          "chosen-single flex w-full items-center justify-between px-[12px] text-[14px] cursor-pointer outline-none",
          size === "extraLarge" ? "h-[38px] leading-[38px]" : "h-[34px] leading-[34px]"
        )}
      >
        <span className="flex items-center gap-2 truncate">
          {selectedOption?.icon}
          {selectedOption?.group && (
            <span className="group-name text-[rgb(140,162,154)] text-xs font-normal mr-1">
              {selectedOption.group}:
            </span>
          )}
          <span className={selectedOption ? "text-[rgb(214,214,214)]" : "text-[rgb(140,162,154)]"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </span>
        <div className="shrink-0 flex items-center justify-center w-[20px] ml-1">
          <ChevronDown
            className={cn(
              "w-4 h-4 text-[rgb(140,162,154)] transition-transform duration-200",
              isOpen && "rotate-180 text-[rgb(214,214,214)]"
            )}
          />
        </div>
      </a>

      {isOpen && (
        <div className="chosen-drop absolute left-0 top-[calc(100%+4px)] z-[5000] w-full rounded-[10px] border border-[rgb(30,39,37)] bg-[rgb(17,22,21)] shadow-[0_12px_30px_rgba(0,0,0,0.6)] overflow-hidden animate-in fade-in-0 duration-100">
          {isSearchable && (
            <div className="chosen-search p-2 border-b border-[rgb(30,39,37)] bg-[rgb(24,30,28)]">
              <input
                ref={searchInputRef}
                type="text"
                autoComplete="off"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setIsOpen(false);
                  }
                }}
                className="w-full h-[28px] rounded-[6px] bg-[rgb(17,22,21)] border border-[rgb(36,47,43)] px-2.5 text-xs text-[rgb(214,214,214)] placeholder:text-[rgb(90,105,99)] outline-none focus:border-[#00ba78]"
              />
            </div>
          )}

          <ul className="chosen-results max-h-[260px] overflow-y-auto py-1 m-0 list-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filteredOptions.length === 0 ? (
              <li className="no-results text-center py-3 text-xs text-[rgb(140,162,154)]">
                Не найдено вариантов
              </li>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = option.value === currentValue;
                return (
                  <li
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      "active-result flex items-center justify-between px-[15px] py-[6px] text-[14px] cursor-pointer text-[rgb(214,214,214)] transition-colors duration-150",
                      isSelected
                        ? "result-selected bg-[rgb(30,39,37)] text-[rgb(245,245,245)] font-medium"
                        : "hover:bg-[rgb(30,39,37)]"
                    )}
                  >
                    <span className="flex items-center gap-2 truncate">
                      {option.icon}
                      <span>{option.label}</span>
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-[#00ba78] shrink-0" />}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
