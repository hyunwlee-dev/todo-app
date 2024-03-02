"use client";
import Header from "@/app/ui/header";
import TodoContainer from "@/app/containers/todo-container";
import styles from "./page.module.css";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Header className={styles.header} />
      <Suspense>
        <TodoContainer />
      </Suspense>
    </>
  );
}
