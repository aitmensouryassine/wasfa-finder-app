import { createContext, useEffect, useState, useRef } from 'react';
import { getRecipesByMealType, getRecipesByQuery } from '../api';

const context = createContext();

export function ContextProvider({ children }) {
  // saved recipes
  const [savedRecipes, setSavedRecipes] = useState([]);

  // Home recipes
  const [homeRecipes, setHomeRecipes] = useState([]);
  const [homeNextRecipesUrl, setHomeNextRecipesUrl] = useState('');
  const [homeRecipesLoading, setHomeRecipesLoading] = useState(false);

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

  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef();

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
    <context.Provider
      value={ {
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
          newIngredient,
          setNewIngredient,
          ingredients,
          setIngredients,
          ingredientInput,
        },
      } }
    >
      { children }
    </context.Provider>
  );
}

export default context;
