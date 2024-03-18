import SearchBar from '../components/SearchBar';
import { useContext, useState } from 'react';
import Loading from '../components/Loading';
import Recipes from '../components/Recipes';
import context from '../context';

export default function Search() {
  const [term, setTerm] = useState('');

  const { search } = useContext(context);
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
      <SearchBar setTerm={setTerm} handleSubmit={handleSubmit} />
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
