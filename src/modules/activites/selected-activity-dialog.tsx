import { type Component, Show } from "solid-js";
import { VStack } from "~/styled-system/jsx";
import { Dialog } from "~/ui/dialog";
import type { Activity } from "../trails/types";
import { ActivityPhotosCarousel } from "./activity-photos-carousel";
import { ActivityStats } from "./activity-stats";

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
        <Dialog.Content w="xl" p={6}>
          <Dialog.CloseX />
          <Show when={props.selectedActivity}>
            {(activity) => (
              <>
                <Dialog.Title>{activity().name}</Dialog.Title>
                <VStack gap={6} py={4}>
                  <ActivityStats activity={activity()} />
                  <ActivityPhotosCarousel activityId={activity().id} />
                </VStack>
              </>
            )}
          </Show>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
