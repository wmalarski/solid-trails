import { Info } from "lucide-solid";
import { type Component, Show } from "solid-js";
import { Alert } from "~/ui/alert";
import type { RpcResult } from "~/utils/rpc";

type AuthFieldsProps = {
  rpcResult?: RpcResult;
};

export const FormError: Component<AuthFieldsProps> = (props) => {
  return (
    <Show when={props.rpcResult?.success ? undefined : props.rpcResult?.error}>
      {(data) => (
        <Alert.Root>
          <Alert.Icon asChild={(iconProps) => <Info {...iconProps()} />} />
          <Alert.Title>{data()}</Alert.Title>
        </Alert.Root>
      )}
    </Show>
  );
};
