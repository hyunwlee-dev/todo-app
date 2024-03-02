import { HTMLAttributes } from "react";
import clsx from "clsx";
import { Tab } from "@/app/definitions";
import styles from "./todo-tab.module.css";
import { useTodosDispatch } from "@/app/contexts/todo.context";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  tabs: string[];
  pickedTab: string;
  onChangeTab: (tabIdx: Tab) => void;
  filteredCnt: number;
}

export default function TodoTab({
  tabs,
  pickedTab,
  onChangeTab,
  filteredCnt,
  children
}: IProps) {
  const dispatch = useTodosDispatch();
  const clearCompleted = () => {
    dispatch({
      type: 'clearCompleted'
    });
  }

  return (
    <section className={styles['todo-board']}>
      {children}
      <div className={styles['todo-tab']}>
        <div className={styles.count}>
          <span>{
            filteredCnt < 1 ?
              `no left` :
              `${filteredCnt} items left`
          }</span>
        </div>
        <div className={styles.tabs}>
          {
            tabs.map((tab, idx) =>
              <button
                key={`tab-${tab}`}
                className={clsx(styles['tab-button'], { [styles.focus]: Tab[idx] === pickedTab })}
                onClick={() => onChangeTab(idx)}
              >
                {tab}
              </button>
            )
          }
        </div>
        <div className={styles.buttons}>
          <button
            onClick={clearCompleted}
            className={styles['button-clear-completed']}
          >
            Clear Completed
          </button>
        </div>
      </div>
    </section >
  );
}
