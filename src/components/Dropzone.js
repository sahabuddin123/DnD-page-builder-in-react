import React, { useState, useEffect } from 'react';
import Grid from './Grid';

const Dropzone = ({ selectedGrid, items, setItems, setEditingIndex, setElements, setRows }) => {
  const [rows, setLocalRows] = useState([]);

  useEffect(() => {
    // When items change, add a new row for the selected grid type
    if (selectedGrid) {
      const newRow = { id: `row-${Date.now()}`, gridType: selectedGrid };
      setLocalRows((prevRows) => [...prevRows, newRow]);
    }
  }, [items]); // Trigger whenever items array changes

  useEffect(() => {
    setRows(rows); // Sync local rows with global state
  }, [rows, setRows]);

  return (
    <div className="dropzone">
      {rows.map((row, index) => (
        <Grid
          key={row.id}
          gridType={row.gridType}
          setEditingIndex={setEditingIndex}
          setElements={setElements}
          setRows={setRows}
        />
      ))}
    </div>
  );
};

export default Dropzone;
