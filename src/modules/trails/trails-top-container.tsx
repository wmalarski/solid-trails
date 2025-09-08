import { type Component, createMemo, Show } from "solid-js";
import { css } from "~/styled-system/css";
import { HStack, VStack } from "~/styled-system/jsx";
import { Heading } from "~/ui/heading";
import { useI18n } from "~/utils/i18n";
import { Logo } from "../common/logo";
import { ActivityListDrawer } from "./activites/activity-list-drawer";
import { SelectedActivityCard } from "./activites/selected-activity-card";
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
      alignItems="flex-start"
      backgroundColor="bg.default"
      borderRadius="l2"
      gap={2}
      padding={3}
      position="absolute"
      right={2}
      top={2}
      width="min(calc(100vw - 15px), 400px)"
    >
      <HStack w="full">
        <Heading
          alignItems="center"
          as="h1"
          display="flex"
          flexGrow={1}
          gap="2"
        >
          <Logo class={css({ h: 8, minH: 8, minW: 8, w: 8 })} />
          {t("info.title")}
        </Heading>
        <ActivityListDrawer
          activities={props.activities}
          onSelect={props.onSelect}
        />
        <ProfilePopover activities={props.activities} />
      </HStack>
      <Show when={selectedActivity()}>
        {(selectedActivity) => (
          <SelectedActivityCard selectedActivity={selectedActivity()} />
        )}
      </Show>
    </VStack>
  );
};
