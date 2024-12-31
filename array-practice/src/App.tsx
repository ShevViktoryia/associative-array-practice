import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { v1 } from "uuid";
import { strict } from "assert";

export type FilterValuesType = "all" | "active" | "completed";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

function App() {
  type todolistsType = {
    id: string;
    title: string;
    filter: FilterValuesType;
  };

  type TasksType = {
    [id: string]: Task[];
  };

  // let [tasks, setTasks] = useState([
  //     {id: v1(), title: "HTML&CSS", isDone: true},
  //     {id: v1(), title: "JS", isDone: true},
  //     {id: v1(), title: "ReactJS", isDone: false},
  //     {id: v1(), title: "Rest API", isDone: false},
  //     {id: v1(), title: "GraphQL", isDone: false},
  // ]);
  let [filter, setFilter] = useState<FilterValuesType>("all");

  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<Array<todolistsType>>([
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, setTasks] = useState<TasksType>({
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "HTML&CSS2", isDone: true },
      { id: v1(), title: "JS2", isDone: true },
      { id: v1(), title: "ReactJS2", isDone: false },
      { id: v1(), title: "Rest API2", isDone: false },
      { id: v1(), title: "GraphQL2", isDone: false },
    ],
  });

  const [currentList, setCurrentList] = useState<string>(todolistID1);

  function removeTask(id: string) {
    let filteredTasks: TasksType = {};
    for (const todolistID in tasks) {
      filteredTasks[todolistID] = tasks[todolistID].filter((t) => t.id != id);
    }
    setTasks(filteredTasks);
  }

  function addTask(todolistID: string, title: string, isDone: boolean = false) {
    let newTask = { id: v1(), title, isDone };
    setTasks((prevTasks) => ({
      ...prevTasks,
      [todolistID]: [...prevTasks[todolistID], newTask],
    }));
  }

  function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
    setTasks((prevTasks) => {
      const newTasks = prevTasks[todolistID].map((task) =>
        task.id === taskId ? { ...task, isDone: !task.isDone } : task
      );
      return { ...prevTasks, [todolistID]: newTasks };
    });
  }

  const filterTasks = (tasks: Task[]) => {
    if (filter === "completed") {
      return tasks.filter((task) => task.isDone === true);
    } else if (filter === "active") {
      return tasks.filter((task) => task.isDone === false);
    }
    return tasks;
  };

  function changeFilter(curList: string, value: FilterValuesType) {
    setCurrentList(curList);
    setFilter(value);
  }

  return (
    <div className="App">
      {todolists.map((todolist) => {
        return (
          <Todolist
            key={todolist.id}
            id={todolist.id}
            title={todolist.title}
            tasks={filterTasks(tasks[currentList])}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={filter}
          />
        );
      })}
    </div>
  );
}

export default App;
