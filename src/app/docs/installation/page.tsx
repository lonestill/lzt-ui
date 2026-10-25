import { ChevronRight } from "lucide-react";

export default function InstallationPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <div className="flex items-center gap-1.5 text-xs text-[rgb(140,162,154)] mb-2">
          <span>Начало работы</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[rgb(245,245,245)]">Установка</span>
        </div>
        <h1 className="text-3xl font-bold text-[rgb(245,245,245)] tracking-tight">
          Установка
        </h1>
        <p className="text-sm text-[rgb(140,162,154)] mt-2 leading-relaxed">
          Как подключить lzt/ui в ваш Next.js проект с Tailwind CSS.
        </p>
      </div>

      <div className="space-y-6 text-xs leading-relaxed">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-[rgb(245,245,245)]">
            1. Инициализация в проекте
          </h3>
          <pre className="p-3.5 rounded-[10px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] font-mono text-[#00ba78] overflow-x-auto max-w-full">
            npx @scopelzt/lzt-ui init
          </pre>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-[rgb(245,245,245)]">
            2. Добавление компонентов
          </h3>
          <p className="text-[rgb(140,162,154)]">
            Выберите компоненты, которые вам нужны:
          </p>
          <pre className="p-3.5 rounded-[10px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] font-mono text-[#00ba78] overflow-x-auto max-w-full">
            npx @scopelzt/lzt-ui add table button input select dialog
          </pre>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-[rgb(245,245,245)]">
            3. Использование в коде
          </h3>
          <pre className="p-3.5 rounded-[10px] bg-[rgb(17,22,21)] border border-[rgb(30,39,37)] font-mono text-[rgb(214,214,214)] overflow-x-auto max-w-full leading-relaxed">
{`import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

export default function Page() {
  return (
    <div className="space-y-4">
      <Button variant="primary">Действие</Button>
    </div>
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
