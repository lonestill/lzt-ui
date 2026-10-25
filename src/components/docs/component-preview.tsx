"use client";

import * as React from "react";
import { Check, Copy, Code2, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComponentPreviewProps {
  children: React.ReactNode;
  code: string;
  className?: string;
  title?: string;
  align?: "center" | "start" | "end";
  defaultExpandedCode?: boolean;
  overflowVisible?: boolean;
}

export function ComponentPreview({
  children,
  code,
  className,
  title,
  align,
  defaultExpandedCode = false,
  overflowVisible = false,
}: ComponentPreviewProps) {
  const [showCode, setShowCode] = React.useState(defaultExpandedCode);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("space-y-3 my-6", className)}>
      {title && (
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[rgb(140,162,154)] uppercase tracking-wider">
            {title}
          </span>
        </div>
      )}

      <div
        className={cn(
          "relative w-full max-w-full pb-1",
          overflowVisible ? "overflow-visible" : "overflow-x-auto"
        )}
      >
        {children}
      </div>

      {/* Actions footer: Show code toggle & Copy button */}
      <div className="flex items-center justify-between pt-1 text-xs">
        <button
          type="button"
          onClick={() => setShowCode(!showCode)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-[rgb(140,162,154)] hover:text-white hover:bg-[rgb(24,30,28)] transition border border-transparent hover:border-[rgb(36,47,43)]"
        >
          <Code2 className="w-3.5 h-3.5 text-[#00ba78]" />
          <span>{showCode ? "Скрыть код" : "Показать код"}</span>
          {showCode ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-[11px] text-[rgb(140,162,154)] hover:text-white hover:bg-[rgb(24,30,28)] transition border border-transparent hover:border-[rgb(36,47,43)]"
          title="Скопировать код компонента"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#00ba78]" />
              <span className="text-[#00ba78]">Скопировано</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Копировать код</span>
            </>
          )}
        </button>
      </div>

      {/* Collapsible clean code view */}
      {showCode && (
        <div className="rounded-[10px] bg-[rgb(12,15,14)] border border-[rgb(30,39,37)] overflow-hidden animate-in fade-in-0 duration-150">
          <pre className="p-4 overflow-x-auto text-xs font-mono text-[rgb(214,214,214)] leading-relaxed">
            {code}
          </pre>
        </div>
      )}
    </div>
  );
}
