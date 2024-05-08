// ListView.js: Pokemons are displayed here
import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"
import { TopBar } from './TopBar'
import { PageLoader } from './PageLoader'
import { PokemonCardList } from './PokemonCardList'
import { PokemonNotFound } from './PokemonNotFound'
import { Pagination } from './Pagination'
import { PageSizeSelector } from './PageSizeSelector'
import axios from 'axios'

function ListView() {
    // Grab the pokemone name (if supplied, from HomeView via useLocation())
    const {state} = useLocation();
    const {pokemonName} = state || undefined;

    // Set a state to track the 'loading' status of the component to display a loader
    // if the component isnt done loading
    const [loading, setLoading] = useState(false);

    // Set a state to track the pokemons to display
    const [targetPokemon, setTargetPokemon] = useState(null);

    // States to track Pagination (if the user doesnt submit the pokemon name)
    // To help with pagination, the API uses a query parameter called 'offset'
    // The offset is the number of pokemons to skip before returning the results
    // it has a default of 20.
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPokemons, setTotalPokemons] = useState(0);
    const [pokemonPerPage, setPokemonPerPage] = useState(20);

    // State to track name of pokemon the user has typed
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchChange = (query) => {
        setSearchQuery(query.toLowerCase());
        setCurrentPage(1);  // Reset to the first page to ensure the search starts from the beginning of the dataset
      };
      

  useEffect(() => {
    setLoading(true);

    if (searchQuery) {
        // Use axios cancel token to prevent outdated requests
        let cancelToken = axios.CancelToken.source();
        axios.get(`https://pokeapi.co/api/v2/pokemon/${searchQuery}`, { cancelToken: cancelToken.token })
          .then(response => {
            setTargetPokemon([response.data]);
            setTotalPokemons(1);
            setLoading(false);
          })
          .catch(error => {
            if (axios.isCancel(error)) return;
            setLoading(false);
            console.error(error);
          });
    } else {
    // If user has submitted a pokemon name (from HomeView)
    if (pokemonName) {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
              .then(response => {
                    let arr = [];
                    arr.push(response.data);
                    setTargetPokemon(arr);
                    setLoading(false);

                })
              .catch(error => {
                    setLoading(false);
                });
    } else {
        // If user hasn't submitted a name (viewing all pokemons)
        const offset = (currentPage - 1) * pokemonPerPage;
        axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${pokemonPerPage}&offset=${offset}`)
            .then(response => {
                // Get total number of pokemons (to calculate the number of pages)
                setTotalPokemons(response.data.count);    

                // Get all pokemon names and details
                let arr = [];
                arr = response.data.results.map(pokemonName => (
                    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.name}`)
                        .then(response => {
                            return response.data;
                        })   
                    ));

                Promise.all(arr)
                    .then(response => {
                        setTargetPokemon(response);
                        setLoading(false);
                    });
                })
            .catch(error => {
                    setLoading(false);
                });
        }
    }
  }, [searchQuery, pokemonName, currentPage, pokemonPerPage]);

  const handlePageSizeChange = (size) => {
    setPokemonPerPage(size);
    setCurrentPage(1); // Reset to first page on size change
  };

  const totalPages = Math.ceil(totalPokemons / pokemonPerPage);
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
}


  return (
    <div className='pokemons-wrapper'>
        <TopBar onSearchChange={handleSearchChange} />
        {
        setLoading === true ? <PageLoader /> : 
        (targetPokemon !== null ? <PokemonCardList pokemons={targetPokemon} /> :  <PokemonNotFound />)
        }

        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap"}}>
            <Pagination 
            pages={pages} 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
            />

            <PageSizeSelector pageSize={pokemonPerPage} setPageSize={handlePageSizeChange} />
        </div>

    </div>
  )
}

export default ListView