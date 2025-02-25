import React from 'react';
import { usePrompt, questions } from '../context/PromptContext';
import OptionButton from './OptionButton';
import WordCountInput from './WordCountInput';
import { containerStyles, buttonStyles } from '../styles/styles';

const InitialStep = () => {
  const { handleSelect } = usePrompt();
  
  return (
    <div>
      <h1 style={{
        ...containerStyles.title,
        maxWidth: '500px'
      }}>
        What type of prompt do you want to build?
      </h1>
      
      <div style={containerStyles.optionsContainer}>
        {questions.initial.options.map(option => (
          <OptionButton 
            key={option.id} 
            option={option} 
            onClick={handleSelect} 
          />
        ))}
      </div>
    </div>
  );
};

const QuestionStep = () => {
  const { step, promptType, answers, handleSelect, setStep } = usePrompt();
  const currentQuestion = questions[promptType][step - 1];
  
  return (
    <div style={containerStyles.wizardContainer}>
      <h1 style={containerStyles.title}>
        {currentQuestion.question}
      </h1>
      
      <div style={containerStyles.optionsContainer}>
        {currentQuestion.options.map(option => (
          <div key={option.id}>
            <OptionButton 
              option={option} 
              onClick={handleSelect} 
            />
            
            {/* Show word count input if specific length is selected */}
            {currentQuestion.id === 'length' && 
             option.id === 'specific' && 
             answers.length === 'specific' && <WordCountInput />}
          </div>
        ))}
      </div>
      
      <button
        onClick={() => setStep(step - 1)}
        style={buttonStyles.back}
      >
        &larr; Back
      </button>
    </div>
  );
};

const PromptWizard = () => {
  const { step, promptType } = usePrompt();
  
  if (step === 0) {
    return <InitialStep />;
  } else if (step <= questions[promptType].length) {
    return <QuestionStep />;
  }
  
  return null;
};

export default PromptWizard;