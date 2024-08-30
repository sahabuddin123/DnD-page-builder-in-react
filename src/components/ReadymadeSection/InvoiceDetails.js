import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InvoiceDetails = ({ onUpdate, onDelete, style }) => {
  const [invoice, setInvoice] = useState({});

  useEffect(() => {
    axios.get('/api/invoices.json')
      .then(response => {
        setInvoice(response.data[0]);
      })
      .catch(error => {
        console.error("There was an error fetching the invoice!", error);
      });
  }, []);

  return (
    <div className="invoice-element" style={style}>
      <p style={style}>Invoice Nr: {invoice.invoice_number}</p>
      <p style={style}>PO/Ref Number: {invoice.po_number}</p>
      <p style={style}>Date: {invoice.date}</p>
      <p style={style}>Payment Terms: {invoice.payment_terms}</p>
    </div>
  );
};

export default InvoiceDetails;
