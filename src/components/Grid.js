import React, { useState, useEffect } from 'react';
import GridRow from './GridRow';

const Grid = ({ gridType, setEditingIndex, setElements, setRows: setGlobalRows }) => {
  const getCellCount = (gridType) => {
    switch (gridType) {
      case '1-grid':
        return 1;
      case '2-grid':
        return 2;
      case '3-grid':
        return 3;
      case '4-grid':
        return 4;
      case '2/10-grid':
      case '10/2-grid':
      case '3/9-grid':
      case '9/3-grid':
      case '4/8-grid':
      case '8/4-grid':
      case '5/7-grid':
      case '7/5-grid':
      case '6/6-grid':
      case '4/6-grid':
      case '6/4-grid':
        return 2;
      default:
        return 1;
    }
  };

  // রো আইডি সহ রো সেটআপ
  const [rows, setRows] = useState([
    { id: `row-${Date.now()}`, cells: Array(getCellCount(gridType)).fill(null).map((_, index) => index) }
  ]);

  useEffect(() => {
    setGlobalRows(rows);
  }, [rows]);

  const moveRow = (fromIndex, toIndex) => {
    const updatedRows = [...rows];
    const [movedRow] = updatedRows.splice(fromIndex, 1);
    updatedRows.splice(toIndex, 0, movedRow);
    setRows(updatedRows);
  };

  const removeGridCell = (rowIndex, cellIndex) => {
    const updatedRows = rows.map((row, i) => {
      if (i === rowIndex) {
        return { ...row, cells: row.cells.filter((_, index) => index !== cellIndex) };
      }
      return row;
    });
    setRows(updatedRows.filter((row) => row.cells.length > 0)); // Remove row if empty
  };

  const removeRow = (rowIndex) => {
    setRows(rows.filter((_, index) => index !== rowIndex));
  };

  const getGridTemplate = (gridType) => {
    switch (gridType) {
      case '1-grid':
        return '1fr';
      case '2-grid':
        return '1fr 1fr';
      case '3-grid':
        return '1fr 1fr 1fr';
      case '4-grid':
        return '1fr 1fr 1fr 1fr';
      case '2/10-grid':
        return '2fr 10fr';
      case '10/2-grid':
        return '10fr 2fr';
      case '3/9-grid':
        return '3fr 9fr';
      case '9/3-grid':
        return '9fr 3fr';
      case '4/8-grid':
        return '4fr 8fr';
      case '8/4-grid':
        return '8fr 4fr';
      case '5/7-grid':
        return '5fr 7fr';
      case '7/5-grid':
        return '7fr 5fr';
      case '6/6-grid':
        return '1fr 1fr';
      case '4/6-grid':
        return '4fr 6fr';
      case '6/4-grid':
        return '6fr 4fr';
      default:
        return '1fr';
    }
  };

  return (
    <div>
      {rows.map((row, rowIndex) => (
        <GridRow
          key={row.id}
          row={row.cells}
          rowIndex={rowIndex}
          moveRow={moveRow}
          removeRow={removeRow}
          gridTemplate={getGridTemplate(gridType)}
          removeGridCell={removeGridCell}
          setEditingIndex={setEditingIndex}
          setElements={setElements}
        />
      ))}
    </div>
  );
};

export default Grid;
