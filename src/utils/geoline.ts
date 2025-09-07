import { decodeFloats } from "ol/format/Polyline";
import LineString from "ol/geom/LineString";

const MAP_PROJECTION = "EPSG:3857";
const COORDS_PROJECTION = "EPSG:4326";

export const getPolylineGeometry = (polyline: string) => {
  const decoded = decodeFloats(polyline);
  const stacked = stackArray(decoded);
  const floats = applyDiffs(stacked);

  const geometry = new LineString(floats);
  geometry.transform(COORDS_PROJECTION, MAP_PROJECTION);
  return geometry;
};

const stackArray = <T>(array: T[]): [T, T][] => {
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
