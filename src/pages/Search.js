import { getRecipesByQuery } from "../api";
import SearchBar from "../components/SearchBar";
import { useState } from 'react';
import Loading from '../components/Loading';
import Recipes from '../components/Recipes';

export default function Search() {
  const [term, setTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [nextRecipesUrl, setNextRecipesUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async () => {
    const data = await getRecipesByQuery(term);
    setRecipes(data.recipes);
    setNextRecipesUrl(data.nextRecipesUrl);
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchRecipes();
  };

  return (
    <section className='Search'>
      <SearchBar setTerm={ setTerm } handleSubmit={ handleSubmit } />
      { loading ? (
        <Loading />
      ) : (
        <Recipes
          recipes={ recipes }
          setRecipes={ setRecipes }
          nextRecipesUrl={ nextRecipesUrl }
          setNextRecipesUrl={ setNextRecipesUrl }
        />
      ) }
    </section>
  );
}
