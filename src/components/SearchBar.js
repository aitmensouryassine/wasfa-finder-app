
import React from 'react';
import '../styles/search-bar.scss';

export default function SearchBar({ setTerm, handleSubmit }) {
  return (
    <div className='searchbar-container'>
      <p className='search-msg'>Ready to cook up something delicious 🧑‍🍳?</p>
      <p className='search-msg2'>Search for recipes :</p>
      <form className='searchbar' onSubmit={ handleSubmit }>
        <input
          type='text'
          id='search'
          onChange={ (e) => setTerm(e.target.value) }
          placeholder="Enter a recipe name or ingredient..."
          required
        />
        <button type="submit" onClick={ handleSubmit }>Search</button>
      </form>
    </div>
  )
}
