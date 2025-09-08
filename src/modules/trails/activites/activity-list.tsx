import { type Component, For } from "solid-js";
import { css } from "~/styled-system/css";
import type { Activity } from "../types";
import { ActivityCard } from "./activity-card";

type ActivityListProps = {
  activities: Activity[];
  onSelect: (activityId: number) => void;
};

export const ActivityList: Component<ActivityListProps> = (props) => {
  return (
    <ul class={css({ display: "flex", flexDirection: "column", gap: 6 })}>
      <For each={props.activities}>
        {(activity) => (
          <ActivityCard activity={activity} onSelect={props.onSelect} />
        )}
      </For>
    </ul>
  );
};
