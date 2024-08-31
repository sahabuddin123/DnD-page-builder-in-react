import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InvoiceLogo = ({ onUpdate, onDelete, style }) => {
  const [companySettings, setCompanySettings] = useState({});

  useEffect(() => {
    axios.get('/api/invoices.json') 
      .then(response => {
        setCompanySettings(response.data[0]);
      })
      .catch(error => {
        console.error("There was an error fetching the company settings!", error);
      });
  }, []);
  // console.log(companySettings);
  return (
    <div className="invoice-element" style={style}>
      <img src={companySettings.logo} alt="Invoice Logo" style={{ maxWidth: '100px' }} />
    </div>
  );
};

export default InvoiceLogo;
