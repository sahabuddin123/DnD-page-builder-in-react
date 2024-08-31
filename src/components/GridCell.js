import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { MdDelete, MdEdit, MdFormatPaint } from 'react-icons/md';
import Modal from './Modal';
import TableModal from './TableModal';
import TableRowModal from './TableRowModal';
import ListModal from './ListModal';
import ImageModal from './ImageModal';
import TableTwoModal from './TableTwoModal';
import TableRowTwoModal from './TableRowTwoModal';
import GridCellStyleModal from './GridCellStyleModal';
import ReadymadeModal from './ReadymadeModal';

// Readymade Section Components
import InvoiceHeader from './ReadymadeSection/InvoiceHeader';
import InvoiceLogo from './ReadymadeSection/InvoiceLogo';
import CompanyLogo from './ReadymadeSection/CompanyLogo';
import CompanyAddress from './ReadymadeSection/CompanyAddress';
import ClientAddress from './ReadymadeSection/ClientAddress';
import BankDetails from './ReadymadeSection/BankDetails';
import InvoiceTitle from './ReadymadeSection/InvoiceTitle';
import InvoiceTable from './ReadymadeSection/InvoiceTable';
import InvoiceDetails from './ReadymadeSection/InvoiceDetails';
import TotalAmountTable from './ReadymadeSection/TotalAmountTable';
import QrCode from './ReadymadeSection/QrCode';
import InvoiceFooter from './ReadymadeSection/InvoiceFooter';

const GridCell = ({ id, cellIndex, rowIndex, removeGridCell, setEditingIndex: globalEditingIndex, setElements: setGlobalElements }) => {
  const [elements, setElements] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isTableRowModalOpen, setIsTableRowModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isTableTwoModalOpen, setIsTableTwoModalOpen] = useState(false);
  const [isTableRowTwoModalOpen, setIsTableRowTwoModalOpen] = useState(false);
  const [isGridCellStyleModalOpen, setIsGridCellStyleModalOpen] = useState(false);
  const [gridCellStyle, setGridCellStyle] = useState({ backgroundColor: '#ffffff', padding: '0px', margin: '0px' });
  const [currentElement, setCurrentElement] = useState({});
  const [currentRowIndex, setCurrentRowIndex] = useState(null);
  const [rowStyles, setRowStyles] = useState({});
  const [isReadymadeModalOpen, setIsReadymadeModalOpen] = useState(false);
  const [currentReadymadeElement, setCurrentReadymadeElement] = useState({});

  useEffect(() => {
    setGlobalElements(elements);
  }, [elements, setGlobalElements]);

  const [, dropElement] = useDrop({
    accept: [
      'text-p', 'text-heading', 'image', 'table', 'one-list', 'table-two',
      'invoice-header', 'invoice-logo', 'company-logo', 'company-address', 'client-address',
      'bank-details', 'invoice-title', 'invoice-table', 'invoice-details',
      'total-amount-table', 'qr-code', 'invoice-footer'
    ],
    drop: (item) => {
      const newElement = { type: item.type, content: '' };

      if (item.type === 'table') {
        newElement.content = {
          headers: ['Date', 'Time', 'Event', 'Client Address', 'Queued Hours', 'Worked Hours', 'Extra', 'Total', 'Paid'],
          rows: [
            { cells: ['', '', '', '', '', '', '', '', ''], styles: {} },
            { cells: ['', '', '', '', '', '', '', '', ''], styles: {} },
            { cells: ['', '', '', '', '', '', '', '', ''], styles: {} },
          ],
        };
      } else if (item.type === 'table-two') {
        newElement.content = {
          headers: [' ', ' '],
          rows: [
            { cells: ['', ''], styles: {} },
            { cells: ['', ''], styles: {} },
          ],
        };
      } else if (item.type === 'image') {
        newElement.content = {
          src: 'https://via.placeholder.com/200',
          height: '200px',
          width: '200px',
          borderRadius: 0,
          float: 'none',
          alignment: 'center',
          paddingTop: '0px',
          paddingRight: '0px',
          paddingBottom: '0px',
          paddingLeft: '0px',
          marginTop: '0px',
          marginRight: '0px',
          marginBottom: '0px',
          marginLeft: '0px',
        };
      } else if (item.type === 'one-list') {
        newElement.content = {
          items: ['List One', 'List Two', 'List Three'],
          fontColor: '#000000',
          fontWeight: '400',
          fontStyle: 'normal',
          listStyleType: 'none',
          ordered: false,
          textAlign: 'left',
          paddingTop: '0px',
          paddingRight: '0px',
          paddingBottom: '0px',
          paddingLeft: '0px',
          marginTop: '0px',
          marginRight: '0px',
          marginBottom: '0px',
          marginLeft: '0px',
        };
      } else {
        // Readymade Section elements
        newElement.content = {
          companySettings: {}, // Fetch from backend API or mock data
          invoice: {} // Fetch from backend API or mock data
        };
      }

      setElements([...elements, newElement]);
    },
  });

  const handleEdit = (index) => {
    const element = elements[index];
    setEditingIndex(index);
    setCurrentElement(element);

    if (element.type === 'table') {
      setIsTableModalOpen(true);
    } else if (element.type === 'table-two') {
      setIsTableTwoModalOpen(true);
    } else if (element.type === 'one-list') {
      setIsListModalOpen(true);
    } else if (element.type === 'image') {
      setIsImageModalOpen(true);
    } else if (element.type.startsWith('invoice') || element.type.startsWith('company') ||
      element.type === 'client-address' || element.type === 'bank-details' ||
      element.type === 'qr-code') {
      handleReadymadeEdit(index);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleReadymadeEdit = (index) => {
    const element = elements[index];
    setEditingIndex(index);
    setCurrentReadymadeElement(element.content);
    setIsReadymadeModalOpen(true);
  };

  const handleReadymadeSave = (updatedElement) => {
    const updatedElements = [...elements];
    updatedElements[editingIndex].content = { ...updatedElement };
    setElements(updatedElements);
    setIsReadymadeModalOpen(false);
  };

  const handleRowEdit = (rowIndex) => {
    setCurrentRowIndex(rowIndex);
    setRowStyles(elements[editingIndex].content.rows[rowIndex].styles || {});
    setIsTableRowModalOpen(true);
  };

  const handleRowTwoEdit = (rowIndex) => {
    setCurrentRowIndex(rowIndex);
    setRowStyles(elements[editingIndex].content.rows[rowIndex].styles || {});
    setIsTableRowTwoModalOpen(true);
  };

  // const handleSave = (updatedElement) => {
  //   const updatedElements = [...elements];
  //   updatedElements[editingIndex] = { ...currentElement, ...updatedElement };
  //   setElements(updatedElements);
  //   setIsModalOpen(false);
  //   setIsTableModalOpen(false);
  //   setIsListModalOpen(false);
  //   setIsImageModalOpen(false);
  //   setIsTableTwoModalOpen(false);
  // };

//   const handleSave = (updatedElement) => {
//     const updatedElements = [...elements];
//     updatedElements[editingIndex] = {
//         ...currentElement,
//         content: { ...currentElement.content, ...updatedElement }
//     };
//     setElements(updatedElements);
//     setIsModalOpen(false);
//     setIsTableModalOpen(false);
//     setIsListModalOpen(false);
//     setIsImageModalOpen(false);
//     setIsTableTwoModalOpen(false);
// };

const handleSave = (updatedElement) => {
  const updatedElements = [...elements];
  
  updatedElements[editingIndex] = {
      ...currentElement,
      content: { 
        ...currentElement.content, 
        ...updatedElement.content || updatedElement // এখানে 'text-p', 'text-heading' এর জন্যও কাজ করবে
      },
  };
  
  setElements(updatedElements);
  setIsModalOpen(false);
  setIsTableModalOpen(false);
  setIsListModalOpen(false);
  setIsImageModalOpen(false);
  setIsTableTwoModalOpen(false);
};



  const handleRowSave = (updatedRowStyles) => {
    const updatedElements = [...elements];
    updatedElements[editingIndex].content.rows[currentRowIndex].styles = updatedRowStyles;
    setElements(updatedElements);
    setIsTableRowModalOpen(false);
  };

  const handleRowTwoSave = (updatedRowStyles) => {
    const updatedElements = [...elements];
    updatedElements[editingIndex].content.rows[currentRowIndex].styles = updatedRowStyles;
    setElements(updatedElements);
    setIsTableRowTwoModalOpen(false);
  };

  const handleImageSave = (updatedImage) => {
    const updatedElements = [...elements];
    updatedElements[editingIndex].content = { ...updatedImage };
    setElements(updatedElements);
    setIsImageModalOpen(false);
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  
  //   if (name === 'content') {
  //     setCurrentElement((prev) => ({
  //       ...prev,
  //       content: {
  //         ...prev.content,
  //         text: value,  // assuming 'text' is the key for your content text
  //       },
  //     }));
  //   } else {
  //     setCurrentElement((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   }
  // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'text') { // যদি নাম 'text' হয়
      setCurrentElement((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          text: value,  // content.text কে আপডেট করা হচ্ছে
        },
      }));
    } else {
      setCurrentElement((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  


  const handleAlignmentChange = (alignment) => {
    setCurrentElement((prev) => ({ ...prev, textAlign: alignment }));
  };

  const handleDelete = (index) => {
    const updatedElements = elements.filter((_, i) => i !== index);
    setElements(updatedElements);
  };

  const renderElement = (element, index) => {
    const commonProps = {
      style: {
        textAlign: element.content.textAlign,
        fontWeight: element.content.fontWeight,
        fontStyle: element.content.fontStyle,
        color: element.content.color,
        fontSize: element.content.fontSize,
        textTransform: element.content.textTransform,
        paddingTop: element.content.paddingTop,
        paddingRight: element.content.paddingRight,
        paddingBottom: element.content.paddingBottom,
        paddingLeft: element.content.paddingLeft,
        marginTop: element.content.marginTop,
        marginRight: element.content.marginRight,
        marginBottom: element.content.marginBottom,
        marginLeft: element.content.marginLeft,
      },
      onUpdate: () => handleEdit(index),
      onDelete: () => handleDelete(index),
    };

    switch (element.type) {
      case 'text-heading':
        return (
          <h1 style={{
            textAlign: element.textAlign,
            fontSize: element.fontSize,
            fontWeight: element.fontWeight,
            color: element.color,
            fontStyle: element.isItalic ? 'italic' : 'normal',
            textDecoration: element.isUnderline ? 'underline' : 'none',
            textTransform: element.textTransform,
            paddingTop: element.paddingTop || '0px',
            paddingRight: element.paddingRight || '0px',
            paddingBottom: element.paddingBottom || '0px',
            paddingLeft: element.paddingLeft || '0px',
            marginTop: element.marginTop || '0px',
            marginRight: element.marginRight || '0px',
            marginBottom: element.marginBottom || '0px',
            marginLeft: element.marginLeft || '0px'
          }}>
            {element.content.text || 'Header Text'}
          </h1>
        );
      case 'text-p':
        return (
          <p style={{
            textAlign: element.textAlign,
            fontSize: element.fontSize,
            fontWeight: element.fontWeight,
            color: element.color,
            fontStyle: element.isItalic ? 'italic' : 'normal',
            textDecoration: element.isUnderline ? 'underline' : 'none',
            textTransform: element.textTransform,
            paddingTop: element.paddingTop || '0px',
            paddingRight: element.paddingRight || '0px',
            paddingBottom: element.paddingBottom || '0px',
            paddingLeft: element.paddingLeft || '0px',
            marginTop: element.marginTop || '0px',
            marginRight: element.marginRight || '0px',
            marginBottom: element.marginBottom || '0px',
            marginLeft: element.marginLeft || '0px'
          }}>
            {element.content.text || 'This is a paragraph.'}
          </p>
        );
      case 'table':
        return (
          <div style={{ margin: '10px 0', position: 'relative' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {element.content.headers.map((header, idx) => (
                    <th key={idx} style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#4CAF50', color: 'white' }}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {element.content.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} style={row.styles || {}}>
                    {row.cells.map((cell, cellIndex) => (
                      <td key={cellIndex} style={{ border: '1px solid #ddd', padding: '8px' }}>{cell}</td>
                    ))}
                    <td style={{ position: 'relative', background: 'transparent' }}>
                      <span style={{ position: 'absolute', right: '0' }}>
                        <button onClick={() => handleRowEdit(rowIndex)} style={{ color: 'blue', background: 'transparent', margin: '0', padding: '0' }}><MdEdit /></button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'table-two':
        return (
          <div style={{ margin: '10px 0', position: 'relative' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {element.content.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} style={row.styles || {}}>
                    {row.cells.map((cell, cellIndex) => (
                      <td key={cellIndex} style={{ border: '1px solid #ddd', padding: '8px' }}>{cell}</td>
                    ))}
                    <td style={{ position: 'relative', background: 'transparent' }}>
                      <span style={{ position: 'absolute', right: '0' }}>
                        <button onClick={() => handleRowTwoEdit(rowIndex)} style={{ color: 'blue', background: 'transparent', margin: '0', padding: '0' }}><MdEdit /></button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'one-list':
        return (
          <ul style={{
            color: element.content.fontColor,
            fontWeight: element.content.fontWeight,
            fontStyle: element.content.fontStyle,
            textAlign: element.content.textAlign,
            listStyleType: element.content.listStyleType,
            paddingTop: element.content.paddingTop || '0px',
            paddingRight: element.content.paddingRight || '0px',
            paddingBottom: element.content.paddingBottom || '0px',
            paddingLeft: element.content.paddingLeft || '0px',
            marginTop: element.content.marginTop || '0px',
            marginRight: element.content.marginRight || '0px',
            marginBottom: element.content.marginBottom || '0px',
            marginLeft: element.content.marginLeft || '0px'
          }}>
            {element.content.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      case 'image':
        return (
          <div style={{ textAlign: element.content.alignment || 'left' }}>
            <img
              src={element.content.src || 'https://via.placeholder.com/200'}
              alt="Editable content"
              style={{
                width: element.content.width ? `${element.content.width}` : '200px',
                height: element.content.height ? `${element.content.height}` : '200px',
                borderRadius: element.content.borderRadius ? `${element.content.borderRadius}px` : '0px',
                float: element.content.float || 'none',
                paddingTop: element.content.paddingTop || '0px',
                paddingRight: element.content.paddingRight || '0px',
                paddingBottom: element.content.paddingBottom || '0px',
                paddingLeft: element.content.paddingLeft || '0px',
                marginTop: element.content.marginTop || '0px',
                marginRight: element.content.marginRight || '0px',
                marginBottom: element.content.marginBottom || '0px',
                marginLeft: element.content.marginLeft || '0px',
              }}
            />
          </div>
        );
      case 'invoice-header':
        return <InvoiceHeader {...commonProps} companySettings={element.content.companySettings} invoice={element.content.invoice} />;
      case 'invoice-logo':
        return <InvoiceLogo {...commonProps} companySettings={element.content.companySettings} />;
      case 'company-logo':
        return <CompanyLogo {...commonProps} companySettings={element.content.companySettings} />;
      case 'company-address':
        return <CompanyAddress {...commonProps} companySettings={element.content.companySettings} />;
      case 'client-address':
        return <ClientAddress {...commonProps} invoice={element.content.invoice} />;
      case 'bank-details':
        return <BankDetails {...commonProps} companySettings={element.content.companySettings} />;
      case 'invoice-title':
        return <InvoiceTitle {...commonProps} invoice={element.content.invoice} />;
      case 'invoice-table':
        return <InvoiceTable {...commonProps} invoice={element.content.invoice} />;
      case 'invoice-details':
        return <InvoiceDetails {...commonProps} invoice={element.content.invoice} />;
      case 'total-amount-table':
        return <TotalAmountTable {...commonProps} invoice={element.content.invoice} />;
      case 'qr-code':
        return <QrCode {...commonProps} invoice={element.content.invoice} />;
      case 'invoice-footer':
        return <InvoiceFooter {...commonProps} companySettings={element.content.companySettings} />;

      default:
        return <div>Default Element</div>;
    }
  };

  return (
    <div ref={dropElement} className="grid-cell-wrapper">
      <div className="grid-cell grid-border" style={gridCellStyle}>
        <div className="grid-cell-content">
          {elements.map((element, index) => (
            <div key={index} className="grid-cell-element">
              <div className="element_section">
                {renderElement(element, index)}
                <div className="menu-item">
                  <button className="icon-delete-row edit_button hide-on-pdf" onClick={() => handleEdit(index)}><MdEdit /></button>
                  <button className="icon-delete-row del_button hide-on-pdf" onClick={() => handleDelete(index)}><MdDelete /></button>
                </div>
              </div>
            </div>
          ))}
          {!elements.length && 'Drop here'}
        </div>
        <button onClick={() => setIsGridCellStyleModalOpen(true)} className="icon-style-edit-button hide-on-pdf" style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', padding: '3px 10px', fontSize: '12px' }}>
          <MdFormatPaint />
        </button>
      </div>

      {/* General Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        element={currentElement}
        setElement={setCurrentElement}
        handleInputChange={handleInputChange}
        handleAlignmentChange={handleAlignmentChange}
      />

      {/* Table Modal Component */}
      {isTableModalOpen && (
        <TableModal
          isOpen={isTableModalOpen}
          onClose={() => setIsTableModalOpen(false)}
          onSave={handleSave}
          tableData={currentElement.content}
          setTableData={(data) => setCurrentElement((prev) => ({ ...prev, content: data }))}
        />
      )}

      {/* Table Row Modal Component */}
      {isTableRowModalOpen && (
        <TableRowModal
          isOpen={isTableRowModalOpen}
          onClose={() => setIsTableRowModalOpen(false)}
          onSave={handleRowSave}
          rowStyles={rowStyles}
          setRowStyles={setRowStyles}
        />
      )}

      {/* Table Two Modal Component */}
      {isTableTwoModalOpen && (
        <TableTwoModal
          isOpen={isTableTwoModalOpen}
          onClose={() => setIsTableTwoModalOpen(false)}
          onSave={handleSave}
          tableData={currentElement.content}
          setTableData={(data) => setCurrentElement((prev) => ({ ...prev, content: data }))}
        />
      )}

      {/* Table Row Two Modal Component */}
      {isTableRowTwoModalOpen && (
        <TableRowTwoModal
          isOpen={isTableRowTwoModalOpen}
          onClose={() => setIsTableRowTwoModalOpen(false)}
          onSave={handleRowTwoSave}
          rowStyles={rowStyles}
          setRowStyles={setRowStyles}
        />
      )}

      {/* List Modal Component */}
      {isListModalOpen && (
        <ListModal
          isOpen={isListModalOpen}
          onClose={() => setIsListModalOpen(false)}
          onSave={handleSave}
          listData={currentElement.content}
          setListData={(data) => setCurrentElement((prev) => ({ ...prev, content: data }))}
        />
      )}

      {/* Image Modal Component */}
      {isImageModalOpen && (
        <ImageModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          onSave={handleImageSave}
          imageData={currentElement.content}
          setImageData={(data) => setCurrentElement((prev) => ({ ...prev, content: data }))}
        />
      )}

      {/* Grid Cell Style Modal Component */}
      {isGridCellStyleModalOpen && (
        <GridCellStyleModal
          isOpen={isGridCellStyleModalOpen}
          onClose={() => setIsGridCellStyleModalOpen(false)}
          onSave={(newStyleData) => {
            setGridCellStyle(newStyleData);
          }}
          styleData={gridCellStyle}
        />
      )}

      {/* Readymade Section Modal Component */}
      {isReadymadeModalOpen && (
        <ReadymadeModal
          isOpen={isReadymadeModalOpen}
          onClose={() => setIsReadymadeModalOpen(false)}
          onSave={handleReadymadeSave}
          elementData={currentReadymadeElement}
          setElementData={setCurrentReadymadeElement}
        />
      )}
    </div>
  );
};

export default GridCell;
