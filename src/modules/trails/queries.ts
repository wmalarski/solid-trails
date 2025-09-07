import {
  queryOptions,
  experimental_streamedQuery as streamedQuery,
} from "@tanstack/solid-query";
import { listAthleteActivitiesServerQuery } from "./actions";
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

        const activities = response.data;
        yield activities;

        if (activities.length < LIST_ATHLETE_PER_PAGE) {
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
