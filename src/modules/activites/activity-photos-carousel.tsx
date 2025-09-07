import { useQuery } from "@tanstack/solid-query";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-solid";
import { type Component, For, Suspense } from "solid-js";
import { Carousel } from "~/ui/carousel";
import { IconButton } from "~/ui/icon-button";
import { getActivityPhotosQueryOptions } from "../trails/queries";
import type { Photo } from "../trails/types";

const PHOTOS_SIZE = 1000;

type ActivityPhotosCarouselProps = {
  activityId: number;
};

export const ActivityPhotosCarousel: Component<ActivityPhotosCarouselProps> = (
  props,
) => {
  const getActivityPhotosQuery = useQuery(() =>
    getActivityPhotosQueryOptions({
      activityId: props.activityId,
      size: PHOTOS_SIZE,
    }),
  );

  return (
    <Suspense>
      <PhotosCarousel photos={getActivityPhotosQuery.data ?? []} />
    </Suspense>
  );
};

type PhotosCarouselProps = {
  photos: Photo[];
};

const PhotosCarousel: Component<PhotosCarouselProps> = (props) => {
  return (
    <Carousel.Root slideCount={props.photos.length}>
      <Carousel.ItemGroup>
        <For each={props.photos}>
          {(photo, index) => (
            <Carousel.Item index={index()}>
              <img
                alt={`Slide ${index()}`}
                src={photo.urls[PHOTOS_SIZE]}
                style={{
                  height: "398px",
                  "object-fit": "cover",
                  width: "100%",
                }}
              />
            </Carousel.Item>
          )}
        </For>
      </Carousel.ItemGroup>
      <Carousel.Control>
        <Carousel.PrevTrigger
          asChild={(triggerProps) => (
            <IconButton
              {...triggerProps()}
              aria-label="Previous Slide"
              size="sm"
              variant="link"
            >
              <ChevronLeftIcon />
            </IconButton>
          )}
        />
        <Carousel.IndicatorGroup>
          <For each={props.photos}>
            {(_, index) => (
              <Carousel.Indicator
                aria-label={`Goto slide ${index() + 1}`}
                index={index()}
              />
            )}
          </For>
        </Carousel.IndicatorGroup>
        <Carousel.NextTrigger
          asChild={(triggerProps) => (
            <IconButton
              {...triggerProps()}
              aria-label="Next Slide"
              size="sm"
              variant="link"
            >
              <ChevronRightIcon />
            </IconButton>
          )}
        />
      </Carousel.Control>
    </Carousel.Root>
  );
};
