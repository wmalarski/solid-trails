import { type Component, createSignal } from "solid-js";
import { Button } from "~/ui/button";
import { Drawer } from "~/ui/drawer";
import { useI18n } from "~/utils/i18n";
import type { Activity } from "../types";
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

  const onCenterClick = (activityId: number) => {
    setIsOpen(false);
    props.onSelect(activityId);
  };

  const onOpenChange: Drawer.RootProps["onOpenChange"] = (details) => {
    setIsOpen(details.open);
  };

  return (
    <Drawer.Root onOpenChange={onOpenChange} open={isOpen()}>
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
            <ActivityList
              activities={props.activities}
              onCenterClick={onCenterClick}
            />
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
};
