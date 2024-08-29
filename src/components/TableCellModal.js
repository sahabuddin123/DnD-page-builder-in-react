import React from 'react';

const TableCellModal = ({ isOpen, onClose, onSave, rowStyles, handleStyleChange }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Edit Row Style</h3>
          <button onClick={onClose}>X</button>
        </div>
        <div className="modal-body">
          <label>Background Color:</label>
          <input
            type="color"
            value={rowStyles.backgroundColor}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
          />
          <label>Font Color:</label>
          <input
            type="color"
            value={rowStyles.color}
            onChange={(e) => handleStyleChange('color', e.target.value)}
          />
        </div>
        <div className="modal-footer">
          <button onClick={onSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TableCellModal;
