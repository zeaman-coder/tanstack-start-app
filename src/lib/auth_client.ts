import { createAuthClient } from "better-auth/solid";

export const authClient = createAuthClient({
  baseURL: import.meta.env.PUBLIC_BETTER_AUTH_URL,
});

export async function signIn() {
  await authClient.signIn.social({
    provider: "github",
    callbackURL: "/",
    errorCallbackURL: "/",
    newUserCallbackURL: "/",
  });
}
export async function signOut() {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        location.replace("/");
      },
    },
  });
}
