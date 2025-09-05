import type { Component } from "solid-js";
import { css } from "~/styled-system/css";
import { useOpenLayer } from "./open-layer-context";

export const OpenLayerView: Component = () => {
  const openLayer = useOpenLayer();

  const onRef = (element: HTMLDivElement) => {
    const { map } = openLayer();
    map.setTarget(element);
  };

  return <div class={css({ h: "full" })} ref={onRef} />;
};
