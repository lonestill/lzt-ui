"use client";

import * as React from "react";
import { Check, Copy, ExternalLink, Download } from "lucide-react";

interface BrandColor {
  name: string;
  hex: string;
  bg: string;
  headerColor?: string;
  hexColor?: string;
  border?: string;
}

const BRAND_COLORS: BrandColor[] = [
  {
    name: "Зелёный",
    hex: "#2BAD72",
    bg: "#2BAD72",
    headerColor: "#FFFFFF",
    hexColor: "rgb(170, 222, 199)",
  },
  {
    name: "Красный",
    hex: "#884444",
    bg: "#884444",
    headerColor: "#FFFFFF",
    hexColor: "rgb(249, 175, 175)",
  },
  {
    name: "Белый",
    hex: "#FFFFFF",
    bg: "#FFFFFF",
    headerColor: "#000000",
    hexColor: "rgb(107, 107, 107)",
  },
  {
    name: "Черный",
    hex: "#080808",
    bg: "#080808",
    headerColor: "#FFFFFF",
    hexColor: "rgb(156, 156, 156)",
  },
  {
    name: "Сигнальный",
    hex: "#181e1c",
    bg: "#181e1c",
    headerColor: "#FFFFFF",
    hexColor: "rgb(172, 172, 172)",
  },
  {
    name: "Серо-коричн.",
    hex: "#1e2725",
    bg: "#1e2725",
    headerColor: "#FFFFFF",
    hexColor: "rgb(172, 172, 172)",
  },
  {
    name: "Асфальт",
    hex: "#4a5450",
    bg: "#4a5450",
    headerColor: "#FFFFFF",
    hexColor: "rgb(172, 172, 172)",
  },
  {
    name: "Серый",
    hex: "#111615",
    bg: "#111615",
    border: "1px solid rgb(66, 66, 66)",
    headerColor: "#FFFFFF",
    hexColor: "rgb(169, 169, 169)",
  },
  {
    name: "Светло-серый",
    hex: "#0c0f0e",
    bg: "#0c0f0e",
    headerColor: "#FFFFFF",
    hexColor: "rgb(172, 172, 172)",
  },
];

interface AvatarItem {
  previewSrc: string;
  downloads: { label: string; href: string }[];
}

const AVATAR_ITEMS: AvatarItem[] = [
  {
    previewSrc: "/brand/avatars/3d.webp",
    downloads: [
      { label: ".gif", href: "https://lolz.team/styles/brand/download/avatars/3d.gif" },
      { label: ".mp4", href: "https://lolz.team/styles/brand/download/avatars/3d.mp4" },
      { label: ".webp", href: "https://lolz.team/styles/brand/download/avatars/3d.webp" },
    ],
  },
  {
    previewSrc: "/brand/avatars/two_avatar.webp",
    downloads: [
      { label: ".gif", href: "https://lolz.team/styles/brand/download/avatars/two_avatar.gif" },
      { label: ".mp4", href: "https://lolz.team/styles/brand/download/avatars/two_avatar.mp4" },
      { label: ".webp", href: "https://lolz.team/styles/brand/download/avatars/two_avatar.webp" },
    ],
  },
  {
    previewSrc: "/brand/avatars/three_avatar.webp",
    downloads: [
      { label: ".svg", href: "https://lolz.team/styles/brand/download/avatars/three_avatar.svg" },
      { label: ".webp", href: "https://lolz.team/styles/brand/download/avatars/three_avatar.webp" },
    ],
  },
];

interface LogoItem {
  previewSrc: string;
  downloads: { label: string; href: string }[];
}

const WORDMARK_LOGOS: LogoItem[] = [
  {
    previewSrc: "/brand/logos/1.svg",
    downloads: [
      { label: ".svg", href: "https://lolz.team/styles/brand/download/logos/LolzTeam-Wordmark-White.svg" },
      { label: ".png", href: "https://lolz.team/styles/brand/download/logos/LolzTeam-Wordmark-White.png" },
    ],
  },
  {
    previewSrc: "/brand/logos/2.svg",
    downloads: [
      { label: ".svg", href: "https://lolz.team/styles/brand/download/logos/LolzTeam-Wordmark-Black.svg" },
      { label: ".png", href: "https://lolz.team/styles/brand/download/logos/LolzTeam-Wordmark-Black.png" },
    ],
  },
  {
    previewSrc: "/brand/logos/3.svg",
    downloads: [
      { label: ".svg", href: "https://lolz.team/styles/brand/download/logos/LolzTeam-Wordmark-Green.svg" },
      { label: ".png", href: "https://lolz.team/styles/brand/download/logos/LolzTeam-Wordmark-Green.png" },
    ],
  },
  {
    previewSrc: "/brand/logos/4.svg",
    downloads: [
      { label: ".svg", href: "https://lolz.team/styles/brand/logos/Logo-market-white.svg" },
      { label: ".webp", href: "https://lolz.team/styles/brand/logos/Logo-market-white.webp" },
    ],
  },
  {
    previewSrc: "/brand/logos/5.svg",
    downloads: [
      { label: ".svg", href: "https://lolz.team/styles/brand/logos/Logo-market-black.svg" },
      { label: ".webp", href: "https://lolz.team/styles/brand/logos/Logo-market-black.webp" },
    ],
  },
  {
    previewSrc: "/brand/logos/6.svg",
    downloads: [
      { label: ".svg", href: "https://lolz.team/styles/brand/logos/Logo-market-green.svg" },
      { label: ".webp", href: "https://lolz.team/styles/brand/logos/Logo-market-green.webp" },
    ],
  },
];

const ALTERNATE_LOGOS: LogoItem[] = [
  {
    previewSrc: "/brand/alternate-logos/1.svg",
    downloads: [
      { label: ".svg", href: "https://lolz.team/styles/brand/download/logos/LolzTeam-Logo-White.svg" },
      { label: ".png", href: "https://lolz.team/styles/brand/download/logos/LolzTeam-Logo-White.png" },
    ],
  },
  {
    previewSrc: "/brand/alternate-logos/2.svg",
    downloads: [
      { label: ".svg", href: "https://lolz.team/styles/brand/download/logos/LolzTeam-Logo-Black.svg" },
      { label: ".png", href: "https://lolz.team/styles/brand/download/logos/LolzTeam-Logo-Black.png" },
    ],
  },
  {
    previewSrc: "/brand/alternate-logos/3.svg",
    downloads: [
      { label: ".svg", href: "https://lolz.team/styles/brand/download/logos/LolzTeam-Logo-Green.svg" },
      { label: ".png", href: "https://lolz.team/styles/brand/download/logos/LolzTeam-Logo-Green.png" },
    ],
  },
  {
    previewSrc: "/brand/alternate-logos/4.svg",
    downloads: [
      { label: ".svg", href: "https://lolz.team/styles/brand/logos/Logo-market-white-2.svg" },
      { label: ".webp", href: "https://lolz.team/styles/brand/logos/Logo-market-white-2.webp" },
    ],
  },
  {
    previewSrc: "/brand/alternate-logos/5.svg",
    downloads: [
      { label: ".svg", href: "https://lolz.team/styles/brand/logos/Logo-market-black-2.svg" },
      { label: ".webp", href: "https://lolz.team/styles/brand/logos/Logo-market-black-2.webp" },
    ],
  },
  {
    previewSrc: "/brand/alternate-logos/6.svg",
    downloads: [
      { label: ".svg", href: "https://lolz.team/styles/brand/logos/Logo-market-green-2.svg" },
      { label: ".webp", href: "https://lolz.team/styles/brand/logos/Logo-market-green-2.webp" },
    ],
  },
];

const ANIMATED_BANNERS = [
  { size: "540 × 95", width: 540, height: 95, url: "https://nztcdn.com/files/70eca606-12e8-4ea8-b6a9-a1b6d147145f.webp" },
  { size: "540 × 95", width: 540, height: 95, url: "https://nztcdn.com/files/ae8db3bd-d705-4a27-81bf-813e7cc066cd.webp" },
  { size: "468 × 60", width: 468, height: 60, url: "https://nztcdn.com/files/e6e78e54-8689-444e-a046-29f5d643e2cf.webp" },
  { size: "468 × 60", width: 468, height: 60, url: "https://nztcdn.com/files/f02fa9cd-7069-456e-a2e3-a52ac133d0e3.webp" },
  { size: "468 × 60", width: 468, height: 60, url: "https://nztcdn.com/files/1db0e9d7-5851-417b-9cd4-3636534476d9.webp" },
  { size: "300 × 60", width: 300, height: 60, url: "https://nztcdn.com/files/25c80b32-ae42-4ea1-889f-2a766db9b498.webp" },
  { size: "300 × 60", width: 300, height: 60, url: "https://nztcdn.com/files/17f0425e-7d2c-4074-8714-61c6c4b45f51.webp" },
  { size: "315 × 90", width: 315, height: 90, url: "https://nztcdn.com/files/537aa892-1365-4a4d-a4bb-f42fd0a6dcaa.webp" },
  { size: "88 × 31", width: 88, height: 31, url: "https://nztcdn.com/files/3cc759f8-07d1-434e-9df1-0e48855fbb7d.webp" },
  { size: "88 × 31", width: 88, height: 31, url: "https://nztcdn.com/files/47643cb5-aae1-4116-98ff-77f6a0e7e4fb.webp" },
  { size: "88 × 31", width: 88, height: 31, url: "https://nztcdn.com/files/41ba9b29-7702-428d-98f5-a90609f9975b.webp" },
];

export default function BrandPage() {
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const [copiedHex, setCopiedHex] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, msg: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const cssVariablesCode = `:root {
  /* Дизайн-токены живого интерфейса Lolzteam & XenForo */
  --lzt-bg-page: rgb(12, 15, 14);          /* #0c0f0e - Флагманский фон страницы */
  --lzt-bg-section: rgb(17, 22, 21);       /* #111615 - .sectionMain, карточки, оверлеи */
  --lzt-bg-sub: rgb(24, 30, 28);           /* #181e1c - Заголовки, инпуты, цитаты */
  --lzt-bg-component: rgb(30, 39, 37);     /* #1e2725 - .button, активные элементы */
  --lzt-bg-hover: rgb(36, 47, 43);         /* #242f2b - .button.secondary, ховеры */

  /* Границы и разделители */
  --lzt-border: rgb(36, 47, 43);           /* #242f2b - Основная граница блоков */
  --lzt-border-subtle: rgb(30, 39, 37);    /* #1e2725 */
  --lzt-border-green: rgb(34, 142, 93);    /* #228e5d - Зеленый бордер хайда/цитаты */

  /* Типографика */
  --lzt-text-primary: rgb(245, 245, 245);  /* #f5f5f5 - Заголовки и активный текст */
  --lzt-text-body: rgb(214, 214, 214);     /* #d6d6d6 - Основной текст сообщений */
  --lzt-text-muted: rgb(140, 162, 154);    /* #8ca29a - Подписи и мета-информация */

  /* Градиент основной кнопки .button.primary */
  --lzt-btn-gradient: linear-gradient(88deg, rgb(32, 118, 78) 0%, rgb(42, 143, 92) 50%, rgb(32, 118, 78) 100%);
  --lzt-btn-gradient-hover: linear-gradient(88deg, rgb(38, 136, 90) 0%, rgb(48, 162, 105) 50%, rgb(38, 136, 90) 100%);

  /* Акцентный зеленый цвет маркета и реакций */
  --lzt-green-accent: #00ba78;
  --lzt-green-quote: rgb(34, 142, 93);
}`;

  return (
    <div className="space-y-10 max-w-4xl pb-24">
      {/* Toast notification matching XenForo #StackAlerts .stackAlert */}
      {toastMessage && (
        <div id="StackAlerts" className="fixed bottom-[35px] left-[65px] z-[9999] pointer-events-none select-none">
          <div className="stackAlert relative pointer-events-auto w-[250px] bg-[rgb(39,39,39)] p-[15px_20px] rounded-[8px] text-[14px] leading-[1.3] text-[rgb(214,214,214)] shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-150">
            <div className="stackAlertContent">{toastMessage}</div>
          </div>
        </div>
      )}

      {/* 1. Header: Бренд */}
      <section className="p-4 sm:p-7 rounded-[14px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-sm font-medium text-[rgb(15,186,109)] uppercase tracking-wider">
            Бренд
          </div>
          <a
            href="https://lolz.team/pages/brand"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-[rgb(140,162,154)] hover:text-[#00ba78] transition-colors"
          >
            <span>Оригинал: lolz.team/pages/brand</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
        <p className="text-sm sm:text-base text-[rgb(214,214,214)] leading-relaxed pt-1">
          Lolzteam — Форум социальной инженерии. Бренд нашего форума довольно простой
          и доступен для каждого желающего. Если вы собираетесь использовать что-либо из нашего
          брендинга, пожалуйста, делайте это со вкусом и соблюдайте правила.
        </p>
      </section>

      {/* 2. Аватарки */}
      <section className="p-4 sm:p-7 rounded-[14px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] space-y-4">
        <div>
          <div className="text-sm font-medium text-[rgb(15,186,109)]">Аватарки</div>
          <div className="text-xl sm:text-2xl font-semibold text-[rgb(214,214,214)] mt-0.5">
            Фирменные аватары.
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          {AVATAR_ITEMS.map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="w-full aspect-square rounded-[18px] overflow-hidden bg-[rgb(12,15,14)] border border-[rgb(30,39,37)] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.previewSrc}
                  alt={`Аватар ${idx + 1}`}
                  className="w-full h-full object-cover pointer-events-none select-none"
                />
              </div>

              <div className="mt-3 flex items-center gap-2">
                {item.downloads.map((dl) => (
                  <a
                    key={dl.label}
                    href={dl.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-[10px] bg-[rgb(30,39,37)] hover:bg-[rgb(36,47,43)] text-[13px] font-semibold text-[rgb(204,214,214)] transition"
                  >
                    {dl.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Логотип */}
      <section className="p-4 sm:p-7 rounded-[14px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] space-y-4">
        <div>
          <div className="text-sm font-medium text-[rgb(15,186,109)]">Логотип</div>
          <div className="text-xl sm:text-2xl font-semibold text-[rgb(214,214,214)] mt-0.5">
            Для ваших проектов.
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          {WORDMARK_LOGOS.map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="h-[120px] rounded-[10px] bg-[rgb(12,15,14)] border border-[rgb(30,39,37)] p-4 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.previewSrc}
                  alt={`Логотип ${idx + 1}`}
                  className="max-h-[52px] max-w-full object-contain select-none"
                />
              </div>

              <div className="mt-3 flex items-center gap-2">
                {item.downloads.map((dl) => (
                  <a
                    key={dl.label}
                    href={dl.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-[10px] bg-[rgb(30,39,37)] hover:bg-[rgb(36,47,43)] text-[13px] font-semibold text-[rgb(204,214,214)] transition"
                  >
                    {dl.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Альтернативный логотип */}
      <section className="p-4 sm:p-7 rounded-[14px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] space-y-4">
        <div>
          <div className="text-sm font-medium text-[rgb(15,186,109)]">Альтернативный логотип</div>
          <div className="text-xl sm:text-2xl font-semibold text-[rgb(214,214,214)] mt-0.5">
            Только метка.
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          {ALTERNATE_LOGOS.map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="h-[120px] rounded-[10px] bg-[rgb(12,15,14)] border border-[rgb(30,39,37)] p-4 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.previewSrc}
                  alt={`Метка ${idx + 1}`}
                  className="max-h-[58px] max-w-full object-contain select-none"
                />
              </div>

              <div className="mt-3 flex items-center gap-2">
                {item.downloads.map((dl) => (
                  <a
                    key={dl.label}
                    href={dl.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-[10px] bg-[rgb(30,39,37)] hover:bg-[rgb(36,47,43)] text-[13px] font-semibold text-[rgb(204,214,214)] transition"
                  >
                    {dl.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Отступы (Оригинальные векторные SVG) */}
      <section className="p-4 sm:p-7 rounded-[14px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] space-y-4">
        <div>
          <div className="text-sm font-medium text-[rgb(15,186,109)]">Отступы</div>
          <div className="text-xl sm:text-2xl font-semibold text-[rgb(214,214,214)] mt-0.5">
            Пожалуйста, используйте логотип правильно.
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-[12px] bg-[rgb(12,15,14)] border border-[rgb(30,39,37)] flex flex-col items-center justify-center min-h-[170px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/indents/1.svg"
              alt="Lolzteam Wordmark отступы"
              className="max-h-[120px] w-auto object-contain select-none"
            />
          </div>

          <div className="p-4 rounded-[12px] bg-[rgb(12,15,14)] border border-[rgb(30,39,37)] flex flex-col items-center justify-center min-h-[170px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/indents/2.svg"
              alt="Lolzteam Метка отступы"
              className="max-h-[120px] w-auto object-contain select-none"
            />
          </div>

          <div className="p-4 rounded-[12px] bg-[rgb(12,15,14)] border border-[rgb(30,39,37)] flex flex-col items-center justify-center min-h-[170px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/indents/3.svg"
              alt="Market Wordmark отступы"
              className="max-h-[120px] w-auto object-contain select-none"
            />
          </div>

          <div className="p-4 rounded-[12px] bg-[rgb(12,15,14)] border border-[rgb(30,39,37)] flex flex-col items-center justify-center min-h-[170px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/indents/4.svg"
              alt="Market Метка отступы"
              className="max-h-[120px] w-auto object-contain select-none"
            />
          </div>
        </div>
      </section>

      {/* 6. Цвета */}
      <section className="p-4 sm:p-7 rounded-[14px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] space-y-4">
        <div>
          <div className="text-sm font-medium text-[rgb(15,186,109)]">Цвета</div>
          <div className="text-xl sm:text-2xl font-semibold text-[rgb(214,214,214)] mt-0.5">
            На любой вкус.
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
          {BRAND_COLORS.map((color) => {
            const isCopied = copiedHex === color.hex;
            return (
              <div
                key={color.hex}
                onClick={() => {
                  setCopiedHex(color.hex);
                  copyToClipboard(color.hex, `Код ${color.hex} был скопирован в буфер обмена`);
                  setTimeout(() => setCopiedHex(null), 2500);
                }}
                style={{
                  backgroundColor: color.bg,
                  border: color.border || "0px none",
                }}
                className="relative h-[100px] rounded-[10px] p-[12px_16px] cursor-pointer select-none transition-transform active:scale-[0.98] hover:opacity-90 shadow-md flex flex-col justify-between"
              >
                <div
                  style={{ color: color.headerColor || "#FFFFFF" }}
                  className="text-[22px] font-semibold tracking-tight leading-none"
                >
                  {color.name}
                </div>

                <div className="flex items-center justify-between">
                  <span
                    style={{ color: color.hexColor || "rgb(172, 172, 172)" }}
                    className="font-mono text-sm font-semibold uppercase"
                  >
                    {color.hex}
                  </span>

                  <span
                    style={{ color: color.hexColor || "rgb(172, 172, 172)" }}
                    className="opacity-70 hover:opacity-100 transition"
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Анимированные баннеры */}
      <section className="p-4 sm:p-7 rounded-[14px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] space-y-4">
        <div>
          <div className="text-sm font-medium text-[rgb(15,186,109)]">Анимированные баннеры</div>
          <div className="text-xl sm:text-2xl font-semibold text-[rgb(214,214,214)] mt-0.5">
            Комфортный способ рекламы.
          </div>
        </div>

        <div className="space-y-6 pt-2">
          {ANIMATED_BANNERS.map((banner, index) => (
            <div
              key={index}
              className="space-y-2.5 pb-6 border-b border-[rgb(30,39,37)] last:border-b-0 last:pb-0"
            >
              <div className="text-[18px] text-[rgb(214,214,214)] font-semibold tabular-nums">
                {banner.size}
              </div>

              <div className="overflow-x-auto p-2 rounded-[8px] bg-[rgb(12,15,14)] border border-[rgb(30,39,37)] flex items-center justify-start">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={banner.url}
                  alt={`Баннер ${banner.size}`}
                  style={{ width: `${banner.width}px`, height: `${banner.height}px` }}
                  className="max-w-none object-contain rounded-[4px] pointer-events-none select-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={banner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-[3px] bg-[rgb(53,53,53)] hover:bg-[rgb(83,83,83)] text-[13px] font-semibold text-[rgb(204,214,214)] transition"
                >
                  Скачать
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard(banner.url, "URL баннера скопирован в буфер обмена")}
                  className="px-3 py-1.5 rounded-[3px] bg-[rgb(30,39,37)] hover:bg-[rgb(36,47,43)] text-[13px] text-[rgb(140,162,154)] hover:text-white transition cursor-pointer flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Копировать URL</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CSS Переменные темы */}
      <section className="p-4 sm:p-7 rounded-[14px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-[rgb(245,245,245)]">
            CSS Переменные темы
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(cssVariablesCode);
              setToastMessage("CSS переменные скопированы в буфер обмена");
              setTimeout(() => setToastMessage(null), 2500);
            }}
            className="flex items-center gap-1.5 text-xs text-[rgb(140,162,154)] hover:text-white transition cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Скопировать CSS</span>
          </button>
        </div>

        <pre className="rounded-[10px] bg-[rgb(12,15,14)] border border-[rgb(30,39,37)] p-4 font-mono text-xs text-[rgb(214,214,214)] overflow-x-auto leading-relaxed">
          {cssVariablesCode}
        </pre>
      </section>
    </div>
  );
}
