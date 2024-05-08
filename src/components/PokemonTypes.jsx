export function PokemonTypes({types}) {
    return(
        <div className='pokemon-types'>
            <ul>
            {
            types.map(type => (
                <li key={type.slot}>{type.type.name}</li>
            ))
            }
            </ul>
        </div>
    )
}