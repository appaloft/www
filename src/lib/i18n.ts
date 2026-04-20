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
      description: "Appaloft 帮你把本地跑通的 app 发布到自己的服务器或云端环境。",
      title: "Appaloft - 从本地到云端",
    },
    skipLink: "跳到正文",
    nav: {
      label: "主导航",
      home: "Appaloft 首页",
      platform: "部署方式",
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
      title: "从本地到云端。",
      body:
        "连接你的服务器或云主机，用 CLI 把本地跑通的项目构建、上传并发布出去。",
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
      installLabel: "安装 Docker 部署栈",
      installCommand: "curl -fsSL https://appaloft.com/install.sh | sudo sh",
      installNote: "默认写入 /opt/appaloft 并启动 Appaloft + PostgreSQL；生产机器可以先装 Docker，再加 --skip-docker-install。",
      copyCommand: "复制",
      copiedCommand: "已复制",
      actionsLabel: "主要操作",
    },
    scenarios: {
      kicker: "部署路径",
      title: "自托管控制面，统一发布入口。",
      body: "控制面运行在自己的 Docker 主机上，CI、桌面端、AI 技能和 Cloud 沿用同一套发布路径。",
      label: "使用场景",
      items: [
        {
          key: "docker",
          label: "Docker",
          title: "启动自托管控制面。",
          body: "在 VPS、云主机或本机 Docker 主机上启动 Appaloft 和 PostgreSQL。",
          kind: "code",
          badge: "docker",
          lines: [
            "curl -fsSL https://appaloft.com/install.sh | sudo sh",
            "cd /opt/appaloft",
            "docker compose --env-file .env -p appaloft ps",
            "curl http://localhost:3001/api/health",
          ],
        },
        {
          key: "action",
          label: "GitHub Action",
          title: "代码推送后自动发布。",
          body: "把后续部署流程放进仓库，服务器凭据留在 GitHub Secrets。",
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
          label: "桌面端",
          title: "使用本地桌面控制台。",
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
          label: "AI 技能",
          title: "让 AI 复用发布路径。",
          body: "后续的 AI 技能可以检查环境、生成部署计划、触发发布并解释失败原因。",
          kind: "chat",
          badge: "agent",
          messages: [
            ["you", "把 Appaloft 自托管部署栈装到这台服务器。"],
            ["skill", "已检查 Docker、端口和密钥，准备运行安装脚本。"],
            ["skill", "安装完成，控制台和 API 已启动。"],
          ],
        },
        {
          key: "cloud",
          label: "Cloud",
          title: "需要托管能力时迁移到 Cloud。",
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
    footer: {
      text: "From localhost to cloud.",
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
      platform: "Deploy paths",
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
      title: "From localhost to cloud.",
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
      installLabel: "Install Docker stack",
      installCommand: "curl -fsSL https://appaloft.com/install.sh | sudo sh",
      installNote: "Defaults to /opt/appaloft and starts Appaloft + PostgreSQL. On hardened hosts, preinstall Docker and add --skip-docker-install.",
      copyCommand: "Copy",
      copiedCommand: "Copied",
      actionsLabel: "Primary actions",
    },
    scenarios: {
      kicker: "Deploy paths",
      title: "One release path across self-hosting, automation, and cloud.",
      body: "Run the control plane on your Docker host first, then let CI, desktop, AI skills, and Cloud reuse the same publishing path.",
      label: "Use cases",
      items: [
        {
          key: "docker",
          label: "Docker",
          title: "Start the self-hosted control plane.",
          body: "Run Appaloft and PostgreSQL on a VPS, cloud VM, or local Docker host.",
          kind: "code",
          badge: "docker",
          lines: [
            "curl -fsSL https://appaloft.com/install.sh | sudo sh",
            "cd /opt/appaloft",
            "docker compose --env-file .env -p appaloft ps",
            "curl http://localhost:3001/api/health",
          ],
        },
        {
          key: "action",
          label: "GitHub Action",
          title: "Release after every push.",
          body: "Put the follow-up deployment flow in the repository and keep server credentials in GitHub Secrets.",
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
            ["you", "Install the Appaloft self-host stack on this server."],
            ["skill", "Checked Docker, ports, and secrets. Ready to run the installer."],
            ["skill", "Install finished. The console and API are running."],
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
    footer: {
      text: "From localhost to cloud.",
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
