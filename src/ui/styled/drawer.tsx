import { type Assign, ark, Dialog, type PolymorphicProps } from "@ark-ui/solid";
import { XIcon } from "lucide-solid";
import type { ComponentProps } from "solid-js";
import { useI18n } from "~/integrations/i18n";
import { css } from "~/styled-system/css";
import { type DrawerVariantProps, drawer } from "~/styled-system/recipes";
import type { HTMLStyledProps } from "~/styled-system/types";
import { IconButton } from "./icon-button";
import { createStyleContext } from "./utils/create-style-context";

const { withRootProvider, withContext } = createStyleContext(drawer);

export type RootProviderProps = ComponentProps<typeof RootProvider>;
export const RootProvider = withRootProvider<
  Assign<Dialog.RootProps, DrawerVariantProps>
>(Dialog.RootProvider);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withRootProvider<
  Assign<Dialog.RootProps, DrawerVariantProps>
>(Dialog.Root);

export type BackdropProps = ComponentProps<typeof Backdrop>;
export const Backdrop = withContext<
  Assign<HTMLStyledProps<"div">, Dialog.BackdropProps>
>(Dialog.Backdrop, "backdrop");

export type CloseTriggerProps = ComponentProps<typeof CloseTrigger>;
export const CloseTrigger = withContext<
  Assign<HTMLStyledProps<"button">, Dialog.CloseTriggerProps>
>(Dialog.CloseTrigger, "closeTrigger");

export type ContentProps = ComponentProps<typeof Content>;
export const Content = withContext<
  Assign<HTMLStyledProps<"div">, Dialog.ContentProps>
>(Dialog.Content, "content");

export type DescriptionProps = ComponentProps<typeof Description>;
export const Description = withContext<
  Assign<HTMLStyledProps<"div">, Dialog.DescriptionProps>
>(Dialog.Description, "description");

export type PositionerProps = ComponentProps<typeof Positioner>;
export const Positioner = withContext<
  Assign<HTMLStyledProps<"div">, Dialog.PositionerProps>
>(Dialog.Positioner, "positioner");

export type TitleProps = ComponentProps<typeof Title>;
export const Title = withContext<
  Assign<HTMLStyledProps<"h2">, Dialog.TitleProps>
>(Dialog.Title, "title");

export type TriggerProps = ComponentProps<typeof Trigger>;
export const Trigger = withContext<
  Assign<HTMLStyledProps<"button">, Dialog.TriggerProps>
>(Dialog.Trigger, "trigger");

export const Header = withContext<
  Assign<HTMLStyledProps<"div">, PolymorphicProps<"div">>
>(ark.div, "header");

export const Body = withContext<
  Assign<HTMLStyledProps<"div">, PolymorphicProps<"div">>
>(ark.div, "body");

export const Footer = withContext<
  Assign<HTMLStyledProps<"div">, PolymorphicProps<"div">>
>(ark.div, "footer");

export const CloseX = () => {
  const { t } = useI18n();

  return (
    <CloseTrigger
      asChild={(closeProps) => (
        <IconButton
          {...closeProps()}
          aria-label={t("common.closeDialog")}
          class={css({ position: "absolute", right: "4", top: "3" })}
          variant="ghost"
        >
          <XIcon />
        </IconButton>
      )}
    />
  );
};

export {
  DialogContext as Context,
  type DialogContextProps as ContextProps,
} from "@ark-ui/solid";
