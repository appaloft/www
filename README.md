# Appaloft Website

Astro website for the Appaloft official website.

## Commands

```bash
bun install
bun run dev
bun run build
bun run preview
```

Generated image assets live in `public/images/`.

## i18n and auth

- locale copy is served through `i18next`
- `/` renders the default `zh-CN` locale
- `/zh-CN/` and `/en-US/` render localized pages
- the language switch stores the same `appaloft.locale` key used by the main Appaloft console
- Better Auth is mounted at `/api/auth/*` with the Astro catch-all route
- the GitHub button uses the vanilla Better Auth client and calls GitHub OAuth through `/api/auth/sign-in/social`
- set `PUBLIC_APPALOFT_CONSOLE_URL` when the console URL is different from `/deploy`

Use the same Better Auth secret, cookie prefix, and auth database as the main Appaloft deployment when
www and the app need to share login state:

```bash
APPALOFT_BETTER_AUTH_URL=http://localhost:4321
APPALOFT_BETTER_AUTH_SECRET=change-me-in-production
APPALOFT_BETTER_AUTH_COOKIE_PREFIX=better-auth
APPALOFT_BETTER_AUTH_COOKIE_DOMAIN=.appaloft.com
APPALOFT_BETTER_AUTH_TRUSTED_ORIGINS=https://www.appaloft.com,https://app.appaloft.com
APPALOFT_LOCALE_COOKIE_DOMAIN=.appaloft.com
APPALOFT_DATABASE_URL=postgres://postgres:postgres@localhost:5432/appaloft
APPALOFT_GITHUB_CLIENT_ID=...
APPALOFT_GITHUB_CLIENT_SECRET=...
```

The website writes the shared language preference to `appaloft.locale` as both local storage and a
non-HTTP-only cookie so the main app can keep the same UI language.

The GitHub OAuth callback URL for this site is:

```text
<APPALOFT_BETTER_AUTH_URL>/api/auth/callback/github
```
