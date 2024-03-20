import { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('');

  useEffect(() => {
    const isSystemThemeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isSystemThemeDark) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
