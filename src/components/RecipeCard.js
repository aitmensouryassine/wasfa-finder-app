import '../styles/recipe-card.scss';

function RecipeCard({ recipe }) {
  console.log(recipe);
  return (
    <div className='RecipeCard'>
      <div className='thumbnail'>
        <img alt={recipe.label} src={recipe.image} loading='lazy' />
      </div>
      <div className='label'>
        <h4>{recipe.label}</h4>
        <small>{recipe.healthLabels.slice(0, 2).join(', ')} ...</small>
      </div>
    </div>
  );
}

export default RecipeCard;
