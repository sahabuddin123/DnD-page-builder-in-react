import React from 'react';

const CustomElement = ({ content }) => {
  return (
    <div className="custom-element">
      {content || 'Custom Element'}
    </div>
  );
};

export default CustomElement;
