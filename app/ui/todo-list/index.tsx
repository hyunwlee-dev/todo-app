"use client";

import { useTodosDispatch } from "@/app/contexts/todo.context";
import { HTMLAttributes } from "react";
import TodoItem from "@/app/ui/todo-item";
import { Todo } from "@/app/definitions";
import Image from "next/image";
import dynamic from "next/dynamic";
import clsx from "clsx";
import styles from "./todo-list.module.css";
import { Droppable, Draggable } from "@hello-pangea/dnd";

/*
const Droppable = dynamic(
  () =>
    import('@hello-pangea/dnd').then(mod => {
      return mod.Droppable;
    }),
  { ssr: false },
);

const Draggable = dynamic(
  () =>
    import('@hello-pangea/dnd').then(mod => {
      return mod.Draggable;
    }),
  { ssr: false },
);
*/

interface IProps extends HTMLAttributes<HTMLUListElement> {
  filteredTodos: Todo[];
}

export default function TodoList({ filteredTodos, ...props }: IProps) {
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

  const deleteTodo = (id: string) => {
    dispatch({
      type: 'deleted',
      id: id,
    })
  }


  return (
    <Droppable
      droppableId="droppable"
    >
      {(provided) => (
        <ul
          className={styles['todo-list']}
          ref={provided.innerRef}
          {...provided.droppableProps}
          {...props}
        >
          {
            filteredTodos?.map(({ id, text, done }, index) => (
              <Draggable
                key={`todo-${id}`}
                draggableId={id}
                index={index}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TodoItem
                      className={clsx(styles['todo-item'], { [styles.first]: index === 0 })}
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
                )}
              </Draggable>
            ))
          }
          {provided.placeholder}
        </ul>
      )}
    </Droppable >
  );
}
