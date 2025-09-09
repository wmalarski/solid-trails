import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import { useI18n } from "~/utils/i18n";

export default function ErrorPage() {
  const { t } = useI18n();

  return (
    <main>
      <Title>{t("error.title")}</Title>
      <HttpStatusCode code={400} />
      {t("error.title")}
    </main>
  );
}
