"use client";

import * as React from "react";
import { Pagination } from "@/components/ui/pagination";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable, type PropDefinition } from "@/components/docs/props-table";
import { ChevronRight, Terminal, Copy, Check } from "lucide-react";

const paginationProps: PropDefinition[] = [
  {
    prop: "currentPage",
    type: "number",
    required: true,
    description: "Текущий номер страницы (с 1).",
  },
  {
    prop: "totalPages",
    type: "number",
    required: true,
    description: "Общее число страниц.",
  },
  {
    prop: "onPageChange",
    type: "(page: number) => void",
    required: true,
    description: "Коллбэк при переходе на страницу.",
  },
  {
    prop: "siblingCount",
    type: "number",
    default: "1",
    description: "Количество страниц слева и справа от активной.",
  },
  {
    prop: "showTitle",
    type: "boolean",
    default: "true",
    description: "Отображает подпись 'Страница X из Y' слева от кнопок.",
  },
  {
    prop: "className",
    type: "string",
    description: "Дополнительные CSS-классы.",
  },
];

export default function PaginationDocPage() {
  const [copiedCli, setCopiedCli] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [largePage, setLargePage] = React.useState(14);

  const previewCode = `<Pagination
  currentPage={page}
  totalPages={7}
  onPageChange={setPage}
/>`;

  const largePaginationCode = `<Pagination
  currentPage={largePage}
  totalPages={120}
  onPageChange={setLargePage}
  siblingCount={1}
  showTitle={true}
/>`;

  return (
    <div className="space-y-10 max-w-4xl pb-20">
      <div>
        <div className="flex items-center gap-1.5 text-xs text-[rgb(140,162,154)] mb-2">
          <span>Компоненты</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[rgb(245,245,245)]">Pagination</span>
        </div>
        <h1 className="text-3xl font-bold text-[rgb(245,245,245)] tracking-tight">
          Pagination
        </h1>
        <p className="text-sm text-[rgb(140,162,154)] mt-2">
          Постраничная навигация списков и каталогов.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Мало страниц
        </h2>

        <ComponentPreview code={previewCode}>
          <div className="w-full p-6 rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] shadow-xl">
            <Pagination
              currentPage={page}
              totalPages={7}
              onPageChange={setPage}
            />
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-3 pt-6 border-t border-[rgb(30,39,37)]">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Большой список
        </h2>
        <ComponentPreview code={largePaginationCode}>
          <div className="w-full p-6 rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] shadow-xl">
            <Pagination
              currentPage={largePage}
              totalPages={120}
              onPageChange={setLargePage}
            />
          </div>
        </ComponentPreview>
      </div>

      {/* Props Reference */}
      <div className="pt-6 border-t border-[rgb(30,39,37)] space-y-6">
        <h2 className="text-lg font-semibold text-[rgb(245,245,245)]">
          Свойства
        </h2>
        <PropsTable
          title="Pagination"
          props={paginationProps}
        />
      </div>

      {/* Installation */}
      <div className="space-y-3 pt-4 border-t border-[rgb(30,39,37)]">
        <h2 className="text-lg font-semibold text-[rgb(245,245,245)]">Установка</h2>
        <div className="relative rounded-[10px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] p-3 font-mono text-xs text-[rgb(214,214,214)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#00ba78]" />
            <span>npx @scopelzt/lzt-ui add pagination</span>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText("npx @scopelzt/lzt-ui add pagination");
              setCopiedCli(true);
              setTimeout(() => setCopiedCli(false), 2000);
            }}
            className="p-1 hover:text-white transition cursor-pointer"
          >
            {copiedCli ? <Check className="w-3.5 h-3.5 text-[#00ba78]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
