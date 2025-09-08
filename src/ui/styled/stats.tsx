import type { Component, ParentProps } from "solid-js";
import { css } from "~/styled-system/css";
import { Flex, VStack } from "~/styled-system/jsx";

export const Container: Component<ParentProps> = (props) => {
  return (
    <Flex columnGap={6} flexWrap="wrap" rowGap={3}>
      {props.children}
    </Flex>
  );
};

type ItemProps = {
  label: string;
  value: string;
};

export const Item: Component<ItemProps> = (props) => {
  return (
    <VStack alignItems="flex-start" gap={1}>
      <span class={css({ color: "fg.muted", fontSize: "sm" })}>
        {props.label}
      </span>
      <span class={css({ fontSize: "md", fontWeight: "semibold" })}>
        {props.value}
      </span>
    </VStack>
  );
};
