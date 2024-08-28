import React from 'react';

const CompanyLogo = ({ content, onUpdate, onDelete }) => {
  return (
    <div className="invoice-element">
      <h4>Company Logo</h4>
      <img src={content} alt="Company Logo" style={{ maxWidth: '150px', maxHeight: '150px' }} />
      <div>
        <button onClick={onUpdate}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default CompanyLogo;
