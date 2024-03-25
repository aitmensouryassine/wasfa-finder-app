import { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const themeKey = 'theme';
  const [dark, setDark] = useState(true);

  const saveThemeToLocalStorage = (dark) => {
    localStorage.setItem(themeKey, dark ? 'dark' : 'light');
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem(themeKey) || '';

    if (savedTheme) {
      setDark(savedTheme === 'dark');
    } else {
      const isSystemThemeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isSystemThemeDark) {
        setDark(true);
      } else {
        setDark(false);
      }
    }
  }, []);

  return <ThemeContext.Provider value={{ dark, setDark, saveThemeToLocalStorage }}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
