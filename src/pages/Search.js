import { useContext } from 'react';
import Loading from '../components/Loading';
import Recipes from '../components/Recipes';
import RecipeContext from '../context/recipe';
import SearchRecipesForm from '../components/SearchRecipesForm';
import Footer from '../components/Footer';
import '../styles/search.scss';

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
        <div>
          <SearchRecipesForm />
          <Footer device='desktop' />
        </div>
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
