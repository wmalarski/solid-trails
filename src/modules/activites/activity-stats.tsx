import type { Component } from "solid-js";
import { css } from "~/styled-system/css";
import { Flex, VStack } from "~/styled-system/jsx";
import { createDateFormatter } from "~/utils/formatters/create-date-formatter";
import { createDurationFormatter } from "~/utils/formatters/create-duration-formatter";
import { createSpeedFormatter } from "~/utils/formatters/create-speed-formatter";
import { createTimeFormatter } from "~/utils/formatters/create-time-formatter";
import { formatElevation } from "~/utils/formatters/format-elevation";
import { useI18n } from "~/utils/i18n";
import type { Activity } from "../trails/types";

type ActivityStatsProps = {
  activity: Activity;
};

export const ActivityStats: Component<ActivityStatsProps> = (props) => {
  const { t } = useI18n();

  const durationFormatter = createDurationFormatter();
  const dateFormatter = createDateFormatter();
  const timeFormatter = createTimeFormatter();
  const speedFormatter = createSpeedFormatter();

  const endDate = () => {
    const startDate = new Date(props.activity.start_date_local);
    const timeElapsed = props.activity.elapsed_time;
    const endDate = new Date(startDate.getTime() + timeElapsed * 1000);
    return endDate;
  };

  return (
    <Flex columnGap={6} flexWrap="wrap" rowGap={3}>
      <DataPair
        label={t("activity.date")}
        value={dateFormatter(props.activity.start_date_local)}
      />
      <DataPair
        label={t("activity.startDate")}
        value={timeFormatter(props.activity.start_date_local)}
      />
      <DataPair
        label={t("activity.endDate")}
        value={timeFormatter(endDate())}
      />
      <DataPair
        label={t("activity.distance")}
        value={formatElevation(props.activity.distance)}
      />
      <DataPair
        label={t("activity.movingTime")}
        value={durationFormatter(props.activity.moving_time)}
      />
      <DataPair
        label={t("activity.elapsedTime")}
        value={durationFormatter(props.activity.elapsed_time)}
      />
      <DataPair
        label={t("activity.totalElevationGain")}
        value={formatElevation(props.activity.total_elevation_gain)}
      />
      <DataPair
        label={t("activity.averageSpeed")}
        value={speedFormatter(props.activity.average_speed)}
      />
      <DataPair
        label={t("activity.maxSpeed")}
        value={speedFormatter(props.activity.max_speed)}
      />
      <DataPair
        label={t("activity.elevHigh")}
        value={formatElevation(props.activity.elev_high)}
      />
      <DataPair
        label={t("activity.elevLow")}
        value={formatElevation(props.activity.elev_low)}
      />
    </Flex>
  );
};

type DataPairProps = {
  label: string;
  value: string;
};

const DataPair: Component<DataPairProps> = (props) => {
  return (
    <VStack alignItems="flex-start" gap={1}>
      <span class={css({ color: "fg.muted", fontSize: "sm" })}>
        {props.label}
      </span>
      <span class={css({ fontSize: "md", fontWeight: "semibold" })}>
        {props.value}
      </span>
    </VStack>
  );
};
