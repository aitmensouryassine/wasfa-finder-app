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

export const mergeDuplicateRecipes = (arr1, arr2) => {
  let mergedMap = new Map();

  // Add elements from arr1 to mergedMap
  arr1.forEach((obj) => {
    mergedMap.set(obj.recipe.uri, obj);
  });

  // Add elements from arr2 to mergedMap, overriding duplicates
  arr2.forEach((obj) => {
    mergedMap.set(obj.recipe.uri, obj);
  });

  // Convert mergedMap back to an array
  let mergedArray = Array.from(mergedMap.values());

  return mergedArray;
};

export const secondsToHoursMinutes = (seconds) => {
  if (seconds < 180) {
    return seconds + 'min';
  }
  // Calculate hours and minutes
  let hours = Math.floor(seconds / 3600);
  let remainingSeconds = seconds % 3600;
  let minutes = Math.floor(remainingSeconds / 60);

  // Format the result
  const zero = minutes < 10 ? '0' : '';
  hours = hours ? hours + 'h ' : '';
  minutes = zero + minutes + 'min';

  return hours + minutes;
};
