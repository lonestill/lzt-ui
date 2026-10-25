"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface PropDefinition {
  prop: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

export interface PropsTableProps {
  title?: string;
  description?: string;
  props: PropDefinition[];
  className?: string;
}

export function PropsTable({
  title,
  description,
  props,
  className,
}: PropsTableProps) {
  return (
    <div className={cn("space-y-3 my-8", className)}>
      {title && (
        <div>
          <h3 className="text-base font-semibold text-[rgb(245,245,245)]">
            {title}
          </h3>
          {description && (
            <p className="text-xs text-[rgb(140,162,154)] mt-0.5">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="rounded-[10px] border border-[rgb(30,39,37)] bg-[rgb(17,22,21)] overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[560px] text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[rgb(30,39,37)] bg-[rgb(24,30,28)] text-[rgb(140,162,154)] font-semibold">
                <th className="py-2.5 px-3.5 w-[25%] whitespace-nowrap">Свойство</th>
                <th className="py-2.5 px-3.5 w-[30%] whitespace-nowrap">Тип</th>
                <th className="py-2.5 px-3.5 w-[15%] whitespace-nowrap">Дефолт</th>
                <th className="py-2.5 px-3.5 min-w-[180px]">Описание</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgb(24,30,28)]">
              {props.map((item) => (
                <tr
                  key={item.prop}
                  className="hover:bg-[rgb(24,30,28)]/50 transition-colors"
                >
                  <td className="py-2.5 px-3.5 font-mono text-xs font-semibold text-[#00ba78] whitespace-nowrap align-top">
                    {item.prop}
                    {item.required && (
                      <span className="text-[rgb(241,56,56)] ml-1" title="Обязательное свойство">
                        *
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3.5 font-mono text-[11px] text-[rgb(180,200,192)] align-top">
                    <span className="inline-block px-1.5 py-0.5 rounded bg-[rgb(30,39,37)] border border-[rgb(36,47,43)] break-words whitespace-normal max-w-[240px]">
                      {item.type}
                    </span>
                  </td>
                  <td className="py-2.5 px-3.5 font-mono text-[11px] text-[rgb(140,162,154)] whitespace-nowrap align-top">
                    {item.default ? (
                      <span className="text-[rgb(214,214,214)]">{item.default}</span>
                    ) : (
                      <span className="text-[rgb(90,105,99)]">—</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3.5 text-[rgb(214,214,214)] leading-relaxed align-top">
                    {item.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
