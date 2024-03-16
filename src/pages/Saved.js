import { useContext } from 'react';
import Recipes from '../components/Recipes';
import context from '../context';

export default function Saved() {
  const { savedRecipes } = useContext(context);

  return (
    <section className='Saved'>
      <Recipes recipes={savedRecipes} />
    </section>
  );
}
