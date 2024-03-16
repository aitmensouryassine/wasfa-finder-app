import RecipeCard from '../components/RecipeCard';
import Loading from './Loading';
import '../styles/recipes.scss';
import { useEffect, useRef, useState } from 'react';
import { getNextRecipes } from '../api';

function Recipes({ recipes, setRecipes, nextRecipesUrl, setNextRecipesUrl }) {
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        getNextRecipes(nextRecipesUrl, setRecipes, setNextRecipesUrl, setLoading, setHasMore);
      }
    });
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [recipes]);

  return (
    <div className='Recipes'>
      {recipes.length ? (
        recipes.map(({ recipe }) => <RecipeCard key={recipe.uri} recipe={recipe} />)
      ) : (
        <div>No recipes</div>
      )}
      {nextRecipesUrl ? (
        hasMore ? (
          <div ref={loaderRef}>{loading ? <Loading /> : null}</div>
        ) : (
          <div>No more recipes</div>
        )
      ) : null}
    </div>
  );
}

export default Recipes;
