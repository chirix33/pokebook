import React, { useEffect, useState } from 'react'
import { PokemonTypes } from './PokemonTypes'
import { PokemonName } from './PokemonName'
import { Cover } from './Cover'
import axios from 'axios'

export function SideModal({pokemon, pokemonDominantColor, pokemonImage, onClose}) {

    // Function to get lighter and darker colors
    function getLinearGradient(rgb) {
        const lighterColor = rgb.map((v) => v + 30)
        const darkerColor = rgb.map((v) => v - 30)
        return [lighterColor, darkerColor];
    }
    // Get the lighter and darker colors after fetching dominant color
    const [lighter, darker] = getLinearGradient(pokemonDominantColor);


    // For updating the tabs
    function updateTab(event, tabIndex) {
        setActiveTab(tabIndex)
        // remove class active from all other buttons
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => button.classList.remove("active"));

        // Add active class to this button
        event.target.className += " active";
    }

    // State to track active tabs
    const [activeTab, setActiveTab] = useState(0);

    // Function to compare arrays
    const compareArrays = (a, b) => {
        return a.length === b.length &&
        a.every((element, index) => element === b[index])
    };

    // State to track all other pokemons
    const [allOtherPokemons, setAllOtherPokemons] = useState([]);

    // Keep the types of the subject pokemon in an array 
    // (would be used for comparison later)
    let thisPokemonTypes = pokemon.types.map(type=> type.type.name);


    // Getting list of all pokemons excluding the pokemon we viewing
    useEffect(() => {
        // Fetching 500 pokemons to not put workload on the browser
        axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=500`)
            .then(response => {
                // Go through the pokemons obtained from the earlier axios request
                let allPokemons = response.data.results.map(
                    p => (axios.get(`https://pokeapi.co/api/v2/pokemon/${p.name}`)
                                .then(pokemonDetails => {
                                        return pokemonDetails.data;
                                }))
                )

                // Make sure the latest axios request finishes completion before proceeding
                // So basically we take all other pokemons and set it to a state
                // when rendering, we would filter the ones having the same types as the pokemon
                // we are viewing
                Promise.all(allPokemons)
                .then(pokemons => {
                    setAllOtherPokemons(pokemons.filter((otherPokemons) => otherPokemons.name !== pokemon.name))
                })
            })
        
        
    }, []);

    
    return(
        <div className="detail-view">
            <Cover lighterGrad={lighter.toString()} darkerGrad={darker.toString()} img={pokemonImage} onClose={onClose} />
            <PokemonName pokemonname={pokemon.name} />
            <PokemonTypes types={pokemon.types} />
            <div className='content'>
                <div id='about' className='tab-group' style={{display: activeTab === 0 && 'block'}}>
                    <h3 className='title'>About</h3>
                    <div className='tab-content'>
                        <table>
                            <tbody>
                            <tr>
                                <th>Height</th>
                                <td>{pokemon.height.toFixed(1)}m</td>
                            </tr>
                            <tr>
                                <th>Weight</th>
                                <td>{pokemon.weight.toFixed(1)}kg</td>
                            </tr>
                            <tr>
                                <th>Abilities</th>
                                <td>
                                    <ul>
                                    {
                                        pokemon.abilities.map(ability => (
                                            <li key={ability.ability.name}>{ability.ability.name}</li>
                                        ))
                                    }
                                    </ul>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div id='stats' className='tab-group' style={{display: activeTab === 1 && 'block'}}>
                    <h3 className='title'>Stats</h3>
                    <div className='tab-content'>
                        <table>
                            <tbody>
                            {pokemon.stats.map((stat) => (
                                <tr key={stat.stat.name}>
                                    <th>{stat.stat.name}</th>
                                    <td style={{display: "flex", alignItems: "center", gap: "5px"}}>
                                        <div className='progress-bar'>
                                            <div className='progress' style={{width: `${stat.base_stat}%`}}>
                                            </div>
                                        </div>
                                        <span style={{fontSize: "12px"}}>{stat.base_stat}</span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div id='similar' className='tab-group' style={{display: activeTab === 2 && 'block'}}>
                    <h3 className='title'>Similar</h3>
                    <div className='tab-content'>
                        <div className='similar-pokemons'>
                        {
                            
                            allOtherPokemons.map(otherPokemon => {
                                let types = otherPokemon.types.map(pok => pok.type.name)
                                if (compareArrays(thisPokemonTypes, types)) {
                                    return (
                                        <div key={otherPokemon.name} className='similar-pokemon'>
                                            <div className='cover'>
                                                <img src={otherPokemon.sprites.other['official-artwork'].front_default} height={200} width={200} alt={otherPokemon.name} />
                                            </div>
                                            <h4>{otherPokemon.name}</h4>
                                        </div>
                                    )
                                }
                            })
                        }
                        </div>
                    </div>
                </div>
            </div>
            <div className='tabs'>
                <button className='tab-button active' onClick={() => updateTab(event, 0)}>About</button>
                <button className='tab-button' onClick={() => updateTab(event, 1)}>Stats</button>
                <button className='tab-button' onClick={() => updateTab(event, 2)}>Similar</button>
            </div>
        </div>
    )
}