import { type Component, Show } from "solid-js";
import { VStack } from "~/styled-system/jsx";
import { Dialog } from "~/ui/dialog";
import type { Activity } from "../trails/types";
import { ActivityPhotosCarousel } from "./activity-photos-carousel";
import { ActivityStats } from "./activity-stats";
import { createActivityDescription } from "./create-activity-description";

type SelectedActivityDialogProps = {
  selectedActivity?: Activity;
  onClose: () => void;
};

export const SelectedActivityDialog: Component<SelectedActivityDialogProps> = (
  props,
) => {
  const opOpenChange: Dialog.RootProps["onOpenChange"] = () => {
    props.onClose();
  };

  return (
    <Dialog.Root
      onOpenChange={opOpenChange}
      open={Boolean(props.selectedActivity)}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content p={6} w="xl">
          <Dialog.CloseX />
          <Show when={props.selectedActivity}>
            {(activity) => (
              <DialogContent activity={activity()} />
            )}
          </Show>
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
