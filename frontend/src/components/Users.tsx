import React, { useEffect, useState } from "react";
import "./Users.css";

interface User {
  id: number;
  name: string;
  role: 'Doctor' | 'Nurse' | 'Secretary';
  doctor_number?: string;
  created_at: Date;
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

const Users: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tasks");
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('view');
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    userId: number | null;
    userName: string;
  }>({
    isOpen: false,
    userId: null,
    userName: ""
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [sortField, setSortField] = useState<'name' | 'role' | 'created_at'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const roles = ['Doctor', 'Nurse', 'Secretary'];

  useEffect(() => {
    fetchUsers();
    setCategories(["Tasks", "Users", "Patients"]);
  }, [searchTerm, selectedRoles, sortField, sortOrder]);
  
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      
      const queryParams = new URLSearchParams();
      
      // Add search term if present
      if (searchTerm) {
        queryParams.append('search', searchTerm);
      }
      
      // Add roles if selected
      if (selectedRoles.length > 0) {
        queryParams.append('role', selectedRoles.join(','));
      }
      
      // Add sorting parameters
      queryParams.append('sort', sortField);
      queryParams.append('order', sortOrder);
  
      const response = await fetch(`http://localhost:5000/users?${queryParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data: User[] = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRoleToggle = (role: string) => {
    setSelectedRoles(prev => 
      prev.includes(role) 
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const handleAddNewUser = () => {
    setModalMode('create');
    setIsDetailModalOpen(true);
    setIsEditMode(true);
    // Set default values for new task
    setEditedUser({
      id: 0, // temporary ID
      name: '',
      role: 'Doctor',
      doctor_number: '',
      created_at: new Date()
    });
  };

  const handleShowDetail = (task: User) => {
    setSelectedUser(task);
    setEditedUser(task);
    setIsDetailModalOpen(true);
    setIsEditMode(false);
    setModalMode('view');
  };

  const handleSaveEdit = () => {
    if (!editedUser || !editedUser.name.trim()) return;

    const url = modalMode === 'create' 
      ? "http://localhost:5000/users"
      : `http://localhost:5000/users/${editedUser.id}`;
    
    const method = modalMode === 'create' ? 'POST' : 'PUT';

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedUser),
    })
      .then((res) => res.json())
      .then((updatedUser: User) => {
        if (modalMode === 'create') {
          setUsers(prevUsers => [...prevUsers, updatedUser]);
        } else {
          setUsers((prevUsers) =>
            prevUsers.map((user) => (user.id === editedUser.id ? updatedUser : user))
          );
          setSelectedUser(updatedUser);
        }
        closeModal();
      })
      .catch((err) => console.error("Error saving user:", err));
  };
  
  const handleDeleteUser = (id: number) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        setDeleteConfirmation({ isOpen: false, userId: null, userName: "" });
      })
      .catch((err) => console.error("Error deleting user:", err));
  };

  // Add new function to handle opening delete confirmation
  const openDeleteConfirmation = (user: User) => {
    setDeleteConfirmation({
      isOpen: true,
      userId: user.id,
      userName: user.name
    });
  };

  const closeModal = () => {
    setIsDetailModalOpen(false);
    setIsEditMode(false);
    setSelectedUser(null);
    setEditedUser(null);
    setModalMode('view');
  };

  return (
    <div className="users">
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
    </div>

      {/* <!-- Main Content --> */}
    <div className="main">
      <div className="header">
        <span>Users Management</span>
        <button onClick={handleAddNewUser} className="add-user-button">+</button>
      </div>
      
      {/* Enhanced filter controls */}
      <div className="filters">
        <div className="search-sort-order">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value as 'name' | 'role' | 'created_at')}
            className="sort-select"
          >
            <option value="name">Sort by Name</option>
            <option value="role">Sort by Role</option>
            <option value="created_at">Sort by Date</option>
          </select>
          
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="order-select"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        
        <div className="filter-section">
          <div className="role-filters">
            <span className="filter-label">Filter by Role:</span>
            <div className="checkbox-group">
              {roles.map(role => (
                <label key={role} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedRoles.includes(role)}
                    onChange={() => handleRoleToggle(role)}
                  />
                  {role}
                </label>
              ))}
            </div>
          </div>
        </div>
        
        {selectedRoles.length > 0 && (
          <div className="active-filters">
            <div className="filter-tags">
              Selected roles:
              {selectedRoles.map(role => (
                <span key={role} className="filter-tag">
                  {role}
                  <button onClick={() => handleRoleToggle(role)}>×</button>
                </span>
              ))}
              <button 
                className="clear-filters"
                onClick={() => setSelectedRoles([])}
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
        <div className="user-list">

          {isLoading ? (
            <div className="loading">Loading...</div>
          ) : users.length === 0 ? (
            <div className="no-users">No users found</div>
          ) : (
            users.map((user) => (
              <div key={user.id} className="user">
                <span className="role">{user.role}</span>
                <span className="name">{user.name}</span>
                {user.role === 'Doctor' && <span className="doctor-number">{`Doctor Number: ${user.doctor_number}`}</span>}
                <div className="actions">
                  <button className="detail" onClick={() => handleShowDetail(user)}>
                                    Detail
                                </button>
                  <button className="delete" onClick={() => openDeleteConfirmation(user)}>
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
              ? 'Create New User'
              : isEditMode
                ? 'Edit User'
                : 'User Details'}
          </h2>
          <button className="close-button" onClick={closeModal}>×</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="title">Name</label>
            {isEditMode ? (
              <input
                id="title"
                type="text"
                value={editedUser?.name || ''}
                onChange={(e) => setEditedUser(prev =>
                  prev ? { ...prev, name: e.target.value } : null
                )}
              />
            ) : (
              <div className="detail-field">{selectedUser?.name}</div>
            )}
          </div>



          <div className="form-group">
            {isEditMode ? (
              editedUser?.role === 'Doctor' && <><label htmlFor="doctor-number">Doctor Registration Number</label><input
                id="doctor-number"
                type="text"
                value={editedUser?.doctor_number || ''}
                onChange={(e) => setEditedUser(prev =>
                  prev ? { ...prev, doctor_number: e.target.value } : null
                )}
              /></>
            ) : (
              selectedUser?.role === 'Doctor' && 
              <>
              <label htmlFor="doctor-number">Doctor Registration Number</label>
              <div className="detail-field">{selectedUser?.doctor_number}</div>
              </>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            {isEditMode ? (
              <select
              id="role"
              value={editedUser?.role || ''}
              onChange={(e) =>
                setEditedUser((prev) =>
                  prev ? { ...prev, role: e.target.value as User['role'] } : null
                )
              }
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            
            ) : (
              <div className="detail-field">{selectedUser?.role || 'Not assigned'}</div>
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

      {/* Confirm Delete Modal */}
      <Modal
        isOpen={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false, userId: null, userName: "" })}
      >
        <div className="modal-header">
          <h2>Confirm Deletion</h2>
          <button
            className="close-button"
            onClick={() => setDeleteConfirmation({ isOpen: false, userId: null, userName: "" })}
          >
            ×
          </button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to delete the user "{deleteConfirmation.userName}"?</p>
          <p>This action cannot be undone.</p>
        </div>
        <div className="modal-footer">
          <button
            className="cancel-button"
            onClick={() => setDeleteConfirmation({ isOpen: false, userId: null, userName: "" })}
          >
            Cancel
          </button>
          <button
            className="delete-button"
            onClick={() => deleteConfirmation.userId && handleDeleteUser(deleteConfirmation.userId)}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Users;