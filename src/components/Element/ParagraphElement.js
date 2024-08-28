import React from 'react';

const ParagraphElement = ({ content }) => {
  return (
    <p>{content || 'This is a paragraph.'}</p>
  );
};

export default ParagraphElement;
