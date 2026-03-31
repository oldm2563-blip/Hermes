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
        { text: newTask, completed: false, date: new Date() },
      ]);
      setNewTask("");
    }
  }

  useEffect(() => {
    setItem("tasks", tasks);
  }, [tasks]);

  function deleteTask(index) {
    const wantedTasks = tasks.filter((element, i) => i !== index);
    setTasks(wantedTasks);
  }

  function markAsCompleted(index) {
    const completed = [...tasks];
    completed[index].completed = !completed[index].completed;
    setTasks(completed);
  }

  const filteredTask = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
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
          filteredTask.map((task, index) => (
            <TaskItem
              index={index}
              task={task}
              deleteTask={deleteTask} 
              toggleTask={markAsCompleted}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TaskList;
