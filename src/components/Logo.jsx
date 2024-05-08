import logo from '../assets/main.svg'

export function Logo({height, width}) {
    return(
        <img 
        className={height && width ? '' : 'logo'} 
        src={logo} 
        alt='Pokeapp Logo'
        height={height && height}
        width={width && width}
        />
    )
}