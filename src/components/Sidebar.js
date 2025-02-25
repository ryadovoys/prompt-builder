import React from 'react';
import { buttonStyles, containerStyles } from '../styles/styles';

const Sidebar = ({ 
  title, 
  isOpen, 
  toggleSidebar, 
  isLeft,
  children
}) => {
  return (
    <>
      <div style={containerStyles.sidebar(isOpen)}>
        {isOpen && (
          <>
            <div style={containerStyles.sidebarHeader}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: 'bold'
              }}>
                {title}
              </h2>
              
              <button
                onClick={toggleSidebar}
                style={buttonStyles.iconButton}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6L9 12L15 18" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            {children}
          </>
        )}
      </div>
      
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          style={{
            ...buttonStyles.sidebarToggle,
            ...(isLeft 
              ? { left: '0', borderRadius: '0 4px 4px 0', boxShadow: '2px 0 5px rgba(0,0,0,0.1)' }
              : { right: '0', borderRadius: '4px 0 0 4px', boxShadow: '-2px 0 5px rgba(0,0,0,0.1)' }
            ),
            top: '24px'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {isLeft ? (
              <path d="M9 6L15 12L9 18" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            ) : (
              <path d="M15 6L9 12L15 18" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            )}
          </svg>
        </button>
      )}
    </>
  );
};

export default Sidebar;