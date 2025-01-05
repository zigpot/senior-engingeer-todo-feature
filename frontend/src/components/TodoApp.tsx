import React, { useState, useEffect } from "react";
import "./TodoApp.css";
import Checkbox from "./Checkbox";
import { Todo } from "../types/models";
import { Modal } from "./Modal";

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Todo | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState<Todo | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('view');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'deadline' | 'created_at' | 'title'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterBy, setFilterBy] = useState<'all' | 'completed' | 'uncompleted'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    taskId: number | null;
    taskTitle: string;
  }>({
    isOpen: false,
    taskId: null,
    taskTitle: ""
  });

  // Mock data for dropdowns
  const assignees = ["Dr. Smith", "Dr. Johnson", "Dr. Williams"];
  const patients = ["John Doe", "Jane Smith", "Robert Brown"];

  useEffect(() => {
    fetchTasks();
  }, [searchTerm, sortBy, sortOrder, filterBy]); // Re-fetch when sort or filter changes

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        sort: sortBy,
        order: sortOrder,
        status: filterBy
      });

      if (searchTerm) {
        queryParams.append('search', searchTerm);
      }

      const response = await fetch(`http://localhost:5000/todos?${queryParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data: Todo[] = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNewTask = () => {
    setModalMode('create');
    setIsDetailModalOpen(true);
    setIsEditMode(true);
    // Set default values for new task
    setEditedTask({
      id: 0, // temporary ID
      title: '',
      description: '',
      deadline: new Date(),
      created_at: new Date(),
      completed: false,
      assignee: '',
      patient: ''
    });
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
    setModalMode('view');
  };

  const handleSaveEdit = () => {
    if (!editedTask || !editedTask.title.trim()) return;

    const url = modalMode === 'create' 
      ? "http://localhost:5000/todos"
      : `http://localhost:5000/todos/${editedTask.id}`;
    
    const method = modalMode === 'create' ? 'POST' : 'PUT';

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedTask),
    })
      .then((res) => res.json())
      .then((updatedTask: Todo) => {
        if (modalMode === 'create') {
          setTasks(prevTasks => [...prevTasks, updatedTask]);
        } else {
          setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === editedTask.id ? updatedTask : task))
          );
          setSelectedTask(updatedTask);
        }
        closeModal();
      })
      .catch((err) => console.error("Error saving task:", err));
  };

  const handleDeleteTask = (id: number) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        setDeleteConfirmation({ isOpen: false, taskId: null, taskTitle: "" });
      })
      .catch((err) => console.error("Error deleting task:", err));
  };

  // Add new function to handle opening delete confirmation
  const openDeleteConfirmation = (task: Todo) => {
    setDeleteConfirmation({
      isOpen: true,
      taskId: task.id,
      taskTitle: task.title
    });
  };

  const closeModal = () => {
    setIsDetailModalOpen(false);
    setIsEditMode(false);
    setSelectedTask(null);
    setEditedTask(null);
    setModalMode('view');
  };

  return (
    <div className="todoapp">
      {/* Main Content */}
      <div className="main">
        <div className="header">
          <span>Tasks</span>
          <button className="add-task-button" onClick={handleAddNewTask}>+</button>
        </div>
        <div className="filters">
          <div className="sort-controls">
          <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="sxxs" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'deadline' | 'created_at' | 'title')}
              className="sort-select"
            >
              <option value="title">Sort by Title</option>
              <option value="created_at">Sort by Created Date</option>
              <option value="deadline">Sort by Deadline</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="order-select"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as 'all' | 'completed' | 'uncompleted')}
            className="filter-select"
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
          </div>
        </div>

        <div className="task-list">
          {isLoading ? (
            <div className="loading">Loading...</div>
          ) : tasks.length === 0 ? (
            <div className="no-tasks">No tasks found</div>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="task">
                <Checkbox
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id)}
                  className="task"
                />
                <div>
                  <span
                    style={{
                      display: 'block',
                      color: task.completed ? 'gray' : 'black'
                    }}
                  >
                    {task.title}
                  </span>
                  <span
                    style={{
                      display: 'block', fontSize: '15px', fontWeight: '100',
                      color: task.completed ? '#a1a1a1' : 'gray'
                      }}>
                    {task.description}
                  </span>
                </div>
                <div className="actions">
                  <button className="detail" onClick={() => handleShowDetail(task)}>
                    Detail
                  </button>
                  <button className="delete" onClick={() => openDeleteConfirmation(task)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Detail/Edit Modal */}
      <Modal isOpen={isDetailModalOpen} onClose={closeModal}>
        <div className="modal-header">
          <h2>
            {modalMode === 'create' 
              ? 'Create New Task' 
              : isEditMode 
                ? 'Edit Task' 
                : 'Task Details'}
          </h2>
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
              <button className="cancel-button" onClick={() => modalMode === 'create' ? closeModal() : setIsEditMode(false)}>
                Cancel
              </button>
              <button className="save-button" onClick={handleSaveEdit}>Save changes</button>
            </>
          ) : (
            <button className="edit-button" onClick={() => setIsEditMode(true)}>Edit</button>
          )}
        </div>
      </Modal>
      {/* Add Delete Confirmation Modal */}
      <Modal 
        isOpen={deleteConfirmation.isOpen} 
        onClose={() => setDeleteConfirmation({ isOpen: false, taskId: null, taskTitle: "" })}
      >
        <div className="modal-header">
          <h2>Confirm Deletion</h2>
          <button 
            className="close-button" 
            onClick={() => setDeleteConfirmation({ isOpen: false, taskId: null, taskTitle: "" })}
          >
            ×
          </button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to delete the task "{deleteConfirmation.taskTitle}"?</p>
          <p>This action cannot be undone.</p>
        </div>
        <div className="modal-footer">
          <button 
            className="cancel-button" 
            onClick={() => setDeleteConfirmation({ isOpen: false, taskId: null, taskTitle: "" })}
          >
            Cancel
          </button>
          <button 
            className="delete-button" 
            onClick={() => deleteConfirmation.taskId && handleDeleteTask(deleteConfirmation.taskId)}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TodoApp;