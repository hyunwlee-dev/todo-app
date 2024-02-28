import Container from "@/app/ui/container";
import { HTMLAttributes, useState } from "react";
import TodoList from "@/app/ui/todo-list";
import TodoItem from "@/app/ui/todo-item";
import { useTodosDispatch } from "@/app/contexts/todo.context";

interface IProps extends HTMLAttributes<HTMLDivElement> {
}

export default function TodoContainer({ className, ...props }: IProps) {
  const [text, setText] = useState('');
  const [checked, setChecked] = useState(false);
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
      <TodoList />
    </Container>
  );
}
