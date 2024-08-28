import React, { useState } from 'react';
import { FaPlus, FaMinus, FaTrash, FaEdit, FaColumns, FaTable } from 'react-icons/fa';

const EditableTable = () => {
  const [headers, setHeaders] = useState(['Date', 'Time', 'Event', 'Client Address', 'Queued Hours', 'Worked Hours', 'Extra', 'Total', 'Paid']);
  const [rows, setRows] = useState([
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
  ]);
  const [isEditing, setIsEditing] = useState(false);

  const handleHeaderChange = (index, value) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index] = value;
    setHeaders(updatedHeaders);
  };

  const handleCellChange = (rowIndex, cellIndex, value) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex][cellIndex] = value;
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([...rows, Array(headers.length).fill('')]);
  };

  const removeRow = () => {
    setRows(rows.slice(0, -1));
  };

  const addColumn = () => {
    setHeaders([...headers, '']);
    setRows(rows.map(row => [...row, '']));
  };

  const removeColumn = () => {
    setHeaders(headers.slice(0, -1));
    setRows(rows.map(row => row.slice(0, -1)));
  };

  const deleteTable = () => {
    setHeaders([]);
    setRows([]);
  };

  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#4CAF50', color: 'white' }}>
                {isEditing ? (
                  <input
                    type="text"
                    value={header}
                    onChange={(e) => handleHeaderChange(index, e.target.value)}
                    style={{ width: '100%', border: 'none', padding: '8px', boxSizing: 'border-box' }}
                  />
                ) : (
                  header
                )}
              </th>
            ))}

          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {isEditing ? (
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) => handleCellChange(rowIndex, cellIndex, e.target.value)}
                      style={{ width: '100%', border: 'none', padding: '8px', boxSizing: 'border-box' }}
                    />
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <span style={{ color: 'white', height: '20px', position: 'absolute', top: '-30px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div className='btn-group-one'>
            <button onClick={addRow} style={{ marginRight: '0 5px 0 0', padding: '2px', background: '#fff', color: '#007bff', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1', }}>
              <FaPlus />
            </button>
            <button onClick={removeRow} style={{ marginRight: '0 5px 0 0', padding: '2px', background: '#fff', color: '#ff0000', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1', }}>
              <FaMinus />
            </button>
          </div>
          <button onClick={() => setIsEditing(!isEditing)} style={{ marginRight: '5px', padding: '2px' }}>
            <FaEdit />
          </button>
          <div className='btn-group-two'>
          <button onClick={addColumn} style={{ marginRight: '0 5px 0 0', padding: '2px', background: '#fff', color: '#007bff', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1', }}>
            <FaPlus />
          </button>
          <button onClick={removeColumn} style={{ marginRight: '0 5px 0 0', padding: '2px', background: '#fff', color: '#ff0000', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1', }}>
            <FaMinus />
          </button>
          </div>
        </div>
      </span >
    </div >
  );
};

export default EditableTable;
