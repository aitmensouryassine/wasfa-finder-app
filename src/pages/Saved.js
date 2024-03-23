import { useContext } from 'react';
import Recipes from '../components/Recipes';
import RecipeContext from '../context/recipe';
import Footer from '../components/Footer';
import '../styles/saved.scss';

export default function Saved() {
  const { saved } = useContext(RecipeContext);
  const { savedRecipes, setSavedRecipes, saveRecipesToLocalStorage } = saved;

  const clearSavedRecipes = () => {
    setSavedRecipes([]);
    saveRecipesToLocalStorage([]);
  };

  return (
    <section className='Saved'>
      <aside>
        <div>
          <div className=''>
            <h3>My saved recipes</h3>
            <div className='clear-all'>
              <button onClick={clearSavedRecipes}>Clear All</button>
            </div>
          </div>
          <Footer device='desktop' />
        </div>
      </aside>
      <main>
        <Recipes recipes={savedRecipes} />
      </main>
    </section>
  );
}
