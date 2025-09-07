import type { Component } from "solid-js";
import { Card } from "~/ui/card";
import type { Activity } from "../trails/types";
import { ActivityStats } from "./activity-stats";

type ActivityCardProps = {
  activity: Activity;
};

export const ActivityCard: Component<ActivityCardProps> = (props) => {
  return (
    <Card.Root width="sm" {...props}>
      <Card.Header>
        <Card.Title>{props.activity.name}</Card.Title>
        <Card.Description>
          {props.activity.sport_type} {props.activity.start_date_local}
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <ActivityStats activity={props.activity} />
      </Card.Body>
    </Card.Root>
  );
};
