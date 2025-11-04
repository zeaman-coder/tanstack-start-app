import { drizzle } from "drizzle-orm/libsql/web";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "./schema";

export const db = drizzle({
  connection: {
    url: import.meta.env.DEV
      ? "http://127.0.0.1:8080"
      : "libsql://db-aman-coder28.aws-eu-west-1.turso.io",
    authToken: process.env.DATABASE_TOKEN,
  },
});

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    },
  },
});

export type Session = typeof auth.$Infer.Session;
