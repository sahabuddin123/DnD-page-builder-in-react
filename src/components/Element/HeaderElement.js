import React from 'react';

const HeaderElement = ({ text }) => {
  return (
    <h1>{text || 'Header Text'}</h1>
  );
};

export default HeaderElement;
