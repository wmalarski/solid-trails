import { createMemo } from "solid-js";
import { useI18n } from "~/integrations/i18n";

export const createTimeFormatter = () => {
  const { locale } = useI18n();

  const formatter = createMemo(
    () =>
      new Intl.DateTimeFormat(locale(), {
        hour12: false,
        timeStyle: "medium",
      }),
  );
  return (date: string | Date) => formatter().format(new Date(date));
};
