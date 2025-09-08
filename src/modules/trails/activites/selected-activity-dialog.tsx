import { useQuery } from "@tanstack/solid-query";
import { ImageIcon } from "lucide-solid";
import { type Component, Suspense } from "solid-js";
import { css } from "~/styled-system/css";
import { VStack } from "~/styled-system/jsx";
import { Dialog } from "~/ui/dialog";
import { IconButton } from "~/ui/icon-button";
import { useI18n } from "~/utils/i18n";
import { getActivityStreamsQueryOptions } from "../queries";
import type { Activity } from "../types";
import { ActivityPhotosCarousel } from "./activity-photos-carousel";
import { ActivityStats } from "./activity-stats";
import { createActivityDescription } from "./create-activity-description";

type SelectedActivityDialogProps = {
  activity: Activity;
};

export const SelectedActivityDialog: Component<SelectedActivityDialogProps> = (
  props,
) => {
  const { t } = useI18n();

  return (
    <Dialog.Root>
      <Dialog.Trigger
        asChild={(triggerProps) => (
          <IconButton
            {...triggerProps()}
            aria-label={t("activity.showDetails")}
            variant="subtle"
          >
            <ImageIcon />
          </IconButton>
        )}
      />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content p={6} w="xl">
          <Dialog.CloseX />
          <DialogContent activity={props.activity} />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

type DialogContentProps = {
  activity: Activity;
};

const DialogContent: Component<DialogContentProps> = (props) => {
  const description = createActivityDescription();

  return (
    <>
      <Dialog.Title>{props.activity.name}</Dialog.Title>
      <Dialog.Description pb={2}>
        {description(props.activity)}
      </Dialog.Description>
      <VStack gap={6} maxH="calc(100vh - 200px)" overflowY="auto" py={4}>
        <ActivityStats activity={props.activity} isExtended />
        <Suspense>
          <ActivityDetails activity={props.activity} />
        </Suspense>
        <VStack bgColor="bg.canvas" position="relative">
          <ActivityPhotosCarousel activityId={props.activity.id} />
        </VStack>
      </VStack>
    </>
  );
};

type ActivityDetailsProps = {
  activity: Activity;
};

const ActivityDetails: Component<ActivityDetailsProps> = (props) => {
  const activityQuery = useQuery(() =>
    getActivityStreamsQueryOptions({ activityId: props.activity.id }),
  );

  return (
    <pre class={css({ maxH: "96", maxW: "96", overflow: "scroll", minH: 96, h: 96 })}>
      {JSON.stringify(activityQuery.data, null, 2)}
    </pre>
  );
};
