import React from 'react';

const InvoiceDetails = ({ content, onUpdate, onDelete }) => {
  return (
    <div className="invoice-element">
      <h4>Invoice Details</h4>
      <p>{content}</p>
      <button onClick={onUpdate}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default InvoiceDetails;
