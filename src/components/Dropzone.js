import React, { useState } from 'react';
import Grid from './Grid';
import Element from './Element';
import { useDrop } from 'react-dnd';
import '../assets/css/PageBuilder.css';

const Dropzone = ({ selectedGrid, items, setItems, setEditingIndex, setElements, setRows }) => {

  const [, drop] = useDrop({
    accept: ['grid', 'image', 'table', 'one-list', 'two-list', 'text-p', 'text-heading', 'button', 'editor'],
    drop: (item) => {
      if (item && item.type) {
        setItems((prevItems) => [...prevItems, item.type]);
      }
    },
  });

  React.useEffect(() => {
    if (selectedGrid) {
      setItems((prevItems) => [...prevItems, `grid-${selectedGrid}`]);
    }
  }, [selectedGrid]);

  return (
    <div className="dropzone" ref={drop}>
      {items.map((item, index) => (
        typeof item === 'string' && item.startsWith('grid-') ? (  // Ensure item is a string before calling startsWith
          <Grid key={index} gridType={item.replace('grid-', '')} setEditingIndex={setEditingIndex} setElements={setElements} setRows={setRows} />
        ) : ''
        // <Element key={index} type={item} />

      ))}
    </div>
  );
};

export default Dropzone;
