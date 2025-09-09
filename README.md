# Solid Trails

Solid Trials app is a non-trivial demo application built using Solid Start and Strava API.

![application screenshot](./docs/screenshot.png)

## Tech stack

- [Solid](https://docs.solidjs.com) + [SolidStart](https://docs.solidjs.com/solid-start/)
- [OpenLayers](https://openlayers.org)
- [Maps freemap.sk](https://www.freemap.sk)
- [Biome](https://biomejs.dev)
- [Strava API](https://developers.strava.com)
- [Park UI](https://park-ui.com)
- [Panda CSS](https://panda-css.com)
- [Tanstack Query](https://tanstack.com/query/latest)


## TODO List

- [x] Strava authorization and session management
- [x] Fetching athlete and activites from Strava API
- [x] Display activities in the form of the list
- [x] Displaying OSM map with trails
- [x] Displaying activites on the map using polylines
- [x] Add polyline selection and display selection details
- [x] Add user details and summary
- [x] Add dialog with activity details and photos

## How to run?

1. `pnpm i`
2. create `.env` file based on `.env.example`
3. `pnpm dev`
3. `pnpm start` to run using local cloudflare

