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

## Production deployment

Production deploys are handled by `.github/workflows/deploy.yml` with `appaloft/deploy-action@v1`
and Appaloft CLI `v0.2.12`.

Required GitHub repository variables:

- `APPALOFT_SSH_HOST`: `107.173.15.220`
- `APPALOFT_SSH_USER`: SSH login user for the target server

Required GitHub repository secrets:

- `APPALOFT_SSH_PRIVATE_KEY`: private key for the target server
- `APPALOFT_BETTER_AUTH_SECRET`: Better Auth runtime secret

`appaloft.yml` deploys the Astro standalone server to `www.appaloft.com` and `appaloft.com`.

## Pull request previews

Pull request previews are handled by `.github/workflows/preview.yml` with `appaloft/setup-appaloft@v1`
and Appaloft CLI `v0.2.12`.

The workflow runs on `pull_request` `opened`, `reopened`, and `synchronize` events after the workflow
exists on the default branch. It skips fork pull requests so repository secrets are not exposed to
untrusted code.

Preview deploys pass preview-specific runtime, network, auth, secret, and route settings directly to
the CLI. The workflow does not generate a second deployment config file. Fields that differ from
production are set explicitly with flags, including:

```text
--method workspace-commands
--runtime-name appaloft-preview-<pull-request-number>
--port 4321
--upstream-protocol http
--exposure-mode reverse-proxy
--env APPALOFT_BETTER_AUTH_URL=http://<pull-request-number>.preview.appaloft.com
--secret APPALOFT_BETTER_AUTH_SECRET=ci-env:APPALOFT_BETTER_AUTH_SECRET
--preview pull-request
--preview-id pr-<pull-request-number>
--preview-domain-template <pull-request-number>.preview.appaloft.com
--preview-tls-mode disabled
--require-preview-url
```

The preview workflow passes a fully rendered runtime name on the CLI instead of a template literal,
so preview runtime/container names use `appaloft-preview-<pull-request-number>` without relying on
runtime-name template rendering at the CLI flag boundary.

Preview URLs use this shape:

```text
http://<pull-request-number>.preview.appaloft.com
```

Custom preview DNS must point to the Appaloft target server before a preview host can resolve:

```text
*.preview.appaloft.com -> 107.173.15.220
```

This is an Action-owned preview path. Product-level preview environments should later move policy,
comments/checks, cleanup, quotas, and scoped preview secrets into Appaloft itself, likely through a
GitHub App plus Appaloft control-plane or agent workflow.

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
