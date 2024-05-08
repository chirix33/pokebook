import React, { useEffect, useState } from 'react'
import { PokemonTypes } from './PokemonTypes';
import { PokemonName } from './PokemonName';
import ColorThief from '../../node_modules/colorthief/dist/color-thief.mjs'
import backArrow from '../assets/back-arrow.svg'
import { SideModal } from './SideModal';

function DetailView({ pokemon, onClose }) {
    let pokemonImage;

    if(!pokemon) {
        pokemonImage = 'https://w7.pngwing.com/pngs/706/299/png-transparent-pokemon-pokeball-illustration-pikachu-ash-ketchum-pokemon-coloring-book-pokeball-rim-pokemon-johto-thumbnail.png';   
    } else {
        // Get Pokemon Image
        pokemonImage = pokemon.sprites.other.dream_world.front_default ? 
        pokemon.sprites.other.dream_world.front_default : pokemon.sprites.other['official-artwork'].front_default;
    }

    // Get the Cover Gradient color from the pokemon's image
    // Thanks to Ammiel Yawson's example and colorthief lol 
    const[dominantColor, setDominantColor] = useState([]);

    // Get Dominant Color
    function getDominantColor(imageUrl, callback) {
        const img = document.createElement("img");
        const colorThief = new ColorThief();
        img.setAttribute("src", imageUrl);
        img.crossOrigin = "Anonymous";
        if (img.complete) {
          callback(colorThief.getColor(img));
        } else {
          img.addEventListener("load", function () {
            callback(colorThief.getColor(img));
          });
        }
    }

    useEffect(() => {
        getDominantColor(pokemonImage, setDominantColor);
    }, [pokemonImage]);


    return (
        <div>
            <div className='detail-modal' onClick={onClose}></div>
            <SideModal pokemon={pokemon} pokemonDominantColor={dominantColor} pokemonImage={pokemonImage} onClose={onClose} />
        </div>
    )
}
  
export default DetailView
  