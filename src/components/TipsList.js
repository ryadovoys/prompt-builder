import React from 'react';
import { containerStyles } from '../styles/styles';

const TipsList = () => {
  return (
    <div style={containerStyles.emptyState}>
      No saved tips yet.
      <br />
      Complete the wizard to save prompts.
    </div>
  );
};

export default TipsList;