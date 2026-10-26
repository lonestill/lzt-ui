"use client";

import * as React from "react";
import { Input, Textarea, InputRelative, InputRelativeIcon } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable, type PropDefinition } from "@/components/docs/props-table";
import { ChevronRight, Terminal, Copy, Check, Search, Eye, EyeOff, Edit3 } from "lucide-react";

const inputProps: PropDefinition[] = [
  {
    prop: "inputSize",
    type: '"default" | "extraLarge"',
    default: '"default"',
    description: "Размер: default (30px форума) или extraLarge (36px маркета).",
  },
  {
    prop: "type",
    type: "string",
    default: '"text"',
    description: "HTML-тип поля (text, password, number, search).",
  },
  {
    prop: "placeholder",
    type: "string",
    description: "Текст подсказки внутри поля.",
  },
  {
    prop: "value",
    type: "string | number",
    description: "Значение в контролируемом режиме.",
  },
  {
    prop: "onChange",
    type: "(e: ChangeEvent<HTMLInputElement>) => void",
    description: "Обработчик изменения текста.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Блокирует поле ввода.",
  },
  {
    prop: "className",
    type: "string",
    description: "Дополнительные CSS-классы.",
  },
];

const textareaProps: PropDefinition[] = [
  {
    prop: "elastic",
    type: "boolean",
    default: "false",
    description: "Включает авторесайз высоты под текст (.Elastic).",
  },
  {
    prop: "placeholder",
    type: "string",
    description: "Текст подсказки.",
  },
  {
    prop: "rows",
    type: "number",
    description: "Количество строк по умолчанию.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Блокирует поле ввода.",
  },
  {
    prop: "className",
    type: "string",
    description: "Дополнительные CSS-классы.",
  },
];

const relativeProps: PropDefinition[] = [
  {
    prop: "className",
    type: "string",
    description: "Контейнер .inputRelative для размещения иконок внутри инпута.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Поле ввода и иконка.",
  },
];

const relativeIconProps: PropDefinition[] = [
  {
    prop: "onClick",
    type: "() => void",
    description: "Коллбэк при клике на иконку.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Иконка или кнопка очистки/скрытия.",
  },
  {
    prop: "className",
    type: "string",
    description: "Дополнительные CSS-классы.",
  },
];

function PasswordConfirmDemo() {
  const [showPass, setShowPass] = React.useState(false);
  const [pass, setPass] = React.useState("");

  return (
    <div className="w-full max-w-sm rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] p-4 shadow-xl space-y-3">
      <div className="text-xs font-medium text-[rgb(214,214,214)]">Подтверждение пароля:</div>
      <InputRelative>
        <Input
          type={showPass ? "text" : "password"}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Введите пароль..."
          inputSize="extraLarge"
        />
        <InputRelativeIcon onClick={() => setShowPass(!showPass)}>
          {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </InputRelativeIcon>
      </InputRelative>
    </div>
  );
}

export default function InputDocPage() {
  const [copiedCli, setCopiedCli] = React.useState(false);
  const [priceFrom, setPriceFrom] = React.useState("50");
  const [priceTo, setPriceTo] = React.useState("500");
  const [note, setNote] = React.useState("");

  const priceRangeCode = `<div className="flex items-center gap-2">
  <div className="relative w-28">
    <Input
      type="number"
      value={priceFrom}
      onChange={(e) => setPriceFrom(e.target.value)}
      placeholder="Цена от"
      className="pr-6 bg-[rgb(24,30,28)] text-center font-semibold tabular-nums"
    />
    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[rgb(140,162,154)]">
      ₽
    </span>
  </div>
  <span className="text-[rgb(90,105,99)] text-xs">—</span>
  <div className="relative w-28">
    <Input
      type="number"
      value={priceTo}
      onChange={(e) => setPriceTo(e.target.value)}
      placeholder="до"
      className="pr-6 bg-[rgb(24,30,28)] text-center font-semibold tabular-nums"
    />
    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[rgb(140,162,154)]">
      ₽
    </span>
  </div>
</div>`;

  const searchInputCode = `<div className="relative w-full max-w-xl">
  <Search className="w-4 h-4 text-[rgb(140,162,154)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
  <Input
    className="pl-9 pr-12 bg-[rgb(24,30,28)] border-0 h-[38px] text-sm"
    placeholder="Поиск тем, сообщений и пользователей..."
  />
  <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-[rgb(30,39,37)] border border-[rgb(36,47,43)] text-[10px] font-mono text-[rgb(140,162,154)]">
    /
  </kbd>
</div>`;

  return (
    <div className="space-y-10 max-w-4xl pb-20">
      {/* Title */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-[rgb(140,162,154)] mb-2">
          <span>Компоненты</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[rgb(245,245,245)]">Input</span>
        </div>
        <h1 className="text-3xl font-bold text-[rgb(245,245,245)] tracking-tight">
          Input
        </h1>
        <p className="text-sm text-[rgb(140,162,154)] mt-2">
          Текстовые поля ввода и многострочные области.
        </p>
      </div>

      {/* Showcase 1: Market Price Range Inputs */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Диапазон цен
        </h2>

        <ComponentPreview code={priceRangeCode}>
          <div className="w-full rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] p-3 sm:p-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-[rgb(140,162,154)]">Стоимость:</span>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="relative w-28">
                  <Input
                    type="number"
                    value={priceFrom}
                    onChange={(e) => setPriceFrom(e.target.value)}
                    placeholder="Цена от"
                    className="pr-6 bg-[rgb(24,30,28)] text-center font-semibold tabular-nums"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[rgb(140,162,154)]">
                    ₽
                  </span>
                </div>
                <span className="text-[rgb(90,105,99)] text-xs">—</span>
                <div className="relative w-28">
                  <Input
                    type="number"
                    value={priceTo}
                    onChange={(e) => setPriceTo(e.target.value)}
                    placeholder="до"
                    className="pr-6 bg-[rgb(24,30,28)] text-center font-semibold tabular-nums"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[rgb(140,162,154)]">
                    ₽
                  </span>
                </div>
              </div>
            </div>

            <Button variant="primary" size="default">
              Применить фильтр
            </Button>
          </div>
        </ComponentPreview>
      </div>

      {/* Showcase 2: Forum Quick Search Input */}
      <div className="space-y-3 pt-6 border-t border-[rgb(30,39,37)]">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Поиск
        </h2>

        <ComponentPreview code={searchInputCode}>
          <div className="w-full rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] p-4 shadow-xl">
            <div className="relative w-full max-w-xl">
              <Search className="w-4 h-4 text-[rgb(140,162,154)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <Input
                className="pl-9 pr-12 bg-[rgb(24,30,28)] border-0 h-[38px] text-sm"
                placeholder="Поиск тем, сообщений и пользователей..."
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-[rgb(30,39,37)] border border-[rgb(36,47,43)] text-[10px] font-mono text-[rgb(140,162,154)]">
                /
              </kbd>
            </div>
          </div>
        </ComponentPreview>
      </div>

      {/* Showcase 3: Market Note Input */}
      <div className="space-y-3 pt-6 border-t border-[rgb(30,39,37)]">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Размер extraLarge
        </h2>

        <ComponentPreview
          code={`<Input
  inputSize="extraLarge"
  value={note}
  onChange={(e) => setNote(e.target.value)}
  placeholder="Заметка видна только вам..."
/>`}
        >
          <div className="w-full rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] p-4 shadow-xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-[rgb(140,162,154)]">
                <Edit3 className="w-3.5 h-3.5 text-[#00ba78]" />
                <span className="font-medium text-[rgb(214,214,214)]">Личная заметка:</span>
              </div>
              <span className="text-[11px] text-[rgb(140,162,154)]">Сохраняется автоматически</span>
            </div>
            <Input
              inputSize="extraLarge"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Заметка видна только вам..."
            />
          </div>
        </ComponentPreview>
      </div>

      {/* Showcase 4: Password Input with Toggle */}
      <div className="space-y-3 pt-6 border-t border-[rgb(30,39,37)]">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Ввод пароля
        </h2>

        <ComponentPreview
          code={`<InputRelative>
  <Input
    type={showPass ? "text" : "password"}
    value={pass}
    onChange={(e) => setPass(e.target.value)}
    placeholder="Введите пароль..."
    inputSize="extraLarge"
  />
  <InputRelativeIcon onClick={() => setShowPass(!showPass)}>
    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
  </InputRelativeIcon>
</InputRelative>`}
        >
          <PasswordConfirmDemo />
        </ComponentPreview>
      </div>

      {/* Showcase 5: XenForo Textarea */}
      <div className="space-y-3 pt-6 border-t border-[rgb(30,39,37)]">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Многострочный ввод (Textarea)
        </h2>

        <ComponentPreview
          code={`<Textarea
  elastic
  placeholder="Напишите ответ в тему или укажите условия продажи..."
  rows={3}
/>`}
        >
          <div className="w-full rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] p-4 shadow-xl space-y-2">
            <div className="text-xs font-medium text-[rgb(140,162,154)]">
              Быстрый ответ:
            </div>
            <Textarea
              elastic
              placeholder="Напишите ответ в тему или укажите условия продажи..."
              rows={3}
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
          title="Input"
          props={inputProps}
        />
        <PropsTable
          title="Textarea"
          props={textareaProps}
        />
        <PropsTable
          title="InputRelative"
          props={relativeProps}
        />
        <PropsTable
          title="InputRelativeIcon"
          props={relativeIconProps}
        />
      </div>

      {/* Installation */}
      <div className="space-y-3 pt-4 border-t border-[rgb(30,39,37)]">
        <h2 className="text-lg font-semibold text-[rgb(245,245,245)]">Установка</h2>
        <div className="relative rounded-[10px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] p-3 font-mono text-xs text-[rgb(214,214,214)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#00ba78]" />
            <span>npx @scopelzt/lzt-ui add input</span>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText("npx @scopelzt/lzt-ui add input");
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
