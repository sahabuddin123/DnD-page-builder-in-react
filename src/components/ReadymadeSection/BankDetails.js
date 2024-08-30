import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BankDetails = ({ onUpdate, onDelete, style }) => {
  const [companySettings, setCompanySettings] = useState({});

  useEffect(() => {
    axios.get('/api/company-settings')
      .then(response => {
        setCompanySettings(response.data[0]); // Assuming there is only one company settings
      })
      .catch(error => {
        console.error("There was an error fetching the company settings!", error);
      });
  }, []);
console.log(companySettings);
  return (
    <div className="invoice-element" style={style}>
      <p style={style}>Bank: {companySettings.name_on_bank_account}</p>
      <p style={style}>Account Nr.: {companySettings.bank_account}</p>
      <p style={style}>Sort code: {companySettings.sort_code}</p>
      
    </div>
  );
};

export default BankDetails;