import { useContext } from 'react';
import { meals } from '../utils';
import Recipes from '../components/Recipes';
import '../styles/home.scss';
import Loading from '../components/Loading';
import RecipeContext from '../context/recipe';
import Footer from '../components/Footer';

export default function Home() {
  const { home } = useContext(RecipeContext);
  const {
    homeRecipes: recipes,
    setHomeRecipes: setRecipes,
    homeNextRecipesUrl: nextRecipesUrl,
    setHomeNextRecipesUrl: setNextRecipesUrl,
    homeRecipesLoading,
    fetchHomeRecipes,
    meal: mealName,
  } = home;

  return (
    <section className='Home'>
      <aside>
        <div>
          <div className='meal-type-menu'>
            {meals.map((meal) => (
              <div
                key={meal.id}
                className={`meal ${mealName === meal.name ? 'active' : ''}`}
                onClick={() => fetchHomeRecipes(meal.name)}
              >
                <img src={meal.imgSrc} alt={meal.name} />
                <span>{meal.name}</span>
              </div>
            ))}
          </div>
          <Footer device='desktop' />
        </div>
      </aside>
      <main>
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
      </main>
    </section>
  );
}
