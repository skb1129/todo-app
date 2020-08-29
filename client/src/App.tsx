import React, { useCallback, useEffect, useState } from "react";

import api from "./api";
import { TodoItem } from "./models";

import "./App.scss";

function App() {
  const styles = {
    wrapper: "app__wrapper",
    container: "app__container",
    logo: "app__logo",
    title: "app__title",
    listItem: "app__list-item",
  };
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [value, setValue] = useState("");

  const fetchTodoList = async () => {
    try {
      const { data } = await api.get("/todo");
      setTodoList(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  const addTodo = useCallback(async () => {
    try {
      const { data } = await api.post("/todo", { description: value });
      setValue("");
      setTodoList((list) => [...list, data]);
    } catch (e) {
      console.log(e);
    }
  }, [value, setValue, setTodoList]);

  const onChange = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => setValue(target.value), [setValue]);

  const onKeyPress = useCallback(
    (event) => {
      const key = event.keyCode || event.which;
      key === 13 && addTodo();
    },
    [addTodo]
  );

  const markTodo = useCallback(async (form) => {
    try {
      await api.put("/todo", form);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onCheck = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const id = Number(target.dataset.id);
      setTodoList((list) => {
        const item = list.find((item) => item.id === id);
        item.done = target.checked;
        return [...list];
      });
      markTodo({ id, done: target.checked });
    },
    [markTodo]
  );

  return (
    <div data-testid="app" className={styles.wrapper}>
      <div className={styles.container}>
        <img className={styles.logo} src="/react.png" alt="React logo" />
        <h1 className={styles.title}>To-Do List</h1>
        {todoList.map((item) => (
          <div key={item.id} className={styles.listItem}>
            <input type="checkbox" checked={item.done} onChange={onCheck} data-id={item.id} />
            <span>{item.description}</span>
          </div>
        ))}
        <input type="text" placeholder="Add To-Do" value={value} onChange={onChange} onKeyPress={onKeyPress} />
      </div>
    </div>
  );
}

export default App;
