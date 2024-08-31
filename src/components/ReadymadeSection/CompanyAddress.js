import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompanyAddress = ({ onUpdate, onDelete, style }) => {
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
// console.log(companySettings);
  return (
    <div className="invoice-element" style={style}>
      <p style={style}>{companySettings.name}</p>
      <p style={style}>{companySettings.address}</p>
      <p style={style}>{companySettings.postcode}</p>
      <p style={style}>Reg. Nr. :{companySettings.company_reg_number}</p>
      <p style={style}>VAT Nr. : {companySettings.vat_number}</p >
      <p style={style}>Phone: {companySettings.phone_number}</p >
      <p style={style}>Accounts email: {companySettings.accounts_email}</p >
    </div >
  );
};

export default CompanyAddress;
