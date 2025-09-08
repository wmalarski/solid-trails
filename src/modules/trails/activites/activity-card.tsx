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
      <Card.Header w="full" justifyContent="space-between" flexDirection="row">
      <VStack alignItems="flex-start" gap={1}>
        <Card.Title>{props.activity.name}</Card.Title>
        <Card.Description>{description(props.activity)}</Card.Description>
      </VStack>
        <CenterOnActivityButton onClick={props.onCenterClick} activityId={props.activity.id} />
      </Card.Header>
      <Card.Body>
        <ActivityStats activity={props.activity} isExtended />
      </Card.Body>
    </Card.Root>
  );
};
