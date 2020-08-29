import { TodoItem } from "./TodoItem";

export interface TodoBucket {
  name: string;
  todos: TodoItem[];
}
