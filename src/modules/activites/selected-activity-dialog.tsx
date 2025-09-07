import { type Component, Show } from "solid-js";
import { Dialog } from "~/ui/dialog";
import type { Activity } from "../trails/types";
import { ActivityCard } from "./activity-card";
import { ActivityPhotosCarousel } from "./activity-photos-carousel";

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
        <Dialog.Content maxH="96" overflowY="scroll">
          <Show when={props.selectedActivity}>
            {(activity) => (
              <>
                <Dialog.Title>{activity().name}</Dialog.Title>
                <Dialog.CloseX />
                <ActivityPhotosCarousel activityId={activity().id} />
                <ActivityCard activity={activity()} />
              </>
            )}
          </Show>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

