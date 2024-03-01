"use client";
import Header from "@/app/ui/header";
import styles from "./page.module.css";
import TodoContainer from "./containers/todo-container";

export default function Home() {
  return (
    <>
      <Header className={styles.header} />
      <TodoContainer />
    </>
  );
}
