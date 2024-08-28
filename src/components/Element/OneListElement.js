import React from 'react';

const OneListElement = ({ items }) => {
  return (
    <ul>
      {items ? items.map((item, index) => <li key={index}>{item}</li>) : <li>List Item 1</li>}
    </ul>
  );
};

export default OneListElement;
