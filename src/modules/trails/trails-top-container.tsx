import type { Component } from "solid-js";
import { css } from "~/styled-system/css";
import { HStack } from "~/styled-system/jsx";
import { Heading } from "~/ui/heading";
import { useI18n } from "~/utils/i18n";
import { ActivityListDrawer } from "../activites/activity-list-drawer";
import { Logo } from "../common/logo";
import { ProfilePopover } from "./profile-popover";
import type { Activity } from "./types";

type TrailsTopContainerProps = {
  activities: Activity[];
};

export const TrailsTopContainer: Component<TrailsTopContainerProps> = (
  props,
) => {
  const { t } = useI18n();

  return (
    <HStack
      class={css({
        backgroundColor: "bg.default",
        gap: 2,
        // maxH: "full",
        // overflowY: "scroll",
        position: "absolute",
        right: 10,
        top: 10,
      })}
    >
      <Heading as="h1">
        <Logo class={css({ h: 8, w: 8 })} />
        {t("info.title")}
      </Heading>
      <ActivityListDrawer activities={props.activities} />
      <ProfilePopover />
    </HStack>
  );
};
