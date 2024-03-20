import { createContext, useEffect, useState } from 'react';
import { getRecipesByMealType, getRecipesByQuery } from '../api';

const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  // saved recipes
  const [savedRecipes, setSavedRecipes] = useState([]);

  // Home recipes
  const [homeRecipes, setHomeRecipes] = useState([]);
  const [homeNextRecipesUrl, setHomeNextRecipesUrl] = useState('');
  const [homeRecipesLoading, setHomeRecipesLoading] = useState(true);

  const fetchHomeRecipes = async () => {
    const data = await getRecipesByMealType();
    setHomeRecipes(data.recipes);
    setHomeNextRecipesUrl(data.nextRecipesUrl);
    setHomeRecipesLoading(false);
  };

  // search recipes
  const [searchRecipes, setSearchRecipes] = useState([]);
  const [searchNextRecipesUrl, setSearchNextRecipesUrl] = useState('');
  const [searchRecipesLoading, setSearchRecipesLoading] = useState(false);

  const fetchSearchRecipes = async (term) => {
    setSearchRecipesLoading(true);
    const data = await getRecipesByQuery(term);
    setSearchRecipes(data.recipes);
    setSearchNextRecipesUrl(data.nextRecipesUrl);
    setSearchRecipesLoading(false);
  };

  useEffect(() => {
    fetchHomeRecipes();
  }, []);

  return (
    <RecipeContext.Provider
      value={{
        saved: {
          savedRecipes,
          setSavedRecipes,
        },
        home: {
          homeRecipes,
          setHomeRecipes,
          homeNextRecipesUrl,
          setHomeNextRecipesUrl,
          homeRecipesLoading,
          setHomeRecipesLoading,
        },
        search: {
          fetchSearchRecipes,
          searchRecipes,
          setSearchRecipes,
          searchNextRecipesUrl,
          setSearchNextRecipesUrl,
          searchRecipesLoading,
        },
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export default RecipeContext;
