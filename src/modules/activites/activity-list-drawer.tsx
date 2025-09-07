import type { Component } from "solid-js";
import { Button } from "~/ui/button";
import { Drawer } from "~/ui/drawer";
import { useI18n } from "~/utils/i18n";
import type { Activity } from "../trails/types";
import { ActivityList } from "./activity-list";

type ActivityListDrawerProps = {
  activities: Activity[];
};

export const ActivityListDrawer: Component<ActivityListDrawerProps> = (
  props,
) => {
  const { t } = useI18n();

  return (
    <Drawer.Root>
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
            <ActivityList activities={props.activities} />
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
};
