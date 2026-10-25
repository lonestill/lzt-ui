export interface SidebarItem {
  title: string;
  href: string;
  badge?: string;
}

export interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

export const sidebarNav: SidebarGroup[] = [
  {
    title: "Начало работы",
    items: [
      { title: "Введение", href: "/docs" },
      { title: "Установка", href: "/docs/installation" },
      { title: "Брендинг", href: "/docs/brand" },
    ],
  },
  {
    title: "Навигация и списки",
    items: [
      { title: "Table (Таблица)", href: "/docs/components/table" },
      { title: "Pagination (Пагинация)", href: "/docs/components/pagination" },
      { title: "Tabs (Вкладки)", href: "/docs/components/tabs" },
      { title: "DropdownMenu (Меню)", href: "/docs/components/dropdown-menu" },
      { title: "Tooltip (Тултип)", href: "/docs/components/tooltip" },
    ],
  },
  {
    title: "Контролы и формы",
    items: [
      { title: "Button (Кнопка)", href: "/docs/components/button" },
      { title: "Input (Инпут и Textarea)", href: "/docs/components/input" },
      { title: "Select (Селектор)", href: "/docs/components/select" },
      { title: "Checkbox (Чекбокс и Радио)", href: "/docs/components/checkbox" },
      { title: "Badge (Лычки и теги)", href: "/docs/components/badge" },
      { title: "Avatar (Аватар)", href: "/docs/components/avatar" },
      { title: "UniqText (Уник)", href: "/docs/components/uniq" },
    ],
  },
  {
    title: "Оверлеи и алерты",
    items: [
      { title: "Alert (Уведомления)", href: "/docs/components/alert" },
      { title: "Dialog (Модалка)", href: "/docs/components/dialog" },
      { title: "Toast (Флэш-сообщения)", href: "/docs/components/toast" },
    ],
  },
];

export const flattenedDocsNav: SidebarItem[] = sidebarNav.flatMap((group) => group.items);

export function getPagerForPath(pathname: string): {
  prev: SidebarItem | null;
  next: SidebarItem | null;
} {
  let normalizedPath = pathname;
  if (normalizedPath === "/docs/components/unik") normalizedPath = "/docs/components/uniq";
  if (normalizedPath === "/docs/tokens") normalizedPath = "/docs/brand";
  const currentIndex = flattenedDocsNav.findIndex((item) => item.href === normalizedPath);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev = currentIndex > 0 ? flattenedDocsNav[currentIndex - 1] : null;
  const next = currentIndex < flattenedDocsNav.length - 1 ? flattenedDocsNav[currentIndex + 1] : null;

  return { prev, next };
}
