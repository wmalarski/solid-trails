import { useQuery } from "@tanstack/solid-query";
import { type Component, Show, Suspense } from "solid-js";
import { css } from "~/styled-system/css";
import { Dialog } from "~/ui/dialog";
import { getActivityPhotosQueryOptions } from "../trails/queries";
import type { Activity } from "../trails/types";
import { ActivityCard } from "./activity-card";

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
                <Suspense>
                <DetailedActivityDialogContent activity={activity()} />
                </Suspense>
                <ActivityCard activity={activity()} />
              </>
            )}
          </Show>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

type DetailedActivityDialogContentProps = {
  activity: Activity;
};

const DetailedActivityDialogContent: Component<
  DetailedActivityDialogContentProps
> = (props) => {
  const query = useQuery(() =>
    getActivityPhotosQueryOptions({ activityId: props.activity.id, size: 1000 }),
  );

  return (
    <pre class={css({ overflowX: "scroll", w: "80" })}>
      {JSON.stringify(query.data, null, 2)}
    </pre>
  );
};
