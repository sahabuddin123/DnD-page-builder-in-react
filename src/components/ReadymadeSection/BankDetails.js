import React from 'react';

const BankDetails = ({ content, onUpdate, onDelete }) => {
  return (
    <div className="invoice-element">
      <h4>Bank Details</h4>
      <p>{content}</p>
      <button onClick={onUpdate}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default BankDetails;
