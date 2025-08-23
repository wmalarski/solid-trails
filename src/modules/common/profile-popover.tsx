import { XIcon } from "lucide-solid";
import { type Component, createMemo } from "solid-js";
import { useRequiredAthleteContext } from "~/auth/athlete-context";
import { css } from "~/styled-system/css";
import { Box, VStack } from "~/styled-system/jsx";
import { Avatar } from "~/ui/avatar";
import { IconButton } from "~/ui/icon-button";
import { Popover } from "~/ui/popover";
import { useI18n } from "~/utils/i18n";
import { SignOutButton } from "../auth/sign-out-button";

export const ProfilePopover: Component = () => {
  const { t } = useI18n();

  const athlete = useRequiredAthleteContext();

  const name = createMemo(() => {
    const resolved = athlete();
    return `${resolved.firstname || ""} ${resolved.lastname || ""}`.trim();
  });

  return (
    <Popover.Root>
      <Popover.Trigger
        asChild={(triggerProps) => (
          <IconButton
            aria-label={t("layout.profile.open")}
            variant="ghost"
            {...triggerProps()}
          >
            <Avatar name={name()} src={athlete().profile_medium} />
          </IconButton>
        )}
      />
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Arrow>
            <Popover.ArrowTip />
          </Popover.Arrow>
          <VStack alignItems="stretch" gap="1">
            <Popover.Title>{t("layout.profile.title")}</Popover.Title>
            <Popover.Description>{name()}</Popover.Description>
            <pre class={css({ overflowX: "hidden", w: "80" })}>
              {JSON.stringify(athlete(), null, 2)}
            </pre>
            <SignOutButton />
          </VStack>
          <Box position="absolute" right="1" top="1">
            <Popover.CloseTrigger
              asChild={(closeProps) => (
                <IconButton
                  aria-label={t("common.closePopover")}
                  size="sm"
                  variant="ghost"
                  {...closeProps()}
                >
                  <XIcon />
                </IconButton>
              )}
            />
          </Box>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
};
