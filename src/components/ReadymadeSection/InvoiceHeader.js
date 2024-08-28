import React from 'react';

const InvoiceHeader = ({ content, onUpdate, onDelete }) => {
  return (
    <div className="invoice-element">
      <h2>Invoice Header</h2>
      <p>{content}</p>
      <button onClick={onUpdate}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default InvoiceHeader;
