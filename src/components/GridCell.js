import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { MdDelete, MdEdit, MdFormatPaint } from 'react-icons/md';
import Modal from './Modal';
import TableModal from './TableModal';
import TableRowModal from './TableRowModal';
import ListModal from './ListModal';
import ImageModal from './ImageModal';
import TableTwoModal from './TableTwoModal';
import TableRowTwoModal from './TableRowTwoModal';
import GridCellStyleModal from './GridCellStyleModal';

const GridCell = ({ id, cellIndex, rowIndex, removeGridCell, setEditingIndex: globalEditingIndex, setElements: setGlobalElements }) => {
  const [elements, setElements] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isTableRowModalOpen, setIsTableRowModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isTableTwoModalOpen, setIsTableTwoModalOpen] = useState(false);
  const [isTableRowTwoModalOpen, setIsTableRowTwoModalOpen] = useState(false);
  const [isGridCellStyleModalOpen, setIsGridCellStyleModalOpen] = useState(false); // State for Grid Cell Style Modal
  const [gridCellStyle, setGridCellStyle] = useState({ backgroundColor: '#ffffff', padding: '0px', margin: '0px' }); // State for Grid Cell Style
  const [currentElement, setCurrentElement] = useState({});
  const [currentRowIndex, setCurrentRowIndex] = useState(null);
  const [rowStyles, setRowStyles] = useState({});

  useEffect(() => {
    setGlobalElements(elements);
  }, [elements, setGlobalElements]);

  const [, dropElement] = useDrop({
    accept: ['text-p', 'text-heading', 'button', 'editor', 'image', 'table', 'one-list', 'table-two'],
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
      } else if (item.type === 'table-two') {
        newElement.content = {
          headers: [' ', ' '],
          rows: [
            { cells: ['', ''], styles: {} },
            { cells: ['', ''], styles: {} },
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
      setIsTableModalOpen(true);
    } else if (element.type === 'table-two') {
      setIsTableTwoModalOpen(true);
    } else if (element.type === 'one-list') {
      setIsListModalOpen(true);
    } else if (element.type === 'image') {
      setIsImageModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleRowEdit = (rowIndex) => {
    setCurrentRowIndex(rowIndex);
    setRowStyles(elements[editingIndex].content.rows[rowIndex].styles || {});
    setIsTableRowModalOpen(true);
  };

  const handleRowTwoEdit = (rowIndex) => {
    setCurrentRowIndex(rowIndex);
    setRowStyles(elements[editingIndex].content.rows[rowIndex].styles || {});
    setIsTableRowTwoModalOpen(true);
  };

  const handleSave = (updatedElement) => {
    const updatedElements = [...elements];
    updatedElements[editingIndex] = { ...currentElement, ...updatedElement };
    setElements(updatedElements);
    setIsModalOpen(false);
    setIsTableModalOpen(false);
    setIsListModalOpen(false);
    setIsImageModalOpen(false);
    setIsTableTwoModalOpen(false);
  };

  const handleRowSave = (updatedRowStyles) => {
    const updatedElements = [...elements];
    updatedElements[editingIndex].content.rows[currentRowIndex].styles = updatedRowStyles;
    setElements(updatedElements);
    setIsTableRowModalOpen(false);
  };

  const handleRowTwoSave = (updatedRowStyles) => {
    const updatedElements = [...elements];
    updatedElements[editingIndex].content.rows[currentRowIndex].styles = updatedRowStyles;
    setElements(updatedElements);
    setIsTableRowTwoModalOpen(false);
  };

  const handleImageSave = (updatedImage) => {
    const updatedElements = [...elements];
    updatedElements[editingIndex].content = { ...updatedImage };
    setElements(updatedElements);
    setIsImageModalOpen(false);
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
                      <td key={cellIndex} style={{ border: '1px solid #ddd', padding: '8px' }}>{cell}</td>
                    ))}
                    <td style={{ position: 'relative', background: 'transparent' }}>
                      <span style={{ position: 'absolute', right: '0' }}>
                        <button onClick={() => handleRowEdit(rowIndex)} style={{ color: 'blue', background: 'transparent', margin: '0', padding: '0', }}><MdEdit /></button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'table-two':
        return (
          <div style={{ margin: '10px 0', position: 'relative' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {element.content.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} style={row.styles || {}}>
                    {row.cells.map((cell, cellIndex) => (
                      <td key={cellIndex} style={{ border: '1px solid #ddd', padding: '8px' }}>{cell}</td>
                    ))}
                    <td style={{ position: 'relative', background: 'transparent' }}>
                      <span style={{ position: 'absolute', right: '0' }}>
                        <button onClick={() => handleRowTwoEdit(rowIndex)} style={{ color: 'blue', background: 'transparent', margin: '0', padding: '0' }}><MdEdit /></button>
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
                width: element.content.width ? `${element.content.width}` : '200px',
                height: element.content.height ? `${element.content.height}` : '200px',
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
      <div className="grid-cell" style={gridCellStyle}>
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
        {/* Edit Style Button */}
        <button onClick={() => setIsGridCellStyleModalOpen(true)} className="icon-style-edit-button" style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', padding: '3px 10px', fontSize: '12px' }}>
          <MdFormatPaint />
        </button>
      </div>

      {/* General Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        element={currentElement}
        setElement={setCurrentElement}
        handleInputChange={handleInputChange}
        handleAlignmentChange={handleAlignmentChange}
      />

      {/* Table Modal Component */}
      {isTableModalOpen && (
        <TableModal
          isOpen={isTableModalOpen}
          onClose={() => setIsTableModalOpen(false)}
          onSave={handleSave}
          tableData={currentElement.content}
          setTableData={(data) => setCurrentElement((prev) => ({ ...prev, content: data }))}
        />
      )}

      {/* Table Row Modal Component */}
      {isTableRowModalOpen && (
        <TableRowModal
          isOpen={isTableRowModalOpen}
          onClose={() => setIsTableRowModalOpen(false)}
          onSave={handleRowSave}
          rowStyles={rowStyles}
          setRowStyles={setRowStyles}
        />
      )}

      {/* Table Two Modal Component */}
      {isTableTwoModalOpen && (
        <TableTwoModal
          isOpen={isTableTwoModalOpen}
          onClose={() => setIsTableTwoModalOpen(false)}
          onSave={handleSave}
          tableData={currentElement.content}
          setTableData={(data) => setCurrentElement((prev) => ({ ...prev, content: data }))}
        />
      )}

      {/* Table Row Two Modal Component */}
      {isTableRowTwoModalOpen && (
        <TableRowTwoModal
          isOpen={isTableRowTwoModalOpen}
          onClose={() => setIsTableRowTwoModalOpen(false)}
          onSave={handleRowTwoSave}
          rowStyles={rowStyles}
          setRowStyles={setRowStyles}
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
          onSave={handleImageSave}
          imageData={currentElement.content}
          setImageData={(data) => setCurrentElement((prev) => ({ ...prev, content: data }))}
        />
      )}

      {/* Grid Cell Style Modal Component */}
      {isGridCellStyleModalOpen && (
        <GridCellStyleModal
          isOpen={isGridCellStyleModalOpen}
          onClose={() => setIsGridCellStyleModalOpen(false)}
          onSave={(newStyleData) => {
            setGridCellStyle(newStyleData);
          }}
          styleData={gridCellStyle}
        />
      )}
    </div>
  );
};

export default GridCell;
