import React from 'react';
import '../assets/css/Modal.css';  // Make sure to have appropriate CSS for styling
import { FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify, FaItalic, FaBold, FaUnderline, FaTextHeight } from 'react-icons/fa';

const TableRowTwoModal = ({ isOpen, onClose, onSave, rowStyles = {}, setRowStyles }) => {  // Default rowStyles to an empty object
  if (!isOpen) return null;

  const defaultRowStyles = {
    fontWeight: '400',
    textTransform: 'none',
    isItalic: false,
    isUnderline: false,
    textAlign: 'left',
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#ffffff'
  };

  const currentStyles = { ...defaultRowStyles, ...rowStyles };  // Merge with defaults

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRowStyles((prev) => ({ ...prev, [name]: value }));
  };

  const handleFontWeightChange = (weight) => {
    setRowStyles((prev) => ({ ...prev, fontWeight: weight }));
  };

  const handleTextTransformChange = (transform) => {
    setRowStyles((prev) => ({ ...prev, textTransform: transform }));
  };

  const toggleItalic = () => {
    setRowStyles((prev) => ({ ...prev, isItalic: !prev.isItalic }));
  };

  const toggleUnderline = () => {
    setRowStyles((prev) => ({ ...prev, isUnderline: !prev.isUnderline }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Edit Row Style</h3>
          <button className="close-button" onClick={onClose}>X</button>
        </div>

        <div className="modal-body">
          <label>Content Alignment:</label>
          <div className="button-group">
            <button className={`align-button ${currentStyles.textAlign === 'left' ? 'selected' : ''}`} onClick={() => setRowStyles((prev) => ({ ...prev, textAlign: 'left' }))}><FaAlignLeft /></button>
            <button className={`align-button ${currentStyles.textAlign === 'center' ? 'selected' : ''}`} onClick={() => setRowStyles((prev) => ({ ...prev, textAlign: 'center' }))}><FaAlignCenter /></button>
            <button className={`align-button ${currentStyles.textAlign === 'right' ? 'selected' : ''}`} onClick={() => setRowStyles((prev) => ({ ...prev, textAlign: 'right' }))}><FaAlignRight /></button>
            <button className={`align-button ${currentStyles.textAlign === 'justify' ? 'selected' : ''}`} onClick={() => setRowStyles((prev) => ({ ...prev, textAlign: 'justify' }))}><FaAlignJustify /></button>
          </div>

          <label>Font-size in px:</label>
          <input type="number" name="fontSize" value={currentStyles.fontSize} onChange={handleInputChange} placeholder="Font Size" className="modal-input" />

          <label>Font Weight:</label>
          <div className="button-group font-weight-group">
            <button className={`weight-button ${currentStyles.fontWeight === '300' ? 'selected' : ''}`} onClick={() => handleFontWeightChange('300')}>Slim</button>
            <button className={`weight-button ${currentStyles.fontWeight === '400' ? 'selected' : ''}`} onClick={() => handleFontWeightChange('400')}>Regular</button>
            <button className={`weight-button ${currentStyles.fontWeight === '600' ? 'selected' : ''}`} onClick={() => handleFontWeightChange('600')}>SemiBold</button>
            <button className={`weight-button ${currentStyles.fontWeight === '700' ? 'selected' : ''}`} onClick={() => handleFontWeightChange('700')}>Bold</button>
            <button className={`weight-button ${currentStyles.fontWeight === '800' ? 'selected' : ''}`} onClick={() => handleFontWeightChange('800')}>ExtraBold</button>
          </div>

          <label>Text Transform:</label>
          <div className="button-group text-transform-group">
            <button className={`transform-button ${currentStyles.textTransform === 'uppercase' ? 'selected' : ''}`} onClick={() => handleTextTransformChange('uppercase')}>Uppercase</button>
            <button className={`transform-button ${currentStyles.textTransform === 'lowercase' ? 'selected' : ''}`} onClick={() => handleTextTransformChange('lowercase')}>Lowercase</button>
            <button className={`transform-button ${currentStyles.textTransform === 'capitalize' ? 'selected' : ''}`} onClick={() => handleTextTransformChange('capitalize')}>Sentence Case</button>
          </div>

          <label>Text Style:</label>
          <div className="button-group text-style-group">
            <button className={`style-button ${!currentStyles.isItalic && !currentStyles.isUnderline ? 'selected' : ''}`} onClick={() => setRowStyles((prev) => ({ ...prev, isItalic: false, isUnderline: false }))}>Regular</button>
            <button className={`style-button ${currentStyles.isItalic ? 'selected' : ''}`} onClick={toggleItalic}>Italic</button>
            <button className={`style-button ${currentStyles.isUnderline ? 'selected' : ''}`} onClick={toggleUnderline}>Underline</button>
          </div>

          <label>Font Color:</label>
          <input type="color" name="color" value={currentStyles.color} onChange={handleInputChange} className="modal-input" />

          <label>Background Color:</label>
          <input type="color" name="backgroundColor" value={currentStyles.backgroundColor} onChange={handleInputChange} className="modal-input" />
        </div>

        <div className="modal-footer">
          <button onClick={() => onSave(currentStyles)} className="modal-save-button">Update</button>
          <button onClick={onClose} className="modal-close-button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TableRowTwoModal;
