import { useQuery } from "@tanstack/solid-query";
import { type Component, createMemo, createSignal, For } from "solid-js";
import { grid } from "~/styled-system/patterns";
import { SelectedActivityDialog } from "../activites/selected-activity-dialog";
import { ActivityPolyline } from "../map/activity-polyline";
import { ActivitySelectionListener } from "../map/activity-selection-listener";
import { OpenLayerProvider } from "../map/open-layer-context";
import { OpenLayerView } from "../map/open-layer-view";
import { listAthleteActivitiesQueryOptions } from "./queries";
import { TrailsTopContainer } from "./trails-top-container";

export const TrailsMap: Component = () => {
  const query = useQuery(() => listAthleteActivitiesQueryOptions());

  const [selectedActivityId, setSelectedActivityId] = createSignal<
    number | undefined
  >();

  const selectedActivity = createMemo(() => {
    const activityId = selectedActivityId();
    return query.data?.find((activity) => activity.id === activityId);
  });

  const onSelectedActivityClose = () => {
    setSelectedActivityId(undefined);
  };

  return (
    <OpenLayerProvider>
      <For each={query.data}>
        {(activity) => <ActivityPolyline activity={activity} />}
      </For>
      <main class={grid({ h: "screen", position: "relative", w: "screen" })}>
        <OpenLayerView />
        <TrailsTopContainer
          activities={query.data ?? []}
          onSelect={setSelectedActivityId}
        />
      </main>
      <ActivitySelectionListener onSelected={setSelectedActivityId} />
      <SelectedActivityDialog
        onClose={onSelectedActivityClose}
        selectedActivity={selectedActivity()}
      />
    </OpenLayerProvider>
  );
};
