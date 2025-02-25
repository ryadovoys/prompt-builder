import React from 'react';
import { usePrompt } from '../context/PromptContext';
import { containerStyles, buttonStyles } from '../styles/styles';

const PromptItem = ({ prompt, onLoad, onDelete }) => {
  return (
    <div 
      onClick={() => onLoad(prompt)}
      style={containerStyles.promptItem}
    >
      <div style={containerStyles.promptHeader}>
        {prompt.type} Prompt
      </div>
      
      <div style={containerStyles.promptPreview}>
        {prompt.text}
      </div>
      
      <div style={containerStyles.promptMeta}>
        <span style={containerStyles.timestamp}>
          {new Date(prompt.timestamp).toLocaleDateString()}
        </span>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(prompt.id);
          }}
          style={containerStyles.deleteButton}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const PromptList = () => {
  const { recentPrompts, loadSavedPrompt, deleteSavedPrompt, clearAllPrompts } = usePrompt();
  
  if (recentPrompts.length === 0) {
    return (
      <div style={containerStyles.emptyState}>
        No saved prompts yet.
        <br />
        Complete the wizard to save prompts.
      </div>
    );
  }
  
  return (
    <div style={containerStyles.promptList}>
      {recentPrompts.map(prompt => (
        <PromptItem 
          key={prompt.id} 
          prompt={prompt} 
          onLoad={loadSavedPrompt} 
          onDelete={deleteSavedPrompt} 
        />
      ))}
      
      {recentPrompts.length > 0 && (
        <button
          onClick={clearAllPrompts}
          style={buttonStyles.clearAll}
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default PromptList;