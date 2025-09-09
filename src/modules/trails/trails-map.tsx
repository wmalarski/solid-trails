import { useQuery } from "@tanstack/solid-query";
import { type Component, createSignal, For, Show } from "solid-js";
import { grid } from "~/styled-system/patterns";
import { ActivityPolyline } from "../map/activity-polyline";
import { ActivitySelectionListener } from "../map/activity-selection-listener";
import { InitialFocusEffect } from "../map/initial-focus-effect";
import { OpenLayerProvider } from "../map/open-layer-context";
import { OpenLayerView } from "../map/open-layer-view";
import { listAthleteActivitiesQueryOptions } from "./queries";
import { TrailsTopContainer } from "./trails-top-container";

export const TrailsMap: Component = () => {
  const query = useQuery(() => listAthleteActivitiesQueryOptions());

  const [selectedActivityId, setSelectedActivityId] = createSignal<
    number | undefined
  >();

  return (
    <OpenLayerProvider>
      <For each={query.data}>
        {(activity) => (
          <ActivityPolyline
            activity={activity}
            isSelected={activity.id === selectedActivityId()}
            selectedActivityId={selectedActivityId()}
          />
        )}
      </For>
      <Show when={query.data?.at(0)}>
        {(activity) => <InitialFocusEffect activity={activity()} />}
      </Show>
      <main class={grid({ h: "screen", position: "relative", w: "screen" })}>
        <OpenLayerView />
        <TrailsTopContainer
          activities={query.data ?? []}
          onSelect={setSelectedActivityId}
          selectedActivityId={selectedActivityId()}
        />
      </main>
      <ActivitySelectionListener onSelected={setSelectedActivityId} />
    </OpenLayerProvider>
  );
};
