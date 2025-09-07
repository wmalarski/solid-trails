import Select from "ol/interaction/Select";
import { type Component, onCleanup, onMount } from "solid-js";
import { useOpenLayer } from "./open-layer-context";

type ActivitySelectionListenerProps = {
  onSelected: (activityId?: number) => void;
};

export const ActivitySelectionListener: Component<
  ActivitySelectionListenerProps
> = (props) => {
  const openLayer = useOpenLayer();

  onMount(() => {
    const { map } = openLayer();

    const select = new Select();

    select.on("select", (event) => {
      const selectedFeature = event.selected.at(0);
      const activity = selectedFeature?.getProperties()?.activity;
      props.onSelected(activity?.id);
    });

    map.addInteraction(select);

    onCleanup(() => map.removeInteraction(select));
  });

  return null;
};

// export const createActivitySelect = () => {

//   const select = new Select();

//     select.on("select", (event) => {
//       const selectedFeature = event.selected.at(0);
//       const activity = selectedFeature?.getProperties()?.activity;
//       props.onSelected(activity);
//     });

// }
