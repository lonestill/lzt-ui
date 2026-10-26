#!/usr/bin/env node

/**
 * lzt/ui CLI
 * Копирование атомарных компонентов Lolzteam / XenForo 2.x
 * Документация: https://lzt-ui.vercel.app
 */

const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

const PKG_ROOT = path.resolve(__dirname, "..");
const TEMPLATES_DIR = path.join(PKG_ROOT, "templates");
const COMPONENTS_DIR = path.join(TEMPLATES_DIR, "components");

const COLORS = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  greenBold: "\x1b[1;32m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
};

const COMPONENT_ALIASES = {
  unik: "uniq-text",
  uniq: "uniq-text",
  "unik-text": "uniq-text",
  dropdown: "dropdown-menu",
  menu: "dropdown-menu",
  modal: "dialog",
  popup: "dialog",
};

const COMPONENT_DESCRIPTIONS = {
  button: "Кнопки XenForo (.button, .primary с фирменным градиентом, .secondary)",
  table: "Таблица данных Lolzteam (.dataTable) со строками, ховерами и селектами",
  pagination: "Пагинация XenForo (.pageNav) со страницами и кнопками перехода",
  tabs: "Вкладки (.tabs) с плавающей зеленой линией и счетчиками",
  input: "Поля ввода .textCtrl и многострочные Textarea",
  select: "Кастомный селектор .select с выпадающим меню",
  checkbox: "Чекбоксы и радио-кнопки в стиле форума",
  badge: "Лычки групп (Команда форума, Куратор, Постоялец, ИИ) и статус-теги",
  avatar: "Аватары с индикатором онлайна, кольцом группы и обводкой",
  "uniq-text": "Легендарные анимации и градиенты уников (светящиеся, бегущие строки)",
  dialog: "Модальные окна XenOverlay с анимацией и темным бэкдропом",
  "dropdown-menu": "Контекстные меню XenForo с разделителями и иконками",
  alert: "Баннеры важных сообщений .importantMessage и системные алерты",
  toast: "Всплывающие flash-уведомления #StackAlerts внизу слева",
  tooltip: "Тултипы с акцентной стрелкой и подсказками",
};

function banner() {
  let version = "1.1.3";
  try {
    version = require("../package.json").version || version;
  } catch {}
  console.log(`\n${COLORS.greenBold}  lzt${COLORS.reset}${COLORS.bold}/ui${COLORS.reset} ${COLORS.dim}v${version}${COLORS.reset}`);
  console.log(`${COLORS.dim}  Атомарные компоненты форума Lolzteam для React / Next.js${COLORS.reset}`);
  console.log(`${COLORS.dim}  Документация: https://lzt-ui.vercel.app${COLORS.reset}\n`);
}

function detectPackageManager(cwd) {
  if (fs.existsSync(path.join(cwd, "bun.lock")) || fs.existsSync(path.join(cwd, "bun.lockb"))) return "bun";
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}

function getInstallCommand(pm, packages) {
  const pkgs = packages.join(" ");
  switch (pm) {
    case "bun":
      return `bun add ${pkgs}`;
    case "pnpm":
      return `pnpm add ${pkgs}`;
    case "yarn":
      return `yarn add ${pkgs}`;
    default:
      return `npm install ${pkgs}`;
  }
}

function getAvailableComponents() {
  if (!fs.existsSync(COMPONENTS_DIR)) return [];
  return fs
    .readdirSync(COMPONENTS_DIR)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => f.replace(/\.tsx$/, ""));
}

function loadConfig(cwd) {
  const configPath = path.join(cwd, "components.json");
  if (fs.existsSync(configPath)) {
    try {
      return JSON.parse(fs.readFileSync(configPath, "utf8"));
    } catch {
      return null;
    }
  }
  return null;
}

function resolveTargetPaths(cwd) {
  const hasSrc = fs.existsSync(path.join(cwd, "src"));
  const config = loadConfig(cwd);

  let uiDir = config?.aliases?.ui
    ? path.join(cwd, config.aliases.ui.replace(/^@\//, hasSrc ? "src/" : ""))
    : path.join(cwd, hasSrc ? "src/components/ui" : "components/ui");

  let utilsDir = config?.aliases?.utils
    ? path.join(cwd, config.aliases.utils.replace(/^@\//, hasSrc ? "src/" : ""))
    : path.join(cwd, hasSrc ? "src/lib" : "lib");

  let utilsAlias = config?.aliases?.utils || "@/lib/utils";

  return { uiDir, utilsDir, utilsAlias, hasSrc };
}

function findCssFile(cwd, hasSrc) {
  const candidates = [
    hasSrc ? "src/app/globals.css" : "app/globals.css",
    hasSrc ? "src/globals.css" : "globals.css",
    hasSrc ? "src/index.css" : "index.css",
    hasSrc ? "src/styles/globals.css" : "styles/globals.css",
  ];

  for (const c of candidates) {
    const full = path.join(cwd, c);
    if (fs.existsSync(full)) return full;
  }
  return null;
}

function handleInit(cwd, args) {
  banner();
  console.log(`${COLORS.bold}▶ Инициализация lzt/ui в проекте...${COLORS.reset}\n`);

  const pkgJsonPath = path.join(cwd, "package.json");
  if (!fs.existsSync(pkgJsonPath)) {
    console.error(`${COLORS.red}✗ Ошибка: package.json не найден в текущей директории.${COLORS.reset}`);
    console.error(`${COLORS.dim}Запусти команду в корне проекта Next.js / React.${COLORS.reset}\n`);
    process.exit(1);
  }

  const { uiDir, utilsDir, hasSrc } = resolveTargetPaths(cwd);
  const pm = detectPackageManager(cwd);

  // 1. Создаем папку под утилиты и файл utils.ts
  fs.mkdirSync(utilsDir, { recursive: true });
  const utilsFile = path.join(utilsDir, "utils.ts");
  const templateUtils = path.join(TEMPLATES_DIR, "utils.ts");

  if (!fs.existsSync(utilsFile)) {
    fs.copyFileSync(templateUtils, utilsFile);
    console.log(`${COLORS.green}✓${COLORS.reset} Создан хелпер ${COLORS.cyan}${path.relative(cwd, utilsFile)}${COLORS.reset}`);
  } else {
    console.log(`${COLORS.dim}• Хелпер ${path.relative(cwd, utilsFile)} уже существует${COLORS.reset}`);
  }

  // 2. Создаем директорию компонентов
  fs.mkdirSync(uiDir, { recursive: true });
  console.log(`${COLORS.green}✓${COLORS.reset} Подготовлена папка ${COLORS.cyan}${path.relative(cwd, uiDir)}${COLORS.reset}`);

  // 3. Инжектируем CSS переменные темы
  const cssFile = findCssFile(cwd, hasSrc);
  if (cssFile) {
    const cssContent = fs.readFileSync(cssFile, "utf8");
    if (!cssContent.includes("--lzt-bg-page")) {
      const themeCss = fs.readFileSync(path.join(TEMPLATES_DIR, "theme.css"), "utf8");
      fs.appendFileSync(cssFile, `\n\n/* === lzt/ui Design Tokens === */\n${themeCss}\n`);
      console.log(`${COLORS.green}✓${COLORS.reset} Добавлены токены темы Lolzteam в ${COLORS.cyan}${path.relative(cwd, cssFile)}${COLORS.reset}`);
    } else {
      console.log(`${COLORS.dim}• Токены темы уже присутствуют в ${path.relative(cwd, cssFile)}${COLORS.reset}`);
    }
  } else {
    console.log(`${COLORS.yellow}! CSS-файл не найден автоматически. Скопируй токены из документации: https://lzt-ui.vercel.app/docs/brand${COLORS.reset}`);
  }

  // 4. Создаем components.json
  const componentsJsonPath = path.join(cwd, "components.json");
  if (!fs.existsSync(componentsJsonPath)) {
    const config = {
      $schema: "https://lzt-ui.vercel.app/schema.json",
      style: "default",
      tailwind: {
        css: cssFile ? path.relative(cwd, cssFile) : hasSrc ? "src/app/globals.css" : "app/globals.css",
      },
      aliases: {
        components: "@/components",
        utils: "@/lib/utils",
        ui: "@/components/ui",
      },
    };
    fs.writeFileSync(componentsJsonPath, JSON.stringify(config, null, 2) + "\n");
    console.log(`${COLORS.green}✓${COLORS.reset} Создан конфиг ${COLORS.cyan}components.json${COLORS.reset}`);
  }

  // 5. Проверяем и доустанавливаем peer-зависимости
  let pkgData = {};
  try {
    pkgData = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
  } catch {}

  const allDeps = {
    ...(pkgData.dependencies || {}),
    ...(pkgData.devDependencies || {}),
  };

  const needed = ["clsx", "tailwind-merge", "class-variance-authority", "lucide-react"].filter(
    (dep) => !allDeps[dep]
  );

  if (needed.length > 0) {
    const installCmd = getInstallCommand(pm, needed);
    console.log(`\n${COLORS.bold}📦 Установка зависимостей (${needed.join(", ")})...${COLORS.reset}`);
    console.log(`${COLORS.dim}$ ${installCmd}${COLORS.reset}`);
    try {
      execSync(installCmd, { cwd, stdio: "inherit" });
      console.log(`${COLORS.green}✓ Зависимости успешно установлены.${COLORS.reset}`);
    } catch (e) {
      console.log(`${COLORS.yellow}! Не удалось автоматически установить зависимости. Выполни вручную:${COLORS.reset}`);
      console.log(`  ${installCmd}\n`);
    }
  } else {
    console.log(`${COLORS.green}✓${COLORS.reset} Все необходимые библиотеки уже установлены.`);
  }

  console.log(`\n${COLORS.greenBold}🎉 lzt/ui готов к работе!${COLORS.reset}`);
  console.log(`\nДобавь свой первый компонент:`);
  console.log(`  ${COLORS.cyan}npx @scopelzt/lzt-ui add button${COLORS.reset}`);
  console.log(`  ${COLORS.cyan}npx @scopelzt/lzt-ui add table dialog toast${COLORS.reset}`);
  console.log(`  ${COLORS.cyan}npx @scopelzt/lzt-ui add --all${COLORS.reset}\n`);
}

function handleAdd(cwd, components, flags) {
  banner();
  const available = getAvailableComponents();

  if (flags.all) {
    components = [...available];
  }

  if (components.length === 0) {
    console.log(`${COLORS.bold}Доступные компоненты для добавления:${COLORS.reset}\n`);
    available.forEach((comp) => {
      const desc = COMPONENT_DESCRIPTIONS[comp] || "";
      console.log(`  ${COLORS.greenBold}${comp.padEnd(16)}${COLORS.reset} ${COLORS.dim}${desc}${COLORS.reset}`);
    });
    console.log(`\nИспользование:`);
    console.log(`  ${COLORS.cyan}npx @scopelzt/lzt-ui add <компонент...>${COLORS.reset}`);
    console.log(`  ${COLORS.cyan}npx @scopelzt/lzt-ui add --all${COLORS.reset}\n`);
    return;
  }

  const { uiDir, utilsAlias } = resolveTargetPaths(cwd);
  fs.mkdirSync(uiDir, { recursive: true });

  let addedCount = 0;

  for (let rawName of components) {
    let name = rawName.toLowerCase().trim();
    if (COMPONENT_ALIASES[name]) {
      console.log(`${COLORS.dim}• Алиас '${name}' -> '${COMPONENT_ALIASES[name]}'${COLORS.reset}`);
      name = COMPONENT_ALIASES[name];
    }

    const templatePath = path.join(COMPONENTS_DIR, `${name}.tsx`);
    if (!fs.existsSync(templatePath)) {
      console.log(`${COLORS.red}✗ Компонент '${rawName}' не найден.${COLORS.reset} Введи ${COLORS.cyan}npx @scopelzt/lzt-ui list${COLORS.reset}`);
      continue;
    }

    const targetFile = path.join(uiDir, `${name}.tsx`);
    const fileExists = fs.existsSync(targetFile);

    if (fileExists && !flags.overwrite && !flags.yes) {
      console.log(`${COLORS.yellow}! Файл ${path.relative(cwd, targetFile)} уже существует.${COLORS.reset} Используй ${COLORS.dim}--overwrite${COLORS.reset}`);
      continue;
    }

    let content = fs.readFileSync(templatePath, "utf8");

    // Заменяем путь импорта utils, если пользователь переопределил алиас
    if (utilsAlias && utilsAlias !== "@/lib/utils") {
      content = content.replace(/from\s+["']@\/lib\/utils["']/g, `from "${utilsAlias}"`);
    }

    fs.writeFileSync(targetFile, content, "utf8");
    const action = fileExists ? "Обновлён" : "Добавлен";
    console.log(`${COLORS.green}✓ ${action}${COLORS.reset} ${COLORS.bold}${name}${COLORS.reset} -> ${COLORS.cyan}${path.relative(cwd, targetFile)}${COLORS.reset}`);
    addedCount++;
  }

  if (addedCount > 0) {
    console.log(`\n${COLORS.greenBold}Готово!${COLORS.reset} Импортируй в коде:`);
    const example = components[0] ? (COMPONENT_ALIASES[components[0]] || components[0]) : "button";
    console.log(`  ${COLORS.cyan}import { ... } from "@/components/ui/${example}";${COLORS.reset}\n`);
  }
}

function handleList() {
  banner();
  console.log(`${COLORS.bold}Компоненты библиотеки lzt/ui (${getAvailableComponents().length} шт.):${COLORS.reset}\n`);
  const available = getAvailableComponents();
  available.forEach((comp) => {
    const desc = COMPONENT_DESCRIPTIONS[comp] || "";
    console.log(`  ${COLORS.greenBold}${comp.padEnd(16)}${COLORS.reset} ${desc}`);
  });
  console.log(`\n${COLORS.dim}Установка любого компонента: npx @scopelzt/lzt-ui add <name>${COLORS.reset}\n`);
}

function handleHelp() {
  banner();
  console.log(`${COLORS.bold}Использование:${COLORS.reset}`);
  console.log(`  $ npx @scopelzt/lzt-ui <команда> [опции]\n`);
  console.log(`${COLORS.bold}Команды:${COLORS.reset}`);
  console.log(`  ${COLORS.greenBold}init${COLORS.reset}                 Настроить проект (создать utils.ts, токены темы, конфиг)`);
  console.log(`  ${COLORS.greenBold}add <компонент...>${COLORS.reset}   Скопировать один или несколько компонентов в проект`);
  console.log(`  ${COLORS.greenBold}add --all${COLORS.reset}            Скопировать абсолютно все компоненты`);
  console.log(`  ${COLORS.greenBold}list${COLORS.reset}                 Показать список всех доступных компонентов\n`);
  console.log(`${COLORS.bold}Флаги:${COLORS.reset}`);
  console.log(`  ${COLORS.cyan}-y, --yes${COLORS.reset}            Автоматическое подтверждение`);
  console.log(`  ${COLORS.cyan}--overwrite${COLORS.reset}          Перезаписывать существующие файлы компонентов`);
  console.log(`  ${COLORS.cyan}-h, --help${COLORS.reset}           Показать эту справку`);
  console.log(`  ${COLORS.cyan}-v, --version${COLORS.reset}        Версия пакета\n`);
}

function main() {
  const argv = process.argv.slice(2);
  const cwd = process.cwd();

  if (argv.length === 0 || argv.includes("-h") || argv.includes("--help")) {
    handleHelp();
    return;
  }

  if (argv.includes("-v") || argv.includes("--version")) {
    console.log("0.1.0");
    return;
  }

  const command = argv[0];
  const rest = argv.slice(1);

  const flags = {
    all: rest.includes("--all"),
    yes: rest.includes("-y") || rest.includes("--yes"),
    overwrite: rest.includes("--overwrite") || rest.includes("-y") || rest.includes("--yes"),
  };

  const argsWithoutFlags = rest.filter((arg) => !arg.startsWith("-"));

  switch (command) {
    case "init":
      handleInit(cwd, argsWithoutFlags);
      break;
    case "add":
      handleAdd(cwd, argsWithoutFlags, flags);
      break;
    case "list":
    case "ls":
      handleList();
      break;
    default:
      console.log(`${COLORS.red}Неизвестная команда: ${command}${COLORS.reset}\n`);
      handleHelp();
      process.exit(1);
  }
}

main();
