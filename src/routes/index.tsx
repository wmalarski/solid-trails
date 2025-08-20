import { Title } from "@solidjs/meta";
import { createAsync, type RouteDefinition } from "@solidjs/router";
import { Suspense } from "solid-js";
import { getUserServerQuery } from "~/modules/auth/actions";

export const route = {
  load: async () => {
    await getUserServerQuery();
  },
} satisfies RouteDefinition;

export default function Home() {
  const user = createAsync(() => getUserServerQuery());

  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      <p>Visit to learn how to build SolidStart apps.</p>
      <Suspense>
        <pre>{JSON.stringify(user(), null, 2)}</pre>
      </Suspense>
    </main>
  );
}
