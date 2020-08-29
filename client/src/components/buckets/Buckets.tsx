import React, { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";

import { useTodo } from "../../contexts/TodoContext";

import "./Buckets.scss";

function Buckets() {
  const classes = {
    wrapper: "buckets-wrapper",
    inputWrapper: "buckets-input_wrapper",
    input: "buckets-input",
    button: "buckets-button",
    button2: "buckets-button2",
    buttonActive: "buckets-button-active",
  };
  const [value, setValue] = useState("");
  const { buckets, addBucket } = useTodo();

  const createTodo = useCallback(() => {
    addBucket(value);
    setValue("");
  }, [value, setValue, addBucket]);

  const onKeyPress = useCallback(
    (event) => {
      const key = event.keyCode || event.which;
      key === 13 && createTodo();
    },
    [createTodo]
  );

  return (
    <div className={classes.wrapper}>
      <div className={classes.inputWrapper}>
        <input
          className={classes.input}
          type="text"
          value={value}
          onChange={({ target }) => setValue(target.value)}
          onKeyPress={onKeyPress}
        />
        <button className={classes.button2} onClick={createTodo}>
          Create Bucket
        </button>
      </div>
      <NavLink className={classes.button} activeClassName={classes.buttonActive} exact to="/">
        All
      </NavLink>
      {buckets.map((bucket) => (
        <NavLink
          className={classes.button}
          activeClassName={classes.buttonActive}
          exact
          key={bucket.name}
          to={{ pathname: "/", search: `?bucket=${bucket.name}` }}
        >
          {bucket.name}
        </NavLink>
      ))}
    </div>
  );
}

export default Buckets;
