import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CompanyLogo from './CompanyLogo';
import CompanyAddress from './CompanyAddress';
import BankDetails from './BankDetails';
import ClientAddress from './ClientAddress';

const InvoiceHeader = ({ onUpdate, onDelete, style }) => {
  const [companySettings, setCompanySettings] = useState({});
  const [invoice, setInvoice] = useState({});

  useEffect(() => {
    // Fetch company settings
    axios.get('/api/company-settings/')
      .then(response => {
        setCompanySettings(response.data[0]); // Assuming there is only one company settings object
      })
      .catch(error => {
        console.error("There was an error fetching the company settings!", error);
      });

    // Fetch invoice data
    axios.get('/api/invoice')
      .then(response => {
        setInvoice(response.data); // Assuming the API returns the invoice data
      })
      .catch(error => {
        console.error("There was an error fetching the invoice data!", error);
      });
  }, []);

  return (
    <div className="invoice-element header" style={style}>
      <CompanyLogo companySettings={companySettings} />
      <div className="container-fluid p-4">
        <table className="header-table" style={{ width: '100%', marginBottom: '20px', style }} >
          <tbody>
            <tr>
              <td style={{ width: '40%' }}>
                <CompanyAddress companySettings={companySettings} />
              </td>
              <td style={{ width: '30%' }}>
                <BankDetails companySettings={companySettings} />
              </td>
              <td style={{ width: '30%' }}>
                <ClientAddress invoice={invoice} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceHeader;
