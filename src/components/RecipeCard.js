import '../styles/recipe-card.scss';
import { Link } from 'react-router-dom';
import { getRecipeId } from '../utils';
import { useEffect, useState } from 'react';

function RecipeCard({ recipe }) {
  const [hoverSave, setHoverSave] = useState(false);
  const saveRecipe = (evt) => {
    evt.preventDefault();
    console.log(recipe);
  };

  const healthLabels = () => {
    if (recipe.healthLabels.length >= 2) {
      return `${recipe.healthLabels.slice(0, 2).join(', ')} ...`;
    }
    return recipe.healthLabels[0];
  };

  const save_icon = <i className='bi bi-bookmark save-icon'></i>;
  const saved_icon = <i className='bi bi-bookmark-fill saved-icon'></i>;

  return (
    <Link className='RecipeCard' to={`/recipes/${getRecipeId(recipe.uri)}`}>
      <div className='thumbnail'>
        <RecipeCardThumbnail alt={recipe.label} src={recipe.image} />
        <div className='tags'>
          <div className='cal'>{Math.round(recipe.calories)} Cal</div>
          <div className='cuisine-type'>{recipe.cuisineType[0]}</div>
        </div>
      </div>
      <div className='label'>
        <h4>{recipe.label}</h4>
        <small>{healthLabels()}</small>
      </div>
      <div className='footer'>
        <div className='source'>By {recipe.source}</div>
        <div
          className='save'
          onClick={saveRecipe}
          onMouseEnter={() => setHoverSave(true)}
          onMouseLeave={() => setHoverSave(false)}
        >
          {hoverSave ? saved_icon : save_icon}
        </div>
      </div>
    </Link>
  );
}

function RecipeCardThumbnail({ src, alt }) {
  const [image, setImage] = useState(false);
  const [loadingImage, setLoadingImage] = useState('');

  useEffect(() => {
    setLoadingImage(require(`../images/load-image-${Math.round(Math.random()) + 1}.png`));
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImage(src);
    };
  }, []);

  return <img alt={alt} src={image || loadingImage} loading='lazy' />;
}

export default RecipeCard;
