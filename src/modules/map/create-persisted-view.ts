import { View } from "ol";
import { onCleanup } from "solid-js";
import * as v from "valibot";

const persistedViewSchema = v.object({
  center: v.tuple([v.number(), v.number()]),
  zoom: v.number(),
});

type PersistedView = v.InferOutput<typeof persistedViewSchema>;

const PERSISTED_VIEW_KEY = "st-view";
const DEFAULT_VIEW: PersistedView = { center: [2220000, 6380000], zoom: 9.75 };

const setLocalView = (view: PersistedView) => {
  localStorage.setItem(PERSISTED_VIEW_KEY, JSON.stringify(view));
};

const getLocalOrDefaultView = () => {
  const fromStorage = localStorage.getItem(PERSISTED_VIEW_KEY);
  const withJsonParse = v.pipe(v.string(), v.parseJson(), persistedViewSchema);
  const parsed = v.safeParse(withJsonParse, fromStorage);
  return parsed.success
    ? { isFirstVisit: false, options: parsed.output }
    : { isFirstVisit: true, options: DEFAULT_VIEW };
};

export const createPeristedView = () => {
  const { options, isFirstVisit } = getLocalOrDefaultView();
  const view = new View(options);

  const type = "change";
  const subscription = view.on(type, () => {
    const newOptions = { center: view.getCenter(), zoom: view.getZoom() };
    const parsed = v.safeParse(persistedViewSchema, newOptions);
    parsed.success && setLocalView(parsed.output);
  });

  onCleanup(() => view.un(type, subscription.listener));

  return { isFirstVisit, view };
};
