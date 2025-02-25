import React from 'react';
import { buttonStyles } from '../styles/styles';

const OptionButton = ({ option, onClick }) => {
  return (
    <button
      onClick={() => onClick(option.id)}
      style={buttonStyles.primary}
    >
      {option.label}
    </button>
  );
};

export default OptionButton;