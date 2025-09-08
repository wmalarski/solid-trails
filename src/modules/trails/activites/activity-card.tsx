import type { Component } from "solid-js";
import { CenterOnActivityButton } from "~/modules/map/center-on-activity-button";
import { VStack } from "~/styled-system/jsx";
import { Card } from "~/ui/card";
import type { Activity } from "../types";
import { ActivityStats } from "./activity-stats";
import { createActivityDescription } from "./create-activity-description";

type ActivityCardProps = {
  activity: Activity;
  onCenterClick: (activityId: number) => void;
};

export const ActivityCard: Component<ActivityCardProps> = (props) => {
  const description = createActivityDescription();

  return (
    <Card.Root asChild={(props) => <li {...props()} />}>
      <Card.Header flexDirection="row" justifyContent="space-between" w="full">
        <VStack alignItems="flex-start" gap={1}>
          <Card.Title>{props.activity.name}</Card.Title>
          <Card.Description>{description(props.activity)}</Card.Description>
        </VStack>
        <CenterOnActivityButton
          activityId={props.activity.id}
          onClick={props.onCenterClick}
        />
      </Card.Header>
      <Card.Body>
        <ActivityStats activity={props.activity} isExtended />
      </Card.Body>
    </Card.Root>
  );
};
