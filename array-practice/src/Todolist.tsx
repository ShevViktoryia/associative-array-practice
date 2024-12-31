import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType, Task } from "./App";

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string) => void;
  changeFilter: (curList: string, value: FilterValuesType) => void;
  addTask: (todolistID: string, title: string, isDone?: boolean) => void;
  changeTaskStatus: (
    todolistID: string,
    taskId: string,
    isDone: boolean
  ) => void;
  filter: FilterValuesType;
};

export function Todolist(props: PropsType) {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const addTask = (id: string) => {
    if (title.trim() !== "") {
      props.addTask(id, title.trim());
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      addTask(props.id);
    }
  };

  const onAllClickHandler = (id: string) => props.changeFilter(id, "all");
  const onActiveClickHandler = (id: string) => props.changeFilter(id, "active");
  const onCompletedClickHandler = (id: string) =>
    props.changeFilter(id, "completed");

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          className={error ? "error" : ""}
        />
        <button onClick={(e) => addTask(props.id)}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {props.tasks.map((t) => {
          const onClickHandler = () => props.removeTask(t.id);
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.id, t.id, e.currentTarget.checked);
          };

          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={t.isDone}
              />
              <span>{t.title}</span>
              <button onClick={onClickHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={(e) => onAllClickHandler(props.id)}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={() => onActiveClickHandler(props.id)}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={() => onCompletedClickHandler(props.id)}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
