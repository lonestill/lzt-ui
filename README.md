# lzt-ui

UI-компоненты форума Lolzteam (XenForo 2.x) для React и Tailwind CSS.

Документация и превью: [lzt-ui.vercel.app](https://lzt-ui.vercel.app)

## Быстрый старт

Инициализация в проекте:

```bash
npx @scopelzt/lzt-ui init
```

Команда прокидывает дизайн-токены в `globals.css`, создаёт хелпер `src/lib/utils.ts` (`cn`) и `components.json`.

Добавление компонентов:

```bash
# Добавить нужные компоненты
npx @scopelzt/lzt-ui add button table dialog

# Или накатить всё сразу
npx @scopelzt/lzt-ui add --all
```

Исходники падают напрямую в `src/components/ui/`.

## Список компонентов

- `alert` — баннеры сообщений (`.importantMessage`)
- `avatar` — аватары с индикатором онлайна и обводкой группы
- `badge` — лычки групп (Команда форума, Куратор, Постоялец, ИИ)
- `button` — кнопки с градиентами (`.button.primary`, `.secondary`)
- `checkbox` — чекбоксы и радиокнопки
- `dialog` — модальные окна (`.xenOverlay`, `DialogBody`)
- `dropdown-menu` — контекстные и выпадающие меню
- `input` — поля ввода (`.textCtrl`) и многострочные `textarea`
- `pagination` — переключатели страниц (`.pageNav`)
- `select` — селекторы с выпадающим списком
- `table` — таблицы данных (`.dataTable`) со строками и чекбоксами
- `tabs` — навигационные вкладки с индикатором
- `toast` — системные flash-уведомления (`#StackAlerts`)
- `tooltip` — всплывающие подсказки
- `uniq-text` — кастомные стили и анимации уников

Полный перечень ключей и флагов: `npx @scopelzt/lzt-ui --help`.

## Дисклеймер

Проект является независимой open-source разработкой сообщества и официально не аффилирован с администрацией форума Lolzteam. Все товарные знаки и фирменные стили принадлежат их законным правообладателям (Lolzteam & XenForo Ltd.).

## Лицензия

MIT
