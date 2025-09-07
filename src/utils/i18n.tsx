import { flatten, resolveTemplate, translator } from "@solid-primitives/i18n";
import {
  type Accessor,
  type Component,
  createContext,
  createMemo,
  createSignal,
  type ParentProps,
  useContext,
} from "solid-js";

const enDict = {
  activity: {
    averageSpeed: "Average Speed",
    description: "List of your activities",
    distance: "Distance",
    elapsedTime: "Elapsed Time",
    elevHigh: "Max Elevation",
    elevLow: "Min Elevation",
    maxSpeed: "Max Speed",
    movingTime: "Moving Time",
    title: "Activities",
    totalElevationGain: "Total Elevation Gain",
  },
  auth: {
    signIn: "Sign In",
    signOut: "Sign Out",
  },
  common: {
    cancel: "Cancel",
    closeDialog: "Close dialog",
    closePopover: "Close popover",
    delete: "Delete",
    edit: "Edit",
    nextSlide: "Next slide",
    previousSlide: "Previous slide",
    save: "Save",
    update: "Update",
  },
  error: {
    description: "Something went wrong: {{message}}",
    home: "Home",
    reload: "Reload",
    title: "Error",
  },
  info: {
    madeBy: "Made by wmalarski",
    title: "Solid Trails",
  },
  layout: {
    profile: {
      open: "Open profile popover",
      title: "Athlete",
    },
  },
  notFound: {
    title: "Not Found",
  },
  seo: {
    description:
      "Solid Trails app is a non-trivial demo application built using Solid Start.",
    title: "Solid Trails",
  },
};

type Locale = "en";

const dictionaries = { en: enDict };

type Accessed<T> = T extends Accessor<infer A> ? A : never;

const createI18nValue = () => {
  const [locale, setLocale] = createSignal<Locale>("en");

  const translate = createMemo(() => {
    const dict = flatten(dictionaries[locale()]);
    return translator(() => dict, resolveTemplate);
  });

  const t: Accessed<typeof translate> = (path, ...args) => {
    return translate()(path, ...args);
  };

  return { locale, setLocale, t };
};

type I18nContextValue = ReturnType<typeof createI18nValue>;

const I18nContext = createContext<I18nContextValue>({
  locale: () => "en" as const,
  setLocale: () => void 0,
  t: () => {
    throw new Error("Not implemented");
  },
});

export const I18nContextProvider: Component<ParentProps> = (props) => {
  const value = createI18nValue();

  return (
    <I18nContext.Provider value={value}>{props.children}</I18nContext.Provider>
  );
};

export const useI18n = () => {
  return useContext(I18nContext);
};
