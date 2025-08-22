import { Suspense } from "solid-js";
import { useAthleteContext } from "~/auth/athlete-context";
import { TrailsBoard } from "~/modules/trails/trails-board";
import { css } from "~/styled-system/css";

export default function Home() {
  const athlete = useAthleteContext();

  return (
    <>
      <TrailsBoard />

      <Suspense>
        <pre class={css({ overflowX: "hidden", w: "80" })}>
          {JSON.stringify(athlete(), null, 2)}
        </pre>
      </Suspense>
    </>
  );
}
