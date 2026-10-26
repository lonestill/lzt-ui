"use client";

import * as React from "react";
import { Avatar } from "@/components/ui/avatar";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable, type PropDefinition } from "@/components/docs/props-table";
import { ChevronRight, Terminal, Copy, Check } from "lucide-react";

const avatarProps: PropDefinition[] = [
  {
    prop: "src",
    type: "string",
    description: "URL изображения аватарки.",
  },
  {
    prop: "fallback",
    type: "string",
    default: '"U"',
    description: "Инициалы при отсутствии изображения.",
  },
  {
    prop: "size",
    type: '"mention" | "s" | "m" | "l" | "sm" | "default" | "lg" | "xl"',
    default: '"s"',
    description: "Размер: mention (16px), s (32px), m (66px), l (96px).",
  },
  {
    prop: "isOnline",
    type: "boolean",
    default: "false",
    description: "Зелёная точка статуса 'В сети'.",
  },
  {
    prop: "status",
    type: '"online" | "offline"',
    description: "Альтернативный проп статуса сети.",
  },
  {
    prop: "userBadge",
    type: "React.ReactNode",
    description: "Бейдж в нижнем правом углу (.avatarUserBadge).",
  },
  {
    prop: "className",
    type: "string",
    description: "Дополнительные CSS-классы.",
  },
];

export default function AvatarDocPage() {
  const [copiedCli, setCopiedCli] = React.useState(false);

  const previewCode = `<div className="flex items-center gap-8">
  <div className="text-center space-y-1.5">
    <Avatar
      src="https://nztcdn.com/avatar/l/1790278461/1.webp"
      fallback="RM"
      size="l"
      isOnline
    />
    <div className="text-xs text-[rgb(140,162,154)]">RaysMorgan</div>
  </div>

  <div className="text-center space-y-1.5">
    <Avatar
      src="https://nztcdn.com/avatar/l/1791023433/9336841.webp"
      fallback="SC"
      size="l"
      isOnline
    />
    <div className="text-xs text-[rgb(140,162,154)]">scope</div>
  </div>

  <div className="text-center space-y-1.5">
    <Avatar
      src="https://nztcdn.com/avatar/l/1780024212/6772870.webp"
      fallback="CL"
      size="l"
      isOnline
    />
    <div className="text-xs text-[rgb(140,162,154)]">Claude</div>
  </div>
</div>`;

  const sizesCode = `<div className="flex items-end gap-6">
  <div className="text-center space-y-1.5">
    <Avatar
      src="https://nztcdn.com/avatar/l/1791023433/9336841.webp"
      fallback="SC"
      size="mention"
    />
    <div className="text-[10px] text-[rgb(140,162,154)] font-medium tabular-nums">16px</div>
  </div>

  <div className="text-center space-y-1.5">
    <Avatar
      src="https://nztcdn.com/avatar/l/1791023433/9336841.webp"
      fallback="SC"
      size="s"
      isOnline
    />
    <div className="text-[10px] text-[rgb(140,162,154)] font-medium tabular-nums">32px (s)</div>
  </div>

  <div className="text-center space-y-1.5">
    <Avatar
      src="https://nztcdn.com/avatar/l/1791023433/9336841.webp"
      fallback="SC"
      size="m"
      isOnline
    />
    <div className="text-[10px] text-[rgb(140,162,154)] font-medium tabular-nums">66px (m)</div>
  </div>

  <div className="text-center space-y-1.5">
    <Avatar
      src="https://nztcdn.com/avatar/l/1791023433/9336841.webp"
      fallback="SC"
      size="l"
      isOnline
    />
    <div className="text-[10px] text-[rgb(140,162,154)] font-medium tabular-nums">96px (l)</div>
  </div>
</div>`;

  return (
    <div className="space-y-10 max-w-4xl pb-20">
      {/* Title */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-[rgb(140,162,154)] mb-2">
          <span>Компоненты</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[rgb(245,245,245)]">Avatar</span>
        </div>
        <h1 className="text-3xl font-bold text-[rgb(245,245,245)] tracking-tight">
          Avatar
        </h1>
        <p className="text-sm text-[rgb(140,162,154)] mt-2">
          Аватары пользователей с индикатором онлайна и бейджами.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Примеры
        </h2>
        <ComponentPreview code={previewCode}>
          <div className="flex items-center gap-8 p-4 rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] shadow-xl">
            <div className="text-center space-y-1.5">
              <Avatar
                src="https://nztcdn.com/avatar/l/1790278461/1.webp"
                fallback="RM"
                size="l"
                isOnline
              />
              <div className="text-xs text-[rgb(140,162,154)]">RaysMorgan</div>
            </div>

            <div className="text-center space-y-1.5">
              <Avatar
                src="https://nztcdn.com/avatar/l/1791023433/9336841.webp"
                fallback="SC"
                size="l"
                isOnline
              />
              <div className="text-xs text-[rgb(140,162,154)]">scope</div>
            </div>

            <div className="text-center space-y-1.5">
              <Avatar
                src="https://nztcdn.com/avatar/l/1780024212/6772870.webp"
                fallback="CL"
                size="l"
                isOnline
              />
              <div className="text-xs text-[rgb(140,162,154)]">Claude</div>
            </div>
          </div>
        </ComponentPreview>
      </div>

      {/* Sizes */}
      <div className="space-y-3 pt-6 border-t border-[rgb(30,39,37)]">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Размеры
        </h2>
        <ComponentPreview code={sizesCode}>
          <div className="flex items-end gap-6 p-4 rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] shadow-xl">
            <div className="text-center space-y-1.5">
              <Avatar
                src="https://nztcdn.com/avatar/l/1791023433/9336841.webp"
                fallback="SC"
                size="mention"
              />
              <div className="text-[10px] text-[rgb(140,162,154)] font-medium tabular-nums">16px</div>
            </div>

            <div className="text-center space-y-1.5">
              <Avatar
                src="https://nztcdn.com/avatar/l/1791023433/9336841.webp"
                fallback="SC"
                size="s"
                isOnline
              />
              <div className="text-[10px] text-[rgb(140,162,154)] font-medium tabular-nums">32px (s)</div>
            </div>

            <div className="text-center space-y-1.5">
              <Avatar
                src="https://nztcdn.com/avatar/l/1791023433/9336841.webp"
                fallback="SC"
                size="m"
                isOnline
              />
              <div className="text-[10px] text-[rgb(140,162,154)] font-medium tabular-nums">66px (m)</div>
            </div>

            <div className="text-center space-y-1.5">
              <Avatar
                src="https://nztcdn.com/avatar/l/1791023433/9336841.webp"
                fallback="SC"
                size="l"
                isOnline
              />
              <div className="text-[10px] text-[rgb(140,162,154)] font-medium tabular-nums">96px (l)</div>
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
          title="Avatar"
          props={avatarProps}
        />
      </div>

      {/* Installation */}
      <div className="space-y-3 pt-4 border-t border-[rgb(30,39,37)]">
        <h2 className="text-lg font-semibold text-[rgb(245,245,245)]">Установка</h2>
        <div className="relative rounded-[10px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] p-3 font-mono text-xs text-[rgb(214,214,214)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#00ba78]" />
            <span>npx @scopelzt/lzt-ui add avatar</span>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText("npx @scopelzt/lzt-ui add avatar");
              setCopiedCli(true);
              setTimeout(() => setCopiedCli(false), 2000);
            }}
            className="p-1 rounded text-[rgb(140,162,154)] hover:text-white transition cursor-pointer"
          >
            {copiedCli ? (
              <Check className="w-4 h-4 text-[#00ba78]" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
