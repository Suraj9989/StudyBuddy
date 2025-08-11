import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tasks = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem(`tasks-${user?.email}`)) || [];
    setTasks(savedTasks);
  }, [user?.email]);

  const saveTasks = (updated) => {
    localStorage.setItem(`tasks-${user?.email}`, JSON.stringify(updated));
  };

  const handleAddTask = () => {
    if (!input.trim()) return toast.warning("Please enter a task.");
    const updatedTasks = [...tasks];
    if (editIndex !== null) {
      updatedTasks[editIndex].text = input;
      toast.success("Task updated");
      setEditIndex(null);
    } else {
      updatedTasks.push({ text: input, completed: false });
      toast.success("Task added");
    }
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setInput("");
  };

  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    saveTasks(updated);
    toast.info("Task deleted");
  };

  const handleEdit = (index) => {
    setInput(tasks[index].text);
    setEditIndex(index);
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
    saveTasks(updated);
  };

  const filteredTasks =
    filter === "completed"
      ? tasks.filter((t) => t.completed)
      : filter === "pending"
      ? tasks.filter((t) => !t.completed)
      : tasks;

  return (
    
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-bold mb-4 text-center text-purple-800">Your Tasks</h2>

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            className="flex-1 border p-2 rounded-md outline-purple-500"
            placeholder="Enter a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleAddTask}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        <div className="flex justify-center gap-4 mb-4">
          <button
            className={`px-3 py-1 rounded ${filter === "all" ? "bg-purple-600 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-3 py-1 rounded ${filter === "completed" ? "bg-purple-600 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className={`px-3 py-1 rounded ${filter === "pending" ? "bg-purple-600 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
        </div>

        <ul className="space-y-3">
          {filteredTasks.length === 0 && (
            <p className="text-center text-gray-500">No tasks found</p>
          )}
          {filteredTasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-white p-3 rounded shadow-sm border"
            >
              <div>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(index)}
                  className="mr-2"
                />
                <span className={task.completed ? "line-through text-gray-500" : ""}>
                  {task.text}
                </span>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-sm bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tasks;
