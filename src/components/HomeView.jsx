import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from './Logo'
import { Name } from './Name'
import { Description } from './Description'
import { SearchBar } from './SearchBar'
import '../App.css'

function HomeView() {
  // State to track the pokemon name
  const [pokemonName, setPokemonName] = useState("");

  const navigate = useNavigate();

  // Navigate to the list view a
  function routeToViewAll() {
    navigate('/list', {state: {pokemonName: pokemonName.toLowerCase()}});
  }

  // Function Submit the search bar
  // would be passed as a prop to SearchBar component
  function submitSearchBar() {
    if (pokemonName.length > 0) {
      routeToViewAll();
    }
  }

  return (
      <div className='home-wrapper'>
        <Logo />
        <Name className="title" />
        <Description />
        <SearchBar pokemonName={pokemonName} setPokemonName={setPokemonName} submitSearchBar={submitSearchBar}/>
        <a onClick={routeToViewAll}>View all</a>
      </div>
  )
}

export default HomeView
