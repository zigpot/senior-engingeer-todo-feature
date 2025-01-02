import React, { useState, useEffect } from "react";
import "./TodoApp.css";

/**TODOS
 * 1. Press enter input
 * 2. buttons icon
 * 3. smooth scrollbar
 * 4. edit functionality
 * 5. 
 */

// Define interfaces for our data structures
interface Todo {
  id: number;
  task: string;
  completed: boolean;
  category: string;
}

interface TodoCreate {
  task: string;
  completed: boolean;
  category: string;
}

const TodoApp: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    // Fetch categories and tasks from the backend on component mount
    fetch("http://localhost:5000/todos")
      .then((res) => res.json())
      .then((data: Todo[]) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));

    // You can also fetch categories from the backend if implemented
    setCategories(["F", "categories", "and", "tasks", "from", "the", "backend", "on", "component", "mount","Work", "Personal", "Groceries","You", "can", "also", "fetch", "categories", "from", "the", "backend", "if", "implemented"]); // Example categories
  }, [tasks]);

  const handleAddTask = () => {
    if (!newTask.trim() || !selectedCategory) return;

    const newTaskObject: TodoCreate = {
      task: newTask,
      completed: false,
      category: selectedCategory,
    };

    fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTaskObject),
    })
      .then((res) => res.json())
      .then((addedTask: Todo) => {
        setTasks((prevTasks) => [...prevTasks, addedTask]);
        setNewTask("");
      })
      .catch((err) => console.error("Error adding task:", err));
  };

  const handleToggleTask = (id: number) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (!taskToUpdate) return;

    fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...taskToUpdate, completed: !taskToUpdate.completed }),
    })
      .then((res) => res.json())
      .then((updatedTask: Todo) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === id ? updatedTask : task))
        );
      })
      .catch((err) => console.error("Error updating task:", err));
  };

  const handleDeleteTask = (id: number) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      })
      .catch((err) => console.error("Error deleting task:", err));
  };

  return (
    <div className="todoapp">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="categories">
          {categories.map((category, index) => (
            <div
              key={index}
              style={{
                padding: "10px",
                marginBottom: "5px",
                backgroundColor: selectedCategory === category ? "#d0d0d0" : "#e0e0e0",
                fontWeight: selectedCategory === category ? "bold" : "",
                color:  selectedCategory === category ? "black" : "#444444",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
        <div ><button className="add-category">+</button></div>
      </div>

      {/* Main Content */}
      <div className="main">
        <div className="header">
          {selectedCategory || "Select a Category"}
        </div>
        {selectedCategory && (
          <div className="add-task">
            <input
              type="text"
              value={newTask}
              placeholder="Add a new task"
              onChange={(e) => setNewTask(e.target.value)}
              className="add-task"
            />
            <button className="add-task" onClick={handleAddTask}>Add</button>
          </div>
        )}
        <div className="task-list">
          {tasks
            .map((task) => (
              <div key={task.id} className="task">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id)}
                  className="task"
                />
                <span>{task.task}</span>
                <div className="task-buttons-container">
                <button className="task-button" onClick={() => handleDeleteTask(task.id)}>
                  Edit
                </button>
                <button className="task-button" onClick={() => handleDeleteTask(task.id)} >
                  Delete
                </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;