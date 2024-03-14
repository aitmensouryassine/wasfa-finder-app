import { useEffect, useMemo, useState } from 'react';
import { mealType as getMealType } from '../utils';
import Cover from '../components/Cover';
import Recipes from '../components/Recipes';
import { getRecipesByMealType } from '../api';
import '../styles/home.scss';

export default function Home() {
  const [mealType, setMealType] = useState(getMealType());
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dependency, setDependency] = useState(0);

  const fetchRecipes = useMemo(
    () => async () => {
      try {
        const data = await getRecipesByMealType();
        console.log(data.hits);
        setRecipes(data.hits);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    },
    [dependency]
  );

  useEffect(() => {
    console.log(mealType);
    fetchRecipes();
  }, [fetchRecipes]);

  return (
    <section className='Home'>
      <Cover mealType={mealType} />
      <Recipes recipes={recipes} />
    </section>
  );
}
