import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { MdDelete, MdEdit } from 'react-icons/md';
import Modal from './Modal'; // Modal Component Import
import TableModal from './TableModal'; // Import the Table Modal Component
import TableRowModal from './TableRowModal'; // Import the Table Row Modal Component

const GridCell = ({ id, cellIndex, rowIndex, removeGridCell, setEditingIndex: globalEditingIndex, setElements: setGlobalElements }) => {
  const [elements, setElements] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false); // For Table Modal
  const [isTableRowModalOpen, setIsTableRowModalOpen] = useState(false); // For Table Row Modal
  const [currentElement, setCurrentElement] = useState({});
  const [currentRowIndex, setCurrentRowIndex] = useState(null); // For tracking row to edit
  const [rowStyles, setRowStyles] = useState({}); // Row styles state

  useEffect(() => {
    setGlobalElements(elements);
  }, [elements]);

  const [, dropElement] = useDrop({
    accept: ['text-p', 'text-heading', 'button', 'editor', 'image', 'table', 'one-list', 'two-list'],
    drop: (item) => {
      const newElement = { type: item.type, content: '' };

      if (item.type === 'table') {
        newElement.content = {
          headers: ['Date', 'Time', 'Event', 'Client Address', 'Queued Hours', 'Worked Hours', 'Extra', 'Total', 'Paid'],
          rows: [
            { cells: ['', '', '', '', '', '', '', '', ''], styles: {} },
            { cells: ['', '', '', '', '', '', '', '', ''], styles: {} },
            { cells: ['', '', '', '', '', '', '', '', ''], styles: {} },
          ],
        };
      }

      setElements([...elements, newElement]);
    },
  });

  const handleEdit = (index) => {
    const element = elements[index];
    setEditingIndex(index);
    setCurrentElement(element);

    if (element.type === 'table') {
      setIsTableModalOpen(true); // Open table modal
    } else {
      setIsModalOpen(true); // Open general content modal
    }
  };

  const handleRowEdit = (rowIndex) => {
    setCurrentRowIndex(rowIndex);
    setRowStyles(elements[editingIndex].content.rows[rowIndex].styles || {}); // Set initial row styles
    setIsTableRowModalOpen(true); // Open row style modal
  };

  const handleSave = (updatedElement) => {
    const updatedElements = [...elements];
    updatedElements[editingIndex] = updatedElement;
    setElements(updatedElements);
    setIsModalOpen(false);
    setIsTableModalOpen(false); // Close both modals
  };

  const handleRowSave = (updatedRowStyles) => {
    const updatedElements = [...elements];
    updatedElements[editingIndex].content.rows[currentRowIndex].styles = updatedRowStyles; // Update row styles
    setElements(updatedElements);
    setIsTableRowModalOpen(false); // Close row modal
  };

  const handleDelete = (index) => {
    const updatedElements = elements.filter((_, i) => i !== index);
    setElements(updatedElements);
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
      case 'table':
        return (
          <div style={{ margin: '10px 0', position: 'relative' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {element.content.headers.map((header, idx) => (
                    <th key={idx} style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#4CAF50', color: 'white' }}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {element.content.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} style={row.styles || {}}>
                    {row.cells.map((cell, cellIndex) => (
                      <td key={cellIndex} style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#e9ecef' }}>{cell}</td>
                    ))}
                    <td style={{position: 'relative' }}>
                      <span style={{ position: 'absolute', right: '0' }}>
                        <button onClick={() => handleRowEdit(rowIndex)} style={{color: 'blue', background: 'transparent', margin: '0', padding: '0',}}><MdEdit /></button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

      {/* General Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        element={currentElement}
        setElement={setCurrentElement}
      />

      {/* Table Modal Component */}
      {isTableModalOpen && (
        <TableModal
          isOpen={isTableModalOpen}
          onClose={() => setIsTableModalOpen(false)}
          onSave={handleSave}
          tableData={currentElement.content} // Ensure table data is passed correctly
          setTableData={(data) => setCurrentElement((prev) => ({ ...prev, content: data }))}
        />
      )}

      {/* Table Row Modal Component */}
      {isTableRowModalOpen && (
        <TableRowModal
          isOpen={isTableRowModalOpen}
          onClose={() => setIsTableRowModalOpen(false)}
          onSave={handleRowSave}
          rowStyles={rowStyles} // Pass current row styles
          setRowStyles={setRowStyles} // Correctly set row styles function
        />
      )}
    </div>
  );
};

export default GridCell;
