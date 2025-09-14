import { type Component, For } from "solid-js";
import type { Activity } from "~/integrations/strava/types";
import { css } from "~/styled-system/css";
import { ActivityCard } from "./activity-card";

type ActivityListProps = {
  activities: Activity[];
  onCenterClick: (activityId: number) => void;
};

export const ActivityList: Component<ActivityListProps> = (props) => {
  return (
    <ul class={css({ display: "flex", flexDirection: "column", gap: 6 })}>
      <For each={props.activities}>
        {(activity) => (
          <ActivityCard
            activity={activity}
            onCenterClick={props.onCenterClick}
          />
        )}
      </For>
    </ul>
  );
};
