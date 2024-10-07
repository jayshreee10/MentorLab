import React, { useState } from "react";

function TodoApp() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (task) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">
          To-Do List
        </h1>
        {/* Input and Button */}
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-grow p-2 border rounded-l-md outline-none focus:border-blue-400"
            placeholder="Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition-all"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <ul>
          {tasks.map((taskItem, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-2 mb-2 border rounded ${
                taskItem.completed ? "bg-green-100 line-through" : ""
              }`}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={taskItem.completed}
                  onChange={() => toggleTaskCompletion(index)}
                  className="mr-2"
                />
                <span className="text-gray-700">{taskItem.text}</span>
              </div>
              <button
                onClick={() => handleDeleteTask(index)}
                className="text-red-500 hover:text-red-700 transition-all"
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

export default TodoApp;
