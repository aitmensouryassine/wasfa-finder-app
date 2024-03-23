import '../styles/recipe-card.scss';
import { Link } from 'react-router-dom';
import { getRecipeId } from '../utils';
import { useEffect, useState, useContext } from 'react';
import RecipeContext from '../context/recipe';

const save_icon = <i className='bi bi-bookmark save-icon'></i>;
const saved_icon = <i className='bi bi-bookmark-fill saved-icon'></i>;

function RecipeCard({ recipe }) {
  const [isSaved, setIsSaved] = useState(false);
  const [icon, setIcon] = useState(save_icon);

  const { saved } = useContext(RecipeContext);
  const { savedRecipes, setSavedRecipes, saveRecipesToLocalStorage } = saved;

  const saveRecipe = (evt) => {
    evt.preventDefault();

    if (isSaved) {
      setSavedRecipes((prevSavedRecipes) => {
        const recipes = prevSavedRecipes.filter(({ recipe: savedRecipe }) => savedRecipe.uri !== recipe.uri);
        saveRecipesToLocalStorage(recipes);
        return recipes;
      });
      setIsSaved(false);
    } else {
      setSavedRecipes((prevSavedRecipes) => {
        const recipes = [...prevSavedRecipes, { recipe }];
        saveRecipesToLocalStorage(recipes);
        return recipes;
      });
      setIsSaved(true);
    }

    // update local storage
  };

  useEffect(() => {
    setIsSaved(savedRecipes.some(({ recipe: savedRecipe }) => savedRecipe.uri === recipe.uri));
  }, [recipe, savedRecipes]);

  const healthLabels = () => {
    if (recipe.healthLabels.length >= 2) {
      return `${recipe.healthLabels.slice(0, 2).join(', ')} ...`;
    }
    return recipe.healthLabels[0];
  };

  return (
    <Link className='RecipeCard' to={`/recipe/${getRecipeId(recipe.uri)}`}>
      <div className='thumbnail'>
        <Thumbnail alt={recipe.label} src={recipe.image} />
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
          onMouseEnter={() => setIcon(saved_icon)}
          onMouseLeave={() => setIcon(save_icon)}
        >
          {isSaved ? saved_icon : icon}
        </div>
      </div>
    </Link>
  );
}

export function Thumbnail({ src, alt }) {
  const [image, setImage] = useState(false);
  const [loadingImage, setLoadingImage] = useState('');

  useEffect(() => {
    setLoadingImage(require(`../images/load-image-${Math.round(Math.random()) + 1}.png`));
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImage(src);
    };
  }, [src]);

  return <img alt={alt} src={image || loadingImage} loading='lazy' />;
}

export default RecipeCard;
