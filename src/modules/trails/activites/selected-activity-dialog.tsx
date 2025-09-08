import { ImageIcon } from "lucide-solid";
import type { Component } from "solid-js";
import { VStack } from "~/styled-system/jsx";
import { Dialog } from "~/ui/dialog";
import { IconButton } from "~/ui/icon-button";
import { useI18n } from "~/utils/i18n";
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
        <Dialog.Content p={6} w="2xl" maxH="100svh" overflowY="auto">
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
      <VStack gap={6} py={4}>
        <ActivityStats activity={props.activity} isExtended />
        <VStack bgColor="bg.canvas" position="relative">
          <ActivityPhotosCarousel activityId={props.activity.id} />
        </VStack>
        {/* <Suspense>
          <ActivityCharts activity={props.activity} />
        </Suspense> */}
      </VStack>
    </>
  );
};
