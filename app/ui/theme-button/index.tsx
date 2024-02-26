import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import MoonIcon from "/public/images/icon-moon.svg";
import SunIcon from "/public/images/icon-sun.svg";
import styles from "./theme-button.module.css";
import { useTheme, useThemeDispatch } from "@/app/contexts/theme.context";
import { Theme } from "@/app/definitions";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

export default function ThemeButton({ className, ...props }: IProps) {
  const theme = useTheme();
  const dispatch = useThemeDispatch();
  return (
    <button
      className={clsx(styles["theme-button"], className)}
      arial-label={theme === Theme.LIGHT ? 'dark theme' : 'light theme'}
      onClick={() => { dispatch({ 'type': 'toggle' }) }}
      {...props}
    >
      {theme === Theme.LIGHT && (<MoonIcon />)}
      {theme === Theme.DARK && (<SunIcon />)}
    </button>
  );
}  
