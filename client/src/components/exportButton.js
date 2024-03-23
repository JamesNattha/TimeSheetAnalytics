import React from 'react';

const ExportButton = ({ exportToExcel }) => {
  return (
    <button onClick={exportToExcel} style={{ marginLeft: '10px' }}>
      Export to Excel
    </button>
  );
};

export default ExportButton;
