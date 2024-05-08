// Used in DetailView Component
export function PokemonName({pokemonname}) {
    // Make the first letter uppercase
    const name = pokemonname.charAt(0).toUpperCase() + pokemonname.slice(1);
    return (<h2>{name}</h2>)
}