import { A } from "@solidjs/router";
import type { ComponentProps } from "solid-js";
import { styled } from "~/styled-system/jsx";
import { button } from "~/styled-system/recipes";

export type LinkButtonProps = ComponentProps<typeof LinkButton>;
export const LinkButton = styled(A, button);
