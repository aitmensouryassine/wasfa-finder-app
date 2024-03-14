import axios from 'axios';
import { mealType } from '../utils';

export const api_key = '446aa5a2b7ad7f4594f12336c100a887';
export const app_id = '3cec3aee';
export const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${app_id}&app_key=${api_key}`;

export const getRecipesByMealType = async () => {
  const response = await axios.get(baseUrl + '&mealType=' + mealType());
  return response.data;
};
