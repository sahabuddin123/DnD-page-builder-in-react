import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientAddress = ({ onUpdate, onDelete, style }) => {
  const [invoice, setInvoice] = useState({});

  useEffect(() => {
    axios.get('/api/invoices.json') // get api url here
      .then(response => {
        setInvoice(response.data[0]); // Assuming there is only one invoice
      })
      .catch(error => {
        console.error("There was an error fetching the invoice!", error);
      });
  }, []);
// console.log(invoice);
  return (
    <div className="invoice-element" style={style}>
      <p style={style}>Client: {invoice.client_name}</p>
      <p style={style}>Address: {invoice.client_address}</p>
      <p style={style}>Postcode: {invoice.client_postcode}</p>
      <p style={style}>Email: {invoice.client_primary_email}</p>
      <p style={style}>Phone: {invoice.client_phone}</p>
    </div>
  );
};

export default ClientAddress;
