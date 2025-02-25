import React from 'react';
import { usePrompt } from '../context/PromptContext';
import { containerStyles, buttonStyles } from '../styles/styles';

const WordCountInput = () => {
  const { wordCount, handleWordCount, submitWordCount } = usePrompt();
  
  return (
    <div style={containerStyles.wordCountInput}>
      <input
        type="number"
        value={wordCount}
        onChange={handleWordCount}
        placeholder="Enter word count"
        style={containerStyles.input}
      />
      <button
        onClick={submitWordCount}
        style={buttonStyles.primary}
      >
        Confirm
      </button>
    </div>
  );
};

export default WordCountInput;