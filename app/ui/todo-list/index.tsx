import { useTodos } from "@/app/contexts/todo.context";
import { HTMLAttributes } from "react";
import TodoItem from "@/app/ui/todo-item";
import styles from "./todo-list.module.css";

interface IProps extends HTMLAttributes<HTMLUListElement> {
}

export default function TodoList({ ...props }: IProps) {
  const todos = useTodos();
  return (
    <ul
      className={styles['todo-list']}
      {...props}
    >
      {
        todos.map(({ id, text, done }) => (
          <li key={`todo-${id}`}>
            <TodoItem
              className={styles['todo-item']}
              checked={done}
              handleCheckboxChecked={() => { }}
              value={text}
              disabled
            />
          </li>
        ))
      }
    </ul>
  );
}
