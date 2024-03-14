import RecipeCard from '../components/RecipeCard';
import '../styles/recipes.scss';

function Recipes({ recipes }) {
  return (
    <div className='Recipes'>
      {recipes.length ? (
        recipes.map(({ recipe }) => <RecipeCard key={recipe.uri} recipe={recipe} />)
      ) : (
        <div>No recipes</div>
      )}
    </div>
  );
}

export default Recipes;
