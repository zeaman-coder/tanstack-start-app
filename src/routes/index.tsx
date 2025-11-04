import { createFileRoute } from "@tanstack/solid-router";
import { createServerFn } from "@tanstack/solid-start";

const getData = createServerFn().handler(() => {
  console.log(process.env);

  return {
    message: `Running in ${navigator.userAgent}`,
  };
});

export const Route = createFileRoute("/")({
  loader: () => getData(),
  component: Home,
});

function Home() {
  const data = Route.useLoaderData();

  return (
    <div class="p-2">
      <h3>Welcome Home!!!</h3>
      <p>{data().message}</p>
    </div>
  );
}
