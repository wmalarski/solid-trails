import { A } from "@solidjs/router";
import type { ComponentProps } from "solid-js";
import { styled } from "~/styled-system/jsx";
import { link } from "~/styled-system/recipes";

export type LinkProps = ComponentProps<typeof Link>;
export const Link = styled(A, link);
