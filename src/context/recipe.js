import { createContext, useEffect, useState, useRef } from 'react';
import { getRecipesByMealType, getRecipesByQuery } from '../api';
import { mealType } from '../utils';

const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  // saved recipes
  const [savedRecipes, setSavedRecipes] = useState([]);
  const SAVED_RECIPES_KEY = 'saved-recipes';
  const saveRecipesToLocalStorage = (recipes) => {
    localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(recipes));
  };

  // Home recipes
  const [homeRecipes, setHomeRecipes] = useState([]);
  const [homeNextRecipesUrl, setHomeNextRecipesUrl] = useState('');
  const [homeRecipesLoading, setHomeRecipesLoading] = useState(true);
  const [meal, setMeal] = useState('');

  const fetchHomeRecipes = async (meal) => {
    setMeal(meal);
    setHomeRecipesLoading(true);
    const data = await getRecipesByMealType(meal);
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
    fetchHomeRecipes(mealType());

    // load saved recipes from local storage
    setSavedRecipes(JSON.parse(localStorage.getItem(SAVED_RECIPES_KEY)));
  }, []);

  return (
    <RecipeContext.Provider
      value={{
        saved: {
          savedRecipes,
          setSavedRecipes,
          saveRecipesToLocalStorage,
        },
        home: {
          homeRecipes,
          setHomeRecipes,
          homeNextRecipesUrl,
          setHomeNextRecipesUrl,
          homeRecipesLoading,
          setHomeRecipesLoading,
          fetchHomeRecipes,
          meal,
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
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export default RecipeContext;
