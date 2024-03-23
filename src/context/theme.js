import { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const isSystemThemeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isSystemThemeDark) {
      setDark(true);
    } else {
      setDark(false);
    }
  }, []);

  return <ThemeContext.Provider value={{ dark, setDark }}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
