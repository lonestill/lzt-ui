"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      label,
      description,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const isChecked = isControlled ? controlledChecked : uncontrolledChecked;

    const generatedId = React.useId();
    const checkboxId = id || generatedId;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      const next = e.target.checked;
      if (!isControlled) {
        setUncontrolledChecked(next);
      }
      onCheckedChange?.(next);
    };

    return (
      <label
        htmlFor={checkboxId}
        className={cn(
          "group inline-flex items-center gap-2 select-none cursor-pointer",
          disabled && "cursor-not-allowed opacity-40 pointer-events-none",
          className
        )}
      >
        <input
          type="checkbox"
          id={checkboxId}
          ref={ref}
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
          className="sr-only"
          {...props}
        />
        <span
          aria-hidden="true"
          className={cn(
            "relative flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-[4px] border-2 transition-colors duration-150 pointer-events-none",
            isChecked
              ? "bg-[#00ba78] border-[#00ba78] text-white"
              : "bg-transparent border-[rgb(74,84,80)] group-hover:border-[rgb(140,162,154)]",
            disabled && "border-[rgb(45,55,51)]"
          )}
        >
          {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
        </span>
        {(label || description) && (
          <div className="flex flex-col text-sm leading-none pointer-events-none">
            {label && (
              <span className="text-[14px] text-[rgb(214,214,214)] group-hover:text-white transition-colors">
                {label}
              </span>
            )}
            {description && (
              <span className="text-xs text-[rgb(140,162,154)] mt-1">{description}</span>
            )}
          </div>
        )}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";

/**
 * Элемент чекбокса списка (.checkboxItem)
 */
export function CheckboxItem({
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  children,
  className,
}: {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "checkboxItem text-[14px] text-[rgb(214,214,214)] mb-1 select-none",
        disabled && "disabled opacity-50 cursor-not-allowed",
        className
      )}
    >
      <Checkbox
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        label={children}
      />
    </div>
  );
}

/**
 * Строка фильтра с чекбоксом (.checkboxRow)
 */
export function CheckboxRow({
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  children,
  className,
}: {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "checkboxRow my-1 rounded-[6px] bg-[rgb(24,30,28)] px-[10px] py-[6px] text-[14px] text-[rgb(214,214,214)] transition-colors hover:bg-[rgb(30,39,37)] select-none",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
    >
      <Checkbox
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        label={children}
        className="w-full"
      />
    </div>
  );
}

/**
 * Радио-кнопка (.RadioOption)
 */
export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      label,
      description,
      disabled,
      id,
      name,
      ...props
    },
    ref
  ) => {
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const isChecked = isControlled ? controlledChecked : uncontrolledChecked;

    const generatedId = React.useId();
    const radioId = id || generatedId;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      const next = e.target.checked;
      if (!isControlled) {
        setUncontrolledChecked(next);
      }
      onCheckedChange?.(next);
    };

    return (
      <label
        htmlFor={radioId}
        className={cn(
          "RadioOption group inline-flex items-center gap-2 select-none cursor-pointer",
          disabled && "cursor-not-allowed opacity-40 pointer-events-none",
          className
        )}
      >
        <input
          type="radio"
          id={radioId}
          name={name}
          ref={ref}
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
          className="sr-only"
          {...props}
        />
        <span
          aria-hidden="true"
          className={cn(
            "relative flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-150 pointer-events-none",
            isChecked
              ? "border-[#00ba78] bg-transparent"
              : "bg-transparent border-[rgb(74,84,80)] group-hover:border-[rgb(140,162,154)]",
            disabled && "border-[rgb(45,55,51)]"
          )}
        >
          {isChecked && (
            <span className="h-[6px] w-[6px] rounded-full bg-[#00ba78]" />
          )}
        </span>
        {(label || description) && (
          <div className="flex flex-col text-sm leading-none pointer-events-none">
            {label && (
              <span className="text-[14px] text-[rgb(214,214,214)] group-hover:text-white transition-colors">
                {label}
              </span>
            )}
            {description && (
              <span className="text-xs text-[rgb(140,162,154)] mt-1">{description}</span>
            )}
          </div>
        )}
      </label>
    );
  }
);
Radio.displayName = "Radio";

export { Checkbox };
