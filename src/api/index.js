import axios from 'axios';
import { mealType, mergeDuplicateRecipes } from '../utils';

export const api_key = '446aa5a2b7ad7f4594f12336c100a887';
export const app_id = '3cec3aee';
export const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${app_id}&app_key=${api_key}`;

export const getRecipesByMealType = async () => {
  try {
    const { data } = await axios.get(baseUrl + '&mealType=' + mealType());
    return {
      recipes: data?.hits || [],
      nextRecipesUrl: data?._links?.next?.href || '',
    };
  } catch (error) {
    console.log(error);
    return {
      recipes: [],
      nextRecipesUrl: '',
    };
  }
};

export const getNextRecipes = async (nextUrl, setRecipes, setNextUrl, setLoading, setHasMore) => {
  try {
    setLoading(true);
    const response = await axios.get(nextUrl);
    const { data } = response;
    setRecipes((prevRecipes) => mergeDuplicateRecipes(prevRecipes, data.hits));
    setNextUrl(data._links.next.href);
    setLoading(false);
  } catch (err) {
    setHasMore(false);
    console.error(err);
  }
};
