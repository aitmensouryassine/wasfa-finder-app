import { useContext } from 'react';
import Recipes from '../components/Recipes';
import RecipeContext from '../context/recipe';

export default function Saved() {
  const { saved } = useContext(RecipeContext);

  return (
    <section className='Saved'>
      <Recipes recipes={saved.savedRecipes} />
    </section>
  );
}
