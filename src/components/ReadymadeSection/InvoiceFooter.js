import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InvoiceFooter = ({ onUpdate, onDelete, style }) => {
  const [companySettings, setCompanySettings] = useState({});

  useEffect(() => {
    axios.get('/api/company-settings')
      .then(response => {
        setCompanySettings(response.data[0]); // Assuming there is only one company setting
      })
      .catch(error => {
        console.error("There was an error fetching the company settings!", error);
      });
  }, []);

  return (
    <div className="invoice-element" style={style}>
      <p style={style}>Thank you for your business!</p>
      <p style={style}>Contact us at: {companySettings.phone_number}</p>
    </div>
  );
};

export default InvoiceFooter;
