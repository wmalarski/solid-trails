import { type Component, onMount } from "solid-js";
import type { Activity } from "~/integrations/strava/types";
import { useOpenLayer } from "./open-layer-context";
import { useCenterOnActivity } from "./use-center-on-activity";

type InitialFocusEffectProps = {
  activity: Activity;
};

export const InitialFocusEffect: Component<InitialFocusEffectProps> = (
  props,
) => {
  const openLayer = useOpenLayer();
  const centerOnActivity = useCenterOnActivity();

  onMount(() => {
    const { isFirstVisit } = openLayer();
    isFirstVisit && setTimeout(() => centerOnActivity(props.activity));
  });

  return null;
};
