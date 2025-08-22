import { SignInForm } from "~/modules/auth/sign-in-form";
import { Head } from "~/modules/common/head";
import { FormLayout, PageFooter, PageTitle } from "~/modules/common/layout";
import { useI18n } from "~/utils/i18n";

export default function SignInPage() {
  const { t } = useI18n();

  return (
    <FormLayout>
      <PageTitle />
      <Head title={t("auth.signIn")} />
      <SignInForm />
      <PageFooter />
    </FormLayout>
  );
}
