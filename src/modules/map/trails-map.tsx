import { type Component, createSignal } from "solid-js";
import { css } from "~/styled-system/css";
import { ActivityList } from "../trails/activity-list";
import { SelectedActivityDialog } from "../trails/selected-activity-dialog";
import type { Activity } from "../trails/types";
import { ActivitySelectionListener } from "./activity-selection-listener";
import { OpenLayerProvider } from "./open-layer-context";
import { OpenLayerView } from "./open-layer-view";

export const TrailsMap: Component = () => {
  // const [selectedFeature, setSelectedFeature] = createSignal<
  //   Feature<Geometry> | undefined
  // >(undefined);

  const [selectedActivity, setSelectedActivity] = createSignal<
    Activity | undefined
  >();

  const onSelectedActivityClose = () => {
    setSelectedActivity(undefined);
  };

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
          <pre>{JSON.stringify(selectedActivity(), null, 2)}</pre>
          <ActivityList />
        </div>
      </div>
      <ActivitySelectionListener onSelected={setSelectedActivity} />
      <SelectedActivityDialog
        onClose={onSelectedActivityClose}
        selectedActivity={selectedActivity()}
      />
      {/* <MapFeatureSelector onSelected={props.onSelected} />
      <ResultsMarkers />
      <StopsMarkers />
      <CurrentSelectionMarker selection={props.selection} /> */}
    </OpenLayerProvider>
  );
};

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
