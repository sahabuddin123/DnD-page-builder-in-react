// GridRow.js

import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FaTrashAlt, FaArrowsAlt } from 'react-icons/fa';
import GridCell from './GridCell';
import '../assets/css/PageBuilder.css';

const ItemTypes = {
  ROW: 'row',
};

const GridRow = ({ row, rowIndex, moveRow, removeRow, gridTemplate, removeGridCell, setEditingIndex, setElements }) => {
  const ref = useRef(null);

  // Drop logic for the row
  const [, drop] = useDrop({
    accept: ItemTypes.ROW,
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = rowIndex;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Determine whether to move the row
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveRow(dragIndex, hoverIndex); // Call the moveRow function from props
      item.index = hoverIndex; // Update the dragged item's index
    },
  });

  // Drag logic for the row
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ROW,
    item: { index: rowIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref)); // Attach both drag and drop functionality

  return (
    <div
      ref={ref}
      className="grid-row"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="grid" style={{ gridTemplateColumns: gridTemplate }}>
        {row.map((id, cellIndex) => (
          <GridCell
            key={id}
            id={id}
            cellIndex={cellIndex}
            rowIndex={rowIndex}
            removeGridCell={removeGridCell}
            setEditingIndex={setEditingIndex}
            setElements={setElements}
          />
        ))}
      </div>
      <div className="grid-row-controls">
        {/* Button for moving row with drag handle props */}
        <button className="icon-button move-button">
          <FaArrowsAlt />
        </button>
        <FaTrashAlt className="icon-delete-row" onClick={() => removeRow(rowIndex)} />
      </div>
    </div>
  );
};

export default GridRow;
