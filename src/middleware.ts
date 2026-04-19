import { defineMiddleware } from "astro:middleware";

import { auth } from "./auth";

export const onRequest = defineMiddleware(async (context, next) => {
  try {
    const session = await auth.api.getSession({
      headers: context.request.headers,
    });

    context.locals.user = session?.user ?? null;
    context.locals.session = session?.session ?? null;
  } catch {
    context.locals.user = null;
    context.locals.session = null;
  }

  return next();
});
