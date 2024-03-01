import { LocalStorage, Todo } from "@/app/definitions";

export default class LocalStorageImpl implements LocalStorage {
  private key = "todo";

  save(todos: Todo[]) {
    localStorage.setItem(this.key, JSON.stringify(todos));
  }

  get() {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  remove() {
    return localStorage.removeItem(this.key);
  }
}
