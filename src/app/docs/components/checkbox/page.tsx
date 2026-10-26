"use client";

import * as React from "react";
import { Checkbox, CheckboxItem, CheckboxRow, Radio } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable, type PropDefinition } from "@/components/docs/props-table";
import { ChevronRight, Terminal, Copy, Check } from "lucide-react";

const checkboxProps: PropDefinition[] = [
  {
    prop: "checked",
    type: "boolean",
    description: "Контролируемое состояние флага.",
  },
  {
    prop: "defaultChecked",
    type: "boolean",
    default: "false",
    description: "Начальное состояние чекбокса.",
  },
  {
    prop: "onCheckedChange",
    type: "(checked: boolean) => void",
    description: "Коллбэк при переключении состояния.",
  },
  {
    prop: "label",
    type: "React.ReactNode",
    description: "Текстовая метка рядом с чекбоксом.",
  },
  {
    prop: "description",
    type: "string",
    description: "Пояснение под меткой.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Блокирует переключение.",
  },
  {
    prop: "className",
    type: "string",
    description: "Дополнительные CSS-классы.",
  },
];

const radioProps: PropDefinition[] = [
  {
    prop: "name",
    type: "string",
    description: "Имя группы переключателей.",
  },
  {
    prop: "checked",
    type: "boolean",
    description: "Контролируемое состояние.",
  },
  {
    prop: "defaultChecked",
    type: "boolean",
    default: "false",
    description: "Начальное состояние.",
  },
  {
    prop: "onCheckedChange",
    type: "(checked: boolean) => void",
    description: "Коллбэк при выборе опции.",
  },
  {
    prop: "label",
    type: "React.ReactNode",
    description: "Текст опции.",
  },
  {
    prop: "description",
    type: "string",
    description: "Пояснение под опцией.",
  },
];

const wrappersProps: PropDefinition[] = [
  {
    prop: "CheckboxItem",
    type: "Component",
    description: "Пункт чекбокса для списков настроек профиля.",
  },
  {
    prop: "CheckboxRow",
    type: "Component",
    description: "Блочная строка фильтра маркета с фоном и отступами.",
  },
];

export default function CheckboxDocPage() {
  const [copiedCli, setCopiedCli] = React.useState(false);

  // Market buy dialog state
  const [warranty, setWarranty] = React.useState(true);
  const [autoEmail, setAutoEmail] = React.useState(true);
  const [tgNotify, setTgNotify] = React.useState(false);

  // Thread options state
  const [poll, setPoll] = React.useState(false);
  const [closeAfter, setCloseAfter] = React.useState(false);
  const [subscribe, setSubscribe] = React.useState(true);

  const marketPreviewCode = `<div className="space-y-3.5">
  <Checkbox
    checked={warranty}
    onCheckedChange={setWarranty}
    label="Согласен с правилами маркета и условиями гарантии"
    description="Гарантия действует до первой смены почты или пароля покупателем"
  />
  <Checkbox
    checked={autoEmail}
    onCheckedChange={setAutoEmail}
    label="Автоматическая привязка к временной почте маркета"
    description="Коды подтверждения будут моментально приходить во вкладку «Письма с почты»"
  />
  <Checkbox
    checked={tgNotify}
    onCheckedChange={setTgNotify}
    label="Отправить чек и данные от аккаунта в Telegram-бота"
  />
</div>`;

  return (
    <div className="space-y-10 max-w-4xl pb-20">
      {/* Title */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-[rgb(140,162,154)] mb-2">
          <span>Компоненты</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[rgb(245,245,245)]">Checkbox</span>
        </div>
        <h1 className="text-3xl font-bold text-[rgb(245,245,245)] tracking-tight">
          Checkbox
        </h1>
        <p className="text-sm text-[rgb(140,162,154)] mt-2">
          Флажки, радиокнопки и переключатели.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Параметры безопасности
        </h2>

        <ComponentPreview code={marketPreviewCode}>
          <div className="w-full max-w-xl rounded-[12px] border border-[rgb(30,39,37)] bg-[rgb(17,22,21)] p-5 shadow-xl space-y-4">
            <div className="border-b border-[rgb(30,39,37)] pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[rgb(245,245,245)]">Параметры сделки</h3>
                <p className="text-xs text-[rgb(140,162,154)] mt-0.5">
                  Telegram Session + TData • Продавец: <span className="text-white font-medium">AutoRegGod</span>
                </p>
              </div>
              <span className="font-bold text-[#00ba78] text-base tabular-nums">89 ₽</span>
            </div>

            <div className="space-y-3.5">
              <Checkbox
                checked={warranty}
                onCheckedChange={setWarranty}
                label="Согласен с правилами маркета и условиями гарантии"
                description="Гарантия действует до первой смены почты или пароля покупателем"
              />
              <Checkbox
                checked={autoEmail}
                onCheckedChange={setAutoEmail}
                label="Автоматическая привязка к временной почте маркета"
                description="Коды подтверждения будут моментально приходить во вкладку «Письма с почты»"
              />
              <Checkbox
                checked={tgNotify}
                onCheckedChange={setTgNotify}
                label="Отправить чек и данные от аккаунта в Telegram-бота"
              />
            </div>

            <div className="pt-3 border-t border-[rgb(30,39,37)] flex items-center justify-between">
              <span className="text-xs text-[rgb(140,162,154)]">Баланс после покупки: 1 248 ₽</span>
              <Button variant="primary" size="sm" disabled={!warranty}>
                Подтвердить покупку (89 ₽)
              </Button>
            </div>
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-3 pt-6 border-t border-[rgb(30,39,37)]">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Опции темы
        </h2>

        <ComponentPreview
          code={`<div className="space-y-3.5">
  <Checkbox
    checked={subscribe}
    onCheckedChange={setSubscribe}
    label="Следить за темой и получать уведомления об ответах"
    description="Вы будете получать колокольчик и push-уведомление при каждом новом посте"
  />
  <Checkbox
    checked={poll}
    onCheckedChange={setPoll}
    label="Добавить голосование / опрос к этой теме"
  />
  <Checkbox
    checked={closeAfter}
    onCheckedChange={setCloseAfter}
    label="Закрыть тему для комментариев сразу после публикации"
    description="Отвечать в тему смогут только кураторы и администрация раздела"
  />
</div>`}
        >
          <div className="w-full max-w-xl rounded-[12px] border border-[rgb(30,39,37)] bg-[rgb(17,22,21)] p-5 shadow-xl space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[rgb(140,162,154)] mb-2">
              Настройки публикации
            </h3>

            <Checkbox
              checked={subscribe}
              onCheckedChange={setSubscribe}
              label="Следить за темой и получать уведомления об ответах"
              description="Вы будете получать колокольчик и push-уведомление при каждом новом посте"
            />
            <Checkbox
              checked={poll}
              onCheckedChange={setPoll}
              label="Добавить голосование / опрос к этой теме"
            />
            <Checkbox
              checked={closeAfter}
              onCheckedChange={setCloseAfter}
              label="Закрыть тему для комментариев сразу после публикации"
              description="Отвечать в тему смогут только кураторы и администрация раздела"
            />
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-3 pt-6 border-t border-[rgb(30,39,37)]">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Фильтры и списки
        </h2>

        <ComponentPreview
          code={`{/* Блочные строки фильтров (LZT Market .checkboxRow) */}
<div className="space-y-1">
  <CheckboxRow defaultChecked>Только с родной почтой (Firstmail)</CheckboxRow>
  <CheckboxRow defaultChecked>Без спамблока (Telegram)</CheckboxRow>
  <CheckboxRow>С балансом / инвентарём</CheckboxRow>
</div>

{/* Настройки профиля (XenForo .checkboxItem) */}
<div className="space-y-1">
  <CheckboxItem defaultChecked>Включить автоматический запрос скрытого контента</CheckboxItem>
  <CheckboxItem>Отключить предупреждение о переходе по внешним ссылкам</CheckboxItem>
</div>`}
        >
          <div className="w-full max-w-xl rounded-[12px] border border-[rgb(30,39,37)] bg-[rgb(17,22,21)] p-5 shadow-xl space-y-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[rgb(140,162,154)] mb-2">
                Фильтры маркета:
              </div>
              <div className="space-y-1">
                <CheckboxRow defaultChecked>Только с родной почтой (Firstmail)</CheckboxRow>
                <CheckboxRow defaultChecked>Без спамблока (Telegram)</CheckboxRow>
                <CheckboxRow>С балансом / инвентарём</CheckboxRow>
              </div>
            </div>

            <div className="pt-3 border-t border-[rgb(30,39,37)]">
              <div className="text-xs font-bold uppercase tracking-wider text-[rgb(140,162,154)] mb-2">
                Настройки профиля:
              </div>
              <div className="space-y-1">
                <CheckboxItem defaultChecked>Включить автоматический запрос скрытого контента</CheckboxItem>
                <CheckboxItem>Отключить предупреждение о переходе по внешним ссылкам</CheckboxItem>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-3 pt-6 border-t border-[rgb(30,39,37)]">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Радиокнопки
        </h2>

        <ComponentPreview
          code={`<div className="space-y-2.5">
  <Radio
    name="payment_method"
    label="Баланс маркета LZT"
    defaultChecked
    description="Моментальное списание без комиссии"
  />
  <Radio
    name="payment_method"
    label="Криптовалюта (USDT TRC20 / TON)"
    description="Автоматическое зачисление после 1 подтверждения сети"
  />
  <Radio
    name="payment_method"
    label="СБП / Банковская карта РФ"
    description="Зачисление через P2P шлюз"
  />
</div>`}
        >
          <div className="w-full max-w-xl rounded-[12px] border border-[rgb(30,39,37)] bg-[rgb(17,22,21)] p-5 shadow-xl space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[rgb(140,162,154)] mb-1">
              Способ оплаты:
            </div>
            <div className="space-y-2.5">
              <Radio
                name="payment_method"
                label="Баланс маркета LZT"
                defaultChecked
                description="Моментальное списание без комиссии"
              />
              <Radio
                name="payment_method"
                label="Криптовалюта (USDT TRC20 / TON)"
                description="Автоматическое зачисление после 1 подтверждения сети"
              />
              <Radio
                name="payment_method"
                label="СБП / Банковская карта РФ"
                description="Зачисление через P2P шлюз"
              />
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
          title="Checkbox"
          props={checkboxProps}
        />
        <PropsTable
          title="Radio"
          props={radioProps}
        />
        <PropsTable
          title="Вспомогательные обёртки"
          props={wrappersProps}
        />
      </div>

      {/* Installation */}
      <div className="space-y-3 pt-4 border-t border-[rgb(30,39,37)]">
        <h2 className="text-lg font-semibold text-[rgb(245,245,245)]">Установка</h2>
        <div className="relative rounded-[10px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] p-3 font-mono text-xs text-[rgb(214,214,214)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#00ba78]" />
            <span>npx @scopelzt/lzt-ui add checkbox</span>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText("npx @scopelzt/lzt-ui add checkbox");
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
