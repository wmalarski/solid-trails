import { XIcon } from "lucide-solid";
import { type Component, createMemo } from "solid-js";
import { useRequiredAthleteContext } from "~/auth/athlete-context";
import { Box, VStack } from "~/styled-system/jsx";
import { Avatar } from "~/ui/avatar";
import { IconButton } from "~/ui/icon-button";
import { Popover } from "~/ui/popover";
import { Stats } from "~/ui/stats";
import { createDistanceFormatter } from "~/utils/formatters/create-distance-formatter";
import { createDurationFormatter } from "~/utils/formatters/create-duration-formatter";
import { useI18n } from "~/utils/i18n";
import { SignOutButton } from "../auth/sign-out-button";
import type { Activity } from "./types";

type ProfilePopoverProps = {
  activities: Activity[];
};

export const ProfilePopover: Component<ProfilePopoverProps> = (props) => {
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
            aria-label={t("activity.profile.open")}
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
          <VStack gap="4">
            <VStack alignItems="flex-start" w="full" gap="1">
            <Popover.Title>{t("activity.profile.title")}</Popover.Title>
            <Popover.Description>{name()}</Popover.Description>
            </VStack>
            <ProfileStats activities={props.activities} />
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

type ProfileStatsProps = {
  activities: Activity[];
};

const ProfileStats: Component<ProfileStatsProps> = (props) => {
  const { t } = useI18n();

  const durationFormatter = createDurationFormatter();
  const distanceFormatter = createDistanceFormatter()

  const athlete = useRequiredAthleteContext();

  const summary = createMemo(() => {
    return props.activities.reduce(
      (previous, current) => ({
        maximumAltitude: Math.max(previous.maximumAltitude, current.elev_high),
        totalDistance: previous.totalDistance + current.distance,
        totalElapsedTime: previous.totalElapsedTime + current.elapsed_time,
        totalElevation: previous.totalElevation + current.total_elevation_gain,
        totalMovingTime: previous.totalMovingTime + current.moving_time,
      }),
      {
        maximumAltitude: 0,
        totalDistance: 0,
        totalElapsedTime: 0,
        totalElevation: 0,
        totalMovingTime: 0,
      },
    );
  });

  return (
    <Stats.Container>
      <Stats.Item
        label={t("activity.profile.country")}
        value={athlete().country}
      />
      <Stats.Item
        label={t("activity.profile.activitesCount")}
        value={String(props.activities.length)}
      />
      <Stats.Item
        label={t("activity.profile.maximumAltitude")}
        value={distanceFormatter(summary().maximumAltitude)}
      />
      <Stats.Item
        label={t("activity.profile.totalDistance")}
        value={distanceFormatter(summary().totalDistance)}
      />
        <Stats.Item
          label={t("activity.profile.totalElevation")}
          value={distanceFormatter(summary().totalElevation)}
        />
      <Stats.Item
        label={t("activity.profile.totalElapsedTime")}
        value={durationFormatter(summary().totalElapsedTime)}
      />
      <Stats.Item
        label={t("activity.profile.totalMovingTime")}
        value={durationFormatter(summary().totalMovingTime)}
      />
    </Stats.Container>
  );
};
