import type { Component } from "solid-js";
import { css } from "~/styled-system/css";
import { ActivityList } from "../trails/activity-list";
import { OpenLayerProvider } from "./open-layer-context";
import { OpenLayerView } from "./open-layer-view";

export const TrailsMap: Component = () => {
  // c_dkHmjzzBy
  // gwaiHiltsBp

  return (
    <OpenLayerProvider>
      <div
        class={css({
          display: "grid",
          h: "full",
          position: "relative",
          w: "full",
        })}
      >
        <OpenLayerView />
        <div
          class={css({
            backgroundColor: "bg.default",
            left: 10,
            maxH: "full",
            overflowY: "scroll",
            position: "absolute",
          })}
        >
          <ActivityList />
        </div>
      </div>
      {/* <MapFeatureSelector onSelected={props.onSelected} />
      <ResultsMarkers />
      <StopsMarkers />
      <CurrentSelectionMarker selection={props.selection} /> */}
    </OpenLayerProvider>
  );
};

// type MapFeatureSelectorProps = {
//   onSelected: (selection: SearchSelection) => void;
// };

// const MapFeatureSelector: Component<MapFeatureSelectorProps> = (props) => {
//   const openLayer = useOpenLayer();
//   const data = useDataStore();

//   onMount(() => {
//     const { map, source } = openLayer();

//     const draw = new Draw({
//       geometryFunction: createBox(),
//       source,
//       type: "Circle",
//     });

//     map.addInteraction(draw);
//     draw.once("drawend", (event: DrawEvent) => {
//       map.removeInteraction(draw);
//       const stops = data().stops;

//       const feature = event.feature;
//       const geometry = feature.getGeometry() as Geometry;
//       const coordinates = getCoordinates(geometry);

//       const stopIds = Object.values(stops)
//         .filter((stop) => geometry?.containsXY(stop.long, stop.lat))
//         .map((stop) => stop.id);

//       props.onSelected({ coordinates, kind: "feature", stopIds });
//     });
//   });

//   return null;
// };

// type CurrentSelectionMarkerProps = {
//   selection: SearchSelection;
// };

// const CurrentSelectionMarker: Component<CurrentSelectionMarkerProps> = (
//   props,
// ) => {
//   const openLayer = useOpenLayer();
//   const data = useDataStore();

//   const getGeometry = () => {
//     if (!props.selection) {
//       return null;
//     }

//     if (props.selection.kind === "feature") {
//       return getMapPolygon(props.selection.coordinates);
//     }

//     const stop = data().stopsMap.get(props.selection.stopId);
//     if (stop) {
//       return getMapPoint(stop.long, stop.lat);
//     }

//     return null;
//   };

//   onMount(() => {
//     const resolvedOpenLayer = openLayer();
//     const geometry = getGeometry();

//     console.log("geometry", geometry);

//     if (!geometry) {
//       return;
//     }

//     const feature = new Feature(geometry);

//     const stroke = new Stroke({ color: "blue", width: 2 });
//     const fill = new Fill({ color: [0, 0, 230, 0.25] });
//     const style = new Style({
//       fill,
//       stroke: stroke,
//     });
//     feature.setStyle(style);

//     resolvedOpenLayer.source.addFeature(feature);

//     onCleanup(() => {
//       resolvedOpenLayer.source.removeFeature(feature);
//     });
//   });

//   return null;
// };
