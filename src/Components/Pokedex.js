import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';
import '../Styles/Pokedex.css';

const Pokedex = () => {

    const [pokemonData, setPokemonData] = useState([]);
    const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    const [nextPageUrl, setNextPageUrl] = useState();
    const [prevPageUrl, setPrevPageUrl] = useState();

    useEffect(() => {
        fetch(currentPageUrl)
        .then(response => response.json())
        .then(data => {
            setNextPageUrl(data.next);
            setPrevPageUrl(data.previous);
            setPokemonData(data.results);
        });
    }, [currentPageUrl]);

    const goToNextPage = () => {
        setCurrentPageUrl(nextPageUrl);
    };

    const goToPrevPage = () => {
        setCurrentPageUrl(prevPageUrl);
    };

    return (
        <div className='container'>
            <div className='pokedex'>
                {pokemonData.map(pokemon => <Pokemon key={pokemon.name} name={pokemon.name} url={pokemon.url} />)}
            </div>
            <div className='buttons'>
                <button onClick={goToPrevPage} className={prevPageUrl === undefined ? '' : 'inactive'}>Previous</button>
                <button onClick={goToNextPage} className={`${nextPageUrl !== undefined? '' : 'inactive'},next`}>Next</button>
            </div>
        </div>
    )
}

export default Pokedex;