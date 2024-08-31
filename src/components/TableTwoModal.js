import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import '../assets/css/PageBuilder.css';

const TableTwoModal = ({ isOpen, onClose, onSave, tableData, setTableData }) => {
  const [rows, setRows] = useState(tableData.rows || []);

  // Modal খোলার সময় state সিঙ্ক্রোনাইজ করা হচ্ছে
  useEffect(() => {
    setRows(tableData.rows || []);
  }, [tableData]);

  const handleCellChange = (rowIndex, cellIndex, value) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].cells[cellIndex] = value; // Update the cell content inside the 'cells' array
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([...rows, { cells: Array(rows[0]?.cells.length || 2).fill(''), styles: {} }]); // Add a new row with empty cells
  };

  const removeRow = () => {
    if (rows.length > 0) {
      setRows(rows.slice(0, -1)); // Remove the last row
    }
  };

  const addColumn = () => {
    setRows(rows.map(row => ({
      ...row,
      cells: [...row.cells, ''] // Add an empty cell for each row
    })));
  };

  const removeColumn = () => {
    if (rows[0]?.cells.length > 1) {
      setRows(rows.map(row => ({
        ...row,
        cells: row.cells.slice(0, -1) // Remove the last cell in each row
      })));
    }
  };

  const handleSave = () => {
    // Update the table data with the new rows
    const updatedTableData = { rows };
    setTableData(updatedTableData); // Update the main state of the component
    onSave({ content: updatedTableData }); // Call the onSave function with the updated data
    onClose(); // Close the modal after saving
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content table-modal-content" style={{ maxWidth: '60%' }}>
        <div className="modal-header">
          <h3>Edit Table Two</h3>
          <div className="table-control-buttons">
            <button onClick={addRow} className="control-button"><FaPlus /> Add Row</button>
            <button onClick={removeRow} className="control-button"><FaMinus /> Remove Row</button>
            <button onClick={addColumn} className="control-button"><FaPlus /> Add Column</button>
            <button onClick={removeColumn} className="control-button"><FaMinus /> Remove Column</button>
          </div>
          <button className="close-button" onClick={onClose}>X</button>
        </div>
        <div className="modal-body table-modal-body" style={{ maxHeight: '400px', overflow: 'scroll' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} style={row.styles}>
                  {row.cells.map((cell, cellIndex) => (
                    <td key={cellIndex} style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#e9ecef' }}>
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) => handleCellChange(rowIndex, cellIndex, e.target.value)}
                        style={{ width: '100%', border: 'none', padding: '8px', boxSizing: 'border-box' }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="modal-footer">
          <button onClick={handleSave} className="modal-save-button">Save</button>
          <button onClick={onClose} className="modal-close-button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TableTwoModal;
