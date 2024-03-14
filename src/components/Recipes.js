import RecipeCard from '../components/RecipeCard';
import Loading from './Loading';
import '../styles/recipes.scss';
import { useEffect, useRef, useState } from 'react';
import { getNextRecipes } from '../api';

function Recipes({ data }) {
  const [nextUrl, setNextUrl] = useState(data._links.next.href);
  const [recipes, setRecipes] = useState(data.hits);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        getNextRecipes(nextUrl, setRecipes, setNextUrl, setLoading, setHasMore);
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
      {hasMore ? <div ref={loaderRef}>{loading ? <Loading /> : null}</div> : <div>No more recipes</div>}
    </div>
  );
}

export default Recipes;
