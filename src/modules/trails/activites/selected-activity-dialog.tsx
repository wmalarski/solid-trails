import { useQuery } from "@tanstack/solid-query";
import { ImageIcon } from "lucide-solid";
import { type Component, Show, Suspense } from "solid-js";
import { css } from "~/styled-system/css";
import { VStack } from "~/styled-system/jsx";
import { Dialog } from "~/ui/dialog";
import { IconButton } from "~/ui/icon-button";
import { useI18n } from "~/utils/i18n";
import { getActivityQueryOptions } from "../queries";
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
      <Dialog.Description>{description(props.activity)}</Dialog.Description>
      <VStack gap={6} py={4}>
        <ActivityStats activity={props.activity} isExtended />
        <Show when={props.activity.photo_count > 0}>
          <ActivityPhotosCarousel activityId={props.activity.id} />
        </Show>
        <Suspense>
        <ActivityDetails activity={props.activity} />
        </Suspense>
      </VStack>
    </>
  );
};

type ActivityDetailsProps = {
  activity: Activity;
};

const ActivityDetails: Component<ActivityDetailsProps> = (props) => {
  const activityQuery = useQuery(() =>
    getActivityQueryOptions({ activityId: props.activity.id }),
  );

  return (
    <pre class={css({ maxW: "96", overflow: "scroll", maxH: "96" })}>
      {JSON.stringify(activityQuery.data, null, 2)}
    </pre>
  );
};
