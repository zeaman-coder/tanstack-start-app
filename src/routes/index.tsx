import { signIn, signOut } from "@/lib/auth_client";
import { createFileRoute } from "@tanstack/solid-router";
import { createServerFn } from "@tanstack/solid-start";
import { Show } from "solid-js";

export const getServerSession = createServerFn({ method: "GET" }).handler(
  async ({ context }) => {
    return context.session;
  },
);

export const Route = createFileRoute("/")({
  beforeLoad: () => getServerSession(),
  component: Home,
});

function Home() {
  const data = Route.useRouteContext();

  return (
    <div class="p-4 space-y-3">
      <Show when={data()?.user}>
        <h3>Welcome Home, {data()?.user?.name ?? ""}!</h3>

        <button onClick={() => signOut()}>Logout</button>
      </Show>
      <Show when={!data()?.user}>
        <h3>Please, Signin!</h3>
        <section>
          <button onClick={() => signIn()}>Login</button>
        </section>
      </Show>
    </div>
  );
}
