"use client";
import Header from "@/app/ui/header";
import styles from "./page.module.css";
import { useClassListToggle, useMatchPrefersColorScheme } from "@/app/hooks/useMatchTheme";
import TodoContainer from "./containers/todo-container";

export default function Home() {
  useMatchPrefersColorScheme();
  useClassListToggle();
  return (
    <>
      <Header className={styles.header} />
      <TodoContainer />
    </>
  );
}
