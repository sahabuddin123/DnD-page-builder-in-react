import React from 'react';

const CompanyAddress = ({ content, onUpdate, onDelete }) => {
  return (
    <div className="invoice-element">
      <h4>Company Address</h4>
      <p>{content}</p>
      <button onClick={onUpdate}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default CompanyAddress;
