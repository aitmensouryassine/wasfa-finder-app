import { useContext } from 'react';
import Recipes from '../components/Recipes';
import context from '../context';

export default function Saved() {
  const { saved } = useContext(context);

  return (
    <section className='Saved'>
      <Recipes recipes={saved.savedRecipes} />
    </section>
  );
}
