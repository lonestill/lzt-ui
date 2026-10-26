"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { UnikText } from "@/components/ui/unik-text";
import { Avatar } from "@/components/ui/avatar";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable, type PropDefinition } from "@/components/docs/props-table";
import { ChevronRight, Terminal, Copy, Check, Filter } from "lucide-react";

const badgeProps: PropDefinition[] = [
  {
    prop: "variant",
    type: '"banner" | "tag" | "pill"',
    default: '"tag"',
    description: "Формат: banner (лычка), tag (тег группы), pill (чип фильтра маркета).",
  },
  {
    prop: "group",
    type: "UserGroupKey",
    default: '"resident"',
    description: "Группа пользователя: novoreg, local, resident, expert, guru, ai, greatest, unik, legend, supreme, sponsor, admin, developer, curator и др.",
  },
  {
    prop: "active",
    type: "boolean",
    default: "false",
    description: "Активное состояние чипа фильтра маркета.",
  },
  {
    prop: "onRemove",
    type: "() => void",
    description: "Коллбэк при нажатии на кнопку удаления чипа.",
  },
  {
    prop: "icon",
    type: "React.ReactNode",
    description: "Иконка слева от текста чипа.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    required: true,
    description: "Текст внутри бейджа.",
  },
  {
    prop: "className",
    type: "string",
    description: "Дополнительные CSS-классы.",
  },
];

export default function BadgeDocPage() {
  const [copiedCli, setCopiedCli] = React.useState(false);
  const [activePill, setActivePill] = React.useState<string | null>("dota2");

  const bannerPreviewCode = `<div className="flex flex-wrap gap-2.5">
  <Badge variant="banner" group="admin">Администратор</Badge>
  <Badge variant="banner" group="unik">Уник</Badge>
  <Badge variant="banner" group="supreme">Суприм</Badge>
  <Badge variant="banner" group="legend">Легенда</Badge>
  <Badge variant="banner" group="greatest">Величайший</Badge>
  <Badge variant="banner" group="ai">Искусственный интеллект</Badge>
  <Badge variant="banner" group="editor">Редактор</Badge>
  <Badge variant="banner" group="developer">Разработчик</Badge>
  <Badge variant="banner" group="arbitr">Арбитр</Badge>
  <Badge variant="banner" group="moder">Модератор</Badge>
  <Badge variant="banner" group="curator">Куратор</Badge>
  <Badge variant="banner" group="sponsor">Спонсор</Badge>
</div>`;

  const pillsCode = `<div className="flex flex-wrap gap-2">
  <Badge
    variant="pill"
    active={activePill === "dota2"}
    onClick={() => setActivePill("dota2")}
    icon={<Filter className="w-3.5 h-3.5" />}
    onRemove={() => setActivePill(null)}
  >
    Dota 2 • Отлежка от 30 дней
  </Badge>
  <Badge
    variant="pill"
    active={activePill === "cs2"}
    onClick={() => setActivePill("cs2")}
  >
    CS 2 Prime
  </Badge>
</div>`;

  const userCardCode = `<div className="flex flex-wrap items-center gap-4">
  {/* RaysMorgan */}
  <div className="w-64 p-4 rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] text-center space-y-2.5">
    <Avatar
      src="https://nztcdn.com/avatar/l/1790278461/1.webp"
      fallback="RM"
      size="xl"
      className="mx-auto"
    />
    <div>
      <a
        href="#"
        className="font-bold text-sm text-[rgb(241,56,56)] hover:underline inline-block"
      >
        RaysMorgan
      </a>
      <div className="text-[11px] text-[rgb(140,162,154)]">Создатель форума</div>
    </div>
    <Badge variant="banner" group="admin">Администратор</Badge>
    <div className="text-xs text-[rgb(140,162,154)] pt-2 border-t border-[rgb(30,39,37)] flex justify-between">
      <span>Симпатии:</span>
      <span className="font-bold text-[#00ba78] tabular-nums">58 864</span>
    </div>
  </div>

  {/* scope */}
  <div className="w-64 p-4 rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] text-center space-y-2.5">
    <Avatar
      src="https://nztcdn.com/avatar/l/1791023433/9336841.webp"
      fallback="SC"
      size="xl"
      className="mx-auto"
    />
    <div>
      <UnikText
        preset="unik"
        href="#"
        className="text-sm font-bold"
      >
        scope
      </UnikText>
      <div className="text-[11px] text-[rgb(140,162,154)]">репутация дороже денег</div>
    </div>
    <Badge variant="banner" group="unik">Уник</Badge>
    <div className="text-xs text-[rgb(140,162,154)] pt-2 border-t border-[rgb(30,39,37)] flex justify-between">
      <span>Симпатии:</span>
      <span className="font-bold text-[#00ba78] tabular-nums">1 443</span>
    </div>
  </div>

  {/* Claude */}
  <div className="w-64 p-4 rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] text-center space-y-2.5">
    <Avatar
      src="https://nztcdn.com/avatar/l/1780024212/6772870.webp"
      fallback="CL"
      size="xl"
      className="mx-auto"
    />
    <div>
      <a
        href="#"
        className="font-bold text-sm text-[rgb(255,147,4)] hover:underline inline-block"
      >
        Claude
      </a>
      <div className="text-[11px] text-[rgb(140,162,154)]">Разработчик • Куратор</div>
    </div>
    <Badge variant="banner" group="developer">Разработчик</Badge>
    <div className="text-xs text-[rgb(140,162,154)] pt-2 border-t border-[rgb(30,39,37)] flex justify-between">
      <span>Симпатии:</span>
      <span className="font-bold text-[#00ba78] tabular-nums">2 269</span>
    </div>
  </div>
</div>`;

  return (
    <div className="space-y-10 max-w-4xl pb-20">
      {/* Title */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-[rgb(140,162,154)] mb-2">
          <span>Компоненты</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[rgb(245,245,245)]">Badge</span>
        </div>
        <h1 className="text-3xl font-bold text-[rgb(245,245,245)] tracking-tight">
          Badge
        </h1>
        <p className="text-sm text-[rgb(140,162,154)] mt-2">
          Баннеры групп пользователей, теги и фильтры маркета.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Карточки пользователей
        </h2>

        <ComponentPreview code={userCardCode}>
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
                <a
                  href="#"
                  className="font-bold text-sm text-[rgb(241,56,56)] hover:underline inline-block"
                >
                  RaysMorgan
                </a>
                <div className="text-[11px] text-[rgb(140,162,154)]">Создатель форума</div>
              </div>
              <Badge variant="banner" group="admin">Администратор</Badge>
              <div className="text-xs text-[rgb(140,162,154)] pt-2 border-t border-[rgb(30,39,37)] flex justify-between">
                <span>Симпатии:</span>
                <span className="font-bold text-[#00ba78] tabular-nums">58 864</span>
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
                <UnikText
                  preset="unik"
                  href="#"
                  className="text-sm font-bold"
                >
                  scope
                </UnikText>
                <div className="text-[11px] text-[rgb(140,162,154)]">репутация дороже денег</div>
              </div>
              <Badge variant="banner" group="unik">Уник</Badge>
              <div className="text-xs text-[rgb(140,162,154)] pt-2 border-t border-[rgb(30,39,37)] flex justify-between">
                <span>Симпатии:</span>
                <span className="font-bold text-[#00ba78] tabular-nums">1 443</span>
              </div>
            </div>

            {/* Claude Card */}
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
                  className="font-bold text-sm text-[rgb(255,147,4)] hover:underline inline-block"
                >
                  Claude
                </a>
                <div className="text-[11px] text-[rgb(140,162,154)]">Разработчик • Куратор</div>
              </div>
              <Badge variant="banner" group="developer">Разработчик</Badge>
              <div className="text-xs text-[rgb(140,162,154)] pt-2 border-t border-[rgb(30,39,37)] flex justify-between">
                <span>Симпатии:</span>
                <span className="font-bold text-[#00ba78] tabular-nums">2 269</span>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-3 pt-6 border-t border-[rgb(30,39,37)]">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Баннеры групп
        </h2>
        <ComponentPreview code={bannerPreviewCode}>
          <div className="p-4 rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] flex flex-wrap gap-2.5 shadow-xl">
            <Badge variant="banner" group="admin">Администратор</Badge>
            <Badge variant="banner" group="unik">Уник</Badge>
            <Badge variant="banner" group="supreme">Суприм</Badge>
            <Badge variant="banner" group="legend">Легенда</Badge>
            <Badge variant="banner" group="greatest">Величайший</Badge>
            <Badge variant="banner" group="ai">Искусственный интеллект</Badge>
            <Badge variant="banner" group="editor">Редактор</Badge>
            <Badge variant="banner" group="chief_designer">Главный Дизайнер</Badge>
            <Badge variant="banner" group="designer">Дизайнер</Badge>
            <Badge variant="banner" group="chief_arbitr">Главный Арбитр</Badge>
            <Badge variant="banner" group="arbitr">Арбитр</Badge>
            <Badge variant="banner" group="chief_moder">Главный Модератор</Badge>
            <Badge variant="banner" group="moder">Модератор</Badge>
            <Badge variant="banner" group="developer">Разработчик</Badge>
            <Badge variant="banner" group="curator">Куратор</Badge>
            <Badge variant="banner" group="sponsor">Спонсор</Badge>
          </div>
        </ComponentPreview>
      </div>

      {/* Market Pills */}
      <div className="space-y-3 pt-6 border-t border-[rgb(30,39,37)]">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Фильтры маркета
        </h2>
        <ComponentPreview code={pillsCode}>
          <div className="p-4 rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] flex flex-wrap gap-2 shadow-xl">
            <Badge
              variant="pill"
              active={activePill === "dota2"}
              onClick={() => setActivePill("dota2")}
              icon={<Filter className="w-3.5 h-3.5" />}
              onRemove={() => setActivePill(null)}
            >
              Dota 2 • Отлежка от 30 дней
            </Badge>
            <Badge
              variant="pill"
              active={activePill === "cs2"}
              onClick={() => setActivePill(activePill === "cs2" ? null : "cs2")}
            >
              CS 2 Prime
            </Badge>
          </div>
        </ComponentPreview>
      </div>

      {/* Text Tags Collection */}
      <div className="space-y-3 pt-6 border-t border-[rgb(30,39,37)]">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Теги по симпатиям
        </h2>
        <ComponentPreview
          code={`<Badge variant="tag" group="novoreg">Новорег (0)</Badge>
<Badge variant="tag" group="local">Местный (20)</Badge>
<Badge variant="tag" group="resident">Постоялец (200)</Badge>
<Badge variant="tag" group="expert">Эксперт (1 000)</Badge>
<Badge variant="tag" group="guru">Гуру (4 000)</Badge>
<Badge variant="tag" group="ai">Искусственный интеллект (10 000)</Badge>
<Badge variant="tag" group="greatest">Величайший (111 111)</Badge>`}
        >
          <div className="p-4 rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] flex flex-wrap gap-2 shadow-xl">
            <Badge variant="tag" group="novoreg">Новорег (0)</Badge>
            <Badge variant="tag" group="local">Местный (20)</Badge>
            <Badge variant="tag" group="resident">Постоялец (200)</Badge>
            <Badge variant="tag" group="expert">Эксперт (1 000)</Badge>
            <Badge variant="tag" group="guru">Гуру (4 000)</Badge>
            <Badge variant="tag" group="ai">Искусственный интеллект (10 000)</Badge>
            <Badge variant="tag" group="greatest">Величайший (111 111)</Badge>
          </div>
        </ComponentPreview>
      </div>

      {/* Props Reference */}
      <div className="pt-6 border-t border-[rgb(30,39,37)] space-y-6">
        <h2 className="text-lg font-semibold text-[rgb(245,245,245)]">
          Свойства
        </h2>
        <PropsTable
          title="Badge"
          props={badgeProps}
        />
      </div>

      {/* Installation */}
      <div className="space-y-3 pt-4 border-t border-[rgb(30,39,37)]">
        <h2 className="text-lg font-semibold text-[rgb(245,245,245)]">Установка</h2>
        <div className="relative rounded-[10px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] p-3 font-mono text-xs text-[rgb(214,214,214)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#00ba78]" />
            <span>npx @scopelzt/lzt-ui add badge</span>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText("npx @scopelzt/lzt-ui add badge");
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
