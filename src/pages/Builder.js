import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Dropzone from '../components/Dropzone';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Builder = () => {
  const [selectedGrid, setSelectedGrid] = useState('');
  const [editIndex, setEditingIndex] = useState(null);
  const [items, setItems] = useState([]);
  const [rows, setRows] = useState([]);
  const [elements, setElements] = useState([]);

  const handleAddGrid = (gridType) => {
    setSelectedGrid(gridType);
    setItems((prevItems) => [...prevItems, gridType]);
  };

  const handlePrintPreview = () => {
    window.print(); // Open print dialog for the current page
  };

  // const handleDownloadPDF = () => {
  //   const input = document.querySelector('.dropzone'); // Select the Dropzone element
  
  //   // Hide borders and buttons
  //   document.querySelectorAll('.grid-cell').forEach(cell => {
  //     cell.style.border = 'none';
  //   });
  //   document.querySelectorAll('.menu-item').forEach(menu => {
  //     menu.style.display = 'none';
  //   });
  
  //   html2canvas(input, { scale: 2 }).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF({
  //       orientation: 'portrait',
  //       unit: 'mm',
  //       format: 'a4',
  //     });
  
  //     // Calculate the aspect ratio
  //     const imgWidth = 210; // A4 width in mm
  //     const pageHeight = 297; // A4 height in mm
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
  //     // Scale the image to fit within A4
  //     let position = 0;
  //     if (imgHeight > pageHeight) {
  //       // If the image height is larger than A4 height, then scale it to fit
  //       position = (pageHeight - imgHeight) / 2; // Center the image vertically
  //     }
  
  //     pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //     pdf.save('invoice.pdf'); // Save PDF as download.pdf
  
  //     // Revert styles back to original
  //     document.querySelectorAll('.grid-cell').forEach(cell => {
  //       cell.style.border = ''; // Restore the default or original border style
  //     });
  //     document.querySelectorAll('.menu-item').forEach(menu => {
  //       menu.style.display = ''; // Restore the default or original display style
  //     });
  //     document.querySelectorAll('.grid-row').forEach(row => {
  //       row.style.background = ''; // Restore the default or original display style
  //     });
  //     document.querySelectorAll('.hide-on-pdf').forEach(Pdhide => {
  //       Pdhide.style.display = ''; // Restore the default or original display style
  //     });
     
  //   });
  // };

  const handleDownloadPDF = () => {
    const input = document.querySelector('.dropzone'); // Select the Dropzone element
  
    // Hide borders and buttons before taking screenshot
    document.querySelectorAll('.grid-cell').forEach(cell => {
      cell.style.border = 'none';
    });
    document.querySelectorAll('.menu-item').forEach(menu => {
      menu.style.display = 'none';
    });
  
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'in', // Set unit to inches for margin
        format: 'a4',
      });
  
      // Set margin and calculate aspect ratio
      const pageWidth = 8.27; // A4 width in inches
      const pageHeight = 11.69; // A4 height in inches
      const margin = 0.5; // Margin in inches
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      // Add image to PDF and apply margins
      pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
      pdf.save('download.pdf'); // Save PDF as download.pdf
  
      // Revert styles back to original
      document.querySelectorAll('.grid-cell').forEach(cell => {
        cell.style.border = ''; // Restore the default or original border style
      });
      document.querySelectorAll('.menu-item').forEach(menu => {
        menu.style.display = ''; // Restore the default or original display style
      });
    });
  };
  
  
  

  const handleDownloadJSON = () => {
    // Fetch the Dropzone element's HTML
    const dropzoneElement = document.querySelector('.dropzone');
    const dropzoneHTML = dropzoneElement.innerHTML;
  
    // Create an object with the HTML content and any additional data you might want
    const data = {
      htmlContent: dropzoneHTML, // HTML content from the Dropzone
      styles: getComputedStyle(dropzoneElement).cssText, // Inline CSS from the Dropzone
      elements,
      rows,
    };
  
    // Convert object to JSON string
    const json = JSON.stringify(data, null, 2);
  
    // Create a blob for download
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
  };
  

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar
        onAddGrid={handleAddGrid}
        handlePrintPreview={handlePrintPreview}
        handleDownloadPDF={handleDownloadPDF}
        handleDownloadJSON={handleDownloadJSON}
      />
      <Dropzone
        selectedGrid={selectedGrid}
        items={items}
        setItems={setItems}
        setEditingIndex={setEditingIndex}
        setElements={setElements}
        setRows={setRows}
      />
    </div>
  );
};

export default Builder;
