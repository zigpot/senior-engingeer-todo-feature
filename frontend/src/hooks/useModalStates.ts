import { useState } from "react";

const useModalState = (initialMode: 'view' | 'edit' | 'create' = 'view') => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState(initialMode);
  const [isEditMode, setIsEditMode] = useState(false);

  const openModal = (newMode: 'view' | 'edit' | 'create') => {
    setIsOpen(true);
    setMode(newMode);
    setIsEditMode(newMode === 'create' || newMode === 'edit');
  };

  const closeModal = () => {
    setIsOpen(false);
    setMode('view');
    setIsEditMode(false);
  };

  return {
    isOpen,
    mode,
    isEditMode,
    openModal,
    closeModal,
    setIsEditMode
  };
};

export default useModalState;