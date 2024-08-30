import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Dropzone from '../components/Dropzone';

const Builder = () => {
  const [selectedGrid, setSelectedGrid] = useState('');
  const [editIndex, setEditingIndex] = useState(null);
  const [items, setItems] = useState([]);
  const [rows, setRows] = useState([]);
  const [elements, setElements] = useState([]);

  const handleAddGrid = (gridType) => {
    setSelectedGrid(gridType); // Update selected grid type
    setItems((prevItems) => [...prevItems, gridType]); // Add the grid type to items array
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar onAddGrid={handleAddGrid} />
      <Dropzone
        selectedGrid={selectedGrid}
        items={items}
        setItems={setItems}
        setEditingIndex={setEditingIndex}
        setElements={setElements}
        setRows={setRows}
      />
    </div>
  );
};

export default Builder;
