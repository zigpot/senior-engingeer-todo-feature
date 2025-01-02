import React, { useState, useEffect } from "react";

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
    setCategories(["Work", "Personal", "Groceries"]); // Example categories
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
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "25%", backgroundColor: "#f4f4f4", padding: "1rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          {categories.map((category, index) => (
            <div
              key={index}
              style={{
                padding: "10px",
                marginBottom: "5px",
                backgroundColor: selectedCategory === category ? "#d0d0d0" : "#e0e0e0",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "1rem", backgroundColor: "#fff" }}>
        <div style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
          {selectedCategory || "Select a Category"}
        </div>
        {selectedCategory && (
          <div style={{ marginBottom: "1rem" }}>
            <input
              type="text"
              value={newTask}
              placeholder="Add a new task"
              onChange={(e) => setNewTask(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <button onClick={handleAddTask}>Add</button>
          </div>
        )}
        <div style={{ borderTop: "1px solid #ccc", paddingTop: "1rem" }}>
          {tasks
            .map((task) => (
              <div key={task.id} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id)}
                  style={{ marginRight: "10px" }}
                />
                <span>{task.task}</span>
                <div style={{ marginLeft: "auto" }}>
                <button onClick={() => handleDeleteTask(task.id)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteTask(task.id)} >
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