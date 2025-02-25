import React, { createContext, useState, useEffect, useContext } from 'react';

const PromptContext = createContext();

export const PromptProvider = ({ children }) => {
  // State for tracking current step and selections
  const [step, setStep] = useState(0);
  const [promptType, setPromptType] = useState('');
  const [answers, setAnswers] = useState({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [recentPrompts, setRecentPrompts] = useState([]);
  const [wordCount, setWordCount] = useState('');

  // Load recent prompts from localStorage on initial load
  useEffect(() => {
    const savedPrompts = localStorage.getItem('recentPrompts');
    if (savedPrompts) {
      try {
        setRecentPrompts(JSON.parse(savedPrompts));
      } catch (e) {
        console.error('Failed to parse saved prompts', e);
      }
    }
  }, []);

  // Save recent prompts to localStorage when they change
  useEffect(() => {
    if (recentPrompts.length > 0) {
      localStorage.setItem('recentPrompts', JSON.stringify(recentPrompts));
    }
  }, [recentPrompts]);

  // Generate the final prompt based on selections
  const generateFinalPrompt = () => {
    let prompt = '';
    let promptTypeLabel = '';
    
    if (promptType === 'text') {
      // Text prompt generation
      promptTypeLabel = 'Text';
      const purposeText = {
        'creative': 'Write a creative piece',
        'informative': 'Create an informative text',
        'persuasive': 'Develop a persuasive piece',
        'conversational': 'Generate a conversation'
      }[answers.purpose];
      
      const toneText = {
        'formal': 'in a formal and professional tone',
        'casual': 'in a casual, conversational style',
        'humorous': 'with humor and a light tone',
        'serious': 'in a serious, academic manner'
      }[answers.tone];
      
      const lengthText = answers.length === 'specific' 
        ? `that is approximately ${answers.wordCountValue} words in length`
        : {
            'short': 'that is brief (a paragraph or two)',
            'medium': 'of medium length (several paragraphs)',
            'long': 'that is extensive (multiple sections)'
          }[answers.length];
      
      const structureText = {
        'narrative': 'using a flowing narrative structure',
        'bullet': 'formatted as bullet points or a list',
        'sectioned': 'organized with clear sections and headings',
        'dialogue': 'presented as a dialogue or conversation'
      }[answers.structure];
      
      prompt = `${purposeText} ${toneText} ${lengthText} ${structureText}. Your text should be engaging and focused on the main topic while maintaining consistency throughout.`;
    } else {
      // Image prompt generation
      promptTypeLabel = 'Image';
      const styleText = {
        'realistic': 'Create a realistic, photographic image',
        'cartoon': 'Design a cartoon-style, stylized illustration',
        'abstract': 'Generate an abstract, conceptual artwork',
        'digital': 'Produce a digital art illustration'
      }[answers.style];
      
      const subjectText = {
        'person': 'featuring a person/character',
        'landscape': 'showing a landscape/scene',
        'object': 'of an object/item',
        'concept': 'representing an abstract concept'
      }[answers.subject];
      
      const moodText = {
        'cheerful': 'with a cheerful, happy mood',
        'dramatic': 'conveying a dramatic, intense feeling',
        'peaceful': 'evoking a peaceful, calm atmosphere',
        'mysterious': 'creating a mysterious, enigmatic vibe'
      }[answers.mood];
      
      const detailText = {
        'minimal': 'Use a minimal, simple style',
        'moderate': 'Include moderate level of detail',
        'highly': 'Make it highly detailed',
        'hyper': 'Create hyper-realistic details'
      }[answers.detail];
      
      prompt = `${styleText} ${subjectText} ${moodText}. ${detailText} with attention to composition, lighting, and color harmony. The image should have a cohesive look and effectively communicate the intended subject and emotion.`;
    }
    
    setGeneratedPrompt(prompt);
    
    // Save to recent prompts
    const timestamp = new Date().toLocaleString();
    
    const newPrompt = {
      id: Date.now(),
      type: promptTypeLabel,
      text: prompt,
      timestamp
    };
    
    setRecentPrompts(prevPrompts => [newPrompt, ...prevPrompts.slice(0, 9)]);
    setStep(questions[promptType].length + 1);
  };

  // Handle option selection
  const handleSelect = (optionId) => {
    if (step === 0) {
      setPromptType(optionId);
      setStep(1);
    } else {
      const currentQuestion = questions[promptType][step - 1];
      setAnswers({
        ...answers,
        [currentQuestion.id]: optionId
      });
      
      // If selected specific word count, don't advance yet
      if (currentQuestion.id === 'length' && optionId === 'specific') {
        return;
      }
      
      // Check if we're at the last question
      if (step >= questions[promptType].length) {
        generateFinalPrompt();
      } else {
        setStep(step + 1);
      }
    }
  };
  
  // Handle word count input
  const handleWordCount = (e) => {
    setWordCount(e.target.value);
  };
  
  // Submit word count
  const submitWordCount = () => {
    if (wordCount) {
      setAnswers({
        ...answers,
        wordCountValue: wordCount
      });
      
      if (step >= questions[promptType].length) {
        generateFinalPrompt();
      } else {
        setStep(step + 1);
      }
    }
  };
  
  // Reset the form
  const resetForm = () => {
    setStep(0);
    setPromptType('');
    setAnswers({});
    setGeneratedPrompt('');
    setWordCount('');
  };
  
  // Copy prompt to clipboard
  const copyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt)
      .then(() => {
        alert('Prompt copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };
  
  // Load a saved prompt
  const loadSavedPrompt = (savedPrompt) => {
    setGeneratedPrompt(savedPrompt.text);
    setStep(questions[promptType]?.length + 1 || 0);
    setPromptType(savedPrompt.type === 'Text' ? 'text' : 'image');
  };
  
  // Delete a saved prompt
  const deleteSavedPrompt = (id) => {
    setRecentPrompts(prevPrompts => prevPrompts.filter(prompt => prompt.id !== id));
  };

  // Clear all saved prompts
  const clearAllPrompts = () => {
    setRecentPrompts([]);
    localStorage.removeItem('recentPrompts');
  };

  return (
    <PromptContext.Provider value={{
      step,
      setStep,
      promptType,
      answers,
      generatedPrompt,
      recentPrompts,
      wordCount,
      handleSelect,
      handleWordCount,
      submitWordCount,
      resetForm,
      copyPrompt,
      loadSavedPrompt,
      deleteSavedPrompt,
      clearAllPrompts
    }}>
      {children}
    </PromptContext.Provider>
  );
};

export const usePrompt = () => useContext(PromptContext);

// Questions and options based on prompt type
export const questions = {
  initial: {
    question: "What type of prompt do you want to build?",
    options: [
      { id: 'text', label: 'Text Generation Prompt' },
      { id: 'image', label: 'Image Generation Prompt' }
    ]
  },
  text: [
    {
      id: 'purpose',
      question: "What is the main purpose of your text?",
      options: [
        { id: 'creative', label: 'Creative writing (story, poem, script)' },
        { id: 'informative', label: 'Informative content (article, report, guide)' },
        { id: 'persuasive', label: 'Persuasive content (advertisement, pitch)' },
        { id: 'conversational', label: 'Conversational (dialogue, chat)' }
      ]
    },
    {
      id: 'tone',
      question: "What tone should the text have?",
      options: [
        { id: 'formal', label: 'Formal and professional' },
        { id: 'casual', label: 'Casual and conversational' },
        { id: 'humorous', label: 'Humorous and light' },
        { id: 'serious', label: 'Serious and academic' }
      ]
    },
    {
      id: 'length',
      question: "How long should the text be?",
      options: [
        { id: 'short', label: 'Short (a paragraph or two)' },
        { id: 'medium', label: 'Medium (several paragraphs)' },
        { id: 'long', label: 'Long (multiple sections)' },
        { id: 'specific', label: 'Specific word count' }
      ]
    },
    {
      id: 'structure',
      question: "What structure would you prefer?",
      options: [
        { id: 'narrative', label: 'Narrative (flowing story or account)' },
        { id: 'bullet', label: 'Bullet points or list' },
        { id: 'sectioned', label: 'Sections with headings' },
        { id: 'dialogue', label: 'Dialogue or conversation' }
      ]
    }
  ],
  image: [
    {
      id: 'style',
      question: "What style of image are you looking for?",
      options: [
        { id: 'realistic', label: 'Realistic/Photographic' },
        { id: 'cartoon', label: 'Cartoon/Stylized' },
        { id: 'abstract', label: 'Abstract/Conceptual' },
        { id: 'digital', label: 'Digital Art/Illustration' }
      ]
    },
    {
      id: 'subject',
      question: "What is the main subject of your image?",
      options: [
        { id: 'person', label: 'Person/Character' },
        { id: 'landscape', label: 'Landscape/Scene' },
        { id: 'object', label: 'Object/Item' },
        { id: 'concept', label: 'Abstract Concept' }
      ]
    },
    {
      id: 'mood',
      question: "What mood should the image convey?",
      options: [
        { id: 'cheerful', label: 'Cheerful/Happy' },
        { id: 'dramatic', label: 'Dramatic/Intense' },
        { id: 'peaceful', label: 'Peaceful/Calm' },
        { id: 'mysterious', label: 'Mysterious/Enigmatic' }
      ]
    },
    {
      id: 'detail',
      question: "How detailed should the image be?",
      options: [
        { id: 'minimal', label: 'Minimal/Simple' },
        { id: 'moderate', label: 'Moderately detailed' },
        { id: 'highly', label: 'Highly detailed' },
        { id: 'hyper', label: 'Hyper-realistic' }
      ]
    }
  ]
};