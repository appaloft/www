import { authClient } from "../lib/auth-client";
import {
  appaloftLocaleCookieMaxAge,
  appaloftLocaleCookieName,
  appaloftLocaleHeader,
  appaloftLocaleStorageKey,
} from "../lib/locale-constants";

type AuthCopy = {
  connectGithub: string;
  connecting: string;
  connected: string;
  signedIn: string;
  signedOut: string;
  unavailable: string;
};

type SessionData = {
  user?: {
    email?: string | null;
    name?: string | null;
  } | null;
} | null;

type AccountData = {
  providerId?: string;
};

function readCopy(widget: HTMLElement): AuthCopy {
  const { dataset } = widget;

  return {
    connectGithub: dataset.authConnectGithub ?? "Connect GitHub",
    connecting: dataset.authConnecting ?? "Connecting...",
    connected: dataset.authConnected ?? "GitHub connected",
    signedIn: dataset.authSignedIn ?? "Signed in",
    signedOut: dataset.authSignedOut ?? "Signed out",
    unavailable: dataset.authUnavailable ?? "Auth unavailable",
  };
}

function readSessionIdentity(session: SessionData): string | null {
  const user = session?.user;

  return user?.name || user?.email || null;
}

function readGitHubConnected(accounts: AccountData[] | null | undefined): boolean {
  return Boolean(accounts?.some((account) => account?.providerId === "github"));
}

function buildFetchHeaders(locale: string): HeadersInit {
  return {
    [appaloftLocaleHeader]: locale,
  };
}

function setStatus(node: HTMLElement | null, message: string) {
  if (node) {
    node.textContent = message;
  }
}

async function getSession(locale: string): Promise<SessionData> {
  const response = await authClient.getSession({
    fetchOptions: {
      headers: buildFetchHeaders(locale),
    },
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

async function getAccounts(locale: string): Promise<AccountData[]> {
  const response = await authClient.listAccounts({
    fetchOptions: {
      headers: buildFetchHeaders(locale),
    },
  });

  if (response.error) {
    return [];
  }

  return response.data ?? [];
}

function persistLocale(locale: string | null) {
  if (!locale) {
    return;
  }

  try {
    window.localStorage.setItem(appaloftLocaleStorageKey, locale);
  } catch {
    // Storage can be blocked in private or restricted contexts.
  }

  const domain = document.documentElement.dataset.localeCookieDomain;
  const cookie = [
    `${appaloftLocaleCookieName}=${encodeURIComponent(locale)}`,
    "Path=/",
    `Max-Age=${appaloftLocaleCookieMaxAge}`,
    "SameSite=Lax",
    window.location.protocol === "https:" ? "Secure" : "",
    domain ? `Domain=${domain}` : "",
  ]
    .filter(Boolean)
    .join("; ");

  document.cookie = cookie;
}

function handleAuthRedirect(response: { url?: string } | null | undefined): boolean {
  if (!response?.url) {
    return false;
  }

  window.location.href = response.url;
  return true;
}

function initAuthWidget(widget: HTMLElement) {
  const locale = widget.dataset.authLocale ?? document.documentElement.dataset.locale ?? "zh-CN";
  const githubConfigured = widget.dataset.authGithubConfigured === "true";
  const copy = readCopy(widget);
  const statusNode = widget.querySelector<HTMLElement>("[data-auth-status]");
  const connectButton = widget.querySelector<HTMLButtonElement>("[data-auth-connect]");

  async function refreshAuthStatus() {
    persistLocale(locale);

    if (!githubConfigured) {
      connectButton?.setAttribute("hidden", "");
      if (statusNode?.textContent?.trim() === copy.signedOut) {
        statusNode.hidden = true;
      }
      return {
        githubConnected: false,
        session: null,
      };
    }

    try {
      const session = await getSession(locale);
      const accounts = session ? await getAccounts(locale) : [];
      const githubConnected = readGitHubConnected(accounts);
      const identity = readSessionIdentity(session);

      if (connectButton) {
        connectButton.hidden = githubConnected;
      }

      if (statusNode) {
        statusNode.hidden = false;
      }

      if (githubConnected) {
        setStatus(statusNode, copy.connected);
      } else if (identity) {
        setStatus(statusNode, `${copy.signedIn}: ${identity}`);
      } else {
        setStatus(statusNode, copy.signedOut);
      }

      return {
        githubConnected,
        session,
      };
    } catch {
      connectButton?.setAttribute("hidden", "");
      setStatus(statusNode, copy.unavailable);

      return {
        githubConnected: false,
        session: null,
      };
    }
  }

  async function connectGitHub() {
    if (!connectButton || !githubConfigured) {
      return;
    }

    connectButton.disabled = true;
    connectButton.textContent = copy.connecting;

    try {
      const current = await refreshAuthStatus();
      const authRequest = {
        provider: "github" as const,
        callbackURL: window.location.href,
        scopes: ["read:user", "user:email"],
        disableRedirect: true,
        fetchOptions: {
          headers: buildFetchHeaders(locale),
        },
      };
      const response =
        current.session && !current.githubConnected
          ? await authClient.linkSocial(authRequest)
          : await authClient.signIn.social(authRequest);

      if (response.error) {
        throw response.error;
      }

      if (handleAuthRedirect(response.data)) {
        return;
      }

      await refreshAuthStatus();
    } catch {
      setStatus(statusNode, copy.unavailable);
    } finally {
      connectButton.disabled = false;
      connectButton.textContent = copy.connectGithub;
    }
  }

  connectButton?.addEventListener("click", () => {
    void connectGitHub();
  });

  void refreshAuthStatus();
}

document.querySelectorAll<HTMLElement>("[data-auth-widget]").forEach(initAuthWidget);

document.querySelectorAll<HTMLAnchorElement>("[data-locale-link]").forEach((link) => {
  link.addEventListener("click", () => {
    persistLocale(link.getAttribute("data-locale-link"));
  });
});
