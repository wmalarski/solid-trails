import type { Component } from "solid-js";
import { css } from "~/styled-system/css";
import type { Activity } from "./types";

type ActivityCardProps = {
  activity: Activity;
};

export const ActivityCard: Component<ActivityCardProps> = (props) => {
  return (
    <pre class={css({ overflowX: "hidden", w: "80" })}>
      {JSON.stringify(props.activity, null, 2)}
    </pre>
  );
};
