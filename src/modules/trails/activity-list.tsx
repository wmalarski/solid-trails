import { createAsync } from "@solidjs/router";
import {
  type Component,
  createMemo,
  createSignal,
  For,
  type ParentProps,
  Suspense,
} from "solid-js";
import { Button } from "~/ui/button";
import { Skeleton } from "~/ui/skeleton";
import { useI18n } from "~/utils/i18n";
import { RpcShow } from "~/utils/rpc-show";
import { listAthleteActivitiesServerQuery } from "./actions";
import { ActivityCard } from "./activity-card";
import type { Activity } from "./types";

export const ActivityList: Component = () => {
  const { t } = useI18n();

  const [pages, setPages] = createSignal<number>(1);

  const pagesArray = createMemo(() => {
    return Array.from({ length: pages() }, (_, index) => index);
  });

  const onLoadMoreClick = () => {
    setPages((current) => current + 1);
  };

  return (
    <div class="flex w-full max-w-xl flex-col gap-2 px-2 py-4">
      <div class="flex w-full justify-between gap-2">
        <h2 class="text-xl">{t("activity.title")}</h2>
      </div>
      <ActivityListContainer>
        <For each={pagesArray()}>
          {(page) => <ActivitiesLazy page={page} />}
        </For>
      </ActivityListContainer>
      <Button color="secondary" onClick={onLoadMoreClick} size="sm">
        {t("activity.loadMore")}
      </Button>
    </div>
  );
};

type ActivitiesLazyProps = {
  page: number;
};

const ActivitiesLazy: Component<ActivitiesLazyProps> = (props) => {
  const activities = createAsync(() =>
    listAthleteActivitiesServerQuery({ page: props.page }),
  );

  return (
    <Suspense fallback={<ActivityListLoadingPlaceholder />}>
      <RpcShow result={activities()}>
        {(activities) => <ActivitiesListPart activities={activities() ?? []} />}
      </RpcShow>
    </Suspense>
  );
};

type ActivitiesListPartProps = {
  activities: Activity[];
};

export const ActivitiesListPart: Component<ActivitiesListPartProps> = (
  props,
) => {
  return (
    <For each={props.activities}>
      {(activity) => (
        <li>
          <ActivityCard activity={activity} />
        </li>
      )}
    </For>
  );
};

export const ActivityListContainer: Component<ParentProps> = (props) => {
  return <ul class="flex flex-col gap-4">{props.children}</ul>;
};

export const ActivityListPlaceholder: Component = () => {
  return (
    <ul class="flex w-full max-w-xl flex-col gap-2 px-2 py-4">
      <ActivityListLoadingPlaceholder />
    </ul>
  );
};

const ActivityListLoadingPlaceholder: Component = () => {
  const list = Array.from({ length: 3 });

  return (
    <For each={list}>
      {() => (
        <li>
          <Skeleton class="h-48 w-full" />
        </li>
      )}
    </For>
  );
};
