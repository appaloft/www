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
          "已上线 https://your.awesome.app 🎉",
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
      installOptions: [
        {
          key: "docker",
          label: "Docker",
          title: "安装自托管部署栈",
          command: "curl -fsSL https://appaloft.com/install.sh | sudo sh",
          note: "部署控制面和 PostgreSQL，适合 VPS、云主机或本机 Docker 主机。",
        },
        {
          key: "brew",
          label: "Homebrew",
          title: "安装 CLI",
          command: "brew install appaloft/tap/appaloft",
          note: "适合 macOS 和 Linux。桌面端可以用 brew install --cask appaloft/tap/appaloft-desktop。",
        },
        {
          key: "npm",
          label: "npm",
          title: "安装 CLI",
          command: "npm install -g @appaloft/cli",
          note: "适合已经有 Node.js 的环境，安装后可直接运行 appaloft。",
        },
        {
          key: "binary",
          label: "二进制",
          title: "按系统下载",
          command: "https://github.com/appaloft/appaloft/releases/latest",
          note: "按 macOS、Linux 或 Windows 下载对应压缩包；自动识别系统的安装脚本需要由主仓库 release 提供。",
        },
      ],
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
          key: "ai",
          label: "AI",
          title: "让 AI 直接复用同一条发布路径。",
          body: "把环境检查、部署计划、健康检查和触发发布放进同一个对话里，让后续的 AI 工作流不只是解释，还能操作。",
          kind: "image",
          badge: "agent",
          points: [
            "先检查 Docker、端口、环境变量和密钥状态",
            "生成 deploy plan，再决定是否触发发布",
            "把 health、deploy、logs 放在一个可追踪的操作面板里",
          ],
          lines: null,
          imageSrc: "/images/appaloft-ai-assistant.png",
          imageAlt: "Appaloft AI 助手界面，展示部署对话、健康检查结果和最近发布记录。",
          metrics: null,
        },
        {
          key: "docker",
          label: "Docker",
          title: "启动自托管控制面。",
          body: "在 VPS、云主机或本机 Docker 主机上启动 Appaloft 和 PostgreSQL。",
          kind: "code",
          badge: "docker",
          points: [
            "先把控制面跑起来，再让其他入口都走同一条发布链路",
            "装完后可直接检查 compose 状态和 health 端点",
            "适合本机、VPS 或自己的云主机环境",
          ],
          lines: [
            "curl -fsSL https://appaloft.com/install.sh | sudo sh",
            "cd /opt/appaloft",
            "docker compose --env-file .env -p appaloft ps",
            "curl http://localhost:3001/api/health",
          ],
          imageSrc: null,
          imageAlt: null,
          metrics: null,
        },
        {
          key: "action",
          label: "GitHub Action",
          title: "代码推送后自动发布。",
          body: "把后续部署流程放进仓库，服务器凭据留在 GitHub Secrets。",
          kind: "code",
          badge: "github",
          points: [
            "把部署动作放进 CI，减少手动登录服务器",
            "凭据统一留在 GitHub Secrets，发布动作可审计",
            "和本地、桌面端、AI 助手共用同一套控制面接口",
          ],
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
          imageSrc: null,
          imageAlt: null,
          metrics: null,
        },
        {
          key: "desktop",
          label: "桌面端",
          title: "使用本地桌面控制台。",
          body: "看服务器、应用、部署记录和日志入口，不必每次回到终端。",
          kind: "image",
          badge: "desktop",
          points: [
            "同一个界面里查看 Overview、Apps、Deploys、Health、Logs、Secrets",
            "适合快速确认 API、Web 和 worker 当前是否健康",
            "把“看状态”和“进日志”这两个动作做得更直接",
          ],
          lines: null,
          imageSrc: "/images/appaloft-desktop-console.png",
          imageAlt: "Appaloft 桌面端控制台，展示总览、健康状态、最近发布和服务列表。",
          metrics: null,
        },
        {
          key: "cloud",
          label: "Cloud",
          title: "需要托管能力时迁移到 Cloud。",
          body: "团队、权限、预览环境和协作仪表盘可以放到未来 Appaloft Cloud。",
          kind: "cloud",
          badge: "soon",
          points: [
            "保留同一套发布路径，按需再切到托管协作能力",
            "把团队访问、预览环境和共享仪表盘放到云端",
            "先把自托管链路跑顺，再决定是否上云",
          ],
          lines: null,
          imageSrc: null,
          imageAlt: null,
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
          "Live at https://your.awesome.app 🎉",
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
      installOptions: [
        {
          key: "docker",
          label: "Docker",
          title: "Install the self-hosted stack",
          command: "curl -fsSL https://appaloft.com/install.sh | sudo sh",
          note: "Deploys the control plane and PostgreSQL on a VPS, cloud VM, or local Docker host.",
        },
        {
          key: "brew",
          label: "Homebrew",
          title: "Install the CLI",
          command: "brew install appaloft/tap/appaloft",
          note: "Works on macOS and Linux. The desktop app is available with brew install --cask appaloft/tap/appaloft-desktop.",
        },
        {
          key: "npm",
          label: "npm",
          title: "Install the CLI",
          command: "npm install -g @appaloft/cli",
          note: "Best when Node.js is already part of the environment. Run appaloft after install.",
        },
        {
          key: "binary",
          label: "Binary",
          title: "Download for your OS",
          command: "https://github.com/appaloft/appaloft/releases/latest",
          note: "Choose the macOS, Linux, or Windows archive. A system-detecting install script should be shipped from the main repository release.",
        },
      ],
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
          key: "ai",
          label: "AI",
          title: "Let AI reuse the same deploy path directly.",
          body: "Keep environment checks, deploy plans, health checks, and release triggers in one conversation so future AI workflows can operate, not just explain.",
          kind: "image",
          badge: "agent",
          points: [
            "Check Docker, ports, env, and secrets before taking action",
            "Draft a deploy plan before triggering a release",
            "Keep health, deploy, and logs in one operational surface",
          ],
          lines: null,
          imageSrc: "/images/appaloft-ai-assistant.png",
          imageAlt: "Appaloft AI assistant showing deployment conversation, health checks, and recent deploy records.",
          metrics: null,
        },
        {
          key: "docker",
          label: "Docker",
          title: "Start the self-hosted control plane.",
          body: "Run Appaloft and PostgreSQL on a VPS, cloud VM, or local Docker host.",
          kind: "code",
          badge: "docker",
          points: [
            "Bring up the control plane first, then let every other path reuse it",
            "Check compose status and the health endpoint right after install",
            "Works on a laptop, VPS, or your own cloud VM",
          ],
          lines: [
            "curl -fsSL https://appaloft.com/install.sh | sudo sh",
            "cd /opt/appaloft",
            "docker compose --env-file .env -p appaloft ps",
            "curl http://localhost:3001/api/health",
          ],
          imageSrc: null,
          imageAlt: null,
          metrics: null,
        },
        {
          key: "action",
          label: "GitHub Action",
          title: "Release after every push.",
          body: "Put the follow-up deployment flow in the repository and keep server credentials in GitHub Secrets.",
          kind: "code",
          badge: "github",
          points: [
            "Move repeatable deploy steps into CI instead of manual SSH sessions",
            "Keep credentials in GitHub Secrets with an auditable release path",
            "Reuse the same control plane path as local, desktop, and AI flows",
          ],
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
          imageSrc: null,
          imageAlt: null,
          metrics: null,
        },
        {
          key: "desktop",
          label: "Desktop App",
          title: "Open a local control surface.",
          body: "Inspect servers, apps, deployment records, and log entry points without returning to the terminal.",
          kind: "image",
          badge: "desktop",
          points: [
            "See Overview, Apps, Deploys, Health, Logs, and Secrets together",
            "Quickly confirm whether API, web, and worker services are healthy",
            "Make status checks and log entry points easier to reach",
          ],
          lines: null,
          imageSrc: "/images/appaloft-desktop-console.png",
          imageAlt: "Appaloft desktop console showing overview, health, recent deploys, and service status.",
          metrics: null,
        },
        {
          key: "cloud",
          label: "Cloud",
          title: "Move up when hosting helps.",
          body: "Teams, permissions, previews, and a shared dashboard can live in future Appaloft Cloud.",
          kind: "cloud",
          badge: "soon",
          points: [
            "Keep the same release path and add hosted collaboration later",
            "Move team access, previews, and shared dashboards into cloud space",
            "Prove the self-hosted path first, then migrate when it helps",
          ],
          lines: null,
          imageSrc: null,
          imageAlt: null,
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
