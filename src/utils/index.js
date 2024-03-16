export const BREAKFAST = 'Breakfast'; /* 6am to 9am*/
export const LUNCH = 'Lunch'; /* 12pm to 2pm */
export const TEATIME = 'Teatime'; /* 4pm */
export const SNACK = 'Snack'; /* Anytime */
export const DINNER = 'Dinner'; /* 6pm to 8pm */

export const mealType = () => {
  const time = new Date().getHours();

  if (time <= 9) return BREAKFAST;
  else if (time >= 12 && time <= 14) return LUNCH;
  else if (time >= 15 && time <= 16) return TEATIME;
  else if (time >= 17 && time <= 20) return DINNER;
  else return SNACK;
};

export const getRecipeId = (uri) => {
  const search_word = 'recipe_';
  return uri.substring(uri.indexOf(search_word) + search_word.length);
};
