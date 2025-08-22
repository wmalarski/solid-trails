import { Title } from "@solidjs/meta";
import { Suspense } from "solid-js";
import { useAthleteContext } from "~/auth/athlete-context";

export default function Home() {
  const athlete = useAthleteContext();

  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      <p>Visit to learn how to build SolidStart apps.</p>
      <Suspense>
        <pre>{JSON.stringify(athlete(), null, 2)}</pre>
      </Suspense>
    </main>
  );
}
