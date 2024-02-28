"use client";
import { Dispatch, ReactNode, createContext, useContext, useReducer } from 'react';
import { Todo } from '@/app/definitions';

const initialTodos: Todo[] = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];

type TodosAction =
  | { type: 'added', text: string, done: boolean };

const TodosContext = createContext<Todo[]>(initialTodos);
const TodosDispatchContext = createContext<Dispatch<TodosAction> | null>(null);

export function TodosProvider({ children }: { children: ReactNode }) {
  const [todos, dispatch] = useReducer(
    todosReducer,
    initialTodos
  );

  return (
    <TodosContext.Provider value={todos}>
      <TodosDispatchContext.Provider value={dispatch}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosContext.Provider>
  );
}

export function useTodos() {
  return useContext(TodosContext);
}

export function useTodosDispatch() {
  const dispatch = useContext(TodosDispatchContext);
  if (!dispatch) throw new Error('TodosDispatchContext not found');
  return dispatch;
}

function todosReducer(todos: Todo[], action: TodosAction): Todo[] {
  switch (action.type) {
    case 'added': {
      return [...todos, {
        id: todos.length,
        text: action.text,
        done: action.done,
      }];
    }
    default: {
      throw new Error('Unknown action: ' + action.type);
    }
  }
}
