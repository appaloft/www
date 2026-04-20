import i18next from "i18next";

export {
  appaloftLocaleCookieMaxAge,
  appaloftLocaleCookieName,
  appaloftLocaleHeader,
  appaloftLocaleStorageKey,
} from "./locale-constants";

export const appaloftLocales = ["zh-CN", "en-US"] as const;
export type AppaloftLocale = (typeof appaloftLocales)[number];

export const defaultAppaloftLocale: AppaloftLocale = "zh-CN";

export function normalizeAppaloftLocale(input?: string | null): AppaloftLocale {
  const value = input?.trim();

  if (!value) {
    return defaultAppaloftLocale;
  }

  const normalized = value.toLowerCase().replace("_", "-");

  if (normalized === "zh" || normalized === "zh-cn" || normalized.startsWith("zh-hans")) {
    return "zh-CN";
  }

  if (normalized === "en" || normalized === "en-us" || normalized.startsWith("en-")) {
    return "en-US";
  }

  return defaultAppaloftLocale;
}

export function localePath(locale: AppaloftLocale): string {
  return `/${locale}/`;
}

export const homeCopy = {
  "zh-CN": {
    meta: {
      description: "Appaloft 帮你把本地跑通的 vibe app 发布到服务器和云端环境。",
      title: "Appaloft - vibe app 发布到云端",
    },
    skipLink: "跳到正文",
    nav: {
      label: "主导航",
      home: "Appaloft 首页",
      platform: "入口",
      loop: "示例",
      github: "GitHub",
      console: "控制台",
      menu: "菜单",
    },
    language: {
      label: "语言",
      english: "English",
      simplifiedChinese: "简体中文",
    },
    auth: {
      connectGithub: "连接 GitHub",
      connecting: "正在连接...",
      connected: "GitHub 已连接",
      loading: "正在检查登录状态",
      signedIn: "已登录",
      signedOut: "未登录",
      unavailable: "认证服务不可用",
    },
    hero: {
      pronunciation: {
        label: "Appaloft 读音",
        name: "Appaloft",
        ipa: "/ˌæp əˈlɔːft/",
        app: "app",
        aloft: "aloft",
      },
      title: "把 vibe app 发布到云端。",
      body:
        "从 localhost 上的项目开始，连接你的服务器或云主机，用 CLI 完成构建、上传和发布。",
      domainDemo: {
        label: "地址发布演示",
        local: "localhost:3000",
        deploy: "appaloft deploy",
        live: "your.awesome.app",
        terminalLines: [
          "检查项目",
          "生成发布包",
          "上传到服务器",
          "已上线 https://your.awesome.app",
        ],
        status: "本地预览变成线上地址",
        localLabel: "Local",
        appaloftLabel: "Appaloft",
        liveLabel: "Live",
        screenReader: "Appaloft 把 http://localhost:3000 发布成 https://your.awesome.app。",
      },
      primaryAction: "查看示例",
      secondaryAction: "下载 CLI",
      installLabel: "快速开始",
      installCommand: "curl -fsSL https://appaloft.com/install.sh | sh",
      copyCommand: "复制",
      copiedCommand: "已复制",
      actionsLabel: "主要操作",
    },
    scenarios: {
      kicker: "使用方式",
      title: "从 CLI 开始部署到云端。",
      body: "使用 CLI 将当前项目发布到服务器或云主机；后续可接入 GitHub Actions 和桌面端管理。",
      label: "使用场景",
      items: [
        {
          key: "cli",
          label: "CLI",
          title: "在项目目录里部署。",
          body: "将本地项目构建并发布到指定服务器。",
          kind: "code",
          badge: "terminal",
          lines: [
            "curl -fsSL https://appaloft.com/install.sh | sh",
            "appaloft login",
            "appaloft server add prod --ssh root@203.0.113.8",
            "appaloft deploy . --server prod",
          ],
        },
        {
          key: "action",
          label: "GitHub Action",
          title: "提交后自动发版。",
          body: "将发布步骤接入仓库，服务器凭据保存在 GitHub Secrets。",
          kind: "code",
          badge: "workflow",
          lines: [
            "name: deploy",
            "on: [push]",
            "jobs:",
            "  appaloft:",
            "    runs-on: ubuntu-latest",
            "    steps:",
            "      - uses: actions/checkout@v4",
            "      - uses: appaloft/deploy-action@v1",
            "        with:",
            "          server: ${{ secrets.APPALOFT_SERVER }}",
          ],
        },
        {
          key: "desktop",
          label: "Desktop App",
          title: "使用桌面端管理。",
          body: "查看服务器、应用、部署记录和日志入口，减少在终端和日志之间切换。",
          kind: "desktop",
          badge: "app",
          cards: [
            ["api.app", "Running", "v24 deployed 2m ago"],
            ["www.app", "Building", "GitHub push main"],
            ["worker", "Idle", "last deploy yesterday"],
          ],
        },
      ],
    },
    features: {
      kicker: "为什么用它",
      title: "不必先迁移到完整云平台。",
      body: "Appaloft 先处理发布这一步：连接服务器、构建项目、上传产物，并保留现有仓库和主机。",
      items: [
        ["你的云端环境", "VPS、云主机、Docker 主机都可以作为目标。"],
        ["命令行发布", "在项目目录中登录、选择服务器并发布。"],
        ["按需自动化", "首个版本发布后，再接入 GitHub Actions 或其他流程。"],
      ],
    },
    cta: {
      kicker: "现在开始",
      title: "部署第一个项目。",
      body: "安装 CLI，连接服务器，把 localhost 上的项目发布到云端。",
      docs: "阅读文档",
      github: "查看源码",
    },
    footer: {
      text: "Appaloft。From localhost to cloud.",
      docs: "文档",
    },
  },
  "en-US": {
    meta: {
      description: "Appaloft publishes your local vibe app to your server or cloud environment.",
      title: "Appaloft - publish vibe apps to the cloud",
    },
    skipLink: "Skip to content",
    nav: {
      label: "Main navigation",
      home: "Appaloft home",
      platform: "Entries",
      loop: "Examples",
      github: "GitHub",
      console: "Console",
      menu: "Menu",
    },
    language: {
      label: "Language",
      english: "English",
      simplifiedChinese: "Simplified Chinese",
    },
    auth: {
      connectGithub: "Connect GitHub",
      connecting: "Connecting...",
      connected: "GitHub connected",
      loading: "Checking session",
      signedIn: "Signed in",
      signedOut: "Signed out",
      unavailable: "Auth unavailable",
    },
    hero: {
      pronunciation: {
        label: "Appaloft pronunciation",
        name: "Appaloft",
        ipa: "/ˌæp əˈlɔːft/",
        app: "app",
        aloft: "aloft",
      },
      title: "Publish vibe apps to the cloud.",
      body:
        "Start with the project on localhost, connect your server or cloud VM, and use the CLI to build, upload, and publish.",
      domainDemo: {
        label: "Address publish demo",
        local: "localhost:3000",
        deploy: "appaloft deploy",
        live: "your.awesome.app",
        terminalLines: [
          "Checking project",
          "Building release",
          "Uploading to server",
          "Live at https://your.awesome.app",
        ],
        status: "Local preview becomes a live URL",
        localLabel: "Local",
        appaloftLabel: "Appaloft",
        liveLabel: "Live",
        screenReader: "Appaloft publishes http://localhost:3000 as https://your.awesome.app.",
      },
      primaryAction: "See examples",
      secondaryAction: "Download CLI",
      installLabel: "Quick start",
      installCommand: "curl -fsSL https://appaloft.com/install.sh | sh",
      copyCommand: "Copy",
      copiedCommand: "Copied",
      actionsLabel: "Primary actions",
    },
    scenarios: {
      kicker: "Ways to use it",
      title: "Deploy to the cloud from the CLI.",
      body: "Use the CLI to publish the current project to a server or cloud VM; add GitHub Actions or the desktop app when needed.",
      label: "Use cases",
      items: [
        {
          key: "cli",
          label: "CLI",
          title: "Deploy from the project folder.",
          body: "Build and publish the local project to the target server.",
          kind: "code",
          badge: "terminal",
          lines: [
            "curl -fsSL https://appaloft.com/install.sh | sh",
            "appaloft login",
            "appaloft server add prod --ssh root@203.0.113.8",
            "appaloft deploy . --server prod",
          ],
        },
        {
          key: "action",
          label: "GitHub Action",
          title: "Release after every push.",
          body: "Add the release step to your repository and keep server credentials in GitHub Secrets.",
          kind: "code",
          badge: "workflow",
          lines: [
            "name: deploy",
            "on: [push]",
            "jobs:",
            "  appaloft:",
            "    runs-on: ubuntu-latest",
            "    steps:",
            "      - uses: actions/checkout@v4",
            "      - uses: appaloft/deploy-action@v1",
            "        with:",
            "          server: ${{ secrets.APPALOFT_SERVER }}",
          ],
        },
        {
          key: "desktop",
          label: "Desktop App",
          title: "Open a local control surface.",
          body: "Inspect servers, apps, deployment records, and logs without returning to the terminal.",
          kind: "desktop",
          badge: "app",
          cards: [
            ["api.app", "Running", "v24 deployed 2m ago"],
            ["www.app", "Building", "GitHub push main"],
            ["worker", "Idle", "last deploy yesterday"],
          ],
        },
      ],
    },
    features: {
      kicker: "Why use it",
      title: "No full platform migration required.",
      body: "Appaloft handles the publishing step first: connect a server, build the project, upload artifacts, and keep your existing repository and host.",
      items: [
        ["Your cloud environment", "Use a VPS, cloud VM, or Docker host as the target."],
        ["CLI publishing", "Sign in, choose a server, and publish from the project folder."],
        ["Automation later", "Connect GitHub Actions or another workflow after the first release."],
      ],
    },
    cta: {
      kicker: "Start now",
      title: "Deploy your first project.",
      body: "Install the CLI, connect a server, and publish the project from localhost to the cloud.",
      docs: "Read docs",
      github: "View source",
    },
    footer: {
      text: "Appaloft. From localhost to cloud.",
      docs: "Docs",
    },
  },
} as const;

export type HomeCopy = (typeof homeCopy)[typeof defaultAppaloftLocale];

const homeResources = Object.fromEntries(
  Object.entries(homeCopy).map(([locale, copy]) => [
    locale,
    {
      home: copy,
    },
  ]),
) as Record<AppaloftLocale, { home: HomeCopy }>;

export function getHomeCopy(locale: AppaloftLocale) {
  const i18n = i18next.createInstance();

  i18n.init({
    defaultNS: "home",
    fallbackLng: defaultAppaloftLocale,
    initAsync: false,
    interpolation: {
      escapeValue: false,
    },
    lng: locale,
    ns: ["home"],
    resources: homeResources,
  });

  return i18n.getResourceBundle(locale, "home") as HomeCopy;
}
