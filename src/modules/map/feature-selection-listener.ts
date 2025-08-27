import type Feature from "ol/Feature";
import type Geometry from "ol/geom/Geometry";
import Select from "ol/interaction/Select";
import { type Component, onCleanup, onMount } from "solid-js";
import { useOpenLayer } from "./open-layer-context";

type FeatureSelectionListenerProps = {
  onSelected: (feature?: Feature<Geometry> | undefined) => void;
};

export const FeatureSelectionListener: Component<
  FeatureSelectionListenerProps
> = (props) => {
  const openLayer = useOpenLayer();

  onMount(() => {
    const { map } = openLayer();

    const select = new Select();

    select.on("select", (event) => {
      const selectedFeature = event.selected.at(0);
      props.onSelected(selectedFeature);
    });

    map.addInteraction(select);
    onCleanup(() => map.removeInteraction(select));
  });

  return null;
};
