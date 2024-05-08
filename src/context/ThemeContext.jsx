// src/context/ThemeContext.js: Theme Controller

import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(()=> {
    // Retrieve theme from localStorage, default to pink if not found
    const storedTheme = localStorage.getItem('theme');
    return storedTheme || 'pink';
  }); 

  const toggleTheme = () => {
    const newTheme = theme === 'pink' ? 'blue' : 'pink';
    
    // Toggle theme in localStorage
    localStorage.setItem('theme', newTheme);

    // Toggle theme in state
    setTheme(newTheme);
  };

  useEffect(() => {
    // Set theme in body tag
    document.body.setAttribute('data-theme', theme);
  }, [theme]);
  
  // Return ThemeContext.Provider with theme and toggleTheme as values
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export const useTheme = () => useContext(ThemeContext);
