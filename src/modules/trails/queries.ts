import {
  queryOptions,
  experimental_streamedQuery as streamedQuery,
} from "@tanstack/solid-query";
import {
  getActivityPhotosServerQuery,
  listAthleteActivitiesServerQuery,
} from "./actions";
import type { Activity } from "./types";

const LIST_ATHLETE_PER_PAGE = 30;

const fetchDataInChunks = () => {
  return {
    async *[Symbol.asyncIterator]() {
      let page = 1;
      let isFinished = false;

      while (!isFinished) {
        const response = await listAthleteActivitiesServerQuery({
          page,
          perPage: LIST_ATHLETE_PER_PAGE,
        });

        if (!response.success) {
          return;
        }

        const activities = response.data.filter((activity) =>
          Boolean(activity.map),
        );

        yield activities;

        if (response.data.length < LIST_ATHLETE_PER_PAGE) {
          isFinished = true;
        }

        page += 1;
      }
    },
  };
};

export const listAthleteActivitiesQueryOptions = () => {
  return queryOptions({
    gcTime: Number.POSITIVE_INFINITY,
    queryFn: streamedQuery({
      streamFn: fetchDataInChunks,
    }),
    queryKey: ["listAthleteActivities"],
    select: (data: Activity[][]) => data.flat(),
    staleTime: Number.POSITIVE_INFINITY,
  });
};

type GetActivityPhotosQueryOptionsArgs = {
  activityId: number;
  size: number;
};

export const getActivityPhotosQueryOptions = (
  args: GetActivityPhotosQueryOptionsArgs,
) => {
  return queryOptions({
    gcTime: Number.POSITIVE_INFINITY,
    queryFn: async (queryArgs) => {
      const response = await getActivityPhotosServerQuery(
        queryArgs.queryKey[1],
      );
      if (!response.success) {
        throw response.error;
      }
      return response.data;
    },
    queryKey: ["getActivityPhotos", args] as const,
    staleTime: Number.POSITIVE_INFINITY,
  });
};
