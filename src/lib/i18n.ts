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
      description: "Appaloft 用 Docker self-host stack 帮你管理自己的部署控制面、CI 和云端入口。",
      title: "Appaloft - Docker self-host deployment control plane",
    },
    skipLink: "跳到正文",
    nav: {
      label: "主导航",
      home: "Appaloft 首页",
      platform: "部署方式",
      loop: "流程",
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
      title: "用 Docker 自托管 Appaloft。",
      body:
        "一条命令安装或校验 Docker，写入 Compose stack，启动 Appaloft API、控制台和 PostgreSQL。之后再接 GitHub Actions、桌面 App 或未来 Cloud。",
      domainDemo: {
        label: "Docker 自托管演示",
        local: "localhost:3001",
        deploy: "curl https://appaloft.com/install.sh | sudo sh",
        live: "appaloft.your.host",
        terminalLines: [
          "检查 Docker Engine",
          "写入 Compose 配置",
          "启动 API、控制台和 PostgreSQL",
          "Appaloft 已运行在 http://localhost:3001",
        ],
        status: "自托管控制面已启动",
        localLabel: "Local",
        appaloftLabel: "Appaloft",
        liveLabel: "Live",
        screenReader: "Appaloft installer 在 Docker 中启动 API、控制台和 PostgreSQL。",
      },
      primaryAction: "看安装流程",
      secondaryAction: "查看发布",
      installLabel: "安装 Docker stack",
      installCommand: "curl -fsSL https://appaloft.com/install.sh | sudo sh",
      installNote: "默认写入 /opt/appaloft 并启动 Appaloft + PostgreSQL；生产机器可以先装 Docker，再加 --skip-docker-install。",
      copyCommand: "复制",
      copiedCommand: "已复制",
      actionsLabel: "主要操作",
    },
    scenarios: {
      kicker: "部署方式",
      title: "先 self-host，再接自动化。",
      body: "自动轮播的是实际入口：Docker installer、GitHub Actions、桌面端、AI skill 和未来云服务。",
      label: "使用场景",
      items: [
        {
          key: "docker",
          label: "Docker",
          title: "启动自托管控制面。",
          body: "在 VPS、云主机或本机 Docker host 上启动 Appaloft 和 PostgreSQL。",
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
          title: "push 后自动发版。",
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
            ["you", "把 Appaloft self-host stack 装到这台服务器。"],
            ["skill", "已检查 Docker、端口和 secrets，准备运行 installer。"],
            ["skill", "安装完成，控制台和 API 已启动。"],
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
      title: "先跑起来，再扩展。",
      body: "Appaloft 先给你一个可自托管的控制面，再让自动化和可视化自然接上。",
      items: [
        ["Docker 自托管", "VPS、云主机、本机 Docker host 都可以先跑同一套 Compose stack。"],
        ["可固定版本", "--version 绑定到指定 GHCR 镜像，重复安装会复用已有 PostgreSQL 密码。"],
        ["后续接入", "CI、桌面 App 和未来 AI skill 可以复用这个控制面。"],
      ],
    },
    cta: {
      kicker: "现在开始",
      title: "先跑起 Appaloft。",
      body: "把控制面和 Postgres 部署到一台 Docker 主机上，再决定怎么接 CI、桌面 App 或 Cloud。",
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
      description: "Appaloft gives you a Docker self-host stack for your deployment control plane, CI, and cloud entry points.",
      title: "Appaloft - Docker self-host deployment control plane",
    },
    skipLink: "Skip to content",
    nav: {
      label: "Main navigation",
      home: "Appaloft home",
      platform: "Deploy paths",
      loop: "Flow",
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
      title: "Self-host Appaloft with Docker.",
      body:
        "One command installs or verifies Docker, writes a Compose stack, and starts the Appaloft API, console, and PostgreSQL. Add GitHub Actions, the desktop app, or future Cloud later.",
      domainDemo: {
        label: "Docker self-host demo",
        local: "localhost:3001",
        deploy: "curl https://appaloft.com/install.sh | sudo sh",
        live: "appaloft.your.host",
        terminalLines: [
          "Checking Docker Engine",
          "Writing Compose config",
          "Starting API, console, and PostgreSQL",
          "Appaloft is running at http://localhost:3001",
        ],
        status: "Self-hosted control plane is running",
        localLabel: "Local",
        appaloftLabel: "Appaloft",
        liveLabel: "Live",
        screenReader: "The Appaloft installer starts the API, console, and PostgreSQL in Docker.",
      },
      primaryAction: "See install flow",
      secondaryAction: "View releases",
      installLabel: "Install Docker stack",
      installCommand: "curl -fsSL https://appaloft.com/install.sh | sudo sh",
      installNote: "Defaults to /opt/appaloft and starts Appaloft + PostgreSQL. On hardened hosts, preinstall Docker and add --skip-docker-install.",
      copyCommand: "Copy",
      copiedCommand: "Copied",
      actionsLabel: "Primary actions",
    },
    scenarios: {
      kicker: "Deploy paths",
      title: "Self-host first, automate next.",
      body: "The carousel moves through real entry points: Docker installer, GitHub Actions, desktop, AI skill, and future cloud service.",
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
    features: {
      kicker: "What you get",
      title: "Start small, then expand.",
      body: "Appaloft gives you a self-hosted control plane first, then lets automation and visibility attach naturally.",
      items: [
        ["Docker self-host", "Use a VPS, cloud VM, or local Docker host for the same Compose stack."],
        ["Pinned releases", "--version maps to a specific GHCR image, and reinstalls reuse the existing PostgreSQL password."],
        ["Follow-up entry points", "CI, desktop, and future AI skills can reuse the same control plane."],
      ],
    },
    cta: {
      kicker: "Start now",
      title: "Run Appaloft first.",
      body: "Deploy the control plane and Postgres to a Docker host, then decide how CI, desktop, or Cloud should connect.",
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
