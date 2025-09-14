import type { Component } from "solid-js";
import type { Activity } from "~/integrations/strava/types";
import { CenterOnActivityButton } from "~/modules/map/center-on-activity-button";
import { HStack, VStack } from "~/styled-system/jsx";
import { Heading } from "~/ui/heading";
import { ActivityStats } from "./activity-stats";
import { createActivityDescription } from "./create-activity-description";
import { SelectedActivityDialog } from "./selected-activity-dialog";

type SelectedActivityCardProps = {
  selectedActivity: Activity;
};

export const SelectedActivityCard: Component<SelectedActivityCardProps> = (
  props,
) => {
  const description = createActivityDescription();

  return (
    <VStack alignItems="flex-start" gap={2} w="full">
      <HStack alignItems="flex-start" justifyContent="space-between" w="full">
        <VStack alignItems="flex-start" gap={0}>
          <Heading fontSize="lg">{props.selectedActivity.name}</Heading>
          <Heading as="h3" color="fg.muted" fontSize="sm">
            {description(props.selectedActivity)}
          </Heading>
        </VStack>
        <HStack>
          <CenterOnActivityButton activity={props.selectedActivity} />
          <SelectedActivityDialog activity={props.selectedActivity} />
        </HStack>
      </HStack>
      <ActivityStats activity={props.selectedActivity} />
    </VStack>
  );
};
