import { useContext } from 'react';
import Loading from '../components/Loading';
import Recipes from '../components/Recipes';
import RecipeContext from '../context/recipe';
import SearchRecipesForm from '../components/SearchRecipesForm';

export default function Search() {
  const { search } = useContext(RecipeContext);
  const {
    searchRecipes: recipes,
    setSearchRecipes: setRecipes,
    searchNextRecipesUrl: nextRecipesUrl,
    setSearchNextRecipesUrl: setNextRecipesUrl,
    searchRecipesLoading: loading,
  } = search;

  return (
    <section className='Search'>
      <aside>
        <SearchRecipesForm />
      </aside>
      <main id='#search'>
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
      </main>
    </section>
  );
}
