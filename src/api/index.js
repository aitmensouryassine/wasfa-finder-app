import axios from 'axios';
import { mergeDuplicateRecipes } from '../utils';

export const api_key = '446aa5a2b7ad7f4594f12336c100a887';
export const app_id = '3cec3aee';
export const baseUrl = `https://api.edamam.com/api/recipes/v2/`;
export const credentials = `&app_id=${app_id}&app_key=${api_key}`;

export const getRecipesByMealType = async (meal) => {
  try {
    const { data } = await axios.get(`${baseUrl}?type=public${credentials}&mealType=${meal}`);
    return {
      recipes: data?.hits || [],
      nextRecipesUrl: data?._links?.next?.href || '',
    };
  } catch (error) {
    console.error(error);
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

export const getRecipesByQuery = async (term) => {
  try {
    const { data } = await axios.get(`${baseUrl}?type=public${credentials}&${term}`);
    console.log(data)
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

export const getRecipeById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}${id}/?type=public${credentials}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};
