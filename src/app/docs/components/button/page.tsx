"use client";

import * as React from "react";
import { Button, CopyButton } from "@/components/ui/button";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable, type PropDefinition } from "@/components/docs/props-table";
import {
  ChevronRight,
  Terminal,
  Copy,
  Check,
  Heart,
  MessageSquare,
  Flag,
  ShoppingCart,
  Star,
  Lock,
} from "lucide-react";

const buttonProps: PropDefinition[] = [
  {
    prop: "variant",
    type: '"primary" | "default" | "secondary" | "danger" | "ghost" | "more"',
    default: '"primary"',
    description: "Стиль оформления кнопки.",
  },
  {
    prop: "size",
    type: '"sm" | "default" | "lg" | "icon"',
    default: '"default"',
    description: "Размер: sm (28px), default (34px), lg (38px), icon (34×34px).",
  },
  {
    prop: "isLoading",
    type: "boolean",
    default: "false",
    description: "Отображает встроенный спиннер и блокирует клики.",
  },
  {
    prop: "asChild",
    type: "boolean",
    default: "false",
    description: "Передаёт свойства дочернему элементу (Slot).",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Отключает интерактивность.",
  },
  {
    prop: "className",
    type: "string",
    description: "Дополнительные CSS-классы.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Контент кнопки.",
  },
];

const copyButtonProps: PropDefinition[] = [
  {
    prop: "text",
    type: "string",
    required: true,
    description: "Копируемый текст.",
  },
  {
    prop: "onCopy",
    type: "() => void",
    description: "Коллбэк после копирования.",
  },
  {
    prop: "className",
    type: "string",
    description: "Дополнительные CSS-классы.",
  },
];

export default function ButtonDocPage() {
  const [copiedCli, setCopiedCli] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  const [likesCount, setLikesCount] = React.useState(42);
  const [isFav, setIsFav] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const forumActionBarCode = `<div className="flex items-center justify-between p-3 rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)]">
  <div className="flex items-center gap-2">
    <Button variant="default" size="sm">Попросить личный</Button>
    <Button variant="ghost" size="sm">Ответить</Button>
    <Button variant="ghost" size="sm" className="text-[rgb(140,162,154)]">Пожаловаться</Button>
  </div>
  <Button variant="ghost" size="sm">
    <Heart className="w-3.5 h-3.5 text-[#00ba78]" />
    <span>42</span>
  </Button>
</div>`;

  const marketItemBarCode = `<div className="flex items-center gap-2">
  <Button variant="primary" size="default" isLoading={loading}>
    Купить за 499 ₽
  </Button>
  <Button variant="default" size="icon" title="В корзину">
    <ShoppingCart className="w-4 h-4" />
  </Button>
  <Button variant="default" size="icon" title="В избранное">
    <Star className="w-4 h-4" />
  </Button>
  <Button variant="more" title="Действия" />
</div>`;

  const allVariantsCode = `<div className="flex flex-wrap items-center gap-2.5">
  <Button variant="primary">Основная</Button>
  <Button variant="default">По умолчанию</Button>
  <Button variant="secondary">Вторичная</Button>
  <Button variant="danger">Опасное действие</Button>
  <Button variant="ghost">Кнопка-ссылка (Ghost)</Button>
  <Button variant="more" title="Действия" />
</div>`;

  const copyButtonCode = `<div className="flex items-center gap-3 p-3 rounded-[10px] bg-[rgb(24,30,28)] border border-[rgb(36,47,43)]">
  <span className="text-sm font-medium text-[rgb(214,214,214)]">steam_user_48102</span>
  <CopyButton text="steam_user_48102" />
</div>`;

  return (
    <div className="space-y-10 max-w-4xl pb-20">
      {/* Page Title */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-[rgb(140,162,154)] mb-2">
          <span>Компоненты</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[rgb(245,245,245)]">Button</span>
        </div>
        <h1 className="text-3xl font-bold text-[rgb(245,245,245)] tracking-tight">
          Button
        </h1>
        <p className="text-sm text-[rgb(140,162,154)] mt-2">
          Кнопки действий и навигации.
        </p>
      </div>

      {/* Showcase 1: Action Buttons Bar */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Кнопки действий
        </h2>

        <ComponentPreview code={forumActionBarCode}>
          <div className="w-full rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] p-4 shadow-xl space-y-3">
            <div className="text-xs text-[rgb(214,214,214)] leading-relaxed pb-3 border-b border-[rgb(30,39,37)]">
              Раздаю свежие прокси HTTP/SOCKS5 под чекеры и маркет. Личные выдаю по кнопке ниже.
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="default" size="sm" className="font-medium">
                  <Lock className="w-3 h-3 mr-1 text-[#00ba78]" />
                  Попросить личный
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  Ответить
                </Button>
                <Button variant="ghost" size="sm" className="text-[rgb(140,162,154)] hover:text-[rgb(241,56,56)]">
                  <Flag className="w-3 h-3 mr-1" />
                  Пожаловаться
                </Button>
              </div>

              <button
                type="button"
                onClick={toggleLike}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-xs font-medium bg-[rgb(24,30,28)] hover:bg-[rgb(30,39,37)] border border-[rgb(36,47,43)] transition"
              >
                <Heart
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isLiked ? "fill-[#00ba78] text-[#00ba78] scale-110" : "text-[rgb(140,162,154)]"
                  }`}
                />
                <span className={isLiked ? "text-[#00ba78] font-bold" : "text-[rgb(214,214,214)]"}>
                  {likesCount}
                </span>
              </button>
            </div>
          </div>
        </ComponentPreview>
      </div>

      {/* Showcase 2: Market Account Action Buttons */}
      <div className="space-y-3 pt-6 border-t border-[rgb(30,39,37)]">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Действия маркета
        </h2>

        <ComponentPreview code={marketItemBarCode}>
          <div className="w-full rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
            <div>
              <div className="font-bold text-lg text-white tabular-nums">499 ₽</div>
              <div className="text-xs text-[rgb(140,162,154)]">Гарантия 24 часа • Автоматическая выдача</div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="primary"
                size="default"
                isLoading={loading}
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => setLoading(false), 1500);
                }}
              >
                {loading ? "Проверка данных..." : "Купить"}
              </Button>

              <Button variant="default" size="icon" title="В корзину">
                <ShoppingCart className="w-4 h-4 text-[rgb(214,214,214)]" />
              </Button>

              <Button
                variant="default"
                size="icon"
                title="В избранное"
                onClick={() => setIsFav(!isFav)}
              >
                <Star className={`w-4 h-4 ${isFav ? "fill-[#00ba78] text-[#00ba78]" : "text-[rgb(214,214,214)]"}`} />
              </Button>

              <Button variant="more" title="Дополнительные действия" />
            </div>
          </div>
        </ComponentPreview>
      </div>

      {/* Palette of All Button Variants */}
      <div className="space-y-3 pt-6 border-t border-[rgb(30,39,37)]">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Варианты
        </h2>
        <ComponentPreview code={allVariantsCode}>
          <div className="flex flex-wrap items-center gap-2.5 p-4 rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)]">
            <Button variant="primary">Основная</Button>
            <Button variant="default">По умолчанию</Button>
            <Button variant="secondary">Вторичная</Button>
            <Button variant="danger">Опасное действие</Button>
            <Button variant="ghost">Кнопка-ссылка (Ghost)</Button>
            <Button variant="more" title="Действия" />
          </div>
        </ComponentPreview>
      </div>

      {/* CopyButton */}
      <div className="space-y-3 pt-6 border-t border-[rgb(30,39,37)]">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Копирование
        </h2>
        <ComponentPreview code={copyButtonCode}>
          <div className="flex items-center gap-3 p-3 rounded-[10px] bg-[rgb(24,30,28)] border border-[rgb(36,47,43)]">
            <span className="text-sm font-medium text-[rgb(214,214,214)]">steam_user_48102</span>
            <CopyButton text="steam_user_48102" />
          </div>
        </ComponentPreview>
      </div>

      {/* Props Reference Tables */}
      <div className="pt-6 border-t border-[rgb(30,39,37)] space-y-6">
        <h2 className="text-lg font-semibold text-[rgb(245,245,245)]">
          Свойства
        </h2>
        <PropsTable
          title="Button"
          props={buttonProps}
        />
        <PropsTable
          title="CopyButton"
          props={copyButtonProps}
        />
      </div>

      {/* Installation */}
      <div className="space-y-3 pt-4 border-t border-[rgb(30,39,37)]">
        <h2 className="text-lg font-semibold text-[rgb(245,245,245)]">Установка</h2>
        <div className="relative rounded-[10px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] p-3 font-mono text-xs text-[rgb(214,214,214)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#00ba78]" />
            <span>npx @scopelzt/lzt-ui add button</span>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText("npx @scopelzt/lzt-ui add button");
              setCopiedCli(true);
              setTimeout(() => setCopiedCli(false), 2000);
            }}
            className="p-1 hover:text-white transition"
          >
            {copiedCli ? <Check className="w-3.5 h-3.5 text-[#00ba78]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
