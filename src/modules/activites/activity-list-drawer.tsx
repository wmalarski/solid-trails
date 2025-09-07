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
          <Button {...triggerProps()}>Open Drawer</Button>
        )}
      />
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Title</Drawer.Title>
            <Drawer.Description>Description</Drawer.Description>
            <Drawer.CloseX />
          </Drawer.Header>
          <Drawer.Body>
            <ActivityList activities={props.activities} />
          </Drawer.Body>
          <Drawer.Footer gap="3">
            <Drawer.CloseTrigger
              asChild={(closeProps) => (
                <Button {...closeProps()} variant="outline">
                  {t("common.cancel")}
                </Button>
              )}
            />
            <Button>Primary</Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
};
