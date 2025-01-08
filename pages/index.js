import React, { useState, useEffect, use } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  // Load tasks from localStorage when the app loads
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;
    const newTasks = [...tasks, { text: task, completed: false }];
    setTasks(newTasks);
    setTask("");
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-md mx-auto bg-white rounded-md shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4 ">Task Manager</h1>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Add a Task.."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 border p-2 rounded-md"
            onKeyDown={(e) => (e.key === "Enter" ? addTask() : "")}
          />

          <button
            onClick={addTask}
            className="ml-2 bg-yellow-400 text-black font-bold px-4 rounded-md w-36 hover:bg-yellow-500"
          >
            Add
          </button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-2 border-b"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(index)}
                className="mr-2"
              />
              <span
                className={`${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(index)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
