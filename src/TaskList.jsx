import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import "./Tasks.css";
import { getItem, setItem } from "./utils/localStorage";
import Filter from "./Filter";

function TaskList() {
  const [tasks, setTasks] = useState(() => {
    const items = getItem("tasks");
    return items || [];
  });
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  function input(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [
        ...t,
        { id: crypto.randomUUID(), text: newTask, completed: false, date: new Date() },
      ]);
      setNewTask("");
    }
  }

  useEffect(() => {
    setItem("tasks", tasks);
  }, [tasks]);

  function deleteTask(id) {
    const wantedTasks = tasks.filter((task) => task.id !== id);
    setTasks(wantedTasks);
  }

  function markAsCompleted(id) {

    setTasks(tasks.map(task => task.id === id ? {...task, completed: !task.completed} :task));
    

    // const completed = [...filteredTask];
    // completed[index].completed = !completed[index].completed;
    // setTasks(completed);
  }

  const filteredTask = tasks.filter((task) => {
    if (filter === "completed") return task.completed
    if (filter === "active") return !task.completed;
    return true;
  });

  return (
    <div className="container">
      <div className="form">
        <input
          type="text"
          placeholder="Enter a Task...."
          value={newTask}
          onChange={input}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>
      <Filter filter={filter} setFilter={setFilter} />
      <div className="taskContainer">
        {filteredTask.length === 0 ? (
          <p>No Tasks</p>
        ) : (
          filteredTask.map((task) => (
            <TaskItem
              index={task.id}
              task={task}
              deleteTask={() => deleteTask(task.id)} 
              toggleTask={() => markAsCompleted(task.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TaskList;
