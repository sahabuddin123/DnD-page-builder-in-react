import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import '../assets/css/PageBuilder.css';

const TableModal = ({ isOpen, onClose, onSave, tableData, setTableData }) => {
  const [headers, setHeaders] = useState(tableData.headers || []);
  const [rows, setRows] = useState(tableData.rows || []);

  const handleHeaderChange = (index, value) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index] = value;
    setHeaders(updatedHeaders);
  };

  const handleCellChange = (rowIndex, cellIndex, value) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].cells[cellIndex] = value; // Update the cell content inside the 'cells' array
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([...rows, { cells: Array(headers.length).fill(''), styles: {} }]); // Add a new row with empty cells and default styles
  };

  const removeRow = () => {
    setRows(rows.slice(0, -1));
  };

  const addColumn = () => {
    setHeaders([...headers, '']);
    setRows(rows.map(row => ({
      ...row,
      cells: [...row.cells, ''] // Add an empty cell for each row
    })));
  };

  const removeColumn = () => {
    setHeaders(headers.slice(0, -1));
    setRows(rows.map(row => ({
      ...row,
      cells: row.cells.slice(0, -1) // Remove the last cell in each row
    })));
  };

  const handleSave = () => {
    setTableData({ headers, rows });
    onSave({ type: 'table', content: { headers, rows } });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content table-modal-content" style={{maxWidth: '60%'}}>
        <div className="modal-header">
          <h3>Edit Table</h3>
          <div className="table-control-buttons">
            <button onClick={addRow} className="control-button"><FaPlus /> Add Row</button>
            <button onClick={removeRow} className="control-button"><FaMinus /> Remove Row</button>
            <button onClick={addColumn} className="control-button"><FaPlus /> Add Column</button>
            <button onClick={removeColumn} className="control-button"><FaMinus /> Remove Column</button>
          </div>
          <button className="close-button" onClick={onClose}>X</button>
        </div>
        <div className="modal-body table-modal-body"  style={{maxHeight: '400px', overflow: 'scroll'}}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index} style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#4CAF50', color: 'white' }}>
                    <input
                      type="text"
                      value={header}
                      onChange={(e) => handleHeaderChange(index, e.target.value)}
                      style={{ width: '100%', border: 'none', padding: '8px', boxSizing: 'border-box' }}
                    />
                  </th>
                ))}
              </tr>
            </thead>
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

export default TableModal;
