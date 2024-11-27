import React, { useEffect, useState } from "react";
import "./todolist.css";

const Todolist = () => {
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState();

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(taskList));
  }, [taskList]);

  const taskDetails = (e) => {
    e.preventDefault();
    setNewTask(e.target.value);
  };

  const addTask = () => {
    setTaskList([
      { id: Date.now(), task: newTask, completed: false },
      ...taskList,
    ]);
    setNewTask(" ");
  };

  const deleteTask = (taskId) => {
    setTaskList(taskList.filter((item) => item.id !== taskId));
  };
  const completeTask = (taskId) => {
    setTaskList(
      taskList.map((item) =>
        item.id === taskId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div>
      <h2>To Do List</h2>
      <div>
        <input
          type="text"
          placeholder="Add Task Here..."
          value={newTask}
          onChange={taskDetails}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="list-items">
        {taskList.map((item) => (
          <li
            key={item.id}
            id="item"
            onClick={() => {
              completeTask(item.id);
            }}
            style={{ textDecoration: item.completed ? "line-through" : "none" }}
          >
            {item.task}
            <button
              id="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(item.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Todolist;
