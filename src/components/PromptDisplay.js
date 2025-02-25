import React from 'react';
import { usePrompt } from '../context/PromptContext';
import { containerStyles, buttonStyles } from '../styles/styles';

const PromptDisplay = () => {
  const { generatedPrompt, copyPrompt, resetForm } = usePrompt();
  
  return (
    <div style={containerStyles.finalContainer}>
      <h1 style={containerStyles.title}>
        Your Generated Prompt
      </h1>
      
      <div style={containerStyles.promptDisplay}>
        {generatedPrompt}
      </div>
      
      <div style={containerStyles.buttonContainer}>
        <button
          onClick={copyPrompt}
          style={{
            ...buttonStyles.primary,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="12" height="12" rx="1" stroke="white" strokeWidth="2" />
            <path d="M8 8H16V16H8V8Z" stroke="white" strokeWidth="2" />
          </svg>
          Copy Prompt
        </button>
        
        <button
          onClick={resetForm}
          style={buttonStyles.secondary}
        >
          Create New Prompt
        </button>
      </div>
    </div>
  );
};

export default PromptDisplay;