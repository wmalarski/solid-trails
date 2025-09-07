import { useQuery } from "@tanstack/solid-query";
import { type Component, createSignal } from "solid-js";
import { css } from "~/styled-system/css";
import { ActivityList } from "../activites/activity-list";
import { SelectedActivityDialog } from "../activites/selected-activity-dialog";
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
          <pre>{JSON.stringify(selectedActivity(), null, 2)}</pre>
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
