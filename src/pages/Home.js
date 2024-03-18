import { useContext } from 'react';
import Cover from '../components/Cover';
import { mealType } from '../utils';
import Recipes from '../components/Recipes';
import '../styles/home.scss';
import Loading from '../components/Loading';
import context from '../context';

export default function Home() {
  const { home } = useContext(context);
  const {
    homeRecipes: recipes,
    setHomeRecipes: setRecipes,
    homeNextRecipesUrl: nextRecipesUrl,
    setHomeNextRecipesUrl: setNextRecipesUrl,
    homeRecipesLoading,
  } = home;

  return (
    <section className='Home'>
      <Cover mealType={mealType()} />
      {homeRecipesLoading ? (
        <Loading />
      ) : (
        <Recipes
          recipes={recipes}
          setRecipes={setRecipes}
          nextRecipesUrl={nextRecipesUrl}
          setNextRecipesUrl={setNextRecipesUrl}
        />
      )}
    </section>
  );
}
