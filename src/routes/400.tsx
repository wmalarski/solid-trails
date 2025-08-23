import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";

export default function ErrorPage() {
  return (
    <main>
      <Title>Something went wrong</Title>
      <HttpStatusCode code={40} />
      <h1>Something went wrong</h1>
    </main>
  );
}
