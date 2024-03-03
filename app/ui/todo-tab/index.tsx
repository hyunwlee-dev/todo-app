import { HTMLAttributes } from "react";
import clsx from "clsx";
import { Tab } from "@/app/definitions";
import { useTodos, useTodosDispatch } from "@/app/contexts/todo.context";
import styles from "./todo-tab.module.css";
import useMediaQuery from "@/app/hooks/useMediaQuery";

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
  const todos = useTodos();
  const dispatch = useTodosDispatch();
  const reached575px = useMediaQuery(575);
  const clearCompleted = () => {
    dispatch({
      type: 'clearCompleted'
    });
  }
  if (todos.length < 1)
    return null;
  return (
    <>
      <section className={styles['todo-board']}>
        {children}
        {
          reached575px ?
            <div className={styles['todo-tab']}>
              <div className={styles.count}>
                <span>{`${filteredCnt} items left`}</span>
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
            :
            <>
              <div className={styles['todo-tab']}>
                <div className={styles.count}>
                  <span>{`${filteredCnt} items left`}</span>
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
              <div className={styles['m-tabs']}>
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
            </>
        }
      </section>
      <div className={styles.caption}>
        Drag and drop to reorder list
      </div>
    </>
  );
}
