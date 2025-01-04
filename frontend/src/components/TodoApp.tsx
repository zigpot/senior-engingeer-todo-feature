import React, { useState, useEffect } from "react";
import "./TodoApp.css";

interface Todo {
  id: number;
  title: string;
  description?: string;
  deadline?: Date;
  created_at: Date;
  completed: boolean;
  assignee?: string;
  patient?: string;
}

interface TodoCreate {
  title: string;
  description?: string;
  deadline?: Date;
  created_at: Date;
  completed: boolean;
  assignee?: string;
  patient?: string;
}

const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

const TodoApp: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [newTask, setNewTask] = useState<string>("");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Todo | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState<Todo | null>(null);

  // Mock data for dropdowns
  const assignees = ["Dr. Smith", "Dr. Johnson", "Dr. Williams"];
  const patients = ["John Doe", "Jane Smith", "Robert Brown"];

  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then((res) => res.json())
      .then((data: Todo[]) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));

    setCategories(["Work", "Personal", "Groceries"]);
  }, []);

  const handleAddTask = () => {
    if (!newTask.trim() || !selectedCategory) return;

    const newTaskObject: TodoCreate = {
      title: newTask,
      description: "To be filled",
      created_at: new Date(),
      completed: false,
      deadline: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000),
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

    fetch(`http://localhost:5000/todos/${id}/toggle`, {
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

  const handleShowDetail = (task: Todo) => {
    setSelectedTask(task);
    setEditedTask(task);
    setIsDetailModalOpen(true);
    setIsEditMode(false);
  };

  const handleSaveEdit = () => {
    if (!editedTask || !editedTask.title.trim()) return;

    fetch(`http://localhost:5000/todos/${editedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedTask),
    })
      .then((res) => res.json())
      .then((updatedTask: Todo) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === editedTask.id ? updatedTask : task))
        );
        setIsEditMode(false);
        setSelectedTask(updatedTask);
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

  const closeModal = () => {
    setIsDetailModalOpen(false);
    setIsEditMode(false);
    setSelectedTask(null);
    setEditedTask(null);
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
              className={`category${selectedCategory === category ? ' selected' : ''}`}
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
            <div key={task.id} className="task">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task.id)}
                className="task"
              />
              <div>
                <span style={{ display: 'block' }}>{task.title}</span>
                <span style={{ display: 'block', fontSize: '15px', fontWeight: '100', color: '#6d6d6d' }}>
                  {task.description}
                </span>
              </div>
              <div className="actions">
                <button className="detail" onClick={() => handleShowDetail(task)}>
                  Detail
                </button>
                <button className="delete" onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail/Edit Modal */}
      <Modal isOpen={isDetailModalOpen} onClose={closeModal}>
        <div className="modal-header">
          <h2>{isEditMode ? 'Edit Task' : 'Task Details'}</h2>
          <button className="close-button" onClick={closeModal}>×</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            {isEditMode ? (
              <input
                id="title"
                type="text"
                value={editedTask?.title || ''}
                onChange={(e) => setEditedTask(prev => 
                  prev ? { ...prev, title: e.target.value } : null
                )}
              />
            ) : (
              <div className="detail-field">{selectedTask?.title}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            {isEditMode ? (
              <textarea
                id="description"
                value={editedTask?.description || ''}
                onChange={(e) => setEditedTask(prev => 
                  prev ? { ...prev, description: e.target.value } : null
                )}
              />
            ) : (
              <div className="detail-field">{selectedTask?.description}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="assignee">Assignee</label>
            {isEditMode ? (
              <select
                id="assignee"
                value={editedTask?.assignee || ''}
                onChange={(e) => setEditedTask(prev => 
                  prev ? { ...prev, assignee: e.target.value } : null
                )}
              >
                <option value="">Select Assignee</option>
                {assignees.map(assignee => (
                  <option key={assignee} value={assignee}>{assignee}</option>
                ))}
              </select>
            ) : (
              <div className="detail-field">{selectedTask?.assignee || 'Not assigned'}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="patient">Patient</label>
            {isEditMode ? (
              <select
                id="patient"
                value={editedTask?.patient || ''}
                onChange={(e) => setEditedTask(prev => 
                  prev ? { ...prev, patient: e.target.value } : null
                )}
              >
                <option value="">Select Patient</option>
                {patients.map(patient => (
                  <option key={patient} value={patient}>{patient}</option>
                ))}
              </select>
            ) : (
              <div className="detail-field">{selectedTask?.patient || 'No patient'}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="deadline">Deadline</label>
            {isEditMode ? (
              <input
                id="deadline"
                type="datetime-local"
                value={editedTask?.deadline ? new Date(editedTask.deadline).toISOString().slice(0, 16) : ''}
                onChange={(e) => setEditedTask(prev => 
                  prev ? { ...prev, deadline: new Date(e.target.value) } : null
                )}
              />
            ) : (
              <div className="detail-field">
                {selectedTask?.deadline ? new Date(selectedTask.deadline).toLocaleString() : 'No deadline'}
              </div>
            )}
          </div>
        </div>
        <div className="modal-footer">
          {isEditMode ? (
            <>
              <button className="cancel-button" onClick={() => setIsEditMode(false)}>Cancel</button>
              <button className="save-button" onClick={handleSaveEdit}>Save changes</button>
            </>
          ) : (
            <button className="edit-button" onClick={() => setIsEditMode(true)}>Edit</button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default TodoApp;