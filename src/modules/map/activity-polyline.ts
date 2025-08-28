import Feature from "ol/Feature";
import { decodeFloats } from "ol/format/Polyline";
import LineString from "ol/geom/LineString";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import { type Component, onCleanup, onMount } from "solid-js";
import type { Activity } from "../trails/types";
import { useOpenLayer } from "./open-layer-context";

type ActivityPolylineProps = {
  activity: Activity;
};

const MAP_PROJECTION = "EPSG:3857";
const COORDS_PROJECTION = "EPSG:4326";

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

const getPolylineGeometry = (polyline: string) => {
  const decoded = decodeFloats(polyline);
  const stacked = stackArray(decoded);
  const floats = applyDiffs(stacked);

  const geometry = new LineString(floats);
  geometry.transform(COORDS_PROJECTION, MAP_PROJECTION);
  return geometry;
};

const stackArray = <T,>(array: T[]): [T, T][] => {
  return Array.from({ length: Math.ceil(array.length / 2) }, (_, index) => [
    array[2 * index + 1],
    array[2 * index],
  ]);
};

const applyDiffs = (array: [number, number][]): [number, number][] => {
  const [first, ...rest] = array;

  return rest.reduce(
    (aggregator, [x, y]) => {
      const [lastX, lastY] = aggregator[aggregator.length - 1];
      aggregator.push([lastX + x, lastY + y]);
      return aggregator;
    },
    [first],
  );
};
