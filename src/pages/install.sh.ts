const installScriptUrl =
  "https://github.com/appaloft/appaloft/releases/latest/download/install.sh";

export const prerender = false;

export function GET() {
  return Response.redirect(installScriptUrl, 302);
}
