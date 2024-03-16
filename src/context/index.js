import { createContext, useState } from 'react';

const context = createContext();

export function ContextProvider({ children }) {
  const [savedRecipes, setSavedRecipes] = useState([]);

  return <context.Provider value={{ savedRecipes, setSavedRecipes }}>{children}</context.Provider>;
}

export default context;
