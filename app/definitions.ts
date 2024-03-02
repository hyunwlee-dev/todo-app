export enum Theme {
  LIGHT,
  DARK
}

export type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export enum Tab {
  ALL,
  ACTIVE,
  COMPLETED
}

export interface LocalStorage {
  save: (todos: Todo[]) => void;
  get: () => Todo[];
  remove: () => void;
}
