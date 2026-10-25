"use client";

import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable, type PropDefinition } from "@/components/docs/props-table";
import { ChevronRight, Terminal, Copy, Check, ShoppingCart, ShieldAlert, AlertCircle } from "lucide-react";

const dialogProps: PropDefinition[] = [
  {
    prop: "open",
    type: "boolean",
    description: "Контролируемое состояние открытия окна.",
  },
  {
    prop: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Коллбэк при открытии или закрытии окна.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Элементы DialogTrigger и DialogContent.",
  },
];

const dialogTriggerProps: PropDefinition[] = [
  {
    prop: "asChild",
    type: "boolean",
    default: "false",
    description: "Передаёт поведение открытия дочернему элементу.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Элемент триггера.",
  },
];

const dialogHeaderProps: PropDefinition[] = [
  {
    prop: "variant",
    type: '"default" | "error" | "warning" | "security"',
    default: '"default"',
    description: "Стиль шапки: default (тёмный), warning/security (янтарный), error (багровый).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Заголовок и описание окна.",
  },
];

export default function DialogDocPage() {
  const [copiedCli, setCopiedCli] = React.useState(false);

  const previewCode = `<Dialog>
  <DialogTrigger asChild>
    <Button variant="primary">
      <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
      Окно покупки
    </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Подтверждение покупки товара</DialogTitle>
      <DialogDescription>
        Telegram Session + TData | Отлёжка 120 дней
      </DialogDescription>
    </DialogHeader>
    <DialogBody className="space-y-3 text-xs">
      <div className="flex justify-between items-center py-2 border-b border-[rgb(30,39,37)]">
        <span className="text-[rgb(140,162,154)]">Сумма к оплате:</span>
        <span className="font-mono font-bold text-white text-sm">199 ₽</span>
      </div>
      <div className="space-y-1.5 pt-1">
        <label className="text-[rgb(140,162,154)] block">Промокод на скидку:</label>
        <Input placeholder="Введите промокод..." />
      </div>
    </DialogBody>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="default" size="sm">Отмена</Button>
      </DialogClose>
      <Button variant="primary" size="sm">Купить за 199 ₽</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`;

  return (
    <div className="space-y-10 max-w-4xl pb-20">
      <div>
        <div className="flex items-center gap-1.5 text-xs text-[rgb(140,162,154)] mb-2">
          <span>Компоненты</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[rgb(245,245,245)]">Dialog</span>
        </div>
        <h1 className="text-3xl font-bold text-[rgb(245,245,245)] tracking-tight">
          Dialog
        </h1>
        <p className="text-sm text-[rgb(140,162,154)] mt-2">
          Модальные диалоговые окна.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Примеры
        </h2>
        <ComponentPreview code={previewCode}>
          <div className="flex flex-wrap gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="primary" className="font-medium">
                  <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                  Окно покупки
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Подтверждение покупки товара</DialogTitle>
                  <DialogDescription>
                    Telegram Session + TData | Отлёжка 120 дней
                  </DialogDescription>
                </DialogHeader>
                <DialogBody className="space-y-3 text-xs">
                  <div className="flex justify-between items-center py-2 border-b border-[rgb(30,39,37)]">
                    <span className="text-[rgb(140,162,154)]">Сумма к оплате:</span>
                    <span className="font-mono font-bold text-white text-sm">199 ₽</span>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <label className="text-[rgb(140,162,154)] block">Промокод на скидку:</label>
                    <Input placeholder="Введите промокод..." />
                  </div>
                </DialogBody>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="default" size="sm">Отмена</Button>
                  </DialogClose>
                  <Button variant="primary" size="sm">Купить за 199 ₽</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" size="default">
                  <ShieldAlert className="w-3.5 h-3.5 mr-1.5 text-[#e68c17]" />
                  Проверка безопасности
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader variant="security">
                  <DialogTitle>Проверка безопасности</DialogTitle>
                  <DialogDescription className="text-white/80">
                    Подтвердите секретный ответ для совершения операции
                  </DialogDescription>
                </DialogHeader>
                <DialogBody className="space-y-3">
                  <p className="text-xs text-[rgb(140,162,154)]">
                    Введите ответ на секретный вопрос, указанный при регистрации:
                  </p>
                  <Input type="password" placeholder="Секретный ответ..." />
                </DialogBody>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="default" size="sm">Отмена</Button>
                  </DialogClose>
                  <Button variant="primary" size="sm">Подтвердить</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="danger" size="default">
                  <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
                  Модалка ошибки
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader variant="error">
                  <DialogTitle>Произошла ошибка:</DialogTitle>
                </DialogHeader>
                <DialogBody className="space-y-2 text-sm text-[rgb(214,214,214)]">
                  Вы не можете начать переписку с самим собой.
                </DialogBody>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="default" size="sm">Закрыть</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </ComponentPreview>
      </div>

      {/* Props Reference */}
      <div className="pt-6 border-t border-[rgb(30,39,37)] space-y-6">
        <h2 className="text-lg font-semibold text-[rgb(245,245,245)]">
          Свойства
        </h2>
        <PropsTable
          title="Dialog"
          props={dialogProps}
        />
        <PropsTable
          title="DialogTrigger & DialogClose"
          props={dialogTriggerProps}
        />
        <PropsTable
          title="DialogHeader"
          props={dialogHeaderProps}
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
            <span>npx @scopelzt/lzt-ui add dialog</span>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText("npx @scopelzt/lzt-ui add dialog");
              setCopiedCli(true);
              setTimeout(() => setCopiedCli(false), 2000);
            }}
            className="p-1 hover:text-white transition cursor-pointer"
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
