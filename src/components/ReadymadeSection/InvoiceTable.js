import React from 'react';

const InvoiceTable = ({ content, onUpdate, onDelete }) => {
  return (
    <div className="invoice-element">
      <h4>Invoice Table</h4>
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{content}</td>
            <td>1</td>
            <td>$100.00</td>
            <td>$100.00</td>
          </tr>
        </tbody>
      </table>
      <button onClick={onUpdate}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default InvoiceTable;
