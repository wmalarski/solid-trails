import type { Component } from "solid-js";
import { css } from "~/styled-system/css";
import { HStack } from "~/styled-system/jsx";
import { Card } from "~/ui/card";
import { useI18n } from "~/utils/i18n";
import type { Activity } from "../trails/types";

type ActivityCardProps = {
  activity: Activity;
};

export const ActivityCard: Component<ActivityCardProps> = (props) => {
  const { t } = useI18n();

  return (
    <Card.Root width="sm" {...props}>
      <Card.Header>
        <Card.Title>{props.activity.name}</Card.Title>
        <Card.Description>{props.activity.sport_type}</Card.Description>
      </Card.Header>
      <Card.Body>
        <DataPair
          label={t("activity.distance")}
          value={String(props.activity.distance)}
        />
        <DataPair
          label={t("activity.movingTime")}
          value={String(props.activity.moving_time)}
        />
        <DataPair
          label={t("activity.elapsedTime")}
          value={String(props.activity.elapsed_time)}
        />
        <DataPair
          label={t("activity.totalElevationGain")}
          value={String(props.activity.total_elevation_gain)}
        />
        <DataPair
          label={t("activity.averageSpeed")}
          value={String(props.activity.average_speed)}
        />
        <DataPair
          label={t("activity.maxSpeed")}
          value={String(props.activity.max_speed)}
        />
        <DataPair
          label={t("activity.elevHigh")}
          value={String(props.activity.elev_high)}
        />
        <DataPair
          label={t("activity.elevLow")}
          value={String(props.activity.elev_low)}
        />

        <pre class={css({ overflowX: "scroll", w: "80" })}>
          {JSON.stringify(props.activity, null, 2)}
        </pre>
      </Card.Body>
    </Card.Root>
  );
};

type DataPairProps = {
  label: string;
  value: string;
};

const DataPair: Component<DataPairProps> = (props) => {
  return (
    <HStack>
      <span>{props.label}</span>
      <span>{props.value}</span>
    </HStack>
  );
};
