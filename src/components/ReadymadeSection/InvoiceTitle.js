import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InvoiceTitle = ({ onUpdate, onDelete, style }) => {
  const [invoiceTitle, setInvoiceTitle] = useState('');

  useEffect(() => {
    axios.get('/api/Invoice')
      .then(response => {
        setInvoiceTitle(response.data.title); // Assuming the API returns a title field
      })
      .catch(error => {
        console.error("There was an error fetching the invoice title!", error);
      });
  }, []);

  return (
    <div className="invoice-element" style={style}>
      <h2 style={style}>{invoiceTitle}</h2>
    </div>
  );
};

export default InvoiceTitle;
