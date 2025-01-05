import React, { useEffect, useState } from "react";
import "./Patients.css";
import { Patient } from "../types/models";
import { Modal } from "./Modal";

const Patients: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tasks");
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedPatient, setEditedPatient] = useState<Patient | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('view');
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    patientId: number | null;
    patientName: string;
  }>({
    isOpen: false,
    patientId: null,
    patientName: ""
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'name' | 'created_at'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetchPatients();
    setCategories(["Tasks", "Users", "Patients"]);
  }, [searchTerm, sortField, sortOrder]);
  
  const fetchPatients = async () => {
    try {
      setIsLoading(true);
      
      const queryParams = new URLSearchParams();
      
      if (searchTerm) {
        queryParams.append('search', searchTerm);
      }
      
      queryParams.append('sort', sortField);
      queryParams.append('order', sortOrder);
  
      const response = await fetch(`http://localhost:5000/patients?${queryParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch patients');
      }
      const data: Patient[] = await response.json();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNewPatient = () => {
    setModalMode('create');
    setIsDetailModalOpen(true);
    setIsEditMode(true);
    setEditedPatient({
      id: 0,
      name: '',
      created_at: new Date()
    });
  };

  const handleShowDetail = (patient: Patient) => {
    setSelectedPatient(patient);
    setEditedPatient(patient);
    setIsDetailModalOpen(true);
    setIsEditMode(false);
    setModalMode('view');
  };

  const handleSaveEdit = () => {
    if (!editedPatient || !editedPatient.name.trim()) return;

    const url = modalMode === 'create' 
      ? "http://localhost:5000/patients"
      : `http://localhost:5000/patients/${editedPatient.id}`;
    
    const method = modalMode === 'create' ? 'POST' : 'PUT';

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedPatient),
    })
      .then((res) => res.json())
      .then((updatedPatient: Patient) => {
        if (modalMode === 'create') {
          setPatients(prevPatients => [...prevPatients, updatedPatient]);
        } else {
          setPatients((prevPatients) =>
            prevPatients.map((patient) => (patient.id === editedPatient.id ? updatedPatient : patient))
          );
          setSelectedPatient(updatedPatient);
        }
        closeModal();
      })
      .catch((err) => console.error("Error saving patient:", err));
  };
  
  const handleDeletePatient = (id: number) => {
    fetch(`http://localhost:5000/patients/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== id));
        setDeleteConfirmation({ isOpen: false, patientId: null, patientName: "" });
      })
      .catch((err) => console.error("Error deleting patient:", err));
  };

  const openDeleteConfirmation = (patient: Patient) => {
    setDeleteConfirmation({
      isOpen: true,
      patientId: patient.id,
      patientName: patient.name
    });
  };

  const closeModal = () => {
    setIsDetailModalOpen(false);
    setIsEditMode(false);
    setSelectedPatient(null);
    setEditedPatient(null);
    setModalMode('view');
  };

  return (
    <div className="patients">
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

      <div className="main">
        <div className="header">
          <span>Patient Management</span>
          <button onClick={handleAddNewPatient} className="add-patient-button">+</button>
        </div>
        
        <div className="filters">
          <div className="search-sort-order">
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as 'name' | 'created_at')}
              className="sort-select"
            >
              <option value="name">Sort by Name</option>
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
        </div>

        <div className="patient-list">
          {isLoading ? (
            <div className="loading">Loading...</div>
          ) : patients.length === 0 ? (
            <div className="no-patients">No patients found</div>
          ) : (
            patients.map((patient) => (
              <div key={patient.id} className="patient">
                <span className="name">{patient.name}</span>
                <span className="date">Added: {new Date(patient.created_at).toLocaleDateString()}</span>
                <div className="actions">
                  <button className="detail" onClick={() => handleShowDetail(patient)}>
                    Detail
                  </button>
                  <button className="delete" onClick={() => openDeleteConfirmation(patient)}>
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
              ? 'Add New Patient'
              : isEditMode
                ? 'Edit Patient'
                : 'Patient Details'}
          </h2>
          <button className="close-button" onClick={closeModal}>×</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            {isEditMode ? (
              <input
                id="name"
                type="text"
                value={editedPatient?.name || ''}
                onChange={(e) => setEditedPatient(prev =>
                  prev ? { ...prev, name: e.target.value } : null
                )}
              />
            ) : (
              <div className="detail-field">{selectedPatient?.name}</div>
            )}
          </div>
          {!isEditMode && (
            <div className="form-group">
              <label>Registration Date</label>
              <div className="detail-field">
                {selectedPatient?.created_at && new Date(selectedPatient.created_at).toLocaleDateString()}
              </div>
            </div>
          )}
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
        onClose={() => setDeleteConfirmation({ isOpen: false, patientId: null, patientName: "" })}
      >
        <div className="modal-header">
          <h2>Confirm Deletion</h2>
          <button
            className="close-button"
            onClick={() => setDeleteConfirmation({ isOpen: false, patientId: null, patientName: "" })}
          >
            ×
          </button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to delete the patient "{deleteConfirmation.patientName}"?</p>
          <p>This action cannot be undone.</p>
        </div>
        <div className="modal-footer">
          <button
            className="cancel-button"
            onClick={() => setDeleteConfirmation({ isOpen: false, patientId: null, patientName: "" })}
          >
            Cancel
          </button>
          <button
            className="delete-button"
            onClick={() => deleteConfirmation.patientId && handleDeletePatient(deleteConfirmation.patientId)}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Patients;