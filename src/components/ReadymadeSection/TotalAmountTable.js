import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TotalAmountTable = ({ onUpdate, onDelete, style }) => {
  const [totalEvent, setTotalEvent] = useState(0);
  const [vat, setVat] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [skillCountForPdfRender, setSkillCountForPdfRender] = useState(0);

  useEffect(() => {
    axios.get('/api/invoice-totals.json')
      .then(response => {
        setTotalEvent(response.data.total_event);
        setVat(response.data.vat);
        setGrandTotal(response.data.grand_total);
        setSkillCountForPdfRender(response.data.skill_count_for_pdf_render);
      })
      .catch(error => {
        console.error("There was an error fetching the invoice totals!", error);
      });
  }, []);

  return (
    <div className="invoice-element" >
      <table style={style}>
        <tfoot>
          <tr>
            <td colSpan={skillCountForPdfRender} className="text-right">Total:</td>
            <td>£{totalEvent}</td>
          </tr>
          <tr>
            <td colSpan={skillCountForPdfRender} className="text-right">VAT:</td>
            <td>£{vat}</td>
          </tr>
          <tr>
            <td colSpan={skillCountForPdfRender} className="text-right">Grand Total:</td>
            <td>£{grandTotal}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TotalAmountTable;
