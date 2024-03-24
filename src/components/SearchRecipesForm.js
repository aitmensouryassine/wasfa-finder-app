import { useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import '../styles/search-recipes-form.scss';

const dietChoices = [
  { id: 1, name: 'balanced' },
  { id: 2, name: 'high-fiber' },
  { id: 3, name: 'high-protein' },
  { id: 4, name: 'low-carb' },
  { id: 5, name: 'low-fat' },
  { id: 6, name: 'low-sodium' },
];
const cuisineTypeChoices = [
  { id: 1, name: 'American' },
  { id: 2, name: 'Asian' },
  { id: 3, name: 'British' },
  { id: 4, name: 'Caribbean' },
  { id: 5, name: 'Central Europe' },
  { id: 6, name: 'Chinese' },
  { id: 7, name: 'Eastern Europe' },
  { id: 8, name: 'French' },
  { id: 9, name: 'Indian' },
  { id: 10, name: 'Italian' },
  { id: 11, name: 'Japanese' },
  { id: 12, name: 'Kosher' },
  { id: 13, name: 'Mediterranean' },
  { id: 14, name: 'Mexican' },
  { id: 15, name: 'Middle Eastern' },
  { id: 16, name: 'Nordic' },
  { id: 17, name: 'South American' },
  { id: 18, name: 'South East Asian' },
];

const MIN = 1,
  MAX = 20;

export default function SearchRecipesForm({ fetchSearchRecipes }) {
  const [ingredientsRange, setIngredientsRange] = useState(['', '']);
  const [minIngredients, setMinIngredients] = useState('');
  const [maxIngredients, setMaxIngredients] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [includeIngredient, setIncludeIngredient] = useState('');
  const [includeIngredients, setIncludeIngredients] = useState([]);
  const [excludeIngredient, setExcludeIngredient] = useState('');
  const [excludeIngredients, setExcludeIngredients] = useState([]);
  const [cuisineType, setCuisineType] = useState('');
  const [diet, setDiet] = useState('');
  const [time, setTime] = useState('');
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [advancedSearchHovered, setAdvancedSearchHoverd] = useState(false);

  const handleRangeChange = (range) => {
    const [min, max] = range;
    setMinIngredients(min);
    setMaxIngredients(max);
    setIngredientsRange(range);
  };

  const handleMinIngredient = (evt) => {
    const value = parseInt(evt.target.value);
    if (isNaN(value)) {
      setMinIngredients('');
    } else if (value >= MIN && value <= 20) {
      setMinIngredients(value);
      setIngredientsRange((prevRange) => [value, prevRange[1]]);
    } else {
      setMinIngredients(MIN);
      setIngredientsRange((prevRange) => [MIN, prevRange[1]]);
    }
  };

  const handleMaxIngredient = (evt) => {
    const value = parseInt(evt.target.value);
    if (isNaN(value)) {
      setMaxIngredients('');
    } else if (value >= MIN && value <= 20) {
      setMaxIngredients(value);
      setIngredientsRange((prevRange) => [prevRange[0], value]);
    } else {
      setMaxIngredients(MAX);
      setIngredientsRange((prevRange) => [prevRange[0], MAX]);
    }
  };

  const addIncludeIngredient = (evt) => {
    evt.preventDefault();
    if (includeIngredient && !includeIngredients.includes(includeIngredient)) {
      setIncludeIngredients((prevState) => [...prevState, includeIngredient]);
    }
    setIncludeIngredient('');
  };
  const addExcludeIngredient = (evt) => {
    evt.preventDefault();
    if (excludeIngredient && !excludeIngredients.includes(excludeIngredient)) {
      setExcludeIngredients((prevState) => [...prevState, excludeIngredient]);
    }
    setExcludeIngredient('');
  };

  const handleSubmit = () => {
    const filters = [];

    if (searchQuery || includeIngredients.length !== 0) {
      const queryParts = [];

      if (searchQuery) {
        queryParts.push(searchQuery);
      }
      if (includeIngredients.length !== 0) {
        queryParts.push(...includeIngredients);
      }
      filters.push(`q=${queryParts.join(', ')}`);
    }

    if (excludeIngredients.length !== 0) {
      filters.push(...excludeIngredients.map(ingredient => `excluded=${ingredient}`))
    }

    if (minIngredients && maxIngredients) {
      filters.push(`ingr=${minIngredients}-${maxIngredients}`);
    } else if (minIngredients) {
      filters.push(`ingr=${minIngredients}%2B`);
    } else if (maxIngredients) {
      filters.push(`ingr=${maxIngredients}`);
    }

    if (time) {
      filters.push(`time=${time}`);
    }

    if (cuisineType) {
      filters.push(`cuisineType=${cuisineType}`);
    }

    if (diet) {
      filters.push(`diet=${diet}`)
    }

    console.log(filters.join('&'));
    fetchSearchRecipes(filters.join('&'));
  };

  return (
    <div className='SearchRecipesForm'>
      <h3>Search for a recipe!</h3>
      <small>You're free to use one or more fields!</small>
      <div className='form'>
        <div className='group'>
          <label htmlFor='search-query'>General search</label>
          <input name='search-query' type='text' value={ searchQuery } onChange={ (e) => setSearchQuery(e.target.value) } />
        </div>

        <div className='advanced-search-btn'>
          <span
            onMouseEnter={ () => setAdvancedSearchHoverd(true) }
            onMouseLeave={ () => setAdvancedSearchHoverd(false) }
            onClick={ () => setAdvancedSearch((prevState) => !prevState) }
            className={ advancedSearch ? 'rotate' : '' }
          >
            Advanced Search{ ' ' }
            { advancedSearchHovered ? <i className='bi bi-caret-down-fill'></i> : <i className='bi bi-caret-down'></i> }
          </span>
        </div>
        <div className={ `advanced-search-container ${advancedSearch ? 'active' : ''}` }>
          <div className='advanced-search'>
            <form onSubmit={ addIncludeIngredient } className='include-ingredients-form'>
              <div className='group'>
                <label htmlFor='inlude-ingredient'>Include ingredients</label>
                <div className='inputs'>
                  <input
                    name='inlude-ingredient'
                    type='text'
                    value={ includeIngredient }
                    onChange={ (e) => setIncludeIngredient(e.target.value) }
                  />
                  <button>
                    <i className='bi bi-plus'></i>
                  </button>
                </div>
              </div>
              <div className='included-ingredients'>
                { includeIngredients.map((ingr, idx) => (
                  <span
                    key={ idx }
                    onClick={ () =>
                      setIncludeIngredients((prevState) => prevState.filter((ingredient) => ingredient !== ingr))
                    }
                  >
                    { ingr }
                  </span>
                )) }
              </div>
            </form>

            <form onSubmit={ addExcludeIngredient } className='exclude-ingredients-form'>
              <div className='group'>
                <label htmlFor='exlude-ingredient'>Exclude ingredients</label>
                <div className='inputs'>
                  <input
                    name='exlude-ingredient'
                    type='text'
                    value={ excludeIngredient }
                    onChange={ (e) => setExcludeIngredient(e.target.value) }
                  />
                  <button>
                    <i className='bi bi-plus'></i>
                  </button>
                </div>
              </div>
              <div className='excluded-ingredients'>
                { excludeIngredients.map((ingr, idx) => (
                  <span
                    key={ idx }
                    onClick={ () =>
                      setExcludeIngredients((prevState) => prevState.filter((ingredient) => ingredient !== ingr))
                    }
                  >
                    { ingr }
                  </span>
                )) }
              </div>
            </form>

            <div className='group'>
              <label htmlFor='number-of-ingredients'>Number of ingredients</label>
              <RangeSlider
                className='slider'
                name='number-of-ingredients'
                min={ MIN }
                max={ MAX }
                step={ 1 }
                value={ ingredientsRange }
                onInput={ handleRangeChange }
              />
              <div className='min-max'>
                <div className='min'>
                  <label htmlFor='min'>Min</label>
                  <input
                    type='number'
                    name='min'
                    value={ minIngredients }
                    onChange={ handleMinIngredient }
                    min={ ingredientsRange[0] }
                    max={ ingredientsRange[1] }
                  />
                </div>
                <div className='max'>
                  <label htmlFor='max'>Max</label>
                  <input
                    type='number'
                    name='max'
                    value={ maxIngredients }
                    onChange={ handleMaxIngredient }
                    min={ ingredientsRange[0] }
                    max={ ingredientsRange[1] }
                  />
                </div>
              </div>
            </div>

            <div className='group'>
              <label htmlFor='time'>
                Cooking Time <small>(minutes)</small>
              </label>
              <input
                type='number'
                name='time'
                value={ time }
                onChange={ (evt) => setTime(evt.target.value !== null ? evt.target.value : '') }
              />
            </div>

            <div className='group'>
              <label htmlFor='cuisine-type'>Cuisine Type</label>
              <select name='cuisine-type' onChange={ (e) => setCuisineType(e.target.value) }>
                <option></option>
                { cuisineTypeChoices.map(({ id, name }) => (
                  <option key={ id } value={ name }>
                    { name }
                  </option>
                )) }
              </select>
            </div>

            <div className='group'>
              <label htmlFor='diet'>Diet</label>
              <select name='diet' onChange={ (e) => setDiet(e.target.value) }>
                <option></option>
                { dietChoices.map(({ id, name }) => (
                  <option key={ id } value={ name }>
                    { name }
                  </option>
                )) }
              </select>
            </div>
          </div>
        </div>
        <div className='submit'>
          <a className='btn' onClick={ handleSubmit } href='#search'>
            Search
          </a>
        </div>
      </div>
    </div>
  );
}
