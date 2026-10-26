"use client";

import * as React from "react";
import Link from "next/link";
import { Copy, Check, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UniqText } from "@/components/ui/uniq-text";

export default function Home() {
  const [copiedCli, setCopiedCli] = React.useState(false);

  const copyCli = () => {
    navigator.clipboard.writeText("npx @scopelzt/lzt-ui init");
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[rgb(12,15,14)] text-[rgb(214,214,214)] selection:bg-[#00ba78]/30 selection:text-white relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[380px] bg-[#00ba78]/10 blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00ba78]/20 to-transparent" />

      {/* Navigation */}
      <header className="relative z-10 border-b border-[rgb(30,39,37)] backdrop-blur-md bg-[rgb(12,15,14)]/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-[48px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/lzt-eye.png"
              alt="LZT Logo"
              className="w-6 h-6 object-contain shrink-0"
            />
            <span className="font-semibold text-sm tracking-tight text-[rgb(245,245,245)]">
              lzt<span className="text-[#00ba78]">/ui</span>
            </span>
            <span className="text-[10px] font-medium text-[rgb(140,162,154)] px-1.5 py-0.5 rounded-[4px] bg-[rgb(24,30,28)] border border-[rgb(36,47,43)]">
              v1.1.3
            </span>
          </Link>

          <nav className="flex items-center gap-4 sm:gap-6 text-xs text-[rgb(140,162,154)]">
            <Link href="/docs" className="hover:text-white transition text-white font-medium">
              Документация
            </Link>
            <a
              href="https://lolz.team"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#00ba78] transition inline-flex items-center gap-1"
            >
              <span>lolz.team</span>
              <ExternalLink className="w-3 h-3 text-[rgb(140,162,154)]" />
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Centerpiece */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto space-y-7">
          
          {/* Eye Mark */}
          <div className="relative inline-flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/lzt-eye.png"
              alt="Lolzteam"
              className="w-16 h-16 md:w-20 md:h-20 object-contain relative"
            />
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              lzt<span className="text-[#00ba78]">/ui</span>
            </h1>
            <p className="text-base text-[rgb(150,172,164)] max-w-md mx-auto leading-relaxed">
              Оригинальный интерфейс форума для твоих проектов.
            </p>
          </div>

          {/* Minimal CLI Snippet */}
          <div className="pt-1">
            <div className="inline-flex items-center justify-between gap-3 px-3.5 py-2 rounded-[8px] bg-[rgb(17,22,21)] border border-[rgb(36,47,43)] font-mono text-xs text-[rgb(214,214,214)] shadow-lg shadow-black/50">
              <span className="text-[#00ba78] select-none font-semibold">$</span>
              <span className="select-all">npx @scopelzt/lzt-ui init</span>
              <button
                onClick={copyCli}
                aria-label="Копировать команду"
                className="p-1 rounded-[4px] hover:bg-[rgb(30,39,37)] text-[rgb(140,162,154)] hover:text-white transition cursor-pointer"
              >
                {copiedCli ? (
                  <Check className="w-3.5 h-3.5 text-[#00ba78]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Direct Action Button */}
          <div className="pt-2 flex justify-center">
            <Button
              variant="primary"
              size="lg"
              className="h-[38px] px-6 text-xs font-semibold"
              asChild
            >
              <Link href="/docs" className="inline-flex items-center gap-2">
                <span>Документация</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 border-t border-[rgb(30,39,37)] py-4 text-xs text-[rgb(140,162,154)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-1.5 font-medium">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/lzt-eye.png"
              alt="LZT"
              className="w-4 h-4 object-contain shrink-0"
            />
            <span className="text-[rgb(214,214,214)]">LZT</span>
            <span className="text-[rgb(90,105,99)] text-[11px]">×</span>
            <UniqText preset="scope" href="https://lolz.team/scope/">
              scope
            </UniqText>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/docs/about" className="hover:text-white transition">
              О проекте
            </Link>
            <a
              href="https://github.com/lonestill/lzt-ui"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
