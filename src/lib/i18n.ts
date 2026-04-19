import i18next from "i18next";

export const appaloftLocales = ["zh-CN", "en-US"] as const;
export type AppaloftLocale = (typeof appaloftLocales)[number];

export const defaultAppaloftLocale: AppaloftLocale = "zh-CN";
export const appaloftLocaleStorageKey = "appaloft.locale";
export const appaloftLocaleCookieName = appaloftLocaleStorageKey;
export const appaloftLocaleCookieMaxAge = 60 * 60 * 24 * 365;
export const appaloftLocaleHeader = "x-appaloft-locale";

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
      description: "Appaloft 帮你把 vibe app 从 localhost 带到自己的服务器、CI 和云端。",
      title: "Appaloft - 从 localhost 到云端",
    },
    skipLink: "跳到正文",
    nav: {
      label: "主导航",
      home: "Appaloft 首页",
      platform: "入口",
      loop: "示例",
      github: "GitHub",
      console: "控制台",
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
      title: "把你的 vibe app 带到云端。",
      body:
        "从本机项目开始，用 CLI 部署到自己的服务器；接入 GitHub Actions 自动发布；需要图形界面时打开桌面 App。之后再交给 AI skill 或 Appaloft Cloud 接手。",
      domainDemo: {
        label: "地址发布演示",
        local: "localhost:3000",
        deploy: "appaloft deploy",
        live: "your.awesome.app",
        terminalLines: [
          "检测项目入口",
          "构建发布包",
          "上传到目标服务器",
          "已部署到 https://your.awesome.app 🎉",
        ],
        status: "本地预览变成可分享地址",
        localLabel: "Local",
        appaloftLabel: "Appaloft",
        liveLabel: "Live",
        screenReader: "Appaloft 把 http://localhost:3000 发布成 https://your.awesome.app。",
      },
      primaryAction: "看入口示例",
      secondaryAction: "下载 App",
      installLabel: "安装 CLI",
      installCommand: "curl -fsSL https://appaloft.com/install.sh | sh",
      installNote: "先装 CLI，再把同一条部署路径放进 CI、App 或未来 Cloud。",
      copyCommand: "复制",
      copiedCommand: "已复制",
      actionsLabel: "主要操作",
    },
    scenarios: {
      kicker: "入口示例",
      title: "一个产品，几种开始方式。",
      body: "自动轮播的是实际入口：命令行、GitHub Actions、桌面端、AI skill 和未来云服务。",
      label: "使用场景",
      items: [
        {
          key: "cli",
          label: "CLI",
          title: "在项目目录里部署。",
          body: "本地开发完成后，直接把当前 app 推到你自己的服务器。",
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
          title: "push 后自动发版。",
          body: "把同一条部署路径放进仓库，服务器凭据留在 GitHub Secrets。",
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
          title: "打开一个本地控制台。",
          body: "看服务器、应用、部署记录和日志入口，不必每次回到终端。",
          kind: "desktop",
          badge: "app",
          cards: [
            ["api.app", "Running", "v24 deployed 2m ago"],
            ["www.app", "Building", "GitHub push main"],
            ["worker", "Idle", "last deploy yesterday"],
          ],
        },
        {
          key: "ai",
          label: "AI skill",
          title: "让 agent 复用同一条路径。",
          body: "未来的 skill 可以检查环境、生成部署计划、触发发布并解释失败原因。",
          kind: "chat",
          badge: "agent",
          messages: [
            ["you", "把这个 Next.js app 部署到 prod。"],
            ["skill", "已检查 Dockerfile、端口和 secrets，准备运行 appaloft deploy。"],
            ["skill", "发布完成，访问地址已生成。"],
          ],
        },
        {
          key: "cloud",
          label: "Cloud",
          title: "需要托管时再迁上来。",
          body: "团队、权限、预览环境和协作仪表盘可以放到未来 Appaloft Cloud。",
          kind: "cloud",
          badge: "soon",
          metrics: [
            ["Preview envs", "Soon"],
            ["Team access", "Soon"],
            ["Team dashboard", "Soon"],
          ],
        },
      ],
    },
    features: {
      kicker: "你得到什么",
      title: "不需要先买一整套平台。",
      body: "Appaloft 先解决从 localhost 到可访问环境这一步，再让自动化和可视化自然接上。",
      items: [
        ["自己的服务器", "VPS、云主机、Docker 主机都可以作为目标。"],
        ["同一条部署路径", "CLI、CI、App 和未来 AI skill 使用同一个入口。"],
        ["少量概念", "先部署当前 app，再按需要加入团队和云服务。"],
      ],
    },
    cta: {
      kicker: "现在开始",
      title: "先部署一个 vibe app。",
      body: "把 localhost 上跑通的东西推到一台真正的服务器。后面再决定要不要接 GitHub Action、桌面 App 或 Cloud。",
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
      description: "Appaloft takes your vibe app from localhost to your servers, CI, and cloud.",
      title: "Appaloft - from localhost to cloud",
    },
    skipLink: "Skip to content",
    nav: {
      label: "Main navigation",
      home: "Appaloft home",
      platform: "Entries",
      loop: "Examples",
      github: "GitHub",
      console: "Console",
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
      title: "Take your vibe app to the cloud.",
      body:
        "Start from a local project, deploy to your own server with the CLI, automate releases with GitHub Actions, and open the desktop app when you want a visual surface. Later, hand more of it to AI skills or Appaloft Cloud.",
      domainDemo: {
        label: "Address publish demo",
        local: "localhost:3000",
        deploy: "appaloft deploy",
        live: "your.awesome.app",
        terminalLines: [
          "Detecting app entry",
          "Building release",
          "Uploading to target server",
          "Deployed to https://your.awesome.app 🎉",
        ],
        status: "Local preview becomes a shareable URL",
        localLabel: "Local",
        appaloftLabel: "Appaloft",
        liveLabel: "Live",
        screenReader: "Appaloft publishes http://localhost:3000 as https://your.awesome.app.",
      },
      primaryAction: "See examples",
      secondaryAction: "Download app",
      installLabel: "Install CLI",
      installCommand: "curl -fsSL https://appaloft.com/install.sh | sh",
      installNote: "Install the CLI first, then reuse the same deployment path from CI, the app, or future Cloud.",
      copyCommand: "Copy",
      copiedCommand: "Copied",
      actionsLabel: "Primary actions",
    },
    scenarios: {
      kicker: "Entry examples",
      title: "One product, a few ways in.",
      body: "The carousel moves through real entry points: command line, GitHub Actions, desktop, AI skill, and future cloud service.",
      label: "Use cases",
      items: [
        {
          key: "cli",
          label: "CLI",
          title: "Deploy from the project folder.",
          body: "When local development works, push the current app to your own server.",
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
          body: "Put the same deployment path in the repository and keep server credentials in GitHub Secrets.",
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
          body: "Inspect servers, apps, deployment records, and log entry points without returning to the terminal.",
          kind: "desktop",
          badge: "app",
          cards: [
            ["api.app", "Running", "v24 deployed 2m ago"],
            ["www.app", "Building", "GitHub push main"],
            ["worker", "Idle", "last deploy yesterday"],
          ],
        },
        {
          key: "ai",
          label: "AI skill",
          title: "Let agents reuse the same path.",
          body: "Future skills can check the environment, prepare deploys, trigger releases, and explain failures.",
          kind: "chat",
          badge: "agent",
          messages: [
            ["you", "Deploy this Next.js app to prod."],
            ["skill", "Checked Dockerfile, port, and secrets. Ready to run appaloft deploy."],
            ["skill", "Release finished. The access URL is ready."],
          ],
        },
        {
          key: "cloud",
          label: "Cloud",
          title: "Move up when hosting helps.",
          body: "Teams, permissions, previews, and a shared dashboard can live in future Appaloft Cloud.",
          kind: "cloud",
          badge: "soon",
          metrics: [
            ["Preview envs", "Soon"],
            ["Team access", "Soon"],
            ["Team dashboard", "Soon"],
          ],
        },
      ],
    },
    features: {
      kicker: "What you get",
      title: "You do not need to buy a whole platform first.",
      body: "Appaloft solves the step from localhost to a reachable environment, then lets automation and visibility attach naturally.",
      items: [
        ["Your servers", "Use a VPS, cloud VM, or Docker host as the target."],
        ["One deploy path", "CLI, CI, desktop, and future AI skills enter through the same flow."],
        ["Few concepts", "Deploy the current app first, then add team and cloud service when needed."],
      ],
    },
    cta: {
      kicker: "Start now",
      title: "Deploy one vibe app first.",
      body: "Push something that works on localhost to a real server. Decide later whether GitHub Action, desktop app, or Cloud should take over.",
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
