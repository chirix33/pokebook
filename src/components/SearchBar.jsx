import search from '../assets/search.svg'

export function SearchBar({pokemonName, setPokemonName, submitSearchBar}) {

    // Update the pokemon state with the user's input
    function updatePokemonName(event) {
        const newPokemonName = event.target.value;
        setPokemonName(newPokemonName);
    }

    return (
        <form className='w-100' style={{marginTop: "20px", marginBottom: "20px"}} onSubmit={(event) => {submitSearchBar(); event.preventDefault()}}>
            <div className='input-wrapper'>
            <input 
                className='home-search' 
                type='text' 
                placeholder='Enter pokemon name' 
                autoFocus={true} 
                value={pokemonName} 
                onChange={updatePokemonName}
                autoComplete='off'
            />
            <button className='search-button'>
            <img src={search} alt="Search" />
            </button>
            </div>
        </form>
    )
}