import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { MdDelete, MdEdit } from 'react-icons/md';
import Modal from './Modal'; // Modal Component Import
import TableModal from './TableModal'; // Import the Table Modal Component
import TableRowModal from './TableRowModal'; // Import the Table Row Modal Component
import ListModal from './ListModal'; // Import the List Modal Component
import ImageModal from './ImageModal'; // Import the Image Modal Component

const GridCell = ({ id, cellIndex, rowIndex, removeGridCell, setEditingIndex: globalEditingIndex, setElements: setGlobalElements }) => {
  const [elements, setElements] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false); // For Table Modal
  const [isTableRowModalOpen, setIsTableRowModalOpen] = useState(false); // For Table Row Modal
  const [isListModalOpen, setIsListModalOpen] = useState(false); // For List Modal
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); // For Image Modal
  const [currentElement, setCurrentElement] = useState({});
  const [currentRowIndex, setCurrentRowIndex] = useState(null); // For tracking row to edit
  const [rowStyles, setRowStyles] = useState({}); // Row styles state

  useEffect(() => {
    setGlobalElements(elements);
  }, [elements, setGlobalElements]); // Added setGlobalElements to dependencies

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
      } else if (item.type === 'image') {
        newElement.content = {
          src: 'https://via.placeholder.com/200', // Default image source
          height: 200,
          width: 200,
          borderRadius: 0,
          float: 'none',
          alignment: 'center',
        };
      } else if (item.type === 'one-list') {
        newElement.content = {
          items: ['List One', 'List Two', 'List Three'],
          fontColor: '#000000',
          fontWeight: '400',
          fontStyle: 'normal',
          listStyleType: 'none',
          ordered: false,
          textAlign: 'left',
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
    } else if (element.type === 'one-list') {
      setIsListModalOpen(true); // Open list modal
    } else if (element.type === 'image') {
      setIsImageModalOpen(true); // Open image modal
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
    updatedElements[editingIndex] = { ...currentElement, ...updatedElement };  // Merge updates
    setElements(updatedElements);
    setIsModalOpen(false);
    setIsTableModalOpen(false);  // Close both modals
    setIsListModalOpen(false);   // Close list modal
    setIsImageModalOpen(false);  // Close image modal
  };

  const handleRowSave = (updatedRowStyles) => {
    const updatedElements = [...elements];
    updatedElements[editingIndex].content.rows[currentRowIndex].styles = updatedRowStyles; // Update row styles
    setElements(updatedElements);
    setIsTableRowModalOpen(false); // Close row modal
  };

  // handleSave function for Image component
  const handleImageSave = (updatedImage) => {
    const updatedElements = [...elements];
    updatedElements[editingIndex].content = { ...updatedImage }; // Merge updates to content
    setElements(updatedElements);
    setIsImageModalOpen(false); // Close the image modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentElement((prev) => ({ ...prev, [name]: value }));
  };

  const handleAlignmentChange = (alignment) => {
    setCurrentElement((prev) => ({ ...prev, textAlign: alignment }));
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
                      <td key={cellIndex} style={{ border: '1px solid #ddd', padding: '8px'}}>{cell}</td>
                    ))}
                    <td style={{position: 'relative', background: 'transparent' }}>
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
        case 'one-list':
      return (
        <ul style={{ color: element.content.fontColor, fontWeight: element.content.fontWeight, fontStyle: element.content.fontStyle, textAlign: element.content.textAlign, listStyleType: element.content.listStyleType }}>
          {element.content.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
      case 'image':
        return (
          <div style={{ textAlign: element.content.alignment || 'left' }}>
            <img
              src={element.content.src || 'https://via.placeholder.com/200'}
              alt="Editable content"
              style={{
                width: element.content.width ? `${element.content.width}px` : '200px',
                height: element.content.height ? `${element.content.height}px` : '200px',
                borderRadius: element.content.borderRadius ? `${element.content.borderRadius}px` : '0px',
                float: element.content.float || 'none',
              }}
            />
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
        handleInputChange={handleInputChange}
        handleAlignmentChange={handleAlignmentChange} // Pass handleAlignmentChange here
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

      {/* List Modal Component */}
      {isListModalOpen && (
        <ListModal
          isOpen={isListModalOpen}
          onClose={() => setIsListModalOpen(false)}
          onSave={handleSave}
          listData={currentElement.content}
          setListData={(data) => setCurrentElement((prev) => ({ ...prev, content: data }))}
        />
      )}

      {/* Image Modal Component */}
      {isImageModalOpen && (
        <ImageModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          onSave={handleImageSave}  // Use handleImageSave for saving images
          imageData={currentElement.content} // Pass image data correctly
          setImageData={(data) => setCurrentElement((prev) => ({ ...prev, content: data }))}
        />
      )}
    </div>
  );
};

export default GridCell;
