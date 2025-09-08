import { ImageIcon } from "lucide-solid";
import type { Component } from "solid-js";
import { VStack } from "~/styled-system/jsx";
import { Dialog } from "~/ui/dialog";
import { IconButton } from "~/ui/icon-button";
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
  return (
    <Dialog.Root>
      <Dialog.Trigger
        asChild={(triggerProps) => (
          <IconButton variant="subtle" {...triggerProps()}>
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
  const description = createActivityDescription(() => props.activity);

  return (
    <>
      <Dialog.Title>{props.activity.name}</Dialog.Title>
      <Dialog.Description>{description()}</Dialog.Description>
      <VStack gap={6} py={4}>
        <ActivityStats activity={props.activity} isExtended />
        <ActivityPhotosCarousel activityId={props.activity.id} />
      </VStack>
    </>
  );
};
