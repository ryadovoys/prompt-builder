import React from 'react';
import { PromptProvider } from './context/PromptContext';
import MainContent from './components/MainContent';
import Sidebar from './components/Sidebar';
import PromptList from './components/PromptList';
import useSidebar from './hooks/useSidebar';
import { containerStyles } from './styles/styles';

const App = () => {
  const [leftSidebarOpen, toggleLeftSidebar] = useSidebar(true);

  return (
    <PromptProvider>
      <div style={containerStyles.app}>
        <Sidebar 
          title="Recent Prompts" 
          isOpen={leftSidebarOpen} 
          toggleSidebar={toggleLeftSidebar}
          isLeft={true}
        >
          <PromptList />
        </Sidebar>
        
        <MainContent />
      </div>
    </PromptProvider>
  );
};

export default App;