import { type Component, createMemo, Show } from "solid-js";
import { css } from "~/styled-system/css";
import { HStack, VStack } from "~/styled-system/jsx";
import { Heading } from "~/ui/heading";
import { useI18n } from "~/utils/i18n";
import { ActivityListDrawer } from "../activites/activity-list-drawer";
import { ActivityStats } from "../activites/activity-stats";
import { createActivityDescription } from "../activites/create-activity-description";
import { SelectedActivityDialog } from "../activites/selected-activity-dialog";
import { Logo } from "../common/logo";
import { ProfilePopover } from "./profile-popover";
import type { Activity } from "./types";

type TrailsTopContainerProps = {
  selectedActivityId?: number;
  activities: Activity[];
  onSelect: (activityId: number) => void;
};

export const TrailsTopContainer: Component<TrailsTopContainerProps> = (
  props,
) => {
  const { t } = useI18n();

  const selectedActivity = createMemo(() => {
    const activityId = props.selectedActivityId;
    return props.activities.find((activity) => activity.id === activityId);
  });

  return (
    <VStack
      backgroundColor="bg.default"
      borderRadius="l2"
      gap={2}
      padding={2}
      position="absolute"
      right={2}
      top={2}
    >
      <HStack w="full">
        <Heading
          alignItems="center"
          as="h1"
          display="flex"
          flexGrow={1}
          gap="2"
        >
          <Logo class={css({ h: 8, w: 8 })} />
          {t("info.title")}
        </Heading>
        <ActivityListDrawer
          activities={props.activities}
          onSelect={props.onSelect}
        />
        <ProfilePopover />
      </HStack>
      <Show when={selectedActivity()}>
        {(selectedActivity) => (
          <SelectedActivityCard selectedActivity={selectedActivity()} />
        )}
      </Show>
    </VStack>
  );
};

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
        <SelectedActivityDialog activity={props.selectedActivity} />
      </HStack>
      <ActivityStats activity={props.selectedActivity} />
    </VStack>
  );
};
