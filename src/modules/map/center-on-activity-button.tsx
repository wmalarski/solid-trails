import { LocateIcon } from "lucide-solid";
import type { Component } from "solid-js";
import { IconButton } from "~/ui/icon-button";
import { useI18n } from "~/utils/i18n";
import { useOpenLayer } from "./open-layer-context";

type CenterOnActivityButtonProps = {
  activityId: number;
  onClick?: (activityId: number) => void;
};

export const CenterOnActivityButton: Component<CenterOnActivityButtonProps> = (
  props,
) => {
  const { t } = useI18n();

  const openLayer = useOpenLayer();

  const onClick = () => {
    const { map, source } = openLayer();
    const view = map.getView();
    const feature = source.getFeatureById(props.activityId);
    const geometry = feature?.getGeometry()?.getExtent();

    if (geometry) {
      view.fit(geometry);
    }

    props.onClick?.(props.activityId);
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
