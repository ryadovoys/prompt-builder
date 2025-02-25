import React, { useState, useEffect } from 'react';

const PromptBuilder = () => {
  // State for tracking current step and selections
  const [step, setStep] = useState(0);
  const [promptType, setPromptType] = useState('');
  const [answers, setAnswers] = useState({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [recentPrompts, setRecentPrompts] = useState([]);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  
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
  
  // Questions and options based on prompt type
  const questions = {
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
  
  // Custom input for specific word count
  const [wordCount, setWordCount] = useState('');
  
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
  
  // Toggle sidebar functions
  const toggleLeftSidebar = () => {
    setLeftSidebarOpen(!leftSidebarOpen);
  };
  
  const toggleRightSidebar = () => {
    setRightSidebarOpen(!rightSidebarOpen);
  };

  // Left sidebar for recent prompts
  const LeftSidebar = () => {
    return (
      <>
        <div style={{
          width: leftSidebarOpen ? '260px' : '0',
          height: '100vh',
          backgroundColor: '#f5f5f5',
          padding: leftSidebarOpen ? '24px 16px' : '0',
          overflowY: 'auto',
          overflowX: 'hidden',
          transition: 'width 0.3s ease, padding 0.3s ease',
          position: 'relative',
          flexShrink: 0
        }}>
          {leftSidebarOpen && (
            <>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: 'bold'
                }}>Recent Prompts</h2>
                
                <button
                  onClick={toggleLeftSidebar}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 6L9 12L15 18" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              
              {recentPrompts.length === 0 ? (
                <div style={{
                  backgroundColor: 'white',
                  padding: '16px',
                  borderRadius: '12px',
                  textAlign: 'center',
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}>
                  No saved prompts yet.
                  <br />
                  Complete the wizard to save prompts.
                </div>
              ) : (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {recentPrompts.map(prompt => (
                    <div key={prompt.id} 
                      onClick={() => loadSavedPrompt(prompt)}
                      style={{
                        padding: '16px',
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        marginBottom: '4px'
                      }}>
                        {prompt.type} Prompt
                      </div>
                      
                      <div style={{
                        fontSize: '14px',
                        color: '#666',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        marginBottom: '8px'
                      }}>
                        {prompt.text}
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span style={{
                          fontSize: '12px',
                          color: '#888',
                        }}>
                          {new Date(prompt.timestamp).toLocaleDateString()}
                        </span>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSavedPrompt(prompt.id);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '12px',
                            color: '#888',
                            cursor: 'pointer'
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {recentPrompts.length > 0 && (
                    <button
                      onClick={clearAllPrompts}
                      style={{
                        border: 'none',
                        background: 'none',
                        color: '#666',
                        fontSize: '14px',
                        marginTop: '8px',
                        cursor: 'pointer',
                        alignSelf: 'center'
                      }}
                    >
                      Clear All
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
        
        {!leftSidebarOpen && (
          <button
            onClick={toggleLeftSidebar}
            style={{
              position: 'fixed',
              left: '0',
              top: '24px',
              background: '#f5f5f5',
              border: 'none',
              borderRadius: '0 4px 4px 0',
              cursor: 'pointer',
              padding: '12px 8px',
              boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
              zIndex: 10
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </>
    );
  };
  
  // Right sidebar for tips
  const RightSidebar = () => {
    return (
      <>
        <div style={{
          width: rightSidebarOpen ? '260px' : '0',
          height: '100vh',
          backgroundColor: '#f5f5f5',
          padding: rightSidebarOpen ? '24px 16px' : '0',
          overflowY: 'auto',
          overflowX: 'hidden',
          transition: 'width 0.3s ease, padding 0.3s ease',
          position: 'relative',
          flexShrink: 0
        }}>
          {rightSidebarOpen && (
            <>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: 'bold'
                }}>Some tips</h2>
                
                <button
                  onClick={toggleRightSidebar}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6L15 12L9 18" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              
              <div style={{
                backgroundColor: 'white',
                padding: '16px',
                borderRadius: '12px',
                textAlign: 'center',
                fontSize: '14px',
                lineHeight: '1.4'
              }}>
                No saved tips yet.
                <br />
                Complete the wizard to save prompts.
              </div>
            </>
          )}
        </div>
        
        {!rightSidebarOpen && (
          <button
            onClick={toggleRightSidebar}
            style={{
              position: 'fixed',
              right: '0',
              top: '24px',
              background: '#f5f5f5',
              border: 'none',
              borderRadius: '4px 0 0 4px',
              cursor: 'pointer',
              padding: '12px 8px',
              boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
              zIndex: 10
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 6L9 12L15 18" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </>
    );
  };
  
  // Main content component
  const MainContent = () => {
    return (
      <div style={{
        flex: 1,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        {renderCurrentStep()}
      </div>
    );
  };
  
  // Render the current step
  const renderCurrentStep = () => {
    if (step === 0) {
      return (
        <div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '40px',
            maxWidth: '500px'
          }}>
            What type of prompt do you want to build?
          </h1>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
            alignItems: 'center'
          }}>
            {questions.initial.options.map(option => (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                style={{
                  padding: '16px 24px',
                  backgroundColor: '#000',
                  color: 'white',
                  border: 'none',
                  borderRadius: '9999px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'inline-block'
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      );
    } else if (step <= questions[promptType].length) {
      const currentQuestion = questions[promptType][step - 1];
      
      return (
        <div style={{
          width: '100%',
          maxWidth: '600px'
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '40px'
          }}>
            {currentQuestion.question}
          </h1>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'center',
            width: '100%'
          }}>
            {currentQuestion.options.map(option => (
              <div key={option.id}>
                <button
                  onClick={() => handleSelect(option.id)}
                  style={{
                    padding: '16px 24px',
                    backgroundColor: '#000',
                    color: 'white',
                    border: 'none',
                    borderRadius: '9999px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'inline-block'
                  }}
                >
                  {option.label}
                </button>
                
                {/* Show word count input if specific length is selected */}
                {currentQuestion.id === 'length' && option.id === 'specific' && answers.length === 'specific' && (
                  <div style={{
                    marginTop: '16px',
                    width: '100%'
                  }}>
                    <input
                      type="number"
                      value={wordCount}
                      onChange={handleWordCount}
                      placeholder="Enter word count"
                      style={{
                        padding: '12px 16px',
                        width: '100%',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '16px',
                        marginBottom: '12px'
                      }}
                    />
                    <button
                      onClick={submitWordCount}
                      style={{
                        padding: '12px 24px',
                        width: '100%',
                        backgroundColor: '#000',
                        color: 'white',
                        border: 'none',
                        borderRadius: '9999px',
                        fontSize: '16px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      Confirm
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <button
            onClick={() => setStep(step - 1)}
            style={{
              marginTop: '32px',
              background: 'none',
              border: 'none',
              color: '#666',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            &larr; Back
          </button>
        </div>
      );
    } else {
      return (
        <div style={{
          width: '100%',
          maxWidth: '700px'
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '24px'
          }}>
            Your Generated Prompt
          </h1>
          
          <div style={{
            padding: '24px',
            backgroundColor: '#f9f9f9',
            borderRadius: '12px',
            marginBottom: '32px',
            textAlign: 'left',
            fontSize: '16px',
            lineHeight: '1.6'
          }}>
            {generatedPrompt}
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px'
          }}>
            <button
              onClick={copyPrompt}
              style={{
                padding: '12px 24px',
                backgroundColor: '#000',
                color: 'white',
                border: 'none',
                borderRadius: '9999px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
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
              style={{
                padding: '12px 24px',
                backgroundColor: '#f5f5f5',
                color: '#000',
                border: '1px solid #ddd',
                borderRadius: '9999px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Create New Prompt
            </button>
          </div>
        </div>
      );
    }
  };
  
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      overflow: 'hidden'
    }}>
      <LeftSidebar />
      <MainContent />
      <RightSidebar />
    </div>
  );
};

export default PromptBuilder;
