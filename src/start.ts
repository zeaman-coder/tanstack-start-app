// src/start.ts
import { createMiddleware, createStart } from "@tanstack/solid-start";
import { auth } from "@/lib/auth";

const sessionMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    return await next({
      context: {
        session,
      },
    });
  },
);

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [sessionMiddleware],
  };
});
