
import React, { useState } from 'react';
import '../styles/search-bar.scss';

export default function SearchBar({ handleSubmit, newIngredient,
  setNewIngredient, ingredientInput, handleAdd, ingredients, setIngredients }) {

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleDelete = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
    setHoveredIndex(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd(e);
    }
  };

  return (
    <div className='searchbar-container'>
      <p className='search-msg'>Ready to cook up something delicious 🧑‍🍳?</p>
      <p className='search-msg2'>Search for recipes :</p>
      <form className='searchbar' onSubmit={ handleSubmit }>
        <div className='ingredients'>
          <input
            type='text'
            onChange={ (e) => setNewIngredient(e.target.value) }
            value={ newIngredient }
            ref={ ingredientInput }
            onKeyPress={ handleKeyPress }
          />
          <button type="submit">Search</button>
        </div>
      </form>
      <div className='ingredients-list-container'>
        <ul className='ingredients-list'>
          { ingredients.map((ing, i) => (
            <li
              key={ i }
              onMouseEnter={ () => setHoveredIndex(i) }
              onMouseLeave={ () => setHoveredIndex(null) }
            >
              { ing }

              { hoveredIndex === i && (
                <button
                  className='deletebtn'
                  onClick={ () => handleDelete(i) }
                >
                  x
                </button>
              ) }
            </li>
          )) }
        </ul>
      </div>
    </div>
  )
}
