"use client";
import React, { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import { Theme } from "@/app/definitions";

const initialTheme = Theme.LIGHT;

const ThemeContext = createContext<Theme>(initialTheme);
const ThemeDispatchContext = createContext<Dispatch<Action> | null>(null);

type Action = { type: 'toggle' };

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, dispatch] = useReducer(
    themeReducer,
    initialTheme
  );

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeDispatchContext.Provider value={dispatch}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeDispatch() {
  const dispatch = useContext(ThemeDispatchContext);
  if (!dispatch) throw Error('ThemeContext not found');
  return dispatch;
}

function themeReducer(theme: Theme, action: Action): Theme {
  switch (action.type) {
    case 'toggle':
      return theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

