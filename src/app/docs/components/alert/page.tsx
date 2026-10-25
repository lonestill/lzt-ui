"use client";

import * as React from "react";
import { Alert, AlertModal, ImportantMessage } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable, type PropDefinition } from "@/components/docs/props-table";
import { ChevronRight, Terminal, Copy, Check } from "lucide-react";

const alertProps: PropDefinition[] = [
  {
    prop: "variant",
    type: '"error" | "destructive" | "warning" | "success" | "default"',
    default: '"error"',
    description: "Стиль шапки: error (багровый), warning (янтарный), success (зелёный), default (тёмный).",
  },
  {
    prop: "title",
    type: "React.ReactNode",
    description: "Заголовок плашки .heading.",
  },
  {
    prop: "isModal",
    type: "boolean",
    default: "false",
    description: "Рендерит окно в портале по центру экрана с оверлеем и обработкой Escape.",
  },
  {
    prop: "open",
    type: "boolean",
    default: "true",
    description: "Состояние видимости с анимацией появления/скрытия.",
  },
  {
    prop: "onClose",
    type: "() => void",
    description: "Коллбэк закрытия окна.",
  },
  {
    prop: "shake",
    type: "boolean",
    default: "true (для error)",
    description: "Включает анимацию тряски (.anim-lzt-error-shake).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Текст сообщения внутри .errorDetails.",
  },
];

const importantMessageProps: PropDefinition[] = [
  {
    prop: "variant",
    type: '"default" | "warning" | "error" | "success"',
    default: '"default"',
    description: "Цвет акцентной левой границы.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    required: true,
    description: "Текст сообщения или объявления.",
  },
  {
    prop: "className",
    type: "string",
    description: "Дополнительные CSS-классы.",
  },
];

export default function AlertDocPage() {
  const [copiedCli, setCopiedCli] = React.useState(false);

  const [activeAlert, setActiveAlert] = React.useState<
    "error" | "warning" | "success" | "default" | null
  >(null);

  const previewCode = `"use client";

import * as React from "react";
import { AlertModal } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function SecurityAlertExample() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button variant="danger" onClick={() => setIsOpen(true)}>
        Войти с неверным паролем
      </Button>

      <AlertModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        variant="error"
        title="Произошла ошибка:"
      >
        Вы ввели неверный пароль. Пожалуйста, попробуйте ещё раз.
      </AlertModal>
    </>
  );
}`;

  const inlineCode = `<div className="space-y-4 max-w-lg w-full">
  <Alert variant="error" title="Произошла ошибка:">
    Вы ввели неверный пароль. Пожалуйста, попробуйте ещё раз.
  </Alert>

  <Alert variant="warning" title="Внимание:">
    Средства находятся в холде (1 490 ₽). До завершения гарантии вывод заблокирован.
  </Alert>
</div>`;

  return (
    <div className="space-y-10 max-w-4xl pb-20">
      {/* Title */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-[rgb(140,162,154)] mb-2">
          <span>Компоненты</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[rgb(245,245,245)]">Alert</span>
        </div>
        <h1 className="text-3xl font-bold text-[rgb(245,245,245)] tracking-tight">
          Alert
        </h1>
        <p className="text-sm text-[rgb(140,162,154)] mt-2">
          Системные уведомления, модальные ошибки и важные сообщения.
        </p>
      </div>

      {/* Interactive Modal Alerts by Button */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Модальные ошибки
        </h2>

        <ComponentPreview code={previewCode}>
          <div className="flex flex-wrap items-center gap-3 p-6 rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] shadow-xl w-full">
            <Button
              variant="danger"
              onClick={() => setActiveAlert("error")}
              className="cursor-pointer"
            >
              Вызвать ошибку (Неверный пароль)
            </Button>

            <Button
              variant="default"
              onClick={() => setActiveAlert("warning")}
              className="cursor-pointer border border-[rgba(184,115,18,0.4)] text-[#e68c17] hover:bg-[rgba(184,115,18,0.15)]"
            >
              Вызвать предупреждение (Холд)
            </Button>

            <Button
              variant="primary"
              onClick={() => setActiveAlert("success")}
              className="cursor-pointer"
            >
              Вызвать успех (2FA)
            </Button>

            <Button
              variant="secondary"
              onClick={() => setActiveAlert("default")}
              className="cursor-pointer"
            >
              Вызвать инфо (Правила)
            </Button>
          </div>
        </ComponentPreview>
      </div>

      {/* Static / Inline View */}
      <div className="space-y-3 pt-6 border-t border-[rgb(30,39,37)]">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Встроенное отображение
        </h2>
        <ComponentPreview code={inlineCode}>
          <div className="space-y-4 max-w-lg w-full">
            <Alert variant="error" title="Произошла ошибка:">
              Вы ввели неверный пароль. Пожалуйста, попробуйте ещё раз.
            </Alert>

            <Alert variant="warning" title="Внимание:">
              Средства находятся в холде (1 490 ₽). До завершения гарантии вывод заблокирован.
            </Alert>
          </div>
        </ComponentPreview>
      </div>

      <AlertModal
        open={activeAlert === "error"}
        onClose={() => setActiveAlert(null)}
        variant="error"
        title="Произошла ошибка:"
      >
        Вы ввели неверный пароль. Пожалуйста, попробуйте ещё раз.
      </AlertModal>

      <AlertModal
        open={activeAlert === "warning"}
        onClose={() => setActiveAlert(null)}
        variant="warning"
        title="Внимание:"
      >
        Средства находятся в холде (1 490 ₽). До завершения гарантийного срока (осталось 18 часов) вывод заблокирован системой безопасности маркета.
      </AlertModal>

      <AlertModal
        open={activeAlert === "success"}
        onClose={() => setActiveAlert(null)}
        variant="success"
        title="Успешно:"
      >
        Настройки двухфакторной аутентификации успешно обновлены. Резервные коды отправлены на подтверждённый Telegram-аккаунт.
      </AlertModal>

      <AlertModal
        open={activeAlert === "default"}
        onClose={() => setActiveAlert(null)}
        variant="default"
        title="Информация:"
      >
        Правила раздела «Безопасность»: не передавайте секретную фразу и коды аутентификатора третьим лицам или поддержке.
      </AlertModal>

      {/* XenForo .importantMessage.blockMessage */}
      <div className="space-y-3 pt-6 border-t border-[rgb(30,39,37)]">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Важные сообщения (.importantMessage)
        </h2>
        <ComponentPreview
          code={`<ImportantMessage variant="warning">
  Внимание: перед покупкой проверяйте баланс и статус привязанной почты.
</ImportantMessage>

<ImportantMessage variant="default">
  Информация: технические работы завершены, шлюзы платежей работают штатно.
</ImportantMessage>

<ImportantMessage variant="error">
  Предупреждение: не переходите по подозрительным ссылкам в личных сообщениях.
</ImportantMessage>`}
        >
          <div className="space-y-2 max-w-lg w-full">
            <ImportantMessage variant="warning">
              Внимание: перед покупкой проверяйте баланс и статус привязанной почты.
            </ImportantMessage>
            <ImportantMessage variant="default">
              Информация: технические работы завершены, шлюзы платежей работают штатно.
            </ImportantMessage>
            <ImportantMessage variant="error">
              Предупреждение: не переходите по подозрительным ссылкам в личных сообщениях.
            </ImportantMessage>
          </div>
        </ComponentPreview>
      </div>

      {/* Props Reference */}
      <div className="pt-6 border-t border-[rgb(30,39,37)] space-y-6">
        <h2 className="text-lg font-semibold text-[rgb(245,245,245)]">
          Свойства
        </h2>
        <PropsTable
          title="Alert & AlertModal"
          props={alertProps}
        />
        <PropsTable
          title="ImportantMessage"
          props={importantMessageProps}
        />
      </div>

      {/* Installation */}
      <div className="space-y-3 pt-4 border-t border-[rgb(30,39,37)]">
        <h2 className="text-lg font-semibold text-[rgb(245,245,245)]">Установка</h2>
        <div className="relative rounded-[10px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] p-3 font-mono text-xs text-[rgb(214,214,214)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#00ba78]" />
            <span>npx @scopelzt/lzt-ui add alert</span>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText("npx @scopelzt/lzt-ui add alert");
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
