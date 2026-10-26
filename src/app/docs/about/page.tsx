import Link from "next/link";
import { ChevronRight, ExternalLink, GitPullRequest } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UniqText } from "@/components/ui/uniq-text";

export const metadata = {
  title: "О проекте — lzt/ui",
  description: "О проекте lzt-ui и контрибьюторы.",
};

export default function AboutPage() {
  return (
    <div className="space-y-8 max-w-2xl pb-20">
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-[rgb(140,162,154)] mb-2">
          <Link href="/" className="hover:text-white transition">
            Главная
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[rgb(245,245,245)]">О проекте</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[rgb(245,245,245)] tracking-tight">
          О проекте
        </h1>
      </div>

      {/* About statement */}
      <div className="p-4 sm:p-5 rounded-[12px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] text-xs sm:text-sm text-[rgb(214,214,214)] leading-relaxed space-y-2.5 shadow-xl">
        <p>
          Открытая библиотека UI-компонентов форума Lolzteam и LZT Market для React и Tailwind CSS.
        </p>
        <p className="text-[rgb(140,162,154)] text-xs pt-0.5">
          Спасибо за одобрение на разработку{" "}
          <UniqText preset="raysmorgan" href="https://lolz.team/members/1/">
            RaysMorgan
          </UniqText>{" "}
          и{" "}
          <UniqText preset="extasy" href="https://lolz.team/members/3227904/">
            extasy
          </UniqText>
          .
        </p>
      </div>

      {/* Contributors Section */}
      <div className="space-y-3.5 pt-4 border-t border-[rgb(30,39,37)]">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[rgb(245,245,245)] flex items-center gap-2">
            <GitPullRequest className="w-4 h-4 text-[#00ba78]" />
            <span>Контрибьюторы</span>
          </h2>
          <span className="text-[11px] text-[rgb(140,162,154)]">Open Source</span>
        </div>

        <p className="text-xs text-[rgb(140,162,154)] leading-relaxed">
          Проект развивается сообществом. Если вы хотите добавить новый компонент, улучшить адаптивность или оптимизировать стили — создавайте Pull Request в репозитории проекта.
        </p>

        {/* Contributors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Active Maintainer */}
          <div className="p-3 rounded-[10px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] flex items-center gap-3">
            <Avatar
              src="https://nztcdn.com/avatar/l/1791023433/9336841.webp"
              fallback="SC"
              size="s"
              className="shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <UniqText preset="scope" href="https://lolz.team/scope/" className="font-semibold text-xs">
                  scope
                </UniqText>
                <span className="text-[10px] text-[#00ba78] font-medium">maintainer</span>
              </div>
              <div className="text-[10px] text-[rgb(140,162,154)] mt-0.5">Создатель lzt/ui</div>
            </div>
          </div>

          {/* Become a Contributor Slot */}
          <a
            href="https://github.com/lonestill/lzt-ui/pulls"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-[10px] border border-dashed border-[rgb(44,58,53)] hover:border-[#00ba78]/60 bg-[rgb(17,22,21)]/40 hover:bg-[rgb(17,22,21)] flex items-center gap-3 transition group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[rgb(24,30,28)] border border-[rgb(36,47,43)] group-hover:border-[#00ba78]/40 flex items-center justify-center shrink-0 transition">
              <GitPullRequest className="w-3.5 h-3.5 text-[rgb(140,162,154)] group-hover:text-[#00ba78] transition" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium text-xs text-[rgb(214,214,214)] group-hover:text-white transition">
                Стать контрибьютором
              </div>
              <div className="text-[10px] text-[rgb(140,162,154)] mt-0.5">
                Отправьте PR на GitHub и попадите в список
              </div>
            </div>
          </a>
        </div>

        {/* Contribute Actions */}
        <div className="pt-2 flex flex-wrap items-center gap-2.5">
          <Button
            variant="default"
            size="sm"
            className="text-xs h-8"
            asChild
          >
            <a
              href="https://github.com/lonestill/lzt-ui"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5"
            >
              <GitPullRequest className="w-3.5 h-3.5 text-[#00ba78]" />
              <span>Открыть Pull Request</span>
            </a>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-xs h-8 text-[rgb(140,162,154)] hover:text-white"
            asChild
          >
            <a
              href="https://github.com/lonestill/lzt-ui/issues"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5"
            >
              <span>Сообщить о баге</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </Button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="pt-4 border-t border-[rgb(30,39,37)] flex items-center gap-4 text-xs text-[rgb(140,162,154)]">
        <a
          href="https://github.com/lonestill/lzt-ui"
          target="_blank"
          rel="noreferrer"
          className="hover:text-white transition inline-flex items-center gap-1"
        >
          <span>GitHub</span>
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>
        <span>•</span>
        <a
          href="https://www.npmjs.com/package/@scopelzt/lzt-ui"
          target="_blank"
          rel="noreferrer"
          className="hover:text-white transition inline-flex items-center gap-1"
        >
          <span>npm (v1.1.3)</span>
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>
      </div>
    </div>
  );
}
