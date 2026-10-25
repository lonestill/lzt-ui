import { ChevronRight } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="space-y-8 max-w-3xl pb-10">
      <div>
        <div className="flex items-center gap-1.5 text-xs text-[rgb(140,162,154)] mb-2">
          <span>Документация</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[rgb(245,245,245)]">Введение</span>
        </div>
        <h1 className="text-3xl font-bold text-[rgb(245,245,245)] tracking-tight">
          Введение
        </h1>
        <p className="text-sm text-[rgb(140,162,154)] mt-2">
          UI-компоненты форума Lolzteam для React и Next.js.
        </p>
      </div>

      <div className="space-y-4 text-xs leading-relaxed text-[rgb(140,162,154)]">
        <p>
          Библиотека предоставляет готовые компоненты интерфейса форума Lolzteam и маркета LZT: кнопки, таблицы, диалоги, выпадающие меню, бейджи и токены темы.
        </p>
        <p>
          Компоненты копируются напрямую в ваш проект в директорию <code className="text-[#00ba78] font-mono">src/components/ui/</code>. Вы получаете чистый исходный код на TypeScript и Tailwind CSS v4.
        </p>
      </div>

      <div className="space-y-3 pt-4 border-t border-[rgb(30,39,37)]">
        <h2 className="text-sm font-semibold text-[rgb(245,245,245)]">
          Требования
        </h2>
        <ul className="list-disc list-inside text-xs text-[rgb(140,162,154)] space-y-1">
          <li>React 18 или 19</li>
          <li>Next.js 14+ (App Router)</li>
          <li>Tailwind CSS v4</li>
        </ul>
      </div>
    </div>
  );
}
