import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { MdDelete, MdEdit } from 'react-icons/md';
import Modal from './Modal'; // Modal Component Import

const GridCell = ({ id, cellIndex, rowIndex, removeGridCell, setEditingIndex: globalEditingIndex, setElements: setGlobalElements }) => {
  const [elements, setElements] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentElement, setCurrentElement] = useState({});

  useEffect(() => {
    setGlobalElements(elements);
  }, [elements]);

  const [, dropElement] = useDrop({
    accept: ['text-p', 'text-heading', 'button', 'editor', 'image', 'table', 'one-list', 'two-list'],
    drop: (item) => {
      // Add new element with unique state
      setElements([...elements, { type: item.type, content: '', settings: item.type === 'image' ? {} : {} }]);
    }
  });

  const handleEdit = (index) => {
    setEditingIndex(index);
    setCurrentElement(elements[index]);
    setIsModalOpen(true);
  };

  const handleSave = (updatedStyle) => {
    const updatedElements = [...elements];
    updatedElements[editingIndex] = {
      ...currentElement,
      ...updatedStyle, // Update with new styles
    };
    setElements(updatedElements);
    setIsModalOpen(false);
  };

  const handleDelete = (index) => {
    const updatedElements = elements.filter((_, i) => i !== index);
    setElements(updatedElements);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentElement((prev) => ({ ...prev, [name]: value }));
  };

  const handleAlignmentChange = (alignment) => {
    setCurrentElement((prev) => ({ ...prev, textAlign: alignment }));
  };

  const renderElement = (element, index) => {
    switch (element.type) {
      case 'text-heading':
        return (
          <h1 style={{ textAlign: element.textAlign, fontSize: element.fontSize, fontWeight: element.fontWeight, color: element.color, fontStyle: element.isItalic ? 'italic' : 'normal', textDecoration: element.isUnderline ? 'underline' : 'none', textTransform: element.textTransform }}>
            {element.content || 'Header Text'}
          </h1>
        );
      case 'text-p':
        return (
          <p style={{ textAlign: element.textAlign, fontSize: element.fontSize, fontWeight: element.fontWeight, color: element.color, fontStyle: element.isItalic ? 'italic' : 'normal', textDecoration: element.isUnderline ? 'underline' : 'none', textTransform: element.textTransform }}>
            {element.content || 'This is a paragraph.'}
          </p>
        );
      default:
        return <div>Default Element</div>;
    }
  };

  return (
    <div ref={dropElement} className="grid-cell-wrapper">
      <div className="grid-cell">
        <div className="grid-cell-content">
          {elements.map((element, index) => (
            <div key={index} className="grid-cell-element">
              <div className="element_section">
                {renderElement(element, index)}
                <div className="menu-item">
                  <button className="icon-delete-row edit_button" onClick={() => handleEdit(index)}><MdEdit /></button>
                  <button className="icon-delete-row del_button" onClick={() => handleDelete(index)}><MdDelete /></button>
                </div>
              </div>
            </div>
          ))}
          {!elements.length && 'Drop here'}
        </div>
      </div>
      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        element={currentElement}
        setElement={setCurrentElement}
        handleInputChange={handleInputChange}
        handleAlignmentChange={handleAlignmentChange}
      />
    </div>
  );
};

export default GridCell;
