import React from 'react';

const InvoiceLogo = ({ content, onUpdate, onDelete }) => {
  return (
    <div className="invoice-element">
      <h4>Invoice Logo</h4>
      <img src={content} alt="Invoice Logo" style={{ maxWidth: '150px', maxHeight: '150px' }} />
      <button onClick={onUpdate}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default InvoiceLogo;
