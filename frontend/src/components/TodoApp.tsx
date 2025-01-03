import React, { useState, useEffect } from "react";
import "./TodoApp.css";

/**TODOS

 * 1. Press enter input

 * 2. buttons icon

 * 3. smooth scrollbar

 * 4. edit functionality

 * 5. 

 */


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
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  useEffect(() => {
    // Fetch categories and tasks from the backend on component mount
    fetch("http://localhost:5000/todos")
      .then((res) => res.json())
      .then((data: Todo[]) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));

    setCategories(["This is an extremely long sentenced merely to test overflow", "categories", "and", "tasks", "from", "the", "backend", "on", "component", "mount","Work", "Personal", "Groceries","You", "can", "also", "fetch", "categories", "from", "the", "backend", "if", "implemented"]);
  }, []); // Removed tasks dependency

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
        console.log("Added new task: ", addedTask);
      })
      .catch((err) => console.error("Error adding task:", err));
  };

  const handleToggleTask = (id: number) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (!taskToUpdate) return;

    fetch(`http://localhost:5000/todos/${id}`, {
      method: "PATCH",
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

  const handleStartEdit = (task: Todo) => {
    setEditingTaskId(task.id);
    setEditingText(task.task);
  };

  const handleSaveEdit = (id: number) => {
    if (!editingText.trim()) return;

    const taskToUpdate = tasks.find((task) => task.id === id);
    if (!taskToUpdate) return;

    fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...taskToUpdate, task: editingText }),
    })
      .then((res) => res.json())
      .then((updatedTask: Todo) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === id ? updatedTask : task))
        );
        setEditingTaskId(null);
        setEditingText("");
      })
      .catch((err) => console.error("Error updating task:", err));
  };

  const handleDeleteTask = (id: number) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        console.log("Deleted task: ");
      })
      .catch((err) => console.error("Error deleting task:", err));
  };

  return (
    <div className="todoapp">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="categories-header"></div>
        <div className="categories">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`category${selectedCategory === category ? 'selected' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
        <div><button className="add-category">+</button></div>
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
          {tasks.map((task) => (
            <div key={task.id} className="task" style={editingTaskId===task.id?{backgroundColor:"#ffffcc"}:{}}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task.id)}
                className="task"
              />
              {editingTaskId === task.id ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onBlur={() => handleSaveEdit(task.id)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit(task.id)}
                  autoFocus
                />
              ) : (
                <span>{task.task}</span>
              )}
              <div className="actions">
                <button 
                  className="edit" 
                  onClick={() => editingTaskId === task.id 
                    ? handleSaveEdit(task.id) 
                    : handleStartEdit(task)
                  }
                >
                  {editingTaskId === task.id ? 'Save' : 'Edit'}
                </button>
                <button className="delete" onClick={() => handleDeleteTask(task.id)}>
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