import { useLayoutEffect, useState } from "preact/hooks";
import "./theme-toggle.css";

enum Theme {
  Dark = "dark",
  Light = "light",
}

interface Unsubscribe {
  (): void;
}

interface ThemeListener {
  (theme: Theme): void;
}

/** Functions to be called whenever the theme changes */
const themeListeners = new Set<ThemeListener>();

const THEME_KEY = "theme";
const systemPrefersDarkQuery = window.matchMedia(
  "(prefers-color-scheme: dark)",
);
/** Gets the "system theme" (set at the operating system level) */
const getSystemTheme = () =>
  systemPrefersDarkQuery.matches ? Theme.Dark : Theme.Light;

/** Checks for a theme set in localstorage (overriding the system theme) */
const getLocalOverride = () => {
  const localValue = localStorage.getItem(THEME_KEY);
  return localValue === Theme.Light
    ? Theme.Light
    : localValue === Theme.Dark
    ? Theme.Dark
    : null;
};

const getTheme = () => getLocalOverride() || getSystemTheme();

let currentTheme: Theme = getTheme();

/**
 * Attach a "theme listener" that is called whenever the theme changes.
 * A "remove this listener" function is returned.
 */
export const subscribeToTheme = (callback: ThemeListener): Unsubscribe => {
  callback(currentTheme);
  themeListeners.add(callback);

  return () => themeListeners.delete(callback);
};

// Subscribe to changes to the system theme
systemPrefersDarkQuery.addEventListener("change", () => {
  currentTheme = getTheme();
  for (const themeListener of themeListeners) {
    themeListener(currentTheme);
  }
});

const setTheme = (theme: Theme | "system") => {
  localStorage.setItem(THEME_KEY, theme);
  currentTheme = getTheme();
  for (const themeListener of themeListeners) {
    themeListener(currentTheme);
  }
};

/** A preact hook that returns the current theme
 * and whether the system default theme has been overidden
 */
export const useTheme = () => {
  const [theme, setTheme] = useState(currentTheme);
  const [isSystemTheme, setIsSystemTheme] = useState(
    getLocalOverride() === null,
  );

  useLayoutEffect(() => {
    const unsubscribe = subscribeToTheme((theme) => {
      setTheme(theme);
      setIsSystemTheme(getLocalOverride() === null);
    });

    return unsubscribe;
  }, []);

  return [theme, isSystemTheme];
};

/** A component that allows the user to cycle between the themes: dark, light, then system default */
export const ThemeToggle = () => {
  const [theme, isSystemTheme] = useTheme();
  return (
    <button
      class="toggle-theme-button"
      onClick={() => {
        const override = getLocalOverride();
        if (override === Theme.Dark) {
          setTheme(Theme.Light);
        } else if (override === Theme.Light) {
          setTheme("system");
        } else {
          setTheme(Theme.Dark);
        }
      }}
    >
      {isSystemTheme ? (
        <SystemThemeIcon />
      ) : theme === Theme.Dark ? (
        <DarkIcon />
      ) : (
        <LightIcon />
      )}
    </button>
  );
};

// Icons from https://pictogrammers.com/library/mdi/

const LightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z" />
  </svg>
);
const DarkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M12,18C11.11,18 10.26,17.8 9.5,17.45C11.56,16.5 13,14.42 13,12C13,9.58 11.56,7.5 9.5,6.55C10.26,6.2 11.11,6 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z" />
  </svg>
);

const SystemThemeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M7.5,2C5.71,3.15 4.5,5.18 4.5,7.5C4.5,9.82 5.71,11.85 7.53,13C4.46,13 2,10.54 2,7.5A5.5,5.5 0 0,1 7.5,2M19.07,3.5L20.5,4.93L4.93,20.5L3.5,19.07L19.07,3.5M12.89,5.93L11.41,5L9.97,6L10.39,4.3L9,3.24L10.75,3.12L11.33,1.47L12,3.1L13.73,3.13L12.38,4.26L12.89,5.93M9.59,9.54L8.43,8.81L7.31,9.59L7.65,8.27L6.56,7.44L7.92,7.35L8.37,6.06L8.88,7.33L10.24,7.36L9.19,8.23L9.59,9.54M19,13.5A5.5,5.5 0 0,1 13.5,19C12.28,19 11.15,18.6 10.24,17.93L17.93,10.24C18.6,11.15 19,12.28 19,13.5M14.6,20.08L17.37,18.93L17.13,22.28L14.6,20.08M18.93,17.38L20.08,14.61L22.28,17.15L18.93,17.38M20.08,12.42L18.94,9.64L22.28,9.88L20.08,12.42M9.63,18.93L12.4,20.08L9.87,22.27L9.63,18.93Z" />
  </svg>
);
