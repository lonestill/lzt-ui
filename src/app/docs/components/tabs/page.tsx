"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable, type PropDefinition } from "@/components/docs/props-table";
import { ChevronRight, Terminal, Copy, Check } from "lucide-react";

const tabsProps: PropDefinition[] = [
  {
    prop: "value",
    type: "string",
    description: "Текущая вкладка в контролируемом режиме.",
  },
  {
    prop: "defaultValue",
    type: "string",
    default: '""',
    description: "Начальная выбранная вкладка.",
  },
  {
    prop: "onValueChange",
    type: "(value: string) => void",
    description: "Коллбэк при переключении вкладки.",
  },
  {
    prop: "variant",
    type: '"forum" | "subTabs" | "pill"',
    default: '"forum"',
    description: "Стиль: forum (46px), subTabs (36px), pill (чипы).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "TabsList и TabsContent.",
  },
];

const tabsTriggerProps: PropDefinition[] = [
  {
    prop: "value",
    type: "string",
    required: true,
    description: "Уникальный идентификатор вкладки.",
  },
  {
    prop: "badge",
    type: "React.ReactNode",
    description: "Счётчик справа от текста вкладки.",
  },
  {
    prop: "variant",
    type: '"forum" | "subTabs" | "pill"',
    description: "Переопределяет стиль триггера.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Текст заголовка.",
  },
];

const tabsContentProps: PropDefinition[] = [
  {
    prop: "value",
    type: "string",
    required: true,
    description: "Идентификатор соответствующей вкладки.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Контент вкладки.",
  },
];

export default function TabsDocPage() {
  const [copiedCli, setCopiedCli] = React.useState(false);

  const previewCode = `<Tabs defaultValue="all">
  <TabsList>
    <TabsTrigger value="all" badge="1 443">
      Все товары
    </TabsTrigger>
    <TabsTrigger value="steam" badge="280">
      Steam
    </TabsTrigger>
    <TabsTrigger value="telegram" badge="64">
      Telegram
    </TabsTrigger>
    <TabsTrigger value="favorites">
      Избранное
    </TabsTrigger>
  </TabsList>

  <div className="p-5">
    <TabsContent value="all">
      <p className="text-sm text-[rgb(214,214,214)]">
        Лента всех категорий маркета.
      </p>
    </TabsContent>
    <TabsContent value="steam">
      <p className="text-sm text-[rgb(214,214,214)]">
        Аккаунты Steam: прайм-статус CS2 и баланс.
      </p>
    </TabsContent>
    <TabsContent value="telegram">
      <p className="text-sm text-[rgb(214,214,214)]">
        Сессии Telegram: Session + TData архивы.
      </p>
    </TabsContent>
    <TabsContent value="favorites">
      <p className="text-sm text-[rgb(214,214,214)]">
        Список сохраненных объявлений.
      </p>
    </TabsContent>
  </div>
</Tabs>`;

  const pillTabsCode = `<Tabs defaultValue="day" variant="pill">
  <TabsList>
    <TabsTrigger value="day">За 24 часа</TabsTrigger>
    <TabsTrigger value="week" badge="топ">За неделю</TabsTrigger>
    <TabsTrigger value="month">За месяц</TabsTrigger>
  </TabsList>
</Tabs>`;

  return (
    <div className="space-y-10 max-w-4xl pb-20">
      <div>
        <div className="flex items-center gap-1.5 text-xs text-[rgb(140,162,154)] mb-2">
          <span>Компоненты</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[rgb(245,245,245)]">Tabs</span>
        </div>
        <h1 className="text-3xl font-bold text-[rgb(245,245,245)] tracking-tight">
          Tabs
        </h1>
        <p className="text-sm text-[rgb(140,162,154)] mt-2">
          Навигационные вкладки разделов и фильтры.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Основные вкладки
        </h2>

        <ComponentPreview code={previewCode}>
          <div className="w-full rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] shadow-xl overflow-hidden">
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all" badge="1 443">
                  Все товары
                </TabsTrigger>
                <TabsTrigger value="steam" badge="280">
                  Steam
                </TabsTrigger>
                <TabsTrigger value="telegram" badge="64">
                  Telegram
                </TabsTrigger>
                <TabsTrigger value="favorites">
                  Избранное
                </TabsTrigger>
              </TabsList>

              <div className="p-5">
                <TabsContent value="all">
                  <p className="text-sm text-[rgb(214,214,214)]">
                    Лента всех категорий маркета: Steam, Telegram, Epic Games, Discord, Supercell, Valorant, Riot Games.
                  </p>
                </TabsContent>
                <TabsContent value="steam">
                  <p className="text-sm text-[rgb(214,214,214)]">
                    Аккаунты Steam: прайм-статус CS2, часы в играх, баланс кошелька и валидация через LZT Checker.
                  </p>
                </TabsContent>
                <TabsContent value="telegram">
                  <p className="text-sm text-[rgb(214,214,214)]">
                    Сессии Telegram: Session + TData архивы, проверка на спамблок и 2FA пароли.
                  </p>
                </TabsContent>
                <TabsContent value="favorites">
                  <p className="text-sm text-[rgb(214,214,214)]">
                    Список сохраненных объявлений и отслеживание снижения цен.
                  </p>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </ComponentPreview>
      </div>

      {/* Pill Variant */}
      <div className="space-y-3 pt-6 border-t border-[rgb(30,39,37)]">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Подвкладки и переключатели
        </h2>
        <ComponentPreview code={pillTabsCode}>
          <div className="w-full p-4 rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] space-y-4">
            <Tabs defaultValue="day" variant="pill">
              <TabsList>
                <TabsTrigger value="day">За 24 часа</TabsTrigger>
                <TabsTrigger value="week" badge="топ">За неделю</TabsTrigger>
                <TabsTrigger value="month">За месяц</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="text-xs text-[rgb(140,162,154)] pt-2 border-t border-[rgb(30,39,37)]">
              Подвкладки темы (.subTabs):
            </div>
            <Tabs defaultValue="all" variant="subTabs">
              <TabsList>
                <TabsTrigger value="all">Все темы</TabsTrigger>
                <TabsTrigger value="my">Мои темы</TabsTrigger>
                <TabsTrigger value="unread" badge="4">Непрочитанные</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </ComponentPreview>
      </div>

      {/* Props Reference */}
      <div className="pt-6 border-t border-[rgb(30,39,37)] space-y-6">
        <h2 className="text-lg font-semibold text-[rgb(245,245,245)]">
          Свойства
        </h2>
        <PropsTable
          title="Tabs"
          props={tabsProps}
        />
        <PropsTable
          title="TabsTrigger"
          props={tabsTriggerProps}
        />
        <PropsTable
          title="TabsContent"
          props={tabsContentProps}
        />
      </div>

      {/* Installation */}
      <div className="space-y-3 pt-4 border-t border-[rgb(30,39,37)]">
        <h2 className="text-lg font-semibold text-[rgb(245,245,245)]">Установка</h2>
        <div className="relative rounded-[10px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] p-3 font-mono text-xs text-[rgb(214,214,214)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#00ba78]" />
            <span>npx @scopelzt/lzt-ui add tabs</span>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText("npx @scopelzt/lzt-ui add tabs");
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
