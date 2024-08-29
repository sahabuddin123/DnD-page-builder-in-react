import React, { useState, useEffect } from 'react';
import '../assets/css/Modal.css'; // Add appropriate CSS for styling
import '../assets/css/ImageModal.css'; // Add appropriate CSS for styling


const ImageModal = ({ isOpen, onClose, onSave, imageData, setImageData }) => {
  const [preview, setPreview] = useState('https://via.placeholder.com/200');
  const [localImageData, setLocalImageData] = useState({});

  useEffect(() => {
    // Set preview and localImageData whenever imageData changes
    setPreview(imageData.src || 'https://via.placeholder.com/200');
    setLocalImageData(imageData);
  }, [imageData]);

  const handleURLChange = (e) => {
    const url = e.target.value;
    setPreview(url);
    setLocalImageData((prev) => ({ ...prev, src: url }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalImageData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAlignmentChange = (alignment) => {
    setLocalImageData((prev) => ({ ...prev, alignment }));
  };

  const handleSave = () => {
    setImageData(localImageData); // Update the parent state with new image data
    onSave(localImageData); // Trigger save callback
    onClose(); // Close the modal after saving
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setLocalImageData((prev) => ({ ...prev, src: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Edit Image</h3>
          <button className="close-button" onClick={onClose}>X</button>
        </div>

        <div className="modal-body">
          {/* Image Preview */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <label htmlFor="image-upload-frame" style={{ cursor: 'pointer' }}>
              <img
                src={preview}
                alt="Preview"
                style={{
                  maxWidth: '200px',
                  maxHeight: '200px',
                  border: '1px solid #ddd'
                }}
                title="Click to upload image"
              />
            </label>
            {/* Hidden file input for image upload */}
            <input
              type="file"
              id="image-upload-frame"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          {/* Image URL Input */}
          <label>Image Source URL:</label>
          <input
            type="text"
            value={localImageData.src || ''}
            onChange={handleURLChange}
            placeholder="Enter Image Source URL"
            className="modal-input"
          />

          {/* Image Properties */}
          <label>Height (px or % / auto):</label>
          <input
            type="text"
            name="height"
            value={localImageData.height || ''}
            onChange={handleInputChange}
            placeholder="Height"
            className="modal-input"
          />

          <label>Width (px or % / auto):</label>
          <input
            type="text"
            name="width"
            value={localImageData.width || ''}
            onChange={handleInputChange}
            placeholder="Width"
            className="modal-input"
          />

          <label>Border Radius (px):</label>
          <input
            type="number"
            name="borderRadius"
            value={localImageData.borderRadius || ''}
            onChange={handleInputChange}
            placeholder="Border Radius"
            className="modal-input"
          />

          <label>Float:</label>
          <select name="float" value={localImageData.float || 'none'} onChange={handleInputChange} className="modal-input">
            <option value="none">None</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>

          {/* Image Alignment */}
          <label>Alignment:</label>
          <div className="button-group">
            <button className={`align-button ${localImageData.alignment === 'left' ? 'selected' : ''}`} onClick={() => handleAlignmentChange('left')}>Left</button>
            <button className={`align-button ${localImageData.alignment === 'center' ? 'selected' : ''}`} onClick={() => handleAlignmentChange('center')}>Center</button>
            <button className={`align-button ${localImageData.alignment === 'right' ? 'selected' : ''}`} onClick={() => handleAlignmentChange('right')}>Right</button>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={handleSave} className="modal-save-button">Save</button>
          <button onClick={onClose} className="modal-close-button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
