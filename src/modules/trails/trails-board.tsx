import { createAsync } from "@solidjs/router";
import { type Component, Suspense } from "solid-js";
import { css } from "~/styled-system/css";
import { listAthleteActivitiesServerQuery } from "./actions";

export const TrailsBoard: Component = () => {
  const activities = createAsync(() => listAthleteActivitiesServerQuery({}));

  return (
    <Suspense>
      <pre class={css({ overflowX: "hidden", w: "80" })}>
        {JSON.stringify(activities(), null, 2)}
      </pre>
    </Suspense>
  );
};
