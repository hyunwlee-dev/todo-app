import { useTodos, useTodosDispatch } from "@/app/contexts/todo.context";
import { HTMLAttributes } from "react";
import TodoItem from "@/app/ui/todo-item";
import { Todo } from "@/app/definitions";
import Image from "next/image";
import styles from "./todo-list.module.css";

interface IProps extends HTMLAttributes<HTMLUListElement> {
}


export default function TodoList({ ...props }: IProps) {
  const todos = useTodos();
  const dispatch = useTodosDispatch();
  const toggleTodoDone = ({ id, text, done }: Todo) => {
    dispatch({
      type: 'updated',
      todo: {
        id,
        text,
        done: !done,
      }
    })
  }
  const deleteTodo = (id: number) => {
    dispatch({
      type: 'deleted',
      id: id,
    })
  }
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
              handleCheckboxChecked={() => toggleTodoDone({ id, text, done })}
              value={text}
              disabled
            >
              <button
                className={styles['delete-button']}
                onClick={() => deleteTodo(id)}
              >
                <Image src='/images/icon-cross.svg'
                  width={18}
                  height={18}
                  alt='delete button'
                />
              </button>
            </TodoItem>
          </li>
        ))
      }
    </ul>
  );
}
