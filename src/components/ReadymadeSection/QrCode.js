import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QrCode = ({ onUpdate, onDelete, style }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    axios.get('/api/qrcode.json')
      .then(response => {
        setQrCodeUrl(response.data.qrcode_url);
      })
      .catch(error => {
        console.error("There was an error fetching the QR code URL!", error);
      });
  }, []);

  return (
    <div className="invoice-element qr-code" style={style}>
      <img src={qrCodeUrl} alt="QR Code" />
    </div>
  );
};

export default QrCode;
