import Feature from "ol/Feature";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import { type Component, createEffect, onCleanup, onMount } from "solid-js";
import type { Activity } from "~/integrations/strava/types";
import { randomHexColor } from "~/utils/colors";
import { getPolylineGeometry } from "~/utils/geoline";
import { useOpenLayer } from "./open-layer-context";

type ActivityPolylineProps = {
  activity: Activity;
  isSelected: boolean;
  selectedActivityId?: number;
};

export const ActivityPolyline: Component<ActivityPolylineProps> = (props) => {
  const openLayer = useOpenLayer();

  onMount(() => {
    const { source } = openLayer();

    const polyline = props.activity.map?.summary_polyline;

    if (!polyline) {
      return;
    }

    const feature = new Feature({ geometry: getPolylineGeometry(polyline) });
    feature.setId(props.activity.id);
    feature.setProperties({ activity: props.activity });

    const stroke = new Stroke({ color: randomHexColor(), width: 4 });
    const style = new Style({ stroke, zIndex: 1 });
    feature.setStyle(style);

    source.addFeature(feature);
    onCleanup(() => {
      source.removeFeature(feature);
    });
  });

  createEffect(() => {
    if (!props.isSelected) {
      return;
    }

    const { source } = openLayer();

    const geometry = source
      .getFeatureById(props.activity.id)
      ?.getGeometry()
      ?.clone();

    const feature = new Feature({ geometry });
    const stroke = new Stroke({ color: "#e54d2e88", width: 10 });
    const style = new Style({ stroke, zIndex: 0 });
    feature.setStyle(style);

    source.addFeature(feature);
    onCleanup(() => {
      source.removeFeature(feature);
    });
  });

  return null;
};
