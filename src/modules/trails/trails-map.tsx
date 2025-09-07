import { useQuery } from "@tanstack/solid-query";
import { type Component, createSignal, For } from "solid-js";
import { css } from "~/styled-system/css";
import { ActivityList } from "../activites/activity-list";
import { SelectedActivityDialog } from "../activites/selected-activity-dialog";
import { ActivityPolyline } from "../map/activity-polyline";
import { ActivitySelectionListener } from "../map/activity-selection-listener";
import { OpenLayerProvider } from "../map/open-layer-context";
import { OpenLayerView } from "../map/open-layer-view";
import { listAthleteActivitiesQueryOptions } from "./queries";
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
      <div
        class={css({
          display: "grid",
          h: "full",
          position: "relative",
          w: "full",
        })}
      >
        <OpenLayerView />
        <div
          class={css({
            backgroundColor: "bg.default",
            left: 10,
            maxH: "full",
            overflowY: "scroll",
            position: "absolute",
          })}
        >
          <ActivityList activities={query.data ?? []} />
        </div>
      </div>
      <ActivitySelectionListener onSelected={setSelectedActivity} />
      <SelectedActivityDialog
        onClose={onSelectedActivityClose}
        selectedActivity={selectedActivity()}
      />
    </OpenLayerProvider>
  );
};
