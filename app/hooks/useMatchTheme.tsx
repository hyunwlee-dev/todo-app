import { useTheme, useThemeDispatch } from "@/app/contexts/theme.context";
import { useEffect } from "react";
import { Theme } from "@/app/definitions";

export function useMatchPrefersColorScheme() {
  const dispatch = useThemeDispatch();
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme === 'dark') {
      dispatch({ type: 'toggle' });
    } else if (!localTheme && isDark) {
      dispatch({ type: 'toggle' });
    }
  }, []);
}

export function useClassListToggle() {
  const theme = useTheme();
  useEffect(() => {
    const htmlElement = window.document.documentElement;
    if (htmlElement) {
      if (theme === Theme.LIGHT) {
        htmlElement.classList.remove('dark');
        htmlElement.classList.add('light');
      } else {
        htmlElement.classList.remove('light');
        htmlElement.classList.add('dark');
      }
    }
    window.localStorage.setItem('theme', theme === Theme.LIGHT ? 'light' : 'dark');
  }, [theme]);
}
