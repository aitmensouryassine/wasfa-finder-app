import '../styles/recipe-card.scss';

function RecipeCard({ recipe }) {
  console.log(recipe);
  return (
    <div className='RecipeCard'>
      <div className='thumbnail'>
        <img alt={recipe.label} src={recipe.image} />
      </div>
      <div className='label'>{recipe.label}</div>
    </div>
  );
}

export default RecipeCard;
