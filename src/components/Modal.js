import React from 'react';
import '../assets/css/Modal.css';
import { FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify, FaTimes, FaSave, FaTimesCircle, FaItalic, FaBold, FaFont, FaUnderline, FaTextHeight } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, onSave, element, setElement, handleInputChange, handleAlignmentChange }) => {
  if (!isOpen) return null;

  const handleLabelClick = (inputId) => {
    document.getElementById(inputId).focus();
  };

  const handleFontWeightChange = (weight) => {
    setElement((prev) => ({ ...prev, fontWeight: weight }));
  };

  const handleTextTransformChange = (transform) => {
    setElement((prev) => ({ ...prev, textTransform: transform }));
  };

  const toggleItalic = () => {
    setElement((prev) => ({ ...prev, isItalic: !prev.isItalic }));
  };

  const toggleUnderline = () => {
    setElement((prev) => ({ ...prev, isUnderline: !prev.isUnderline }));
  };

  const setRegular = () => {
    setElement((prev) => ({ ...prev, isItalic: false, isUnderline: false }));
  };

  const getTextStyle = () => {
    return {
      fontWeight: element.fontWeight,
      textTransform: element.textTransform,
      fontStyle: element.isItalic ? 'italic' : 'normal',
      textDecoration: element.isUnderline ? 'underline' : 'none',
      textAlign: element.textAlign,
      color: element.color,
      fontSize: element.fontSize ? `${element.fontSize}px` : '16px',
    };
  };

  const handleUpdate = () => {
    onSave(getTextStyle());
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Edit Element</h3>
          <button className="close-button" onClick={onClose}><FaTimes /></button>
        </div>

        <div className="modal-body">
          <label onClick={() => handleLabelClick('content-input')}>Enter Your Content Here:</label>
          <input
            id="content-input"
            type="text"
            name="content"
            value={element.content}
            onChange={handleInputChange}
            placeholder="Edit content"
            className="modal-input"
          />

          <label>Content Alignment:</label>
          <div className="button-group">
            <button className={`align-button ${element.textAlign === 'left' ? 'selected' : ''}`} onClick={() => handleAlignmentChange('left')}><FaAlignLeft /></button>
            <button className={`align-button ${element.textAlign === 'center' ? 'selected' : ''}`} onClick={() => handleAlignmentChange('center')}><FaAlignCenter /></button>
            <button className={`align-button ${element.textAlign === 'right' ? 'selected' : ''}`} onClick={() => handleAlignmentChange('right')}><FaAlignRight /></button>
            <button className={`align-button ${element.textAlign === 'justify' ? 'selected' : ''}`} onClick={() => handleAlignmentChange('justify')}><FaAlignJustify /></button>
          </div>

          <label onClick={() => handleLabelClick('font-size-input')}>Font-size in px:</label>
          <input
            id="font-size-input"
            type="number"
            name="fontSize"
            value={element.fontSize !== undefined ? element.fontSize : 16}  
            onChange={handleInputChange}
            placeholder="Font Size"
            className="modal-input"
          />

          <label>Font Weight:</label>
          <div className="button-group font-weight-group">
            <button className={`weight-button ${element.fontWeight === '300' ? 'selected' : ''}`} onClick={() => handleFontWeightChange('300')}><FaItalic /> Slim</button>
            <button className={`weight-button ${element.fontWeight === '400' ? 'selected' : ''}`} onClick={() => handleFontWeightChange('400')}><FaFont /> Regular</button>
            <button className={`weight-button ${element.fontWeight === '600' ? 'selected' : ''}`} onClick={() => handleFontWeightChange('600')}><FaBold /> SemiBold</button>
            <button className={`weight-button ${element.fontWeight === '700' ? 'selected' : ''}`} onClick={() => handleFontWeightChange('700')}><FaBold /> Bold</button>
            <button className={`weight-button ${element.fontWeight === '800' ? 'selected' : ''}`} onClick={() => handleFontWeightChange('800')}><FaBold /> ExtraBold</button>
          </div>

          <label>Text Transform:</label>
          <div className="button-group text-transform-group">
            <button className={`transform-button ${element.textTransform === 'uppercase' ? 'selected' : ''}`} onClick={() => handleTextTransformChange('uppercase')}><FaTextHeight /> Uppercase</button>
            <button className={`transform-button ${element.textTransform === 'lowercase' ? 'selected' : ''}`} onClick={() => handleTextTransformChange('lowercase')}><FaTextHeight /> Lowercase</button>
            <button className={`transform-button ${element.textTransform === 'capitalize' ? 'selected' : ''}`} onClick={() => handleTextTransformChange('capitalize')}><FaTextHeight /> Sentence Case</button>
          </div>

          <label>Text Style:</label>
          <div className="button-group text-style-group">
            <button className={`style-button ${!element.isItalic && !element.isUnderline ? 'selected' : ''}`} onClick={setRegular}><FaFont /> Regular</button>
            <button className={`style-button ${element.isItalic ? 'selected' : ''}`} onClick={toggleItalic}><FaItalic /> Italic</button>
            <button className={`style-button ${element.isUnderline ? 'selected' : ''}`} onClick={toggleUnderline}><FaUnderline /> Underline</button>
          </div>

          <label onClick={() => handleLabelClick('font-color-input')}>Font Color:</label>
          <input id="font-color-input" type="color" name="color" value={element.color || '#000000'} onChange={handleInputChange} className="modal-input" />
        </div>

        <div className="modal-footer">
          <button onClick={handleUpdate} className="modal-save-button"><FaSave /> Update</button>
          <button onClick={onClose} className="modal-close-button"><FaTimesCircle /> Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
