import React from 'react';
import { usePrompt, questions } from '../context/PromptContext';
import PromptWizard from './PromptWizard';
import PromptDisplay from './PromptDisplay';
import { containerStyles } from '../styles/styles';

const MainContent = () => {
  const { step, promptType } = usePrompt();
  
  return (
    <div style={containerStyles.mainContent}>
      {step <= questions[promptType]?.length || step === 0 
        ? <PromptWizard /> 
        : <PromptDisplay />
      }
    </div>
  );
};

export default MainContent;