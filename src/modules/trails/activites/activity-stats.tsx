import { type Component, Show } from "solid-js";
import { Stats } from "~/ui/stats";
import { createDistanceFormatter } from "~/utils/formatters/create-distance-formatter";
import { createDurationFormatter } from "~/utils/formatters/create-duration-formatter";
import { createSpeedFormatter } from "~/utils/formatters/create-speed-formatter";
import { createTimeFormatter } from "~/utils/formatters/create-time-formatter";
import { useI18n } from "~/utils/i18n";
import type { Activity } from "../types";

type ActivityStatsProps = {
  activity: Activity;
  isExtended?: boolean;
};

export const ActivityStats: Component<ActivityStatsProps> = (props) => {
  const { t } = useI18n();

  const durationFormatter = createDurationFormatter();
  const timeFormatter = createTimeFormatter();
  const speedFormatter = createSpeedFormatter();
    const distanceFormatter = createDistanceFormatter()

  const endDate = () => {
    const startDate = new Date(props.activity.start_date);
    const timeElapsed = props.activity.elapsed_time;
    const endDate = new Date(startDate.getTime() + timeElapsed * 1000);
    return endDate;
  };

  return (
    <Stats.Container>
      <Show when={props.isExtended}>
        <Stats.Item
          label={t("activity.startDate")}
          value={timeFormatter(props.activity.start_date)}
        />
        <Stats.Item
          label={t("activity.endDate")}
          value={timeFormatter(endDate())}
        />
      </Show>
      <Stats.Item
        label={t("activity.distance")}
        value={distanceFormatter(props.activity.distance)}
      />
      <Stats.Item
        label={t("activity.movingTime")}
        value={durationFormatter(props.activity.moving_time)}
      />
      <Show when={props.isExtended}>
        <Stats.Item
          label={t("activity.elapsedTime")}
          value={durationFormatter(props.activity.elapsed_time)}
        />
      </Show>
      <Stats.Item
        label={t("activity.totalElevationGain")}
        value={distanceFormatter(props.activity.total_elevation_gain)}
      />
      <Show when={props.isExtended}>
        <Stats.Item
          label={t("activity.averageSpeed")}
          value={speedFormatter(props.activity.average_speed)}
        />
        <Stats.Item
          label={t("activity.maxSpeed")}
          value={speedFormatter(props.activity.max_speed)}
        />
        <Stats.Item
          label={t("activity.elevHigh")}
          value={distanceFormatter(props.activity.elev_high)}
        />
        <Stats.Item
          label={t("activity.elevLow")}
          value={distanceFormatter(props.activity.elev_low)}
        />
      </Show>
    </Stats.Container>
  );
};
