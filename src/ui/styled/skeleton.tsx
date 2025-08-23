import type { Assign, HTMLArkProps } from "@ark-ui/solid";
import { Show, splitProps } from "solid-js";
import { styled } from "~/styled-system/jsx";
import { type SkeletonVariantProps, skeleton } from "~/styled-system/recipes";
import type { JsxStyleProps } from "~/styled-system/types";

const StyledSkeleton = styled("div", skeleton);

export interface SkeletonProps
  extends Assign<JsxStyleProps, HTMLArkProps<"div">>,
    SkeletonVariantProps {
  /**
   * @default false
   */
  isLoaded?: boolean;
}

export const Skeleton = (props: SkeletonProps) => {
  const [localProps, otherProps] = splitProps(props, ["isLoaded"]);

  return (
    <Show
      fallback={<StyledSkeleton {...otherProps} />}
      when={localProps.isLoaded}
    >
      <styled.div animation="fade-in" {...otherProps} />
    </Show>
  );
};
