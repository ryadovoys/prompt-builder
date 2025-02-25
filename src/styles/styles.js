// Common styles for reuse across components

export const buttonStyles = {
  primary: {
    padding: '16px 24px',
    backgroundColor: '#000',
    color: 'white',
    border: 'none',
    borderRadius: '9999px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'inline-block'
  },
  secondary: {
    padding: '12px 24px',
    backgroundColor: '#f5f5f5',
    color: '#000',
    border: '1px solid #ddd',
    borderRadius: '9999px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer'
  },
  iconButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px'
  },
  back: {
    marginTop: '32px',
    background: 'none',
    border: 'none',
    color: '#666',
    fontSize: '16px',
    cursor: 'pointer'
  },
  clearAll: {
    border: 'none',
    background: 'none',
    color: '#666',
    fontSize: '14px',
    marginTop: '8px',
    cursor: 'pointer',
    alignSelf: 'center'
  },
  sidebarToggle: {
    position: 'fixed',
    background: '#f5f5f5',
    border: 'none',
    cursor: 'pointer',
    padding: '12px 8px',
    zIndex: 10
  }
};

export const containerStyles = {
  app: {
    display: 'flex',
    height: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    overflow: 'hidden'
  },
  mainContent: {
    flex: 1,
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  sidebar: (isOpen) => ({
    width: isOpen ? '260px' : '0',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    padding: isOpen ? '24px 16px' : '0',
    overflowY: 'auto',
    overflowX: 'hidden',
    transition: 'width 0.3s ease, padding 0.3s ease',
    position: 'relative',
    flexShrink: 0
  }),
  sidebarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  promptList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  promptItem: {
    padding: '16px',
    backgroundColor: 'white',
    borderRadius: '12px',
    cursor: 'pointer'
  },
  promptDisplay: {
    padding: '24px',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    marginBottom: '32px',
    textAlign: 'left',
    fontSize: '16px',
    lineHeight: '1.6'
  },
  wordCountInput: {
    marginTop: '16px',
    width: '100%'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px'
  },
  wizardContainer: {
    width: '100%',
    maxWidth: '600px'
  },
  finalContainer: {
    width: '100%',
    maxWidth: '700px'
  },
  input: {
    padding: '12px 16px',
    width: '100%',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    marginBottom: '12px'
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '40px'
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
    alignItems: 'center'
  },
  emptyState: {
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '12px',
    textAlign: 'center',
    fontSize: '14px',
    lineHeight: '1.4'
  },
  promptHeader: {
    fontSize: '16px',
    fontWeight: '500',
    marginBottom: '4px'
  },
  promptPreview: {
    fontSize: '14px',
    color: '#666',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    marginBottom: '8px'
  },
  promptMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  timestamp: {
    fontSize: '12px',
    color: '#888',
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    fontSize: '12px',
    color: '#888',
    cursor: 'pointer'
  }
};