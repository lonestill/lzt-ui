"use client";

import * as React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable, type PropDefinition } from "@/components/docs/props-table";
import { ChevronRight, Copy, Check, Terminal } from "lucide-react";

const tableProps: PropDefinition[] = [
  {
    prop: "className",
    type: "string",
    description: "Дополнительные CSS-классы таблицы .dataTable.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Секции таблицы: TableHeader, TableBody, TableFooter.",
  },
];

const tableRowProps: PropDefinition[] = [
  {
    prop: "className",
    type: "string",
    description: "Классы строки .dataRow с ховером и data-[state=selected].",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Ячейки строки: TableHead или TableCell.",
  },
];

const tableCellProps: PropDefinition[] = [
  {
    prop: "className",
    type: "string",
    description: "Классы ячейки таблицы.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Содержимое ячейки таблицы.",
  },
];

export default function TableDocPage() {
  const [copiedCli, setCopiedCli] = React.useState(false);

  const previewCode = `<Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-10"><Checkbox /></TableHead>
      <TableHead>Операция</TableHead>
      <TableHead>Категория</TableHead>
      <TableHead>Дата</TableHead>
      <TableHead className="text-right">Сумма</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell><Checkbox /></TableCell>
      <TableCell className="font-medium text-white">Пополнение баланса</TableCell>
      <TableCell>Платеж</TableCell>
      <TableCell className="text-[rgb(140,162,154)]">Сегодня, в 14:20</TableCell>
      <TableCell className="text-right font-semibold tabular-nums text-[#00ba78]">+ 1 500 ₽</TableCell>
    </TableRow>
    <TableRow>
      <TableCell><Checkbox /></TableCell>
      <TableCell className="font-medium text-white">Покупка аккаунта #265913</TableCell>
      <TableCell>Маркет</TableCell>
      <TableCell className="text-[rgb(140,162,154)]">Вчера, в 22:15</TableCell>
      <TableCell className="text-right font-semibold tabular-nums text-white">- 350 ₽</TableCell>
    </TableRow>
    <TableRow>
      <TableCell><Checkbox /></TableCell>
      <TableCell className="font-medium text-white">Вывод средств на карту</TableCell>
      <TableCell>Вывод</TableCell>
      <TableCell className="text-[rgb(140,162,154)]">22 окт 2026</TableCell>
      <TableCell className="text-right font-semibold tabular-nums text-[rgb(241,56,56)]">- 5 000 ₽</TableCell>
    </TableRow>
  </TableBody>
</Table>`;

  return (
    <div className="space-y-10 max-w-4xl pb-20">
      <div>
        <div className="flex items-center gap-1.5 text-xs text-[rgb(140,162,154)] mb-2">
          <span>Компоненты</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[rgb(245,245,245)]">Table</span>
        </div>
        <h1 className="text-3xl font-bold text-[rgb(245,245,245)] tracking-tight">
          Table
        </h1>
        <p className="text-sm text-[rgb(140,162,154)] mt-2">
          Таблицы данных и списков.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Пример
        </h2>
        <ComponentPreview code={previewCode} align="start">
          <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Операция</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead>Дата</TableHead>
                  <TableHead className="text-right">Сумма</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium text-white">
                    Пополнение баланса
                  </TableCell>
                  <TableCell>Платеж</TableCell>
                  <TableCell className="text-[rgb(140,162,154)]">Сегодня, в 14:20</TableCell>
                  <TableCell className="text-right font-semibold tabular-nums text-[#00ba78]">
                    + 1 500 ₽
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium text-white">
                    Покупка аккаунта #265913
                  </TableCell>
                  <TableCell>Маркет</TableCell>
                  <TableCell className="text-[rgb(140,162,154)]">Вчера, в 22:15</TableCell>
                  <TableCell className="text-right font-semibold tabular-nums text-white">
                    - 350 ₽
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium text-white">
                    Вывод средств на карту
                  </TableCell>
                  <TableCell>Вывод</TableCell>
                  <TableCell className="text-[rgb(140,162,154)]">22 окт 2026</TableCell>
                  <TableCell className="text-right font-semibold tabular-nums text-[rgb(241,56,56)]">
                    - 5 000 ₽
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
        </ComponentPreview>
      </div>

      {/* Props Reference */}
      <div className="pt-6 border-t border-[rgb(30,39,37)] space-y-6">
        <h2 className="text-lg font-semibold text-[rgb(245,245,245)]">
          Свойства
        </h2>
        <PropsTable
          title="Table"
          props={tableProps}
        />
        <PropsTable
          title="TableRow"
          props={tableRowProps}
        />
        <PropsTable
          title="TableCell & TableHead"
          props={tableCellProps}
        />
      </div>

      {/* Installation */}
      <div className="space-y-3 pt-4 border-t border-[rgb(30,39,37)]">
        <h2 className="text-lg font-semibold text-[rgb(245,245,245)]">
          Установка
        </h2>
        <div className="relative rounded-[10px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] p-3 font-mono text-xs text-[rgb(214,214,214)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#00ba78]" />
            <span>npx @scopelzt/lzt-ui add table</span>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText("npx @scopelzt/lzt-ui add table");
              setCopiedCli(true);
              setTimeout(() => setCopiedCli(false), 2000);
            }}
            className="p-1 hover:text-white transition"
          >
            {copiedCli ? (
              <Check className="w-3.5 h-3.5 text-[#00ba78]" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
