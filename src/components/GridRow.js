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

  const [, drop] = useDrop({
    accept: ItemTypes.ROW,
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = rowIndex;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveRow(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ROW,
    item: { index: rowIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

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
      <div className="grid-row-controls hide-on-pdf">
        {/* <FaArrowsAlt className="icon-move-row" /> */}
        <FaTrashAlt className="icon-delete-row " onClick={() => removeRow(rowIndex)} />
      </div>
    </div>
  );
};

export default GridRow;
