import { betterAuth, type BetterAuthOptions } from "better-auth";
import { organization } from "better-auth/plugins";
import { PostgresDialect } from "kysely";
import { Pool } from "pg";

const defaultAuthBaseUrl = "http://localhost:4321";
const defaultAuthSecret = "development-only-appaloft-better-auth-secret-change-me";

function readEnv(...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = process.env[key]?.trim();

    if (value) {
      return value;
    }
  }

  return undefined;
}

function readEnvList(...keys: string[]): string[] {
  return (
    readEnv(...keys)
      ?.split(",")
      .map((value) => value.trim())
      .filter(Boolean) ?? []
  );
}

function readBooleanEnv(...keys: string[]): boolean {
  const value = readEnv(...keys)?.toLowerCase();

  return value === "1" || value === "true" || value === "yes";
}

function createDatabaseConfig(): BetterAuthOptions["database"] | undefined {
  const databaseUrl = readEnv("APPALOFT_BETTER_AUTH_DATABASE_URL", "APPALOFT_DATABASE_URL", "DATABASE_URL");

  if (!databaseUrl) {
    return undefined;
  }

  return {
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: databaseUrl,
      }),
    }),
    type: "postgres",
  };
}

const githubClientId = readEnv("APPALOFT_GITHUB_CLIENT_ID", "GITHUB_CLIENT_ID");
const githubClientSecret = readEnv("APPALOFT_GITHUB_CLIENT_SECRET", "GITHUB_CLIENT_SECRET");
const cookieDomain = readEnv("APPALOFT_BETTER_AUTH_COOKIE_DOMAIN");
const trustedOrigins = readEnvList("APPALOFT_BETTER_AUTH_TRUSTED_ORIGINS", "BETTER_AUTH_TRUSTED_ORIGINS");
const cookiePrefix = readEnv("APPALOFT_BETTER_AUTH_COOKIE_PREFIX") ?? "better-auth";
const authDatabase = createDatabaseConfig();

export const isGitHubAuthConfigured = Boolean(githubClientId && githubClientSecret);

export const auth = betterAuth({
  appName: "Appaloft",
  baseURL: readEnv("APPALOFT_BETTER_AUTH_URL", "BETTER_AUTH_URL") ?? defaultAuthBaseUrl,
  basePath: "/api/auth",
  secret: readEnv("APPALOFT_BETTER_AUTH_SECRET", "BETTER_AUTH_SECRET", "AUTH_SECRET") ?? defaultAuthSecret,
  ...(authDatabase ? { database: authDatabase } : {}),
  ...(trustedOrigins.length ? { trustedOrigins } : {}),
  account: {
    storeAccountCookie: true,
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [organization()],
  advanced: {
    cookiePrefix,
    trustedProxyHeaders: readBooleanEnv("APPALOFT_BETTER_AUTH_TRUSTED_PROXY_HEADERS"),
    ...(cookieDomain
      ? {
          crossSubDomainCookies: {
            enabled: true,
            domain: cookieDomain,
          },
        }
      : {}),
  },
  ...(githubClientId && githubClientSecret
    ? {
        socialProviders: {
          github: {
            clientId: githubClientId,
            clientSecret: githubClientSecret,
          },
        },
      }
    : {}),
});
