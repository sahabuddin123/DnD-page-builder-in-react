import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import {
  FaTh, FaSquare, FaTerminal, FaImage, FaColumns, FaAddressBook, FaMicrosoft, FaTable, FaList, FaTextHeight, FaHeading, FaFileInvoice, FaBuilding, FaAddressCard, FaBarcode, FaMoneyBillWave, FaSignature, FaWarehouse, FaRegListAlt, FaEnvelope, FaUniversity
} from 'react-icons/fa';
import '../assets/css/Sidebar.css';

// DraggableElement Component
const DraggableElement = ({ type, icon: Icon, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="sidebar-button draggable-element"
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <Icon style={{ marginRight: '8px' }} />
      {label}
    </div>
  );
};

// CollapsibleSection Component
const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapsible-section">
      <h5
        onClick={toggleOpen}
        style={{
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#000',
          padding: '10px',
          color: '#fff',
          margin: '5px 0px'
        }}>
        {title}
        <span>{isOpen ? '-' : '+'}</span>
      </h5>
      {isOpen && <div className="section-content">{children}</div>}
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ onAddGrid }) => {
  return (
    <div className="sidebar">
      {/* Grid Section */}
      <CollapsibleSection title="Grid">
        <button className="sidebar-button" onClick={() => onAddGrid('1-grid')}><FaSquare /> 1 Grid</button>
        <button className="sidebar-button" onClick={() => onAddGrid('2-grid')}><FaColumns /> 2 Grid</button>
        <button className="sidebar-button" onClick={() => onAddGrid('3-grid')}><FaTh /> 3 Grid</button>
        <button className="sidebar-button" onClick={() => onAddGrid('4-grid')}><FaMicrosoft /> 4 Grid</button>
        <button className="sidebar-button" onClick={() => onAddGrid('2/10-grid')}><FaTh /> 2/10 Grid</button>
        <button className="sidebar-button" onClick={() => onAddGrid('10/2-grid')}><FaTh /> 10/2 Grid</button>
        <button className="sidebar-button" onClick={() => onAddGrid('3/9-grid')}><FaTh /> 3/9 Grid</button>
        <button className="sidebar-button" onClick={() => onAddGrid('9/3-grid')}><FaTh /> 9/3 Grid</button>
        <button className="sidebar-button" onClick={() => onAddGrid('4/8-grid')}><FaTh /> 4/8 Grid</button>
        <button className="sidebar-button" onClick={() => onAddGrid('8/4-grid')}><FaTh /> 8/4 Grid</button>
        <button className="sidebar-button" onClick={() => onAddGrid('5/7-grid')}><FaTh /> 5/7 Grid</button>
        <button className="sidebar-button" onClick={() => onAddGrid('7/5-grid')}><FaTh /> 7/5 Grid</button>
        <button className="sidebar-button" onClick={() => onAddGrid('6/6-grid')}><FaTh /> 6/6 Grid</button>
        <button className="sidebar-button" onClick={() => onAddGrid('4/6-grid')}><FaTh /> 4/6 Grid</button>
        <button className="sidebar-button" onClick={() => onAddGrid('6/4-grid')}><FaTh /> 6/4 Grid</button>
      </CollapsibleSection>

      {/* Element Section */}
      <CollapsibleSection title="Element">
        <DraggableElement type="image" icon={FaImage} title="Image" />
        <DraggableElement type="table" icon={FaTable} title="Table" />
        <DraggableElement type="one-list" icon={FaList} title="One List" />
        {/* <DraggableElement type="two-list" icon={FaRegListAlt} title="Two List" /> */}
        <DraggableElement type="text-p" icon={FaTextHeight} title="Text P" />
        <DraggableElement type="text-heading" icon={FaHeading} title="Text Heading" />
        {/* <DraggableElement type="button" icon={FaEnvelope} title="Button" /> */}
        <DraggableElement type="editor" icon={FaTerminal} title="Editor" />
      </CollapsibleSection>

      {/* Readymade Section */}
      <CollapsibleSection title="Readymade Section">
        <DraggableElement type="invoice-header" icon={FaFileInvoice} title="Invoice Header" />
        <DraggableElement type="invoice-logo" icon={FaWarehouse} />
        <DraggableElement type="company-logo" icon={FaAddressCard} title="Company Logo" />
        <DraggableElement type="company-address" icon={FaBuilding} title="Company Address" />
        <DraggableElement type="client-address" icon={FaUniversity} title="Client Address" />
        <DraggableElement type="bank-details" icon={FaAddressBook} title="Bank Details" />
        <DraggableElement type="invoice-title" icon={FaHeading} title="Invoice Title" />
        <DraggableElement type="invoice-table" icon={FaTable} title="Invoice Table" />
        <DraggableElement type="invoice-details" icon={FaSignature} title="Invoice Details" />
        <DraggableElement type="total-amount-table" icon={FaMoneyBillWave} title="Total Amount Table" />
        <DraggableElement type="qr-code" icon={FaBarcode} title="QR Code" />
        <DraggableElement type="invoice-footer" icon={FaSignature} title="Invoice Footer" />
      </CollapsibleSection>
    </div>
  );
};

export default Sidebar;

