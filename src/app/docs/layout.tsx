"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ExternalLink, Menu, X } from "lucide-react";
import { UniqText } from "@/components/ui/uniq-text";
import { ToastProvider } from "@/components/ui/toast";
import { sidebarNav, flattenedDocsNav } from "@/lib/docs-nav";
import { DocsPager } from "@/components/docs/docs-pager";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Close mobile drawer on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const currentPage = flattenedDocsNav.find(
    (i) => i.href === pathname || (pathname === "/docs/tokens" && i.href === "/docs/brand")
  );

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[rgb(12,15,14)] text-[rgb(214,214,214)] w-full overflow-x-hidden">
        {/* Top Header */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-[rgb(12,15,14)]/80 border-b border-[rgb(30,39,37)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[44px] flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-6">
              {/* Mobile hamburger button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1.5 -ml-1 rounded-[6px] hover:bg-[rgb(30,39,37)] text-[rgb(140,162,154)] hover:text-white transition"
                aria-label="Меню документации"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>

              <Link href="/" className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/lzt-eye.png"
                  alt="LZT Logo"
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain shrink-0"
                />
                <span className="font-semibold text-sm tracking-tight text-[rgb(245,245,245)]">
                  lzt<span className="text-[#00ba78]">/ui</span>
                </span>
              </Link>

              <nav className="hidden md:flex items-center gap-5 text-xs text-[rgb(140,162,154)]">
                <Link
                  href="/docs"
                  className={cn(
                    "hover:text-white transition",
                    pathname.startsWith("/docs") && "text-white font-medium"
                  )}
                >
                  Документация
                </Link>
                <a
                  href="https://lolz.team"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition inline-flex items-center gap-1"
                >
                  Lolzteam <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </nav>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="https://github.com/lonestill/lzt-ui"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[rgb(140,162,154)] hover:text-white transition"
              >
                GitHub
              </a>
              <div className="h-4 w-px bg-[rgb(30,39,37)] hidden sm:block" />
              <span className="text-[11px] font-mono text-[#00ba78] bg-[#00ba78]/10 px-2 py-0.5 rounded-[6px]">
                v1.1.0
              </span>
            </div>
          </div>
        </header>

        {/* Mobile Sticky Subheader Bar with Quick Page Title & Menu trigger */}
        <div className="md:hidden sticky top-[44px] z-40 bg-[rgb(17,22,21)] border-b border-[rgb(30,39,37)] px-4 py-2 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center gap-2 text-[rgb(214,214,214)] hover:text-white"
          >
            <Menu className="w-3.5 h-3.5 text-[#00ba78]" />
            <span className="font-medium">Меню навигации</span>
          </button>
          <span className="text-[11px] text-[rgb(140,162,154)] truncate max-w-[160px]">
            {currentPage?.title || "Разделы"}
          </span>
        </div>

        {/* Mobile Slide-out Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer panel */}
            <aside className="fixed inset-y-0 left-0 w-[290px] sm:w-[320px] bg-[rgb(17,22,21)] border-r border-[rgb(30,39,37)] p-5 overflow-y-auto flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-left duration-200">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[rgb(30,39,37)]">
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/lzt-eye.png" alt="LZT" className="w-5 h-5 object-contain" />
                    <span className="font-semibold text-sm text-[rgb(245,245,245)]">
                      lzt<span className="text-[#00ba78]">/ui</span>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-[6px] hover:bg-[rgb(30,39,37)] text-[rgb(140,162,154)] hover:text-white transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick link in mobile drawer */}
                <div className="pb-3 border-b border-[rgb(30,39,37)] text-xs">
                  <a
                    href="https://lolz.team"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between px-2.5 py-1.5 rounded-[8px] text-[rgb(140,162,154)] hover:text-white hover:bg-[rgb(24,30,28)] transition"
                  >
                    <span>Lolzteam</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </div>

                {/* Nav Groups in mobile drawer */}
                <div className="space-y-5">
                  {sidebarNav.map((group) => (
                    <div key={group.title}>
                      <h4 className="text-[11px] font-semibold text-[rgb(140,162,154)] uppercase tracking-wider mb-2">
                        {group.title}
                      </h4>
                      <ul className="space-y-0.5">
                        {group.items.map((item) => {
                          const isActive =
                            pathname === item.href ||
                            (pathname === "/docs/tokens" && item.href === "/docs/brand");
                          return (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                  "flex items-center justify-between text-xs px-2.5 py-2 rounded-[8px] transition-colors",
                                  isActive
                                    ? "bg-[rgb(30,39,37)] text-white font-medium"
                                    : "text-[rgb(140,162,154)] hover:text-white hover:bg-[rgb(24,30,28)]"
                                )}
                              >
                                <span>{item.title}</span>
                                {item.badge && (
                                  <span
                                    className={cn(
                                      "text-[10px] px-1.5 py-0.2 rounded font-normal",
                                      item.badge === "Live"
                                        ? "bg-[#00ba78]/20 text-[#00ba78]"
                                        : "bg-[rgb(36,47,43)] text-[rgb(140,162,154)]"
                                    )}
                                  >
                                    {item.badge}
                                  </span>
                                )}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Drawer footer */}
              <div className="pt-6 mt-6 border-t border-[rgb(30,39,37)] flex items-center justify-between text-xs text-[rgb(140,162,154)]">
                <div className="flex items-center gap-1.5 font-medium">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/lzt-eye.png" alt="LZT" className="w-4 h-4 object-contain shrink-0" />
                  <span className="text-[rgb(214,214,214)]">LZT</span>
                  <span className="text-[rgb(90,105,99)] text-[11px]">×</span>
                  <UniqText preset="scope" href="https://lolz.team/scope/">
                    scope
                  </UniqText>
                </div>
                <span className="text-[10px] text-[rgb(90,105,99)] font-mono">v1.1.0</span>
              </div>
            </aside>
          </div>
        )}

        {/* Main Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex w-full min-w-0">
          {/* Desktop Sidebar */}
          <aside className="w-64 shrink-0 hidden md:block py-8 pr-6 border-r border-[rgb(30,39,37)] sticky top-[44px] h-[calc(100vh-44px)] overflow-y-auto">
            <div className="space-y-6">
              {sidebarNav.map((group) => (
                <div key={group.title}>
                  <h4 className="text-xs font-semibold text-[rgb(245,245,245)] uppercase tracking-wider mb-2.5">
                    {group.title}
                  </h4>
                  <ul className="space-y-1">
                    {group.items.map((item) => {
                      const isActive =
                        pathname === item.href ||
                        (pathname === "/docs/tokens" && item.href === "/docs/brand");
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center justify-between text-xs px-2.5 py-1.5 rounded-[8px] transition-colors",
                              isActive
                                ? "bg-[rgb(30,39,37)] text-white font-medium"
                                : "text-[rgb(140,162,154)] hover:text-white hover:bg-[rgb(24,30,28)]"
                            )}
                          >
                            <span>{item.title}</span>
                            {item.badge && (
                              <span
                                className={cn(
                                  "text-[10px] px-1.5 py-0.2 rounded font-normal",
                                  item.badge === "Live"
                                    ? "bg-[#00ba78]/20 text-[#00ba78]"
                                    : "bg-[rgb(36,47,43)] text-[rgb(140,162,154)]"
                                )}
                              >
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            <div className="pt-6 mt-8 border-t border-[rgb(30,39,37)] flex items-center justify-between text-xs text-[rgb(140,162,154)]">
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
              <span className="text-[10px] text-[rgb(90,105,99)] font-mono">v1.1.0</span>
            </div>
          </aside>

          {/* Content Area */}
          <main className="flex-1 min-w-0 max-w-full py-6 sm:py-8 md:pl-10 lg:pl-12">
            {children}
            <DocsPager />
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
