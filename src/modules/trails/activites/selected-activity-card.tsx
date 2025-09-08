import type { Component } from "solid-js";
import { CenterOnActivityButton } from "~/modules/map/center-on-activity-button";
import { HStack, VStack } from "~/styled-system/jsx";
import { Heading } from "~/ui/heading";
import type { Activity } from "../types";
import { ActivityStats } from "./activity-stats";
import { createActivityDescription } from "./create-activity-description";
import { SelectedActivityDialog } from "./selected-activity-dialog";

type SelectedActivityCardProps = {
  selectedActivity: Activity;
};

export const SelectedActivityCard: Component<SelectedActivityCardProps> = (
  props,
) => {
  const description = createActivityDescription(() => props.selectedActivity);

  return (
    <VStack gap={1}>
      <HStack justifyContent="space-between" w="full">
        <VStack alignItems="flex-start" gap={1}>
          <Heading>{props.selectedActivity.name}</Heading>
          <Heading as="h3" color="fg.muted" fontSize="sm">
            {description()}
          </Heading>
        </VStack>
        <CenterOnActivityButton activityId={props.selectedActivity.id} />
        <SelectedActivityDialog activity={props.selectedActivity} />
      </HStack>
      <ActivityStats activity={props.selectedActivity} />
    </VStack>
  );
};
