"use client";
import Header from "@/app/ui/header";
import styles from "./page.module.css";
import { useClassListToggle, useMatchPrefersColorScheme } from "@/app/hooks/useMatchTheme";

export default function Home() {
  useMatchPrefersColorScheme();
  useClassListToggle();
  return (
    <>
      <Header className={styles.header} />
      <main className={styles.main}>
      </main >
    </>
  );
}
