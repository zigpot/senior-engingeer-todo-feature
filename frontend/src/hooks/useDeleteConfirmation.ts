import { useState } from "react";

const useDeleteConfirmation = () => {
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    id: number | null;
    name: string;
  }>({
    isOpen: false,
    id: null,
    name: ""
  });

  const openDeleteConfirmation = (id: number, name: string) => {
    setDeleteConfirmation({
      isOpen: true,
      id,
      name
    });
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmation({
      isOpen: false,
      id: null,
      name: ""
    });
  };

  return {
    deleteConfirmation,
    openDeleteConfirmation,
    closeDeleteConfirmation
  };
};

export default useDeleteConfirmation;