import React, { useState } from 'react';
import '../assets/css/GridCellStyleModal.css';
const GridCellStyleModal = ({ isOpen, onClose, onSave, styleData }) => {
    const [localStyle, setLocalStyle] = useState(styleData);
    const [isTransparent, setIsTransparent] = useState(false);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setLocalStyle((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSave = () => {
      onSave(localStyle);
      onClose(); // Close the modal after saving
    };
  
    const handleTransparentChange = () => {
      setIsTransparent(!isTransparent);
      setLocalStyle((prev) => ({
        ...prev,
        backgroundColor: !isTransparent ? 'transparent' : '#ffffff', // Default to white when not transparent
      }));
    };
  
    return isOpen ? (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Edit Grid Cell Style</h3>
            <button className="close-button" onClick={onClose}>X</button>
          </div>
          <div className="modal-body">
            <div className="input-group">
              <label>
                <input
                  type="checkbox"
                  checked={isTransparent}
                  onChange={handleTransparentChange}
                />
                Is background transparent?
              </label>
            </div>
  
            {!isTransparent && (
              <div className="input-group">
                <label>Background Color:</label>
                <input
                  type="color"
                  name="backgroundColor"
                  value={localStyle.backgroundColor || '#ffffff'}
                  onChange={handleInputChange}
                />
              </div>
            )}
  
            {/* Padding Inputs */}
            <div className="input-group">
              <label>Padding:</label>
              <div className="padding-margin-group">
                <label>Top:</label>
                <input
                  type="text"
                  name="paddingTop"
                  value={localStyle.paddingTop || '0px'}
                  placeholder="Top"
                  onChange={handleInputChange}
                />
                <label>Right:</label>
                <input
                  type="text"
                  name="paddingRight"
                  value={localStyle.paddingRight || '0px'}
                  placeholder="Right"
                  onChange={handleInputChange}
                />
                <label>Bottom:</label>
                <input
                  type="text"
                  name="paddingBottom"
                  value={localStyle.paddingBottom || '0px'}
                  placeholder="Bottom"
                  onChange={handleInputChange}
                />
                <label>Left:</label>
                <input
                  type="text"
                  name="paddingLeft"
                  value={localStyle.paddingLeft || '0px'}
                  placeholder="Left"
                  onChange={handleInputChange}
                />
              </div>
            </div>
  
            {/* Margin Inputs */}
            <div className="input-group">
              <label>Margin:</label>
              <div className="padding-margin-group">
                <label>Top:</label>
                <input
                  type="text"
                  name="marginTop"
                  value={localStyle.marginTop || '0px'}
                  placeholder="Top"
                  onChange={handleInputChange}
                />
                <label>Right:</label>
                <input
                  type="text"
                  name="marginRight"
                  value={localStyle.marginRight || '0px'}
                  placeholder="Right"
                  onChange={handleInputChange}
                />
                <label>Bottom:</label>
                <input
                  type="text"
                  name="marginBottom"
                  value={localStyle.marginBottom || '0px'}
                  placeholder="Bottom"
                  onChange={handleInputChange}
                />
                <label>Left:</label>
                <input
                  type="text"
                  name="marginLeft"
                  value={localStyle.marginLeft || '0px'}
                  placeholder="Left"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={handleSave} className="modal-save-button">Save</button>
            <button onClick={onClose} className="modal-close-button">Cancel</button>
          </div>
        </div>
      </div>
    ) : null;
  };
  
  export default GridCellStyleModal;