"use client";

import * as React from "react";
import { Select, type SelectOption } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable, type PropDefinition } from "@/components/docs/props-table";
import {
  ChevronRight,
  Terminal,
  Copy,
  Check,
  Globe,
  Gamepad2,
  Shield,
  Search,
  Plus,
  Coins,
} from "lucide-react";

const selectProps: PropDefinition[] = [
  {
    prop: "options",
    type: "SelectOption[]",
    required: true,
    description: "Массив элементов для выбора.",
  },
  {
    prop: "value",
    type: "string",
    description: "Текущее значение в контролируемом режиме.",
  },
  {
    prop: "defaultValue",
    type: "string",
    default: "options[0]?.value",
    description: "Начальное выбранное значение.",
  },
  {
    prop: "onChange",
    type: "(value: string) => void",
    description: "Коллбэк при выборе элемента.",
  },
  {
    prop: "placeholder",
    type: "string",
    default: '"Выберите..."',
    description: "Текст в невыбранном состоянии.",
  },
  {
    prop: "searchable",
    type: "boolean",
    default: "true (если опций > 7)",
    description: "Отображает поле быстрого поиска .chosen-search.",
  },
  {
    prop: "size",
    type: '"default" | "extraLarge"',
    default: '"default"',
    description: "Высота: default (30px) или extraLarge (36px).",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Блокирует селектор.",
  },
  {
    prop: "className",
    type: "string",
    description: "Дополнительные CSS-классы.",
  },
];

const optionProps: PropDefinition[] = [
  {
    prop: "value",
    type: "string",
    required: true,
    description: "Уникальный ключ опции.",
  },
  {
    prop: "label",
    type: "string",
    required: true,
    description: "Отображаемое название пункта.",
  },
  {
    prop: "group",
    type: "string",
    description: "Название подгруппы опции.",
  },
  {
    prop: "icon",
    type: "React.ReactNode",
    description: "Иконка слева от текста.",
  },
];

export default function SelectDocPage() {
  const [copiedCli, setCopiedCli] = React.useState(false);
  const [currency, setCurrency] = React.useState("rub");
  const [sortBy, setSortBy] = React.useState("cheap");
  const [category, setCategory] = React.useState("steam");

  const currencyOptions: SelectOption[] = [
    { value: "rub", label: "RUB — ₽" },
    { value: "usd", label: "USD — $" },
    { value: "eur", label: "EUR — €" },
    { value: "kzt", label: "KZT — ₸" },
    { value: "uah", label: "UAH — ₴" },
  ];

  const sortOptions: SelectOption[] = [
    { value: "fresh", label: "Свежие" },
    { value: "cheap", label: "Сначала дешевые" },
    { value: "expensive", label: "Сначала дорогие" },
    { value: "discount", label: "С большой скидкой" },
  ];

  const categoryOptions: SelectOption[] = [
    { value: "steam", label: "Steam", icon: <Gamepad2 className="w-3.5 h-3.5 text-[#00ba78]" /> },
    { value: "telegram", label: "Telegram", icon: <Globe className="w-3.5 h-3.5 text-[#2AABEE]" /> },
    { value: "valorant", label: "Valorant", icon: <Shield className="w-3.5 h-3.5 text-[#f13838]" /> },
  ];

  const marketHeaderCode = `<div className="w-full rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] shadow-2xl">
  <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-[rgb(24,30,28)] border-b border-[rgb(30,39,37)] rounded-t-[12px]">
    <div className="flex items-center gap-3">
      <Button variant="default" size="sm">На форум</Button>
      <div className="flex items-center gap-1.5 text-xs">
        <Coins className="w-3.5 h-3.5 text-[#00ba78]" />
        <span className="text-[rgb(140,162,154)]">Баланс:</span>
        <span className="font-bold text-white tabular-nums">1 337 ₽</span>
      </div>
    </div>

    <div className="w-44">
      <Select
        options={[
          { value: "rub", label: "RUB — ₽" },
          { value: "usd", label: "USD — $" },
          { value: "eur", label: "EUR — €" },
          { value: "kzt", label: "KZT — ₸" },
          { value: "uah", label: "UAH — ₴" },
        ]}
        value={currency}
        onChange={setCurrency}
      />
    </div>
  </div>
</div>`;

  const filterBarCode = `<div className="rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] p-4 flex flex-wrap items-center justify-between gap-3 shadow-xl">
  <div className="flex flex-wrap items-center gap-3">
    <span className="text-xs text-[rgb(140,162,154)]">Категория:</span>
    <div className="w-40">
      <Select
        options={categoryOptions}
        value={category}
        onChange={setCategory}
      />
    </div>

    <span className="text-xs text-[rgb(140,162,154)] ml-2">Сортировка:</span>
    <div className="w-48">
      <Select
        options={sortOptions}
        value={sortBy}
        onChange={setSortBy}
      />
    </div>
  </div>

  <div className="text-xs text-[rgb(140,162,154)]">
    Найдено: <strong className="text-white font-semibold">14 820</strong> аккаунтов
  </div>
</div>`;

  return (
    <div className="space-y-10 max-w-4xl pb-20">
      {/* Page Title */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-[rgb(140,162,154)] mb-2">
          <span>Компоненты</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[rgb(245,245,245)]">Select</span>
        </div>
        <h1 className="text-3xl font-bold text-[rgb(245,245,245)] tracking-tight">
          Select
        </h1>
        <p className="text-sm text-[rgb(140,162,154)] mt-2">
          Выпадающие списки с поиском и группировкой.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Выбор валюты
        </h2>

        <ComponentPreview code={marketHeaderCode}>
          <div className="w-full rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] overflow-visible shadow-2xl">
            {/* Top row */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-[rgb(24,30,28)] border-b border-[rgb(30,39,37)] rounded-t-[12px]">
              <div className="flex items-center gap-3">
                <Button variant="default" size="sm" className="h-[28px] text-xs px-2.5">
                  На форум
                </Button>
                <div className="flex items-center gap-1.5 text-xs">
                  <Coins className="w-3.5 h-3.5 text-[#00ba78]" />
                  <span className="text-[rgb(140,162,154)]">Баланс:</span>
                  <span className="font-bold text-[rgb(245,245,245)] tabular-nums">1 337 ₽</span>
                  <button
                    type="button"
                    className="w-5 h-5 rounded-[5px] bg-[#00ba78]/20 hover:bg-[#00ba78]/30 text-[#00ba78] flex items-center justify-center transition ml-1"
                    title="Пополнить баланс"
                  >
                    <Plus className="w-3 h-3 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Currency Selector */}
              <div className="w-44">
                <Select
                  options={currencyOptions}
                  value={currency}
                  onChange={setCurrency}
                />
              </div>
            </div>

            {/* Sub-bar with search */}
            <div className="p-4 flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[rgb(140,162,154)] absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  placeholder="Поиск среди 2 181 112 аккаунтов..."
                  className="pl-9 bg-[rgb(24,30,28)] border-0 h-[36px]"
                />
              </div>
              <Button variant="primary" size="default" className="h-[36px] px-5">
                Найти
              </Button>
            </div>
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-3 pt-6 border-t border-[rgb(30,39,37)]">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Фильтры и сортировка
        </h2>

        <ComponentPreview code={filterBarCode}>
          <div className="w-full space-y-3">
            {/* Filter controls row */}
            <div className="rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[rgb(140,162,154)] shrink-0">Категория:</span>
                  <div className="w-36 sm:w-40">
                    <Select
                      options={categoryOptions}
                      value={category}
                      onChange={setCategory}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[rgb(140,162,154)] shrink-0">Сортировка:</span>
                  <div className="w-44 sm:w-48">
                    <Select
                      options={sortOptions}
                      value={sortBy}
                      onChange={setSortBy}
                    />
                  </div>
                </div>
              </div>

              <div className="text-xs text-[rgb(140,162,154)] pt-1 sm:pt-0">
                Найдено: <strong className="text-white font-semibold">14 820</strong> аккаунтов
              </div>
            </div>

            {/* Account row below to verify layering */}
            <div className="rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:border-[rgb(44,58,53)] transition">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-[8px] bg-[rgb(24,30,28)] border border-[rgb(36,47,43)] flex items-center justify-center font-bold text-xs text-[#00ba78] shrink-0">
                  STEAM
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-sm text-[rgb(245,245,245)] truncate">
                    CS2 Prime • Инвентарь 6 800 ₽ • Медаль за службу 2024 • Отлёжка 60 дней
                  </div>
                  <div className="text-xs text-[rgb(140,162,154)] mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <span className="text-[#00ba78]">Гарантия 24ч</span>
                    <span>•</span>
                    <span>Родная почта firstmail</span>
                    <span>•</span>
                    <span>Продавец: lolz_trader</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[rgb(30,39,37)]">
                <div className="text-left sm:text-right">
                  <div className="font-bold text-base text-white tabular-nums">499 ₽</div>
                  <div className="text-[10px] text-[rgb(140,162,154)]">с баланса</div>
                </div>
                <Button variant="primary" size="default">
                  Купить
                </Button>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </div>

      {/* Props Reference */}
      <div className="pt-6 border-t border-[rgb(30,39,37)] space-y-6">
        <h2 className="text-lg font-semibold text-[rgb(245,245,245)]">
          Свойства
        </h2>
        <PropsTable
          title="Select"
          props={selectProps}
        />
        <PropsTable
          title="SelectOption"
          props={optionProps}
        />
      </div>

      {/* Installation */}
      <div className="space-y-3 pt-4 border-t border-[rgb(30,39,37)]">
        <h2 className="text-lg font-semibold text-[rgb(245,245,245)]">Установка</h2>
        <div className="relative rounded-[10px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] p-3 font-mono text-xs text-[rgb(214,214,214)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#00ba78]" />
            <span>npx @scopelzt/lzt-ui add select</span>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText("npx @scopelzt/lzt-ui add select");
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
