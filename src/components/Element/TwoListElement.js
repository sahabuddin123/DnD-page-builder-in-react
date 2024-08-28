import React from 'react';

const TwoListElement = ({ items1, items2 }) => {
  return (
    <div className="two-lists">
      <ul>
        {items1 ? items1.map((item, index) => <li key={index}>{item}</li>) : <li>List 1 Item 1</li>}
      </ul>
      <ul>
        {items2 ? items2.map((item, index) => <li key={index}>{item}</li>) : <li>List 2 Item 1</li>}
      </ul>
    </div>
  );
};

export default TwoListElement;
