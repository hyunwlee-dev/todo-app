import Container from "@/app/ui/container";
import { HTMLAttributes, useState } from "react";
import TodoList from "@/app/ui/todo-list";
import TodoItem from "@/app/ui/todo-item";
import { useTodos, useTodosDispatch } from "@/app/contexts/todo.context";
import { DropResult } from "@hello-pangea/dnd";
import dynamic from "next/dynamic";
import { Todo } from "../definitions";

const DragDropContext = dynamic(
  () =>
    import('@hello-pangea/dnd').then(mod => {
      return mod.DragDropContext;
    }),
  { ssr: false },
);

interface IProps extends HTMLAttributes<HTMLDivElement> {
}

export default function TodoContainer({ className, ...props }: IProps) {
  const [text, setText] = useState('');
  const [checked, setChecked] = useState(false);
  const todos = useTodos();
  const dispatch = useTodosDispatch();

  const initAddTodoStates = () => {
    setText('');
    setChecked(false);
  }

  const handleCheckboxChecked = () => {
    setChecked((prev) => !prev);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      initAddTodoStates();
      dispatch({
        type: 'added',
        text: text,
        done: checked
      });
    };
  }

  const reorder = (todos: Todo[], startIndex: number, endIndex: number) => {
    const result = Array.from(todos);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination)
      return;
    const reorderedTodos = reorder(
      todos,
      result.source.index,
      result.destination.index
    );
    dispatch({
      type: 'reordered',
      todos: reorderedTodos
    })
  }

  return (
    <Container
      className={className}
      as='main'
      {...props}
    >
      <TodoItem
        checked={checked}
        handleCheckboxChecked={handleCheckboxChecked}
        value={text}
        placeholder="Create a new todo..."
        onChange={(e) => handleInputChange(e)}
        onKeyDown={(e) => handleOnKeyDown(e)}
      />
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <TodoList />
      </DragDropContext>
    </Container>
  );
}
