import type { Component, ParentProps } from "solid-js";
import { useI18n } from "~/integrations/i18n";
import { css } from "~/styled-system/css";
import { Link } from "~/ui/link";
import { paths } from "~/utils/paths";
import { Logo } from "./logo";

export const PageTitle: Component = () => {
  const { t } = useI18n();

  return (
    <h1
      class={css({
        alignItems: "center",
        display: "flex",
        fontSize: "4xl",
        my: 16,
        sm: { fontSize: "6xl" },
        textAlign: "center",
        textTransform: "uppercase",
      })}
    >
      <Logo class={css({ color: "orangered", h: 32, pr: 4, w: 32 })} />
      <Link href={paths.home}>{t("info.title")}</Link>
    </h1>
  );
};

export const PageFooter: Component = () => {
  const { t } = useI18n();

  return (
    <footer class={css({ p: 4 })}>
      <Link href={paths.repository}>{t("info.madeBy")}</Link>
    </footer>
  );
};

export const FormLayout: Component<ParentProps> = (props) => {
  return (
    <main
      class={css({
        alignItems: "center",
        display: "flex",
        flexDir: "column",
        mx: "auto",
        p: 4,
      })}
    >
      {props.children}
    </main>
  );
};
