import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../api';
import { secondsToHoursMinutes } from '../utils';
import '../styles/recipe.scss';
import { Thumbnail } from '../components/RecipeCard';

function Recipe() {
  const [recipe, setRecipe] = useState({});
  const [nutrients, setNutrients] = useState([]);
  const { id } = useParams();

  const fetchRecipe = useCallback(async () => {
    const { recipe } = await getRecipeById(id);

    // nutrients
    const servings = recipe.yield;
    setNutrients([
      {
        label: recipe.totalNutrients.ENERC_KCAL.label,
        val: Math.round(recipe.totalNutrients.ENERC_KCAL.quantity / servings),
        unit: recipe.totalNutrients.ENERC_KCAL.unit,
      },
      {
        label: recipe.totalNutrients.FAT.label,
        val: Math.round(recipe.totalNutrients.FAT.quantity / servings),
        unit: recipe.totalNutrients.FAT.unit,
      },
      {
        label: recipe.totalNutrients.CHOCDF.label,
        val: Math.round(recipe.totalNutrients.CHOCDF.quantity / servings),
        unit: recipe.totalNutrients.CHOCDF.unit,
      },
      {
        label: recipe.totalNutrients.PROCNT.label,
        val: Math.round(recipe.totalNutrients.PROCNT.quantity / servings),
        unit: recipe.totalNutrients.PROCNT.unit,
      },
    ]);

    setRecipe(recipe);
  }, [id]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  return recipe?.label ? (
    <div className='Recipe'>
      <div className='header'>
        <div className='title'>
          <h1>{recipe.label}</h1>
          <Thumbnail src={recipe.image} alt={recipe.label} />
        </div>
        <div className='information'>
          <h2>General Information</h2>
          <div className='items'>
            <div className='meal-type item'>
              <i class='bi bi-clock'></i>
              <span>Meal type</span>
              <small>{recipe.mealType.join(', ')}</small>
            </div>
            <div className='cook-time item'>
              <i class='bi bi-stopwatch'></i>
              <span>Time</span>
              <small>{secondsToHoursMinutes(recipe.totalTime)}</small>
            </div>
            <div className='ingredients item'>
              <i class='bi bi-egg-fried'></i>
              <span>Ingredients</span>
              <small>{recipe.ingredients.length}</small>
            </div>
            <div className='servings item'>
              <i class='bi bi-circle'></i>
              <span>Servings</span>
              <small>{recipe.yield}</small>
            </div>
            <div className='cuisine item'>
              <i class='bi bi-globe-europe-africa'></i>
              <span>Cuisine</span>
              <small>{recipe.cuisineType.join(', ')}</small>
            </div>
          </div>
        </div>
      </div>
      <div className='ingredients-container'>
        <h2>Ingredients</h2>
        <div className='ingredients'>
          {recipe.ingredients.map((ingredient) => (
            <div className='ingredient' key={ingredient.food}>
              <div className='image'>
                <Thumbnail src={ingredient.image} alt={ingredient.food} />
              </div>
              <div className='name'>
                <span>{ingredient.food}</span>
                <span>
                  ({ingredient.quantity} {ingredient.measure}
                  {ingredient.quantity > 1 ? 's' : ''})
                </span>
                <small>{ingredient.foodCategory}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='ingredients-details'>
        <h2>Ingredients Details</h2>
        <ul className='ingredient'>
          {recipe.ingredients.map((ingredient) => (
            <li className='detail' key={ingredient.food}>
              {ingredient.text}
            </li>
          ))}
        </ul>
      </div>
      <div className='nutritions'>
        <h2>
          Nutrition Facts <small>(per serving)</small>
        </h2>
        <div className='nutrients'>
          {nutrients.map(({ label, val, unit }) => (
            <div className='item' key={label}>
              <span className='name'>{label}</span>
              <span>
                {val} {unit}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className='instructions'>
        <h2>Instructions</h2>
        <a href={recipe.url} target='videoframe'>
          {recipe.source}
        </a>
      </div>
    </div>
  ) : null;
}

export default Recipe;
