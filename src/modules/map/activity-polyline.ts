import Feature from "ol/Feature";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import { type Component, onCleanup, onMount } from "solid-js";
import { getPolylineGeometry } from "~/utils/geoline";
import type { Activity } from "../trails/types";
import { useOpenLayer } from "./open-layer-context";

type ActivityPolylineProps = {
  activity: Activity;
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
    const stroke = new Stroke({ color: "black", width: 5 });
    const style = new Style({ stroke });
    feature.setStyle(style);
    feature.setId(props.activity.id);
    feature.setProperties({ activity: props.activity });

    source.addFeature(feature);
    onCleanup(() => {
      source.removeFeature(feature);
    });
  });

  return null;
};
