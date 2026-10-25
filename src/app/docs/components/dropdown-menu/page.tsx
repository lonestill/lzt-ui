"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuDivider,
  DottesTrigger,
  AccountMenu,
  AccountTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { UniqText } from "@/components/ui/uniq-text";
import { Avatar } from "@/components/ui/avatar";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable, type PropDefinition } from "@/components/docs/props-table";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  Terminal,
  Copy,
  Check,
  Link2,
  Bookmark,
  Bell,
  Flag,
  Trash2,
  Share2,
} from "lucide-react";

const dropdownMenuProps: PropDefinition[] = [
  {
    prop: "open",
    type: "boolean",
    description: "Контролируемое состояние видимости меню.",
  },
  {
    prop: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Коллбэк при открытии или закрытии меню.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Триггер (например, DottesTrigger) и содержимое DropdownMenuContent.",
  },
];

const dottesTriggerProps: PropDefinition[] = [
  {
    prop: "active",
    type: "boolean",
    default: "false",
    description: "Принудительно подсвечивает кнопку активной.",
  },
  {
    prop: "className",
    type: "string",
    description: "Дополнительные классы кнопки .dottesStyle.buttonStyle.",
  },
];

const contentProps: PropDefinition[] = [
  {
    prop: "align",
    type: '"left" | "right"',
    default: '"right"',
    description: "Выравнивание выпадающего окна .Menu относительно триггера.",
  },
  {
    prop: "width",
    type: "string",
    default: '"w-[220px]"',
    description: "Ширина контейнера меню.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Пункты меню DropdownMenuItem и разделители DropdownMenuDivider.",
  },
];

const itemProps: PropDefinition[] = [
  {
    prop: "variant",
    type: '"default" | "danger"',
    default: '"default"',
    description: "Стиль пункта: default (нейтральный с зелёным ховером иконки) или danger (красный для удаления/жалобы).",
  },
  {
    prop: "icon",
    type: "React.ReactNode",
    description: "Иконка слева от текста. При наведении на строку автоматически меняет цвет на фирменный зелёный #00ba78.",
  },
  {
    prop: "onClick",
    type: "() => void",
    description: "Коллбэк клика по пункту (автоматически закрывает меню).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    required: true,
    description: "Название пункта меню.",
  },
];

const accountTriggerProps: PropDefinition[] = [
  {
    prop: "username",
    type: "string",
    required: true,
    description: "Имя пользователя, отображаемое жирным зелёным шрифтом.",
  },
  {
    prop: "balance",
    type: "string | number",
    required: true,
    description: "Баланс пользователя на маркете.",
  },
  {
    prop: "avatarUrl",
    type: "string",
    description: "URL аватарки пользователя.",
  },
  {
    prop: "onClick",
    type: "() => void",
    description: "Коллбэк при нажатии на плашку профиля в шапке.",
  },
];

export default function DropdownMenuDocPage() {
  const [copiedCli, setCopiedCli] = React.useState(false);

  const threadMenuCode = `<DropdownMenu>
  <DottesTrigger />

  <DropdownMenuContent align="right" width="w-[220px]">
    <DropdownMenuItem icon={<Link2 className="w-4 h-4" />}>
      Ссылка на тему
    </DropdownMenuItem>
    <DropdownMenuItem icon={<Bookmark className="w-4 h-4" />}>
      В закладки
    </DropdownMenuItem>
    <DropdownMenuItem icon={<Bell className="w-4 h-4" />}>
      Подписаться на тему
    </DropdownMenuItem>
    <DropdownMenuItem icon={<Share2 className="w-4 h-4" />}>
      Поделиться
    </DropdownMenuItem>
    <DropdownMenuItem icon={<Flag className="w-4 h-4" />}>
      Пожаловаться
    </DropdownMenuItem>
    <DropdownMenuDivider />
    <DropdownMenuItem variant="danger" icon={<Trash2 className="w-4 h-4" />}>
      Удалить тему
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;

  const accountMenuCode = `<AccountMenu
  user={{
    name: "scope",
    avatar: "https://nztcdn.com/avatar/l/1792612741/8141440.webp",
    statusText: "репутация дороже денег",
    balance: "24 500",
    uniqPreset: "scope",
  }}
  onDeposit={() => alert("Пополнить")}
  onPayout={() => alert("Вывести")}
  onTransfer={() => alert("Перевести")}
/>`;

  const accountTriggerCode = `<AccountTrigger
  username="scope"
  balance="24 500"
  avatarUrl="https://nztcdn.com/avatar/l/1792612741/8141440.webp"
  onClick={() => alert("Клик по профилю")}
/>`;

  return (
    <div className="space-y-12 max-w-4xl pb-20">
      <div>
        <div className="flex items-center gap-1.5 text-xs text-[rgb(140,162,154)] mb-2">
          <span>Компоненты</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[rgb(245,245,245)]">DropdownMenu (Контекстное меню)</span>
        </div>
        <h1 className="text-3xl font-bold text-[rgb(245,245,245)] tracking-tight">
          DropdownMenu (Меню 3 точек и действий)
        </h1>
        <p className="text-sm text-[rgb(140,162,154)] mt-2 leading-relaxed">
          Контекстные меню действий и меню пользователя.
        </p>
      </div>

      {/* Primary Showcase: 3 Dots Thread Context Menu */}
      <div className="space-y-3">
        <div>
          <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
            Меню темы (3 точки)
          </h2>
        </div>

        <ComponentPreview code={threadMenuCode} overflowVisible>
          <div className="p-4 sm:p-6 rounded-[12px] bg-[rgb(12,15,14)] border border-[rgb(30,39,37)] min-h-[260px] flex flex-col justify-start pt-6 sm:pt-8">
            {/* Thread Header Simulator */}
            <div className="w-full max-w-xl mx-auto p-3 sm:p-3.5 rounded-[10px] bg-[rgb(17,22,21)] border border-[rgb(36,47,43)] flex items-center justify-between gap-3 sm:gap-4 relative">
              <div className="flex items-center gap-3 min-w-0">
                <Avatar
                  src="https://nztcdn.com/avatar/l/1792612741/8141440.webp"
                  fallback="SC"
                  size="s"
                  className="border border-[#00ba78]/40 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-[rgb(245,245,245)] truncate">
                      Разработка UI-компонентов для сервисов Lolzteam
                    </span>
                    <Badge variant="tag" group="expert" className="text-[10px] py-0 px-1.5 shrink-0">
                      Статья
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[rgb(140,162,154)] mt-0.5">
                    <UniqText preset="scope" className="font-medium text-xs">
                      scope
                    </UniqText>
                    <span>•</span>
                    <span>Сегодня, в 03:00</span>
                  </div>
                </div>
              </div>

              {/* Interactive 3-Dots Trigger */}
              <div className="shrink-0">
                <DropdownMenu>
                  <DottesTrigger />

                  <DropdownMenuContent align="right" width="w-[220px]">
                    <DropdownMenuItem icon={<Link2 className="w-4 h-4" />}>
                      Ссылка на тему
                    </DropdownMenuItem>
                    <DropdownMenuItem icon={<Bookmark className="w-4 h-4" />}>
                      В закладки
                    </DropdownMenuItem>
                    <DropdownMenuItem icon={<Bell className="w-4 h-4" />}>
                      Подписаться на тему
                    </DropdownMenuItem>
                    <DropdownMenuItem icon={<Share2 className="w-4 h-4" />}>
                      Поделиться
                    </DropdownMenuItem>
                    <DropdownMenuItem icon={<Flag className="w-4 h-4" />}>
                      Пожаловаться
                    </DropdownMenuItem>
                    <DropdownMenuDivider />
                    <DropdownMenuItem variant="danger" icon={<Trash2 className="w-4 h-4" />}>
                      Удалить тему
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </div>

      {/* Secondary Showcase: Standalone Account Menu */}
      <div className="space-y-3 pt-6 border-t border-[rgb(30,39,37)]">
        <div>
          <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
            Меню пользователя (AccountMenu)
          </h2>
          <p className="text-xs text-[rgb(140,162,154)] mt-1">
            Полноразмерное меню профиля с балансом, переводами, быстрой навигацией и переключателем аккаунтов.
          </p>
        </div>

        <ComponentPreview code={accountMenuCode}>
          <div className="p-4 sm:p-6 rounded-[12px] bg-[rgb(12,15,14)] border border-[rgb(30,39,37)] flex items-center justify-center">
            <AccountMenu
              user={{
                name: "scope",
                avatar: "https://nztcdn.com/avatar/l/1792612741/8141440.webp",
                statusText: "репутация дороже денег",
                balance: "24 500",
                uniqPreset: "scope",
              }}
            />
          </div>
        </ComponentPreview>
      </div>

      {/* Tertiary Showcase: Account Trigger */}
      <div className="space-y-3 pt-6 border-t border-[rgb(30,39,37)]">
        <div>
          <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
            Кнопка профиля в шапке (AccountTrigger)
          </h2>
          <p className="text-xs text-[rgb(140,162,154)] mt-1">
            Компактная кнопка посетителя для верхней навигационной панели.
          </p>
        </div>

        <ComponentPreview code={accountTriggerCode}>
          <div className="p-6 rounded-[12px] bg-[rgb(12,15,14)] border border-[rgb(30,39,37)] flex items-center justify-center">
            <AccountTrigger
              username="scope"
              balance="24 500"
              avatarUrl="https://nztcdn.com/avatar/l/1792612741/8141440.webp"
            />
          </div>
        </ComponentPreview>
      </div>

      {/* Props Reference */}
      <div className="pt-6 border-t border-[rgb(30,39,37)] space-y-6">
        <h2 className="text-lg font-semibold text-[rgb(245,245,245)]">Свойства</h2>
        <PropsTable
          title="DropdownMenu"
          props={dropdownMenuProps}
        />
        <PropsTable
          title="DottesTrigger"
          props={dottesTriggerProps}
        />
        <PropsTable
          title="DropdownMenuContent"
          props={contentProps}
        />
        <PropsTable
          title="DropdownMenuItem"
          props={itemProps}
        />
        <PropsTable
          title="AccountTrigger"
          props={accountTriggerProps}
        />
      </div>

      {/* Installation */}
      <div className="space-y-3 pt-4 border-t border-[rgb(30,39,37)]">
        <h2 className="text-lg font-semibold text-[rgb(245,245,245)]">Установка</h2>
        <div className="relative rounded-[10px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] p-3 font-mono text-xs text-[rgb(214,214,214)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#00ba78]" />
            <span>npx @scopelzt/lzt-ui add dropdown-menu</span>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText("npx @scopelzt/lzt-ui add dropdown-menu");
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
