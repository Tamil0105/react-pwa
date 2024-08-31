import React from 'react';

interface DeletePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeletePopup: React.FC<DeletePopupProps> = ({ isOpen, onClose, onDelete }) => {

  return (
    <div className=" flex items-center justify-center ">
      <div className="bg-white p-6 rounded-lg  ">
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
