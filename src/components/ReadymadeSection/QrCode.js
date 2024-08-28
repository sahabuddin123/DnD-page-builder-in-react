import React from 'react';

const QrCode = ({ content, onUpdate, onDelete }) => {
  return (
    <div className="invoice-element">
      <h4>QR Code</h4>
      <img src={content} alt="QR Code" style={{ width: '100px', height: '100px' }} />
      <button onClick={onUpdate}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default QrCode;
