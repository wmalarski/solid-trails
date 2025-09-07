import { createAsync } from "@solidjs/router";
import {
  type Component,
  For,
  type ParentProps,
  Show,
  Suspense
} from "solid-js";
import { Skeleton } from "~/ui/skeleton";
import { useI18n } from "~/utils/i18n";
import { RpcShow } from "~/utils/rpc-show";
import { ActivityPolyline } from "../map/activity-polyline";
import { listAthleteActivitiesServerQuery } from "./actions";
import { ActivityCard } from "./activity-card";
import type { Activity } from "./types";

const LIST_ATHLETE_PER_PAGE = 40;

export const ActivityList: Component = () => {
  const { t } = useI18n();

  return (
    <div>
      <div>
        <h2>{t("activity.title")}</h2>
      </div>
      <ActivityListContainer>
        <ActivitiesLazy page={1} />
      </ActivityListContainer>
    </div>
  );
};

type ActivitiesLazyProps = {
  page: number;
};

const ActivitiesLazy: Component<ActivitiesLazyProps> = (props) => {
  const activities = createAsync(() =>
    listAthleteActivitiesServerQuery({
      page: props.page,
      perPage: LIST_ATHLETE_PER_PAGE,
    }),
  );

  return (
    <Suspense fallback={<ActivityListLoadingPlaceholder />}>
      <RpcShow result={activities()}>
        {(activities) => (
          <ActivitiesListPart activities={activities()} page={props.page} />
        )}
      </RpcShow>
    </Suspense>
  );
};

type ActivitiesListPartProps = {
  activities: Activity[];
  page: number;
};

const ActivitiesListPart: Component<ActivitiesListPartProps> = (props) => {
  return (
    <>
      <For each={props.activities}>
        {(activity) => (
          <li>
            <ActivityCard activity={activity} />
            <ActivityPolyline activity={activity} />
          </li>
        )}
      </For>
      <Show when={props.activities.length === LIST_ATHLETE_PER_PAGE}>
        <ActivitiesLazy page={props.page + 1} />
      </Show>
    </>
  );
};

const ActivityListContainer: Component<ParentProps> = (props) => {
  return <ul>{props.children}</ul>;
};

const ActivityListLoadingPlaceholder: Component = () => {
  const list = Array.from({ length: 3 });

  return (
    <For each={list}>
      {() => (
        <li>
          <Skeleton />
        </li>
      )}
    </For>
  );
};
