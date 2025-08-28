import { type Component, createSignal } from "solid-js";
import { css } from "~/styled-system/css";
import { ActivityList } from "../trails/activity-list";
import { SelectedActivityDialog } from "../trails/selected-activity-dialog";
import type { Activity } from "../trails/types";
import { ActivitySelectionListener } from "./activity-selection-listener";
import { OpenLayerProvider } from "./open-layer-context";
import { OpenLayerView } from "./open-layer-view";

export const TrailsMap: Component = () => {
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
          <ActivityList />
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
