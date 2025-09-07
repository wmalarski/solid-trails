import { type Component, createSignal } from "solid-js";
import { Button } from "~/ui/button";
import { Drawer } from "~/ui/drawer";
import { useI18n } from "~/utils/i18n";
import type { Activity } from "../trails/types";
import { ActivityList } from "./activity-list";

type ActivityListDrawerProps = {
  activities: Activity[];
  onSelect: (activityId: number) => void;
};

export const ActivityListDrawer: Component<ActivityListDrawerProps> = (
  props,
) => {
  const { t } = useI18n();

  const [isOpen, setIsOpen] = createSignal(false);

  const onSelect = (activityId: number) => {
    setIsOpen(false);
    props.onSelect(activityId);
  };

  return (
    <Drawer.Root onOpenChange={setIsOpen} open={isOpen()}>
      <Drawer.Trigger
        asChild={(triggerProps) => (
          <Button {...triggerProps()}>{t("activity.title")}</Button>
        )}
      />
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header position="relative">
            <Drawer.Title>{t("activity.title")}</Drawer.Title>
            <Drawer.Description>{t("activity.description")}</Drawer.Description>
            <Drawer.CloseX />
          </Drawer.Header>
          <Drawer.Body>
            <ActivityList activities={props.activities} onSelect={onSelect} />
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
};
