import type { Component } from "solid-js";
import { Button } from "~/ui/button";
import { Card } from "~/ui/card";
import { useI18n } from "~/utils/i18n";
import type { Activity } from "../trails/types";
import { ActivityStats } from "./activity-stats";

type ActivityCardProps = {
  activity: Activity;
  onSelect: (activityId: number) => void;
};

export const ActivityCard: Component<ActivityCardProps> = (props) => {
  const { t } = useI18n();

  const onSelectButtonClick = () => {
    props.onSelect(props.activity.id);
  };

  return (
    <Card.Root asChild={(props) => <li {...props()} />}>
      <Card.Header>
        <Card.Title>{props.activity.name}</Card.Title>
      </Card.Header>
      <Card.Body>
        <ActivityStats activity={props.activity} />
      </Card.Body>
      <Card.Footer>
        <Button onClick={onSelectButtonClick} variant="subtle">
          {t("activity.select")}
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};
