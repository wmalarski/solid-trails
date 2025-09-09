import type { Component } from "solid-js";
import { grid } from "~/styled-system/patterns";
import { Spinner } from "~/ui/spinner";

export const TrailsLoadingSpinner: Component = () => {
  return (
    <main
      class={grid({
        alignItems: "center",
        h: "screen",
        justifyContent: "center",
        position: "relative",
        w: "screen",
      })}
    >
      <Spinner size="lg" />
    </main>
  );
};
