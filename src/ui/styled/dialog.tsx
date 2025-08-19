import { type Assign, Dialog } from "@ark-ui/solid";
import { X } from "lucide-solid";
import type { Component, ComponentProps } from "solid-js";
import { type DialogVariantProps, dialog } from "~/styled-system/recipes";
import type { HTMLStyledProps } from "~/styled-system/types";
import { useI18n } from "~/utils/i18n";
import { IconButton } from "../icon-button";
import { createStyleContext } from "./utils/create-style-context";

const { withRootProvider, withContext } = createStyleContext(dialog);

export type RootProviderProps = ComponentProps<typeof RootProvider>;
export const RootProvider = withRootProvider<
  Assign<Dialog.RootProviderProps, DialogVariantProps>
>(Dialog.RootProvider);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withRootProvider<
  Assign<Dialog.RootProps, DialogVariantProps>
>(Dialog.Root);

export const Backdrop = withContext<
  Assign<HTMLStyledProps<"div">, Dialog.BackdropBaseProps>
>(Dialog.Backdrop, "backdrop");

export const CloseTrigger = withContext<
  Assign<HTMLStyledProps<"button">, Dialog.CloseTriggerBaseProps>
>(Dialog.CloseTrigger, "closeTrigger");

export const Content = withContext<
  Assign<HTMLStyledProps<"div">, Dialog.ContentBaseProps>
>(Dialog.Content, "content");

export const Description = withContext<
  Assign<HTMLStyledProps<"div">, Dialog.DescriptionBaseProps>
>(Dialog.Description, "description");

export const Positioner = withContext<
  Assign<HTMLStyledProps<"div">, Dialog.PositionerBaseProps>
>(Dialog.Positioner, "positioner");

export const Title = withContext<
  Assign<HTMLStyledProps<"h2">, Dialog.TitleBaseProps>
>(Dialog.Title, "title");

export const Trigger = withContext<
  Assign<HTMLStyledProps<"button">, Dialog.TriggerBaseProps>
>(Dialog.Trigger, "trigger");

export const CloseX: Component = () => {
  const { t } = useI18n();

  return (
    <Dialog.CloseTrigger
      asChild={(closeTriggerProps) => (
        <IconButton
          {...closeTriggerProps()}
          aria-label={t("common.closeDialog")}
          position="absolute"
          right="2"
          size="sm"
          top="2"
          variant="ghost"
        >
          <X />
        </IconButton>
      )}
    />
  );
};

export { DialogContext as Context } from "@ark-ui/solid";
