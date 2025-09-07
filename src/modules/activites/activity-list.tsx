import { type Component, For } from "solid-js";
import { useI18n } from "~/utils/i18n";
import type { Activity } from "../trails/types";
import { ActivityCard } from "./activity-card";

type ActivityListProps = {
  activities: Activity[];
};

export const ActivityList: Component<ActivityListProps> = (props) => {
  const { t } = useI18n();

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
