import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Dropzone from '../components/Dropzone';
import CustomizationPanel from '../components/CustomizationPanel';

const Builder = () => {
  const [selectedGrid, setSelectedGrid] = useState('');
  const [editIndex, setEditingIndex] = useState(null);
  const [items, setItems] = useState([]);
  const [rows, setRows] = useState([]);
  const [elements, setElements] = useState([]);


  // console.log(items, rows, elements);


  const handleAddGrid = (gridType) => {
    setSelectedGrid(gridType);
  };
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar onAddGrid={handleAddGrid} />
      <Dropzone selectedGrid={selectedGrid} items={items} setItems={setItems} setEditingIndex={setEditingIndex} setElements={setElements} setRows={setRows} />
      <CustomizationPanel elements={elements} setElements={setElements} editIndex={editIndex} setEditingIndex={setEditingIndex} />
    </div>
  );
};

export default Builder;

