import React, { useState } from 'react';

const TotalAmountTable = ({ content, onUpdate, onDelete }) => {
  // Parse the content prop to extract subtotal, tax, and total
  let initialTotals;
  try {
    initialTotals = content ? JSON.parse(content) : { subtotal: '0.00', tax: '0.00', total: '0.00' };
  } catch (error) {
    console.error('Invalid content format for TotalAmountTable:', error);
    initialTotals = { subtotal: '0.00', tax: '0.00', total: '0.00' };
  }

  const [totals, setTotals] = useState(initialTotals);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field, value) => {
    setTotals({ ...totals, [field]: value });
  };

  const handleSave = () => {
    // Ensure all fields are filled
    if (totals.subtotal && totals.tax && totals.total) {
      onUpdate(JSON.stringify(totals));
      setIsEditing(false);
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleCancel = () => {
    setTotals(initialTotals);
    setIsEditing(false);
  };

  return (
    <div className="invoice-element">
      <h4>Total Amounts</h4>
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  value={totals.subtotal}
                  onChange={(e) => handleChange('subtotal', e.target.value)}
                />
              ) : (
                `$${totals.subtotal}`
              )}
            </td>
          </tr>
          <tr>
            <td>Tax</td>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  value={totals.tax}
                  onChange={(e) => handleChange('tax', e.target.value)}
                />
              ) : (
                `$${totals.tax}`
              )}
            </td>
          </tr>
          <tr>
            <td><strong>Total</strong></td>
            <td><strong>${totals.total}</strong></td>
          </tr>
        </tbody>
      </table>
      <div style={{ marginTop: '8px' }}>
        {isEditing ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel} style={{ marginLeft: '8px' }}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={onDelete} style={{ marginLeft: '8px' }}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TotalAmountTable;
