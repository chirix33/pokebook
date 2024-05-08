import React, { useState } from "react"
import DetailView from "./DetailView";
import { PokemonTypes } from "./PokemonTypes";

export function PokemonCardList({pokemons}) {
    // State to track which pokemon got selected to pull up the 
    // DetailView Component
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const handleDetailView = (pokemon) => {
        setSelectedPokemon(pokemon);
    }

    return (
        <div className='pokemons'>
        {
            pokemons.map(pokemon => {
                // Not all pokemons have images at dream_world.front_default object,
                // so we would default back to official-artwork.front-default
                let pokemonImage = pokemon.sprites.other.dream_world.front_default ? 
                pokemon.sprites.other.dream_world.front_default : pokemon.sprites.other['official-artwork'].front_default;
                
                return (
                    <div key={pokemon.name} className='pokemon'>
                        <div className='pokemon-header'>
                            <img src={pokemonImage} alt='Pokemon Image' width={100} height={100} />
                        </div>
                        <div className='pokemon-content'>
                            <h3>{pokemon.name}</h3>
                            <PokemonTypes types={pokemon.types} />
                            <button className="view-pokemon-button" onClick={() => handleDetailView(pokemon)}>
                                <span>View Pokemon</span>
                            </button>
                        </div>
                    </div>
                )
                }
            )
        }
        { selectedPokemon && <DetailView pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} /> }
    </div>
    )
}