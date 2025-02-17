import React, { useCallback, useContext, useEffect, useState } from "react";

import { TodoBucket, TodoItem } from "../models";
import api from "../api";
import { useHistory } from "react-router";

interface TodoContextType {
  todos: TodoItem[];
  buckets: TodoBucket[];
  addTodo?: (description: string, bucket?: string) => Promise<void>;
  updateTodo?: (todo: TodoItem) => Promise<void>;
  deleteTodo?: (id: number) => Promise<void>;
  addBucket?: (name: string) => Promise<void>;
  deleteBucket?: (name: string) => Promise<void>;
}

const TodoContext = React.createContext<TodoContextType>({ todos: [], buckets: [] });

export const useTodo = () => useContext(TodoContext);

interface Props {
  children: any;
}
export function TodoProvider({ children }: Props) {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [buckets, setBuckets] = useState<TodoBucket[]>([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [todoAPI, bucketAPI] = await Promise.all([api.get("/todo"), api.get("/bucket")]);
        setTodos(todoAPI.data);
        setBuckets(bucketAPI.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchAllData();
  }, []);

  const addTodo = useCallback(
    async (description: string, bucket?: string) => {
      try {
        const { data } = await api.post("/todo", { description, bucket });
        setTodos((prevState) => [...prevState, data]);
      } catch (e) {
        console.log(e);
      }
    },
    [setTodos]
  );

  const updateTodo = useCallback(
    async (todo: TodoItem) => {
      try {
        const { data } = await api.put("/todo", todo);
        setTodos((prevState) => prevState.map((item) => (item.id === data.id ? data : item)));
      } catch (e) {
        console.log(e);
      }
    },
    [setTodos]
  );

  const deleteTodo = useCallback(
    async (id: number) => {
      try {
        await api.delete("/todo", { params: { id } });
        setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
      } catch (e) {
        console.log(e);
      }
    },
    [setTodos]
  );

  const addBucket = useCallback(
    async (name: string) => {
      try {
        const { data } = await api.post("/bucket", { name });
        setBuckets((prevState) => [...prevState, data]);
      } catch (e) {
        console.log(e);
      }
    },
    [setBuckets]
  );

  const deleteBucket = useCallback(
    async (name: string) => {
      try {
        await api.delete("/bucket", { params: { name } });
        setBuckets((prevState) => prevState.filter((bucket) => bucket.name !== name));
        setTodos((prevState) =>
          prevState.map((todo) => {
            if (todo.bucket === name) todo.bucket = null;
            return todo;
          })
        );
      } catch (e) {
        console.log(e);
      }
    },
    [setBuckets, setTodos]
  );

  return (
    <TodoContext.Provider value={{ todos, buckets, addTodo, updateTodo, deleteTodo, addBucket, deleteBucket }}>
      {children}
    </TodoContext.Provider>
  );
}
