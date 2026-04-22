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
      description: "Appaloft 把本地跑通的应用发布到自己的服务器、自动化流程和未来云端能力里。",
      title: "Appaloft - 从本地到云端",
    },
    skipLink: "跳到正文",
    nav: {
      label: "主导航",
      home: "Appaloft 首页",
      platform: "发布路径",
      surfaces: "控制面",
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
      eyebrow: "自托管发布控制面",
      pronunciation: {
        label: "Appaloft 读音",
        name: "Appaloft",
        ipa: "/ˌæp əˈlɔːft/",
        app: "app",
        aloft: "aloft",
      },
      title: "从本地到云端。",
      body:
        "把本地跑通的项目接到你自己的服务器、CI 和未来 Cloud 能力上，用同一条发布路径完成构建、上传和上线。",
      chips: [
        {
          label: "Self-hosted",
          detail: "控制面运行在你自己的 Docker 主机上。",
        },
        {
          label: "GitHub Action",
          detail: "推送代码后沿用同一条部署路径。",
        },
        {
          label: "Desktop App",
          detail: "本地查看服务器、应用和部署记录。",
        },
        {
          label: "Agent-ready",
          detail: "后续 AI 技能也能复用这套发布入口。",
        },
      ],
      visual: {
        label: "发布路径控制面",
        kicker: "Release control deck",
        title: "一眼看清本地、发布和线上状态。",
        body: "本地命令、发布路径、线上地址和健康状态收在同一个浅色控制面里。",
        regionLabel: "Region",
        uptimeLabel: "Uptime",
        status: "Live",
        region: "iad (us-east)",
        uptime: "99.98%",
        releasePath: "Release path",
      },
      domainDemo: {
        label: "地址发布演示",
        local: "localhost:3000",
        deploy: "appaloft deploy",
        live: "api-7f3e2.appaloft.dev",
        terminalLines: [
          "检查项目",
          "打包发布产物",
          "上传到服务器",
          "健康检查通过",
        ],
        status: "本地预览变成线上地址",
        localLabel: "Local",
        appaloftLabel: "Appaloft",
        liveLabel: "Live",
        screenReader: "Appaloft 把 http://localhost:3000 发布成 https://api-7f3e2.appaloft.dev。",
      },
      primaryAction: "查看发布路径",
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
          note: "按 macOS、Linux 或 Windows 下载对应压缩包。",
        },
      ],
      copyCommand: "复制",
      copiedCommand: "已复制",
      actionsLabel: "主要操作",
    },
    highlights: {
      kicker: "一条发布路径",
      title: "先把路径打通，再决定运行在哪里。",
      body: "Appaloft 先解决本地到线上这一跳，再把自托管、自动化和未来 Cloud 放进同一套操作心智里。",
      cards: [
        {
          eyebrow: "01",
          title: "先拥有自己的控制面。",
          body: "从 Docker 主机开始，控制面、数据库和发布能力都跑在自己的基础设施上。",
        },
        {
          eyebrow: "02",
          title: "自动化沿用同一套入口。",
          body: "CLI、GitHub Action、桌面端和 AI 技能共用同一条部署路径，不再拆成多套流程。",
        },
        {
          eyebrow: "03",
          title: "Cloud 能力向上兼容。",
          body: "团队、权限、预览环境和共享仪表盘可以在未来的 Appaloft Cloud 上继续扩展。",
        },
      ],
    },
    scenarios: {
      kicker: "控制面",
      title: "同一条发布路径，覆盖不同的操作表面。",
      body: "不论你在终端、GitHub、桌面端还是后续的 AI 工作流里操作，底层都沿用同一套发布语义。",
      label: "使用场景",
      items: [
        {
          key: "docker",
          label: "Docker",
          title: "先启动自托管控制面。",
          body: "在 VPS、云主机或本机 Docker 主机上启动 Appaloft 和 PostgreSQL，把发布入口握在自己手里。",
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
          body: "把后续部署流程收进仓库，服务器凭据保存在 GitHub Secrets 里，发布逻辑仍然指向同一个控制面。",
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
          title: "打开一个本地控制台。",
          body: "查看服务器、应用、部署记录和日志入口，不必每次都回到终端找状态。",
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
          title: "让 AI 复用同一条路径。",
          body: "后续技能可以检查环境、准备发布、触发部署并解释失败原因，而不需要再拼接一套新的交互层。",
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
          title: "需要托管能力时再上移。",
          body: "团队、权限、预览环境和共享仪表盘可以继续承接到未来 Appaloft Cloud，而不是推倒重来。",
          kind: "cloud",
          badge: "soon",
          metrics: [
            ["Preview envs", "Soon"],
            ["Team access", "Soon"],
            ["Shared dashboard", "Soon"],
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
      description: "Appaloft turns the step from localhost to production into one release path across your infra, automation, and future cloud surfaces.",
      title: "Appaloft - from localhost to cloud",
    },
    skipLink: "Skip to content",
    nav: {
      label: "Main navigation",
      home: "Appaloft home",
      platform: "Release path",
      surfaces: "Surfaces",
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
      eyebrow: "Self-hosted release control plane",
      pronunciation: {
        label: "Appaloft pronunciation",
        name: "Appaloft",
        ipa: "/ˌæp əˈlɔːft/",
        app: "app",
        aloft: "aloft",
      },
      title: "From localhost to cloud.",
      body:
        "Take the project that already works on localhost and connect it to your own server, CI flow, and future cloud surfaces through one release path.",
      chips: [
        {
          label: "Self-hosted",
          detail: "Run the control plane on your own Docker host.",
        },
        {
          label: "GitHub Action",
          detail: "Reuse the exact same deployment path in CI.",
        },
        {
          label: "Desktop App",
          detail: "Inspect servers, apps, and deploy records locally.",
        },
        {
          label: "Agent-ready",
          detail: "Future AI skills can target the same release surface.",
        },
      ],
      visual: {
        label: "Release control deck",
        kicker: "Release control deck",
        title: "See local, deploy, and live state in one place.",
        body: "The local command, deployment path, live URL, and health signals sit inside one light control surface.",
        regionLabel: "Region",
        uptimeLabel: "Uptime",
        status: "Live",
        region: "iad (us-east)",
        uptime: "99.98%",
        releasePath: "Release path",
      },
      domainDemo: {
        label: "Address publish demo",
        local: "localhost:3000",
        deploy: "appaloft deploy",
        live: "api-7f3e2.appaloft.dev",
        terminalLines: [
          "Checking project",
          "Packaging release assets",
          "Uploading to server",
          "Health checks passed",
        ],
        status: "Local preview becomes a live URL",
        localLabel: "Local",
        appaloftLabel: "Appaloft",
        liveLabel: "Live",
        screenReader: "Appaloft publishes http://localhost:3000 as https://api-7f3e2.appaloft.dev.",
      },
      primaryAction: "See the release path",
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
          note: "Choose the macOS, Linux, or Windows archive.",
        },
      ],
      copyCommand: "Copy",
      copiedCommand: "Copied",
      actionsLabel: "Primary actions",
    },
    highlights: {
      kicker: "One release path",
      title: "Open the path first, then decide where it should run.",
      body: "Appaloft focuses the homepage on the jump from localhost to live, then extends that path into self-hosting, automation, and future cloud surfaces.",
      cards: [
        {
          eyebrow: "01",
          title: "Own the control plane first.",
          body: "Start on your Docker host so the control plane, database, and release flow all stay on your infrastructure.",
        },
        {
          eyebrow: "02",
          title: "Reuse the same path everywhere.",
          body: "CLI, GitHub Action, desktop, and agent workflows all target the same deployment semantics instead of splitting into separate flows.",
        },
        {
          eyebrow: "03",
          title: "Grow upward into cloud features.",
          body: "Team access, preview environments, and shared dashboards can extend into Appaloft Cloud without changing the release story.",
        },
      ],
    },
    scenarios: {
      kicker: "Control surfaces",
      title: "One deployment path across different operating surfaces.",
      body: "Whether you work from the terminal, GitHub, desktop, or future agent flows, the same release vocabulary stays underneath.",
      label: "Use cases",
      items: [
        {
          key: "docker",
          label: "Docker",
          title: "Start with the self-hosted control plane.",
          body: "Run Appaloft and PostgreSQL on a VPS, cloud VM, or local Docker host so the release path starts on infrastructure you own.",
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
          title: "Release automatically after every push.",
          body: "Keep the follow-up deployment flow in the repo, store credentials in GitHub Secrets, and still point everything at the same control plane.",
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
          body: "Inspect servers, apps, deployment records, and log entry points without returning to the terminal every time.",
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
          body: "Future skills can check the environment, prepare deploys, trigger releases, and explain failures without inventing a second interaction layer.",
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
          title: "Move up only when hosting helps.",
          body: "Teams, permissions, preview environments, and shared dashboards can layer into future Appaloft Cloud instead of forcing a reset.",
          kind: "cloud",
          badge: "soon",
          metrics: [
            ["Preview envs", "Soon"],
            ["Team access", "Soon"],
            ["Shared dashboard", "Soon"],
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
