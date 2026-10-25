"use client";

import * as React from "react";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable, type PropDefinition } from "@/components/docs/props-table";
import { ChevronRight, Terminal, Copy, Check } from "lucide-react";

const toastMethods: PropDefinition[] = [
  {
    prop: "timedMessage(message, options?)",
    type: "(message: string, options?: { variant?: 'success' | 'error', duration?: number }) => void",
    description: "Показывает верхнее всплывающее уведомление .timedMessage.",
  },
  {
    prop: "stackAlert(message, options?)",
    type: "(message: string, options?: { duration?: number }) => void",
    description: "Добавляет оповещение в очередь в левом нижнем углу (#StackAlerts).",
  },
  {
    prop: "toast(message, options?)",
    type: "(message: string, options?: { variant?: 'success' | 'error', duration?: number }) => void",
    description: "Алиас для timedMessage.",
  },
];

const toastOptionsProps: PropDefinition[] = [
  {
    prop: "variant",
    type: '"success" | "error"',
    default: '"success"',
    description: "Тип иконки плашки.",
  },
  {
    prop: "duration",
    type: "number",
    default: "3000 (timedMessage) / 3500 (stackAlert)",
    description: "Длительность отображения в миллисекундах.",
  },
];

function ToastDemos() {
  const { timedMessage, stackAlert } = useToast();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="text-xs font-semibold text-[rgb(140,162,154)] block">
          Верхнее уведомление (timedMessage):
        </span>
        <div className="flex flex-wrap gap-2.5">
          <Button
            variant="primary"
            size="sm"
            onClick={() => timedMessage("Изменения сохранены", { variant: "success" })}
          >
            Успех
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={() => timedMessage("Ссылка скопирована", { variant: "success" })}
          >
            Ссылка скопирована
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => timedMessage("Ошибка: укажите сумму перевода", { variant: "error" })}
          >
            Ошибка
          </Button>
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-[rgb(30,39,37)]">
        <span className="text-xs font-semibold text-[rgb(140,162,154)] block">
          Очередь оповещений (stackAlert):
        </span>
        <div className="flex flex-wrap gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => stackAlert("Сообщение добавлено в закладки")}
          >
            В закладки (#StackAlerts)
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ToastDocPage() {
  const [copiedCli, setCopiedCli] = React.useState(false);

  const previewCode = `import { ToastProvider, useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

function ActionButtons() {
  const { timedMessage, stackAlert } = useToast();

  return (
    <div className="flex gap-2">
      <Button
        variant="primary"
        onClick={() => timedMessage("Изменения сохранены", { variant: "success" })}
      >
        Сохранить
      </Button>

      <Button
        variant="secondary"
        onClick={() => stackAlert("Добавлено в закладки")}
      >
        В закладки
      </Button>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <ActionButtons />
    </ToastProvider>
  );
}`;

  return (
    <div className="space-y-10 max-w-4xl pb-20">
      <div>
        <div className="flex items-center gap-1.5 text-xs text-[rgb(140,162,154)] mb-2">
          <span>Компоненты</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[rgb(245,245,245)]">Toast</span>
        </div>
        <h1 className="text-3xl font-bold text-[rgb(245,245,245)] tracking-tight">
          Toast
        </h1>
        <p className="text-sm text-[rgb(140,162,154)] mt-2">
          Всплывающие уведомления о результатах действий.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Интерактивный пример
        </h2>
        <ToastProvider>
          <ComponentPreview code={previewCode}>
            <ToastDemos />
          </ComponentPreview>
        </ToastProvider>
      </div>

      {/* Props Reference */}
      <div className="pt-6 border-t border-[rgb(30,39,37)] space-y-6">
        <h2 className="text-lg font-semibold text-[rgb(245,245,245)]">
          Свойства
        </h2>
        <PropsTable
          title="Методы useToast"
          props={toastMethods}
        />
        <PropsTable
          title="Опции"
          props={toastOptionsProps}
        />
      </div>

      {/* Installation */}
      <div className="space-y-3 pt-4 border-t border-[rgb(30,39,37)]">
        <h2 className="text-lg font-semibold text-[rgb(245,245,245)]">Установка</h2>
        <div className="relative rounded-[10px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] p-3 font-mono text-xs text-[rgb(214,214,214)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#00ba78]" />
            <span>npx @scopelzt/lzt-ui add toast</span>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText("npx @scopelzt/lzt-ui add toast");
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
