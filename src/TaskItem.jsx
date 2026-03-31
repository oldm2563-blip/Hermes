import "./Tasks.css";

function TaskItem({ index, task, deleteTask, toggleTask }) {
  return (
    <div className="task" key={index}>
      <div className="content">
      <input
        type="checkbox"
        name="complete"
        className="my-checkbox"
        checked={task.completed}
        onChange={() => toggleTask(index)}
      />
      <p style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        {task.text}
      </p>
      <button className="Delete-btn" onClick={() => deleteTask(index)}>
        delete
      </button>
      </div>
      <div>
        <p>{task.date.toLocaleString()}</p>
      </div>
    </div>

  );
}

export default TaskItem;
