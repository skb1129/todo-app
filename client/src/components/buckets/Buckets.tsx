import React, { useCallback, useMemo, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
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
    buttonLink: "buckets-button-link",
    buttonActive: "buckets-button-active",
    button2: "buckets-button2",
    delete: "buckets-delete",
  };
  const [value, setValue] = useState("");
  const { buckets, addBucket, deleteBucket } = useTodo();
  const { search } = useLocation();
  const history = useHistory();
  const bucketName = useMemo(() => new URLSearchParams(search).get("bucket"), [search]);

  const createTodo = useCallback(async () => {
    await addBucket(value);
    setValue("");
  }, [value, setValue, addBucket]);

  const onKeyPress = useCallback(
    (event) => {
      const key = event.keyCode || event.which;
      key === 13 && createTodo();
    },
    [createTodo]
  );

  const removeTodo = useCallback(
    async (name: string) => {
      await deleteBucket(name);
      if (bucketName === name) history.replace("/");
    },
    [deleteBucket, bucketName, history]
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
      <div className={classNames(classes.button, bucketName ? "" : classes.buttonActive)}>
        <Link className={classes.buttonLink} to="/">
          All
        </Link>
      </div>
      {buckets.map((bucket) => (
        <div
          className={classNames(classes.button, bucketName !== bucket.name ? "" : classes.buttonActive)}
          key={bucket.name}
        >
          <Link className={classes.buttonLink} to={{ pathname: "/", search: `?bucket=${bucket.name}` }}>
            {bucket.name}
          </Link>
          <button onClick={() => removeTodo(bucket.name)} className={classes.delete}>
            X
          </button>
        </div>
      ))}
    </div>
  );
}

export default Buckets;
