import type { Component } from "solid-js";
import { useOpenLayer } from "./open-layer-context";

export const OpenLayerView: Component = () => {
  const openLayer = useOpenLayer();

  const onRef = (element: HTMLDivElement) => {
    openLayer().map.setTarget(element);
  };

  return <div class="h-full grow" ref={onRef} />;
};
