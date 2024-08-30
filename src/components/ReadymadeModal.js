import React, { useState } from 'react';
import '../assets/css/Modal.css';
import {
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaItalic,
  FaBold,
  FaFont,
  FaUnderline,
  FaTextHeight,
  FaTimes,
  FaSave,
} from 'react-icons/fa';

const ReadymadeModal = ({ isOpen, onClose, onSave, elementData, setElementData }) => {
  const [localData, setLocalData] = useState(elementData || {});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAlignmentChange = (alignment) => {
    setLocalData((prev) => ({ ...prev, textAlign: alignment }));
  };

  const handleFontWeightChange = (weight) => {
    setLocalData((prev) => ({ ...prev, fontWeight: weight }));
  };

  const handleTextTransformChange = (transform) => {
    setLocalData((prev) => ({ ...prev, textTransform: transform }));
  };

  const toggleItalic = () => {
    setLocalData((prev) => ({ ...prev, fontStyle: prev.fontStyle === 'italic' ? 'normal' : 'italic' }));
  };

  const toggleUnderline = () => {
    setLocalData((prev) => ({ ...prev, textDecoration: prev.textDecoration === 'underline' ? 'none' : 'underline' }));
  };

  const handleSave = () => {
    setElementData(localData); // মূল ডেটা আপডেট করে
    onSave(localData); // সেভ কলব্যাক ট্রিগার করে
    onClose(); // সেভ করার পরে মডাল বন্ধ করে
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Edit Readymade Element</h3>
          <button className="close-button" onClick={onClose}><FaTimes /></button>
        </div>
        <div className="modal-body">
          {/* Style and alignment options */}
          <label>Font Weight:</label>
          <div className="button-group font-weight-group">
            <button className={`weight-button ${localData.fontWeight === '300' ? 'selected' : ''}`} onClick={() => handleFontWeightChange('300')}><FaItalic /> Slim</button>
            <button className={`weight-button ${localData.fontWeight === '400' ? 'selected' : ''}`} onClick={() => handleFontWeightChange('400')}><FaFont /> Regular</button>
            <button className={`weight-button ${localData.fontWeight === '600' ? 'selected' : ''}`} onClick={() => handleFontWeightChange('600')}><FaBold /> SemiBold</button>
            <button className={`weight-button ${localData.fontWeight === '700' ? 'selected' : ''}`} onClick={() => handleFontWeightChange('700')}><FaBold /> Bold</button>
            <button className={`weight-button ${localData.fontWeight === '800' ? 'selected' : ''}`} onClick={() => handleFontWeightChange('800')}><FaBold /> ExtraBold</button>
          </div>

          <label>Text Alignment:</label>
          <div className="button-group">
            <button className={`align-button ${localData.textAlign === 'left' ? 'selected' : ''}`} onClick={() => handleAlignmentChange('left')}><FaAlignLeft /></button>
            <button className={`align-button ${localData.textAlign === 'center' ? 'selected' : ''}`} onClick={() => handleAlignmentChange('center')}><FaAlignCenter /></button>
            <button className={`align-button ${localData.textAlign === 'right' ? 'selected' : ''}`} onClick={() => handleAlignmentChange('right')}><FaAlignRight /></button>
            <button className={`align-button ${localData.textAlign === 'justify' ? 'selected' : ''}`} onClick={() => handleAlignmentChange('justify')}><FaAlignJustify /></button>
          </div>

          <label>Font Size in px:</label>
          <input
            type="number"
            name="fontSize"
            value={localData.fontSize || 16}
            onChange={handleInputChange}
            placeholder="Font Size"
            className="modal-input"
          />

          <label>Text Transform:</label>
          <div className="button-group text-transform-group">
            <button className={`transform-button ${localData.textTransform === 'uppercase' ? 'selected' : ''}`} onClick={() => handleTextTransformChange('uppercase')}><FaTextHeight /> Uppercase</button>
            <button className={`transform-button ${localData.textTransform === 'lowercase' ? 'selected' : ''}`} onClick={() => handleTextTransformChange('lowercase')}><FaTextHeight /> Lowercase</button>
            <button className={`transform-button ${localData.textTransform === 'capitalize' ? 'selected' : ''}`} onClick={() => handleTextTransformChange('capitalize')}><FaTextHeight /> Sentence Case</button>
          </div>

          <label>Text Style:</label>
          <div className="button-group text-style-group">
            <button className={`style-button ${localData.fontStyle === 'normal' && localData.textDecoration === 'none' ? 'selected' : ''}`} onClick={() => { setLocalData((prev) => ({ ...prev, fontStyle: 'normal', textDecoration: 'none' })); }}><FaFont /> Regular</button>
            <button className={`style-button ${localData.fontStyle === 'italic' ? 'selected' : ''}`} onClick={toggleItalic}><FaItalic /> Italic</button>
            <button className={`style-button ${localData.textDecoration === 'underline' ? 'selected' : ''}`} onClick={toggleUnderline}><FaUnderline /> Underline</button>
          </div>

          <label>Font Color:</label>
          <input
            type="color"
            name="color"
            value={localData.color || '#000000'}
            onChange={handleInputChange}
            className="modal-input"
          />

          {/* Padding and Margin Inputs */}
          <label>Padding (Top Right Bottom Left):</label>
          <div className="padding-margin-inputs">
            <input type="text" name="paddingTop" value={localData.paddingTop || '0px'} onChange={handleInputChange} placeholder="Top" />
            <input type="text" name="paddingRight" value={localData.paddingRight || '0px'} onChange={handleInputChange} placeholder="Right" />
            <input type="text" name="paddingBottom" value={localData.paddingBottom || '0px'} onChange={handleInputChange} placeholder="Bottom" />
            <input type="text" name="paddingLeft" value={localData.paddingLeft || '0px'} onChange={handleInputChange} placeholder="Left" />
          </div>

          <label>Margin (Top Right Bottom Left):</label>
          <div className="padding-margin-inputs">
            <input type="text" name="marginTop" value={localData.marginTop || '0px'} onChange={handleInputChange} placeholder="Top" />
            <input type="text" name="marginRight" value={localData.marginRight || '0px'} onChange={handleInputChange} placeholder="Right" />
            <input type="text" name="marginBottom" value={localData.marginBottom || '0px'} onChange={handleInputChange} placeholder="Bottom" />
            <input type="text" name="marginLeft" value={localData.marginLeft || '0px'} onChange={handleInputChange} placeholder="Left" />
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={handleSave} className="modal-save-button"><FaSave /> Save</button>
          <button onClick={onClose} className="modal-close-button"><FaTimes /> Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ReadymadeModal;
