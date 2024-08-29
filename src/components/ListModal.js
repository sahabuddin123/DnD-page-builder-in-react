import React, { useState } from 'react';
import { FaPlus, FaMinus, FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify } from 'react-icons/fa';
import '../assets/css/List.css';  // Import the new CSS file

const ListModal = ({ isOpen, onClose, onSave, listData, setListData }) => {
  const [items, setItems] = useState(listData.items || []);
  const [fontColor, setFontColor] = useState(listData.fontColor || '#000000');
  const [fontWeight, setFontWeight] = useState(listData.fontWeight || '400');
  const [fontStyle, setFontStyle] = useState(listData.fontStyle || 'normal');
  const [listStyleType, setListStyleType] = useState(listData.listStyleType || 'none');
  const [ordered, setOrdered] = useState(listData.ordered || false);
  const [textAlign, setTextAlign] = useState(listData.textAlign || 'left'); // Add text alignment state

  const handleItemChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index] = value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, '']);
  };

  const removeItem = () => {
    setItems(items.slice(0, -1));
  };

  const handleSave = () => {
    setListData({ items, fontColor, fontWeight, fontStyle, listStyleType, ordered, textAlign });
    onSave({ type: 'one-list', content: { items, fontColor, fontWeight, fontStyle, listStyleType, ordered, textAlign } });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content list-modal-content">
        <div className="modal-header">
          <h3>Edit List</h3>
          <div className="button-group">
              <button onClick={addItem} className="control-button"><FaPlus /> Add Item</button>
              <button onClick={removeItem} className="control-button"><FaMinus /> Remove Item</button>
            </div>
          <button className="close-button" onClick={onClose}>X</button>
        </div>

        <div className="modal-body list-modal-body">
            
          <div className="list-section">
            
            <label>List Items:</label>
            {items.map((item, index) => (
              <input
                key={index}
                type="text"
                value={item}
                onChange={(e) => handleItemChange(index, e.target.value)}
                placeholder={`List item ${index + 1}`}
                className="modal-input"
              />
            ))}
            
          </div>

          <div className="style-section">
            <label>Font Color:</label>
            <input type="color" value={fontColor} onChange={(e) => setFontColor(e.target.value)} className="modal-input" />

            <label>Font Weight:</label>
            <select value={fontWeight} onChange={(e) => setFontWeight(e.target.value)} className="modal-input">
              <option value="300">Light</option>
              <option value="400">Regular</option>
              <option value="600">SemiBold</option>
              <option value="700">Bold</option>
              <option value="800">ExtraBold</option>
            </select>

            <label>Font Style:</label>
            <select value={fontStyle} onChange={(e) => setFontStyle(e.target.value)} className="modal-input">
              <option value="normal">Normal</option>
              <option value="italic">Italic</option>
            </select>

            <label>List Type:</label>
            <select value={ordered ? 'ordered' : 'unordered'} onChange={(e) => setOrdered(e.target.value === 'ordered')} className="modal-input">
              <option value="unordered">Unordered</option>
              <option value="ordered">Ordered</option>
            </select>

            <label>List Style Type:</label>
            <select value={listStyleType} onChange={(e) => setListStyleType(e.target.value)} className="modal-input">
              {!ordered && (
                <>
                  <option value="none">None</option>
                  <option value="disc">Disc</option>
                  <option value="circle">Circle</option>
                  <option value="square">Square</option>
                </>
              )}
              {ordered && (
                <>
                  <option value="decimal">Decimal</option>
                  <option value="decimal-leading-zero">Decimal Leading Zero</option>
                  <option value="lower-alpha">Lower Alpha</option>
                  <option value="upper-alpha">Upper Alpha</option>
                  <option value="lower-roman">Lower Roman</option>
                  <option value="upper-roman">Upper Roman</option>
                </>
              )}
            </select>

            <label>Text Alignment:</label>
            <div className="button-group">
              <button className={`align-button ${textAlign === 'left' ? 'selected' : ''}`} onClick={() => setTextAlign('left')}><FaAlignLeft /></button>
              <button className={`align-button ${textAlign === 'center' ? 'selected' : ''}`} onClick={() => setTextAlign('center')}><FaAlignCenter /></button>
              <button className={`align-button ${textAlign === 'right' ? 'selected' : ''}`} onClick={() => setTextAlign('right')}><FaAlignRight /></button>
              <button className={`align-button ${textAlign === 'justify' ? 'selected' : ''}`} onClick={() => setTextAlign('justify')}><FaAlignJustify /></button>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={handleSave} className="modal-save-button">Update</button>
          <button onClick={onClose} className="modal-close-button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ListModal;
