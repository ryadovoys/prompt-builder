import { useState } from 'react';

const useSidebar = (initialState = true) => {
  const [isOpen, setIsOpen] = useState(initialState);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  return [isOpen, toggleSidebar];
};

export default useSidebar;