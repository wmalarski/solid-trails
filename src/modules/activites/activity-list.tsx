import { type Component, For } from "solid-js";
import type { Activity } from "../trails/types";
import { ActivityCard } from "./activity-card";

type ActivityListProps = {
  activities: Activity[];
};

export const ActivityList: Component<ActivityListProps> = (props) => {
  return (
    <ul>
      <For each={props.activities}>
        {(activity) => (
          <li>
            <ActivityCard activity={activity} />
          </li>
        )}
      </For>
    </ul>
  );
};
