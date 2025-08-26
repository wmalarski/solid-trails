import Feature from "ol/Feature";
import { decodeFloats } from "ol/format/Polyline";
import LineString from "ol/geom/LineString";
import CircleStyle from "ol/style/Circle";
import Fill from "ol/style/Fill";
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

    // const deltas = stackArray(
    //   decodeDeltas(props.activity.map.summary_polyline, 1),
    // );
    const decoded = decodeFloats(props.activity.map.summary_polyline);
    const stacked = stackArray(decoded);
    const floats = applyDiffs(stacked);

    // const signedIntegers = stackArray(
    //   decodeSignedIntegers(props.activity.map.summary_polyline),
    // );
    // const unsignedIntegers = stackArray(
    //   decodeUnsignedIntegers(props.activity.map.summary_polyline),
    // );

    console.log({
      //   deltas,
      decoded,
      floats,
      stacked,
      //   signedIntegers,
      //   unsignedIntegers,
    });

    // const deltasFeature = new Feature({ geometry: new LineString(deltas) });
    const geometry = new LineString(floats);
    geometry.transform(COORDS_PROJECTION, MAP_PROJECTION);

    const feature = new Feature({ geometry });
    // const signedIntegersFeature = new Feature({
    //   geometry: new LineString(signedIntegers),
    // });
    // const unsignedIntegersFeature = new Feature({
    //   geometry: new LineString(unsignedIntegers),
    // });
    // const deltasFeature2 = new Feature({ geometry: new MultiPoint(deltas) });
    // const floatsFeature2 = new Feature({ geometry: new MultiPoint(floats) });
    // const signedIntegersFeature2 = new Feature({
    //   geometry: new MultiPoint(signedIntegers),
    // });
    // const unsignedIntegersFeature2 = new Feature({
    //   geometry: new MultiPoint(unsignedIntegers),
    // });

    // const geometry = new Geometry()

    // const { map, source } = openLayer();

    // const polyline = new Polyline()

    // // polyline.writeFeature()

    // const features = [
    //   //   deltasFeature,
    //   feature,
    //   //   signedIntegersFeature,
    //   //   unsignedIntegersFeature,
    //   //   deltasFeature2,
    //   //   floatsFeature2,
    //   //   signedIntegersFeature2,
    //   //   unsignedIntegersFeature2,
    // ];

    const fill = new Fill({ color: "blue" });
    const stroke = new Stroke({ color: "black", width: 5 });
    const style = new Style({
      fill: fill,
      image: new CircleStyle({
        fill: fill,
        radius: 10,
        stroke: stroke,
      }),
      stroke: stroke,
    });

    // features.forEach((feature) => {
    //   feature.getGeometry()?.transform(COORDS_PROJECTION, MAP_PROJECTION);
    feature.setStyle(style);
    // });

    source.addFeature(feature);
    onCleanup(() => {
      source.removeFeature(feature);
    });
  });

  return null;
};

export const ActivityPolyline2: Component = () => {
  const openLayer = useOpenLayer();

  onMount(() => {
    const { source } = openLayer();

    const geometry2 = new LineString([
      [48, 48],
      [60, 60],
    ]);

    geometry2.transform(COORDS_PROJECTION, MAP_PROJECTION);

    const feature = new Feature({
      geometry: geometry2,
    });

    const fill = new Fill({ color: "blue" });
    const stroke = new Stroke({ color: "black", width: 5 });
    const style = new Style({
      fill: fill,
      image: new CircleStyle({
        fill: fill,
        radius: 10,
        stroke: stroke,
      }),
      stroke: stroke,
    });

    feature.setStyle(style);

    source.addFeature(feature);
    onCleanup(() => {
      source.removeFeature(feature);
    });
  });

  return null;
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

  //   return rest.map(([x, y]) => [startX - x, startY - y]);
};
