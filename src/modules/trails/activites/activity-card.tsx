import type { Component } from "solid-js";
import { Button } from "~/ui/button";
import { Card } from "~/ui/card";
import { useI18n } from "~/utils/i18n";
import type { Activity } from "../types";
import { ActivityStats } from "./activity-stats";
import { createActivityDescription } from "./create-activity-description";

type ActivityCardProps = {
  activity: Activity;
  onSelect: (activityId: number) => void;
};

export const ActivityCard: Component<ActivityCardProps> = (props) => {
  const { t } = useI18n();

  const onSelectButtonClick = () => {
    props.onSelect(props.activity.id);
  };

  const description = createActivityDescription(() => props.activity);

  return (
    <Card.Root asChild={(props) => <li {...props()} />}>
      <Card.Header>
        <Card.Title>{props.activity.name}</Card.Title>
        <Card.Description>{description()}</Card.Description>
      </Card.Header>
      <Card.Body>
        <ActivityStats activity={props.activity} isExtended />
      </Card.Body>
      <Card.Footer>
        <Button onClick={onSelectButtonClick} variant="subtle">
          {t("activity.select")}
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};
