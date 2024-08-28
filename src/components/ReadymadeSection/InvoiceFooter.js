import React from 'react';

const InvoiceFooter = ({ content, onUpdate, onDelete }) => {
  return (
    <div className="invoice-element">
      <h4>Invoice Footer</h4>
      <p>{content}</p>
      <button onClick={onUpdate}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default InvoiceFooter;
