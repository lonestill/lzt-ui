"use client";

import * as React from "react";
import { UniqText, type UniqPreset } from "@/components/ui/uniq-text";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable, type PropDefinition } from "@/components/docs/props-table";
import { ChevronRight, Terminal, Copy, Check } from "lucide-react";

const uniqProps: PropDefinition[] = [
  {
    prop: "preset",
    type: '"scope" | "uniq" | "unik" | "zelenka" | "greatest" | "gold" | "flame"',
    default: '"uniq"',
    description: "Пресет градиента ника. 'scope' использует легендарный неоновый стиль с 10 слоями text-shadow, 'gold' — золотой стиль XenForo.",
  },
  {
    prop: "glow",
    type: "boolean",
    default: "false",
    description: "Включает внешнее неоновое свечение (drop-shadow).",
  },
  {
    prop: "href",
    type: "string",
    description: "Если передан URL, компонент рендерится как интерактивная ссылка <a> с переходом на профиль.",
  },
  {
    prop: "target",
    type: "string",
    default: '"_blank"',
    description: "HTML target ссылки.",
  },
  {
    prop: "rel",
    type: "string",
    default: '"noopener noreferrer"',
    description: "HTML rel ссылки для безопасности.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    required: true,
    description: "Текст ника пользователя.",
  },
  {
    prop: "className",
    type: "string",
    description: "Дополнительные CSS-классы.",
  },
];

export default function UniqDocPage() {
  const [copiedCli, setCopiedCli] = React.useState(false);
  const [customName, setCustomName] = React.useState("scope");

  const memberCardCode = `<div className="flex flex-wrap items-center gap-4">
  {/* RaysMorgan */}
  <div className="w-64 p-4 rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] text-center space-y-2.5 shadow-xl">
    <Avatar
      src="https://nztcdn.com/avatar/l/1790278461/1.webp"
      fallback="RM"
      size="xl"
      className="mx-auto"
    />
    <div>
      <a
        href="#"
        className="text-base font-bold text-[rgb(241,56,56)] hover:underline inline-block"
      >
        RaysMorgan
      </a>
      <div className="text-[11px] text-[rgb(140,162,154)] mt-0.5">Создатель форума</div>
    </div>
    <Badge variant="banner" group="admin">Администратор</Badge>
    <div className="text-xs text-[rgb(140,162,154)] pt-2 border-t border-[rgb(30,39,37)] flex justify-between">
      <span>Симпатии:</span>
      <span className="font-mono text-[#00ba78] font-bold">58 864</span>
    </div>
  </div>

  {/* scope */}
  <div className="w-64 p-4 rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] text-center space-y-2.5 shadow-xl">
    <Avatar
      src="https://nztcdn.com/avatar/l/1791023433/9336841.webp"
      fallback="SC"
      size="xl"
      className="mx-auto"
    />
    <div>
      <UniqText
        preset="uniq"
        href="#"
        className="text-base font-bold"
      >
        scope
      </UniqText>
      <div className="text-[11px] text-[rgb(140,162,154)] mt-0.5">репутация дороже денег</div>
    </div>
    <Badge variant="banner" group="uniq">Уник</Badge>
    <div className="text-xs text-[rgb(140,162,154)] pt-2 border-t border-[rgb(30,39,37)] flex justify-between">
      <span>Симпатии:</span>
      <span className="font-mono text-[#00ba78] font-bold">1 443</span>
    </div>
  </div>

  {/* Claude */}
  <div className="w-64 p-4 rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] text-center space-y-2.5 shadow-xl">
    <Avatar
      src="https://nztcdn.com/avatar/l/1780024212/6772870.webp"
      fallback="CL"
      size="xl"
      className="mx-auto"
    />
    <div>
      <a
        href="#"
        className="text-base font-bold text-[rgb(255,147,4)] hover:underline inline-block"
      >
        Claude
      </a>
      <div className="text-[11px] text-[rgb(140,162,154)] mt-0.5">Разработчик • Куратор</div>
    </div>
    <Badge variant="banner" group="developer">Разработчик</Badge>
    <div className="text-xs text-[rgb(140,162,154)] pt-2 border-t border-[rgb(30,39,37)] flex justify-between">
      <span>Симпатии:</span>
      <span className="font-mono text-[#00ba78] font-bold">2 269</span>
    </div>
  </div>
</div>`;

  return (
    <div className="space-y-12 max-w-4xl pb-20">
      {/* Title */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-[rgb(140,162,154)] mb-2">
          <span>Компоненты</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[rgb(245,245,245)]">UniqText (Уник)</span>
        </div>
        <h1 className="text-3xl font-bold text-[rgb(245,245,245)] tracking-tight">
          UniqText (Уник)
        </h1>
        <p className="text-sm text-[rgb(140,162,154)] mt-2 leading-relaxed">
          Стилизация никнейма с градиентами и свечением.
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
            Карточки профиля
          </h2>
        </div>

        <ComponentPreview code={memberCardCode}>
          <div className="flex flex-wrap items-center gap-4">
            {/* RaysMorgan Card */}
            <div className="w-64 p-4 rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] text-center space-y-2.5 shadow-xl">
              <Avatar
                src="https://nztcdn.com/avatar/l/1790278461/1.webp"
                fallback="RM"
                size="xl"
                className="mx-auto"
              />
              <div>
                <UniqText
                  preset="raysmorgan"
                  href="https://lolz.team/members/1/"
                  className="text-base font-bold inline-block"
                >
                  RaysMorgan
                </UniqText>
                <div className="text-[11px] text-[rgb(140,162,154)] mt-0.5">Создатель форума</div>
              </div>
              <Badge variant="banner" group="admin">Администратор</Badge>
              <div className="text-xs text-[rgb(140,162,154)] pt-2 border-t border-[rgb(30,39,37)] flex justify-between">
                <span>Симпатии:</span>
                <span className="font-mono text-[#00ba78] font-bold">58 864</span>
              </div>
            </div>

            {/* extasy Card */}
            <div className="w-64 p-4 rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] text-center space-y-2.5 shadow-xl">
              <Avatar
                src="https://nztcdn.com/avatar/l/1792471677/3227904.webp"
                fallback="EX"
                size="xl"
                className="mx-auto"
              />
              <div>
                <UniqText
                  preset="extasy"
                  href="https://lolz.team/members/3227904/"
                  className="text-base font-bold inline-block"
                >
                  extasy
                </UniqText>
                <div className="text-[11px] text-[rgb(140,162,154)] mt-0.5">Главный дизайнер</div>
              </div>
              <Badge variant="banner" group="headDesigner">Главный дизайнер</Badge>
              <div className="text-xs text-[rgb(140,162,154)] pt-2 border-t border-[rgb(30,39,37)] flex justify-between">
                <span>Симпатии:</span>
                <span className="font-mono text-[#00ba78] font-bold">18 942</span>
              </div>
            </div>

            {/* scope Card */}
            <div className="w-64 p-4 rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] text-center space-y-2.5 shadow-xl">
              <Avatar
                src="https://nztcdn.com/avatar/l/1791023433/9336841.webp"
                fallback="SC"
                size="xl"
                className="mx-auto"
              />
              <div>
                <UniqText
                  preset="scope"
                  href="https://lolz.team/scope/"
                  className="text-base font-bold"
                >
                  {customName || "scope"}
                </UniqText>
                <div className="text-[11px] text-[rgb(140,162,154)] mt-0.5">репутация дороже денег</div>
              </div>
              <Badge variant="banner" group="uniq">Уник</Badge>
              <div className="text-xs text-[rgb(140,162,154)] pt-2 border-t border-[rgb(30,39,37)] flex justify-between">
                <span>Симпатии:</span>
                <span className="font-mono text-[#00ba78] font-bold">1 443</span>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </div>

      {/* Interactive Sandbox */}
      <div className="p-5 rounded-[12px] border border-[rgb(30,39,37)] bg-[rgb(17,22,21)] space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-[rgb(245,245,245)]">
              Песочница
            </h3>
          </div>
          <div className="w-full sm:w-48">
            <Input
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Введите ник..."
              className="bg-[rgb(24,30,28)] border-0 h-[34px]"
              maxLength={20}
            />
          </div>
        </div>

        <div className="pt-3 border-t border-[rgb(30,39,37)] grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <div className="p-3.5 rounded-[10px] bg-[rgb(24,30,28)] border border-[rgb(36,47,43)] text-center">
            <div className="text-[10px] text-[rgb(140,162,154)] mb-1">RaysMorgan (.style3)</div>
            <UniqText preset="raysmorgan">{customName || "RaysMorgan"}</UniqText>
          </div>

          <div className="p-3.5 rounded-[10px] bg-[rgb(24,30,28)] border border-[rgb(36,47,43)] text-center">
            <div className="text-[10px] text-[rgb(140,162,154)] mb-1">extasy (.style350)</div>
            <UniqText preset="extasy">{customName || "extasy"}</UniqText>
          </div>

          <div className="p-3.5 rounded-[10px] bg-[rgb(24,30,28)] border border-[rgb(36,47,43)] text-center">
            <div className="text-[10px] text-[rgb(140,162,154)] mb-1">Scope (Неон)</div>
            <UniqText preset="scope">{customName || "scope"}</UniqText>
          </div>

          <div className="p-3.5 rounded-[10px] bg-[rgb(24,30,28)] border border-[rgb(36,47,43)] text-center">
            <div className="text-[10px] text-[rgb(140,162,154)] mb-1">Дефолтный Уник</div>
            <UniqText preset="uniq">{customName || "пользователь"}</UniqText>
          </div>

          <div className="p-3.5 rounded-[10px] bg-[rgb(24,30,28)] border border-[rgb(36,47,43)] text-center">
            <div className="text-[10px] text-[rgb(140,162,154)] mb-1">Zelenka</div>
            <UniqText preset="zelenka">{customName || "zelenka"}</UniqText>
          </div>

          <div className="p-3.5 rounded-[10px] bg-[rgb(24,30,28)] border border-[rgb(36,47,43)] text-center">
            <div className="text-[10px] text-[rgb(140,162,154)] mb-1">Величайший</div>
            <UniqText preset="greatest">{customName || "greatest"}</UniqText>
          </div>

          <div className="p-3.5 rounded-[10px] bg-[rgb(24,30,28)] border border-[rgb(36,47,43)] text-center">
            <div className="text-[10px] text-[rgb(140,162,154)] mb-1">Золотой (Gold)</div>
            <UniqText preset="gold">{customName || "gold"}</UniqText>
          </div>

          <div className="p-3.5 rounded-[10px] bg-[rgb(24,30,28)] border border-[rgb(36,47,43)] text-center">
            <div className="text-[10px] text-[rgb(140,162,154)] mb-1">Огонь (Flame)</div>
            <UniqText preset="flame">{customName || "flame"}</UniqText>
          </div>
        </div>
      </div>

      {/* Props Reference */}
      <div className="pt-6 border-t border-[rgb(30,39,37)] space-y-6">
        <h2 className="text-lg font-semibold text-[rgb(245,245,245)]">Свойства</h2>
        <PropsTable
          title="UniqText"
          props={uniqProps}
        />
      </div>

      {/* Installation */}
      <div className="space-y-3 pt-4 border-t border-[rgb(30,39,37)]">
        <h2 className="text-lg font-semibold text-[rgb(245,245,245)]">Установка</h2>
        <div className="relative rounded-[10px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] p-3 font-mono text-xs text-[rgb(214,214,214)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#00ba78]" />
            <span>npx @scopelzt/lzt-ui add uniq</span>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText("npx @scopelzt/lzt-ui add uniq");
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
