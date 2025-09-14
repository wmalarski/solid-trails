import { X } from "lucide-solid";
import { onMount } from "solid-js";
import { useI18n } from "~/integrations/i18n";
import { css } from "~/styled-system/css";
import { Button } from "~/ui/button";
import { Card } from "~/ui/card";
import { Icon } from "~/ui/icon";
import { Link } from "~/ui/link";
import { paths } from "~/utils/paths";

export const ErrorFallback = (err: unknown, reset: VoidFunction) => {
  const { t } = useI18n();

  onMount(() => {
    console.error("ERROR", err);
  });

  return (
    <div
      class={css({
        display: "flex",
        justifyContent: "center",
        pt: 10,
        w: "full",
      })}
    >
      <Card.Root maxW="md" w="full">
        <Card.Header>
          <Icon class={css({ color: "fg.error", h: 10, w: 10 })}>
            <X />
          </Icon>
          <Card.Title>{t("error.title")}</Card.Title>
        </Card.Header>
        <Card.Body>
          <span>
            {/* biome-ignore lint/suspicious/noExplicitAny: required */}
            {t("error.description", { message: (err as any)?.message })}
          </span>
          <Button onClick={reset}>{t("error.reload")}</Button>
          <Link href={paths.home}>{t("error.home")}</Link>
        </Card.Body>
      </Card.Root>
    </div>
  );
};
