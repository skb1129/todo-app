import React, { useCallback, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

import { useTodo } from "../../contexts/TodoContext";

import "./Buckets.scss";

function Buckets() {
  const classes = {
    wrapper: "buckets-wrapper",
    title: "buckets-title",
    inputWrapper: "buckets-input_wrapper",
    input: "buckets-input",
    button: "buckets-button",
    button2: "buckets-button2",
    buttonActive: "buckets-button-active",
  };
  const [value, setValue] = useState("");
  const { buckets, addBucket } = useTodo();
  const { search } = useLocation();
  const bucketName = useMemo(() => new URLSearchParams(search).get("bucket"), [search]);

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
      <h1 className={classes.title}>To-Do App</h1>
      <div className={classes.inputWrapper}>
        <input
          className={classes.input}
          type="text"
          placeholder="Bucket name"
          maxLength={24}
          value={value}
          onChange={({ target }) => setValue(target.value)}
          onKeyPress={onKeyPress}
        />
        <button className={classes.button2} onClick={createTodo}>
          Create Bucket
        </button>
      </div>
      <Link className={classNames(classes.button, bucketName ? "" : classes.buttonActive)} to="/">
        All
      </Link>
      {buckets.map((bucket) => (
        <Link
          className={classNames(classes.button, bucketName !== bucket.name ? "" : classes.buttonActive)}
          key={bucket.name}
          to={{ pathname: "/", search: `?bucket=${bucket.name}` }}
        >
          {bucket.name}
        </Link>
      ))}
    </div>
  );
}

export default Buckets;
