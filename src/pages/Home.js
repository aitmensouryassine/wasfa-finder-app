import { useEffect, useState } from 'react';
import Cover from '../components/Cover';
import { mealType } from '../utils';
import Recipes from '../components/Recipes';
import { getRecipesByMealType } from '../api';
import '../styles/home.scss';
import Loading from '../components/Loading';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [nextRecipesUrl, setNextRecipesUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    const data = await getRecipesByMealType();
    setRecipes(data.recipes);
    setNextRecipesUrl(data.nextRecipesUrl);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <section className='Home'>
      <Cover mealType={mealType()} />
      {loading ? (
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
