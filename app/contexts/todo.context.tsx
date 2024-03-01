"use client";
import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer } from 'react';
import { Todo } from '@/app/definitions';
import LocalStorageImpl from '@/app/utils/LocalRepository';

const initialTodos: Todo[] = [
  { id: crypto.randomUUID(), text: 'Philosopher’s Path', done: true },
  { id: crypto.randomUUID(), text: 'Visit the temple', done: false },
  { id: crypto.randomUUID(), text: 'Drink matcha', done: false }
];

type TodosAction =
  | { type: 'read' }
  | { type: 'added', text: string, done: boolean }
  | { type: 'updated', todo: Todo }
  | { type: 'deleted', id: string }

const TodosContext = createContext<Todo[]>(initialTodos);
const TodosDispatchContext = createContext<Dispatch<TodosAction> | null>(null);

export function TodosProvider({ children }: { children: ReactNode }) {
  const [todos, dispatch] = useReducer(
    todosReducer,
    initialTodos
  );

  useEffect(() => {
    dispatch({
      type: 'read'
    })
  }, []);

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

export const storage = new LocalStorageImpl();

function todosReducer(todos: Todo[], action: TodosAction): Todo[] {
  switch (action.type) {
    case 'read': {
      return storage.get();
    }
    case 'added': {
      const addedTodos = [...todos, {
        id: crypto.randomUUID(),
        text: action.text,
        done: action.done,
      }];
      storage.save(addedTodos);
      return addedTodos;
    }
    case 'updated': {
      const updatedTodos = todos.map(t => {
        if (t.id === action.todo.id) {
          return action.todo;
        } else {
          return t;
        }
      });
      storage.save(updatedTodos);
      return updatedTodos;
    }
    case 'deleted': {
      const deletedTodos = todos.filter(t => t.id !== action.id);
      storage.save(deletedTodos);
      return deletedTodos;
    }
    default: {
      throw new Error('Unknown action');
    }
  }
}
