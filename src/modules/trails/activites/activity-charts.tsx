import { useQuery } from "@tanstack/solid-query";
import type { ChartData } from "chart.js";
import { type Component, createMemo, Show } from "solid-js";
import { VStack } from "~/styled-system/jsx";
import { ScatterChart } from "~/ui/chart";
import { useI18n } from "~/utils/i18n";
import { getActivityStreamsQueryOptions } from "../queries";
import type { Activity } from "../types";

type ActivityChartsProps = {
  activity: Activity;
};

export const ActivityCharts: Component<ActivityChartsProps> = (props) => {
  const { t } = useI18n();

  const activityQuery = useQuery(() =>
    getActivityStreamsQueryOptions({ activityId: props.activity.id }),
  );

  const altitudeDistanceChartData = createMemo((): ChartData | null => {
    if (!activityQuery.data) {
      return null;
    }

    const distance = activityQuery.data.distance.data;
    const points = activityQuery.data.altitude.data.map((y, index) => ({
      x: distance[index],
      y,
    }));

    return {
      datasets: [
        {
          data: points,
          fill: true,
          label: t("activity.altitude"),
          pointRadius: 1,
        },
      ],
      labels: distance,
    };
  });

  const altitudeTimeChartData = createMemo((): ChartData | null => {
    if (!activityQuery.data) {
      return null;
    }

    const time = activityQuery.data.altitude.data.map((_, index) => index);
    const points = activityQuery.data.altitude.data.map((y, index) => ({
      x: time[index],
      y,
    }));

    return {
      datasets: [
        {
          data: points,
          fill: true,
          label: t("activity.altitude"),
          pointRadius: 1,
        },
      ],
      labels: time,
    };
  });

  return (
    <VStack>
      <Show when={altitudeDistanceChartData()}>
        {(chartData) => (
          <ScatterChart
            data={chartData()}
            options={{
              line: { datasets: { pointRadius: 1 } },
              scales: { x: { stacked: true }, y: { stacked: true } },
              scatter: { datasets: { pointRadius: 1 } },
            }}
          />
        )}
      </Show>
      <Show when={altitudeTimeChartData()}>
        {(chartData) => (
          <ScatterChart
            data={chartData()}
            options={{
              line: { datasets: { pointRadius: 1 } },
              scales: { x: { stacked: true }, y: { stacked: true } },
              scatter: { datasets: { pointRadius: 1 } },
            }}
          />
        )}
      </Show>
    </VStack>
  );
};
