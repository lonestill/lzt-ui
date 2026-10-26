"use client";

import * as React from "react";
import { Tooltip } from "@/components/ui/tooltip";
import { Button, CopyButton } from "@/components/ui/button";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable, type PropDefinition } from "@/components/docs/props-table";
import { ChevronRight, Terminal, Copy, Check, ShieldCheck, HelpCircle } from "lucide-react";

const tooltipProps: PropDefinition[] = [
  {
    prop: "content",
    type: "React.ReactNode",
    required: true,
    description: "Текст или компонент всплывающей подсказки.",
  },
  {
    prop: "children",
    type: "React.ReactElement",
    required: true,
    description: "Элемент, при наведении на который показывается тултип.",
  },
  {
    prop: "placement",
    type: '"top" | "bottom" | "left" | "right"',
    default: '"top"',
    description: "Сторона появления подсказки.",
  },
  {
    prop: "variant",
    type: '"default" | "dark" | "darkGreen" | "statusTip"',
    default: '"dark"',
    description: "Стиль оформления: dark, darkGreen, statusTip (250px), default.",
  },
  {
    prop: "delay",
    type: "number",
    default: "120",
    description: "Задержка появления в миллисекундах.",
  },
  {
    prop: "className",
    type: "string",
    description: "Дополнительные CSS-классы.",
  },
];

export default function TooltipDocPage() {
  const [copiedCli, setCopiedCli] = React.useState(false);

  const previewCode = `<div className="flex flex-wrap items-center gap-6 justify-around">
  <Tooltip content="Показать / скрыть баланс" placement="top">
    <Button variant="default" size="sm">
      Наведи сверху
    </Button>
  </Tooltip>

  <Tooltip
    content="Гарантия маркета активна (осталось 18 часов)"
    placement="bottom"
    variant="darkGreen"
  >
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[rgba(34,142,93,0.15)] border border-[rgba(34,142,93,0.3)] text-[#00ba78] text-xs font-medium cursor-pointer">
      <ShieldCheck className="w-3.5 h-3.5" />
      <span>Гарантия 24ч</span>
    </div>
  </Tooltip>

  <Tooltip content="Секретная фраза не установлена" placement="right">
    <div className="flex items-center gap-1 text-[rgb(140,162,154)] hover:text-white cursor-pointer text-xs">
      <HelpCircle className="w-4 h-4 text-[#e68c17]" />
      <span>Безопасность</span>
    </div>
  </Tooltip>

  <Tooltip content="Перейти в профиль scope" placement="left">
    <span className="text-[#0fdc91] font-semibold text-xs cursor-pointer hover:underline">
      scope (уник)
    </span>
  </Tooltip>
</div>`;

  const statusTipCode = `<div className="flex flex-wrap items-center gap-5">
  <div className="flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-[rgb(24,30,28)] border border-[rgb(36,47,43)] text-xs">
    <span className="text-[rgb(140,162,154)]">Логин аккаунта:</span>
    <span className="text-[rgb(245,245,245)] font-medium">auto_reg_user_99</span>
    <CopyButton text="auto_reg_user_99" />
  </div>

  <Tooltip
    variant="statusTip"
    placement="top"
    content="Ссылка скопирована в буфер обмена. Вы можете поделиться ею с другими участниками."
  >
    <Button variant="default" size="sm">
      Статусная подсказка (.statusTip)
    </Button>
  </Tooltip>
</div>`;

  return (
    <div className="space-y-10 max-w-4xl pb-20">
      <div>
        <div className="flex items-center gap-1.5 text-xs text-[rgb(140,162,154)] mb-2">
          <span>Компоненты</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[rgb(245,245,245)]">Tooltip</span>
        </div>
        <h1 className="text-3xl font-bold text-[rgb(245,245,245)] tracking-tight">
          Tooltip
        </h1>
        <p className="text-sm text-[rgb(140,162,154)] mt-2">
          Всплывающие подсказки при наведении.
        </p>
      </div>

      {/* Examples */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Стороны появления
        </h2>

        <ComponentPreview code={previewCode}>
          <div className="flex flex-wrap items-center gap-6 p-8 rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] shadow-xl justify-around">
            <Tooltip content="Показать / скрыть баланс" placement="top">
              <Button variant="default" size="sm" className="cursor-pointer">
                Наведи сверху
              </Button>
            </Tooltip>

            <Tooltip content="Гарантия маркета активна (осталось 18 часов)" placement="bottom" variant="darkGreen">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[rgba(34,142,93,0.15)] border border-[rgba(34,142,93,0.3)] text-[#00ba78] text-xs font-medium cursor-pointer">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Гарантия 24ч</span>
              </div>
            </Tooltip>

            <Tooltip content="Секретная фраза не установлена" placement="right">
              <div className="flex items-center gap-1 text-[rgb(140,162,154)] hover:text-white cursor-pointer text-xs">
                <HelpCircle className="w-4 h-4 text-[#e68c17]" />
                <span>Безопасность</span>
              </div>
            </Tooltip>

            <Tooltip content="Перейти в профиль scope" placement="left">
              <span className="text-[#0fdc91] font-semibold text-xs cursor-pointer hover:underline">
                scope (уник)
              </span>
            </Tooltip>
          </div>
        </ComponentPreview>
      </div>

      {/* StatusTip and CopyButton */}
      <div className="space-y-3 pt-6 border-t border-[rgb(30,39,37)]">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Статусный тултип
        </h2>

        <ComponentPreview code={statusTipCode}>
          <div className="flex flex-wrap items-center gap-5 p-6 rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] shadow-xl">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-[rgb(24,30,28)] border border-[rgb(36,47,43)] text-xs">
              <span className="text-[rgb(140,162,154)]">Логин аккаунта:</span>
              <span className="text-[rgb(245,245,245)] font-medium">auto_reg_user_99</span>
              <CopyButton text="auto_reg_user_99" />
            </div>

            <Tooltip
              variant="statusTip"
              placement="top"
              content="Ссылка скопирована в буфер обмена. Вы можете поделиться ею с другими участниками."
            >
              <Button variant="default" size="sm">
                Статусная подсказка (.statusTip)
              </Button>
            </Tooltip>
          </div>
        </ComponentPreview>
      </div>

      {/* Props Reference */}
      <div className="pt-6 border-t border-[rgb(30,39,37)] space-y-6">
        <h2 className="text-lg font-semibold text-[rgb(245,245,245)]">
          Свойства
        </h2>
        <PropsTable
          title="Tooltip"
          props={tooltipProps}
        />
      </div>

      {/* Installation */}
      <div className="space-y-3 pt-4 border-t border-[rgb(30,39,37)]">
        <h2 className="text-lg font-semibold text-[rgb(245,245,245)]">Установка</h2>
        <div className="relative rounded-[10px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] p-3 font-mono text-xs text-[rgb(214,214,214)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#00ba78]" />
            <span>npx @scopelzt/lzt-ui add tooltip</span>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText("npx @scopelzt/lzt-ui add tooltip");
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
