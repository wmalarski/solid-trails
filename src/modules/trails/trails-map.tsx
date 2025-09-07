import { useQuery } from "@tanstack/solid-query";
import { type Component, createSignal, For } from "solid-js";
import { grid } from "~/styled-system/patterns";
import { SelectedActivityDialog } from "../activites/selected-activity-dialog";
import { ActivityPolyline } from "../map/activity-polyline";
import { ActivitySelectionListener } from "../map/activity-selection-listener";
import { OpenLayerProvider } from "../map/open-layer-context";
import { OpenLayerView } from "../map/open-layer-view";
import { listAthleteActivitiesQueryOptions } from "./queries";
import { TrailsTopContainer } from "./trails-top-container";
import type { Activity } from "./types";

export const TrailsMap: Component = () => {
  const query = useQuery(() => listAthleteActivitiesQueryOptions());

  const [selectedActivity, setSelectedActivity] = createSignal<
    Activity | undefined
  >();

  const onSelectedActivityClose = () => {
    setSelectedActivity(undefined);
  };

  return (
    <OpenLayerProvider>
      <For each={query.data}>
        {(activity) => <ActivityPolyline activity={activity} />}
      </For>
      <main class={grid({h: "screen", w: "screen", position: "relative"})}>
        <OpenLayerView />
        <TrailsTopContainer activities={query.data ?? []} />
      </main>
      <ActivitySelectionListener onSelected={setSelectedActivity} />
      <SelectedActivityDialog
        onClose={onSelectedActivityClose}
        selectedActivity={selectedActivity()}
      />
    </OpenLayerProvider>
  );
};
