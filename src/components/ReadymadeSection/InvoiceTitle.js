import React from 'react';

const InvoiceTitle = ({ content, onUpdate, onDelete }) => {
  return (
    <div className="invoice-element">
      <h3>{content}</h3>
      <button onClick={onUpdate}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default InvoiceTitle;
