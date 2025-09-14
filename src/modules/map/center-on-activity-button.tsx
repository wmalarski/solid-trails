import { LocateIcon } from "lucide-solid";
import type { Component } from "solid-js";
import { useI18n } from "~/integrations/i18n";
import { IconButton } from "~/ui/icon-button";
import type { Activity } from "../trails/types";
import { useCenterOnActivity } from "./use-center-on-activity";

type CenterOnActivityButtonProps = {
  activity: Activity;
  onClick?: (activityId: number) => void;
};

export const CenterOnActivityButton: Component<CenterOnActivityButtonProps> = (
  props,
) => {
  const { t } = useI18n();

  const centerOnActivity = useCenterOnActivity();

  const onClick = () => {
    centerOnActivity(props.activity);
    props.onClick?.(props.activity.id);
  };

  return (
    <IconButton
      aria-label={t("activity.locate")}
      onClick={onClick}
      variant="subtle"
    >
      <LocateIcon />
    </IconButton>
  );
};
