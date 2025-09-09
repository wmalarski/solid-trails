import { getPolylineGeometry } from "~/utils/geoline";
import type { Activity } from "../trails/types";
import { useOpenLayer } from "./open-layer-context";

export const useCenterOnActivity = () => {
  const openLayer = useOpenLayer();

  return (activity: Activity) => {
    const { map } = openLayer();
    const view = map.getView();

    const geometry = getGeometryFromActivity(activity);

    if (geometry) {
      view.fit(geometry);
    }
  };
};

const getGeometryFromActivity = (activity: Activity) => {
  const polyline = activity.map?.summary_polyline;
  return polyline ? getPolylineGeometry(polyline) : null;
};
