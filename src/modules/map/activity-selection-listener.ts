import Select from "ol/interaction/Select";
import { type Component, onCleanup, onMount } from "solid-js";
import type { Activity } from "../trails/types";
import { useOpenLayer } from "./open-layer-context";

type ActivitySelectionListenerProps = {
  onSelected: (activity?: Activity | undefined) => void;
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
      props.onSelected(activity);
    });

    map.addInteraction(select);
    onCleanup(() => map.removeInteraction(select));
  });

  return null;
};
