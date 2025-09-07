import { useQuery } from "@tanstack/solid-query";
import {
  type Component,
  createEffect,
  For,
  type ParentProps
} from "solid-js";
import { Skeleton } from "~/ui/skeleton";
import { useI18n } from "~/utils/i18n";
import { ActivityPolyline } from "../map/activity-polyline";
import { ActivityCard } from "./activity-card";
import { listAthleteActivitiesQueryOptions } from "./queries";
import type { Activity } from "./types";

const LIST_ATHLETE_PER_PAGE = 40;

export const ActivityList: Component = () => {
  const { t } = useI18n();

  const query = useQuery(() => listAthleteActivitiesQueryOptions())

  createEffect(() => {
    console.log("[query]", query.data, query.data, query.status)
    console.log(JSON.stringify(query.data, null, 2))
  })

  return (
    <div>
      <div>
        <h2>{t("activity.title")}</h2>
      </div>
      <ActivityListContainer>
        <For each={query.data}>
          {activities => (
            <ActivitiesListPart activities={activities} />
          )}
        </For>
        {/* <ActivitiesLazy page={1} /> */}
      </ActivityListContainer>
    </div>
  );
};

// type ActivitiesLazyProps = {
//   page: number;
// };

// const ActivitiesLazy: Component<ActivitiesLazyProps> = (props) => {
//   const activities = createAsync(() =>
//     listAthleteActivitiesServerQuery({
//       page: props.page,
//       perPage: LIST_ATHLETE_PER_PAGE,
//     }),
//   );

//   return (
//     <Suspense fallback={<ActivityListLoadingPlaceholder />}>
//       <RpcShow result={activities()}>
//         {(activities) => (
//           <ActivitiesListPart activities={activities()} page={props.page} />
//         )}
//       </RpcShow>
//     </Suspense>
//   );
// };

type ActivitiesListPartProps = {
  activities: Activity[];
  // page: number;
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
      {/* <Show when={props.activities.length === LIST_ATHLETE_PER_PAGE}>
        <ActivitiesLazy page={props.page + 1} />
      </Show> */}
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
