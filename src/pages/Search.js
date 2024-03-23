import { useContext, useState } from 'react';
import Loading from '../components/Loading';
import Recipes from '../components/Recipes';
import RecipeContext from '../context/recipe';
import SearchRecipesForm from '../components/SearchRecipesForm';

export default function Search() {
  const [term, setTerm] = useState('');

  const { search } = useContext(RecipeContext);
  const {
    fetchSearchRecipes,
    searchRecipes: recipes,
    setSearchRecipes: setRecipes,
    searchNextRecipesUrl: nextRecipesUrl,
    setSearchNextRecipesUrl: setNextRecipesUrl,
    searchRecipesLoading: loading,
  } = search;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term) fetchSearchRecipes(term);
  };

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
