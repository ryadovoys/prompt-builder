import React from 'react';
import { PromptProvider } from './context/PromptContext';
import MainContent from './components/MainContent';
import Sidebar from './components/Sidebar';
import PromptList from './components/PromptList';
import TipsList from './components/TipsList';
import useSidebar from './hooks/useSidebar';
import { containerStyles } from './styles/styles';

const App = () => {
  const [leftSidebarOpen, toggleLeftSidebar] = useSidebar(true);
  const [rightSidebarOpen, toggleRightSidebar] = useSidebar(true);

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
        
        <Sidebar 
          title="Some tips" 
          isOpen={rightSidebarOpen} 
          toggleSidebar={toggleRightSidebar}
          isLeft={false}
        >
          <TipsList />
        </Sidebar>
      </div>
    </PromptProvider>
  );
};

export default App;