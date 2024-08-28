import React from 'react';

const ButtonElement = ({ content }) => {
  return (
    <button className="custom-button">
      {content || 'Click Me'}
    </button>
  );
};

export default ButtonElement;
