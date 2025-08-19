import { type Accessor, type JSX, Show } from "solid-js";
import type { RpcResult } from "./rpc";

type RpcShowProps<T> = {
  result?: RpcResult<T>;
  fallback?: JSX.Element;
  children: (data: Accessor<T>) => JSX.Element;
};

export function RpcShow<T>(props: RpcShowProps<T>) {
  return (
    <Show
      // biome-ignore lint/correctness/noChildrenProp: needed
      children={props.children}
      fallback={props.fallback}
      when={props.result?.success ? props.result.data : false}
    />
  );
}
