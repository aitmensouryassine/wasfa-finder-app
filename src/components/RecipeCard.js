import '../styles/recipe-card.scss';
import { Link } from 'react-router-dom';
import { getRecipeId } from '../utils';
import { useState } from 'react';

function RecipeCard({ recipe }) {
  const [hoverSave, setHoverSave] = useState(false);
  const saveRecipe = (recipe) => {
    console.log(recipe);
  };

  const handleSave = (evt) => {
    evt.preventDefault();
    saveRecipe(recipe);
  };

  const save_icon = <i class='bi bi-bookmark save-icon'></i>;
  const saved_icon = <i class='bi bi-bookmark-fill saved-icon'></i>;

  return (
    <Link className='RecipeCard' to={`/recipes/${getRecipeId(recipe.uri)}`}>
      <div className='thumbnail'>
        <img alt={recipe.label} src={recipe.image} loading='lazy' />
        <div className='tags'>
          <div className='cal'>{Math.round(recipe.calories)} Cal</div>
          <div className='cuisine-type'>{recipe.cuisineType[0]}</div>
        </div>
      </div>
      <div className='label'>
        <h4>{recipe.label}</h4>
        <small>{recipe.healthLabels.slice(0, 2).join(', ')} ...</small>
      </div>
      <div className='footer'>
        <div className='source'>By {recipe.source}</div>
        <div
          className='save'
          onClick={handleSave}
          onMouseEnter={() => setHoverSave(true)}
          onMouseLeave={() => setHoverSave(false)}
        >
          {hoverSave ? saved_icon : save_icon}
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;
