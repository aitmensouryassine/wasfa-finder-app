import SearchBar from '../components/SearchBar';
import { useContext } from 'react';
import Loading from '../components/Loading';
import Recipes from '../components/Recipes';
import context from '../context';

export default function Search() {

  const { search } = useContext(context);
  const {
    fetchSearchRecipes,
    searchRecipes: recipes,
    setSearchRecipes: setRecipes,
    searchNextRecipesUrl: nextRecipesUrl,
    setSearchNextRecipesUrl: setNextRecipesUrl,
    searchRecipesLoading: loading,
    newIngredient,
    setNewIngredient,
    ingredients,
    setIngredients,
    ingredientInput,
  } = search;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ingredients.length !== 0) {
      fetchSearchRecipes(ingredients.join(', '));
      setIngredients([]);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();

    const ingred = newIngredient.trim();

    if (ingred && !ingredients.includes(ingred)) {
      setIngredients(prevIngredients => [...prevIngredients, ingred]);
    }

    setNewIngredient('');
    ingredientInput.current.focus();
  };

  return (
    <section className='Search'>
      <SearchBar
        handleSubmit={ handleSubmit }
        newIngredient={ newIngredient }
        setNewIngredient={ setNewIngredient }
        ingredientInput={ ingredientInput }
        handleAdd={ handleAdd }
        ingredients={ ingredients }
        setIngredients={ setIngredients }
      />
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
