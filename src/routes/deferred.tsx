import { Await, createFileRoute } from "@tanstack/solid-router";
import { createServerFn } from "@tanstack/solid-start";
import { Suspense } from "solid-js";

const getGreeting = createServerFn({ method: "GET" })
  .inputValidator((d: string) => d)
  .handler(async ({ data: name }) => {
    return { name };
  });

export const Route = createFileRoute("/deferred")({
  loader: async () => {
    console.log(process.env);

    return {
      greeting: getGreeting({ data: "ZeAmanuel" }),
    };
  },
  component: Deferred,
});

function Deferred() {
  const loaderData = Route.useLoaderData();

  return (
    <div class="p-2">
      <Suspense fallback={<div>Loading person...</div>}>
        <Await
          promise={loaderData().greeting}
          children={(data) => <div>Hello, {data.name}</div>}
        />
      </Suspense>
    </div>
  );
}
