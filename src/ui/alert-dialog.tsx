import { type Component, Show } from "solid-js";
import type { RpcResult } from "~/utils/rpc";
import { Button } from "./button";
import { Dialog } from "./dialog";
import { FormError } from "./form-error";

type AlertDialogProps = {
  confirm: string;
  description?: string;
  formId: string;
  isOpen: boolean;
  pending?: boolean;
  rpcResult?: RpcResult;
  opOpenChange: (isOpen: boolean) => void;
  title: string;
};

export const AlertDialog: Component<AlertDialogProps> = (props) => {
  const opOpenChange: Dialog.RootProps["onOpenChange"] = ({ open }) => {
    props.opOpenChange(open);
  };

  return (
    <Dialog.Root onOpenChange={opOpenChange} open={props.isOpen}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>{props.title}</Dialog.Title>
          <Show when={props.description}>
            <p>{props.description}</p>
          </Show>
          <FormError rpcResult={props.rpcResult} />
          <Dialog.CloseX />
          <Button
            disabled={props.pending}
            form={props.formId}
            isLoading={props.pending}
            type="submit"
          >
            {props.confirm}
          </Button>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
