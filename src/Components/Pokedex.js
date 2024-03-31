import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';
import '../Styles/Pokedex.css';
import { getCurrentPage, getVisiblePages } from '../Modules/PokedexPagination';

const Pokedex = () => {

    // Hooks for storing page showing data
    const [pokemonData, setPokemonData] = useState([]);
    const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    
    // Hooks for next and previous page buttons
    const [nextPageUrl, setNextPageUrl] = useState();
    const [prevPageUrl, setPrevPageUrl] = useState();
    
    // Hooks for Pagination numbering
    const [visiblePages, setVisiblePages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch(currentPageUrl)
        .then(response => response.json())
        .then(data => {
            setNextPageUrl(data.next);
            setPrevPageUrl(data.previous);
            setPokemonData(data.results);

            // Getting query elements from URL
            const urlParams = new URLSearchParams(data.next.split('?')[1]);

            // New
            setCurrentPage(getCurrentPage( urlParams));
            setVisiblePages(getVisiblePages(currentPage, data.count, urlParams));
            
        });
    }, [currentPageUrl, currentPage]);

    const goToNextPage = () => {
        setCurrentPageUrl(nextPageUrl);
    };

    const goToPrevPage = () => {
        setCurrentPageUrl(prevPageUrl);
    };

    const goToPage = (pageNumber) => {
        const offset = (pageNumber - 1) * 20;

        setCurrentPageUrl(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
    };

    return (
        <div className='container'>
            <div className='pokedex'>
                {pokemonData.map(pokemon => <Pokemon key={pokemon.name} name={pokemon.name} url={pokemon.url} />)}
            </div>
            
            {/* Pagination */}
            <div className='buttons'>
                {prevPageUrl ? <button onClick={goToPrevPage} ><img className="rotate" src="./circled-right.gif" alt="Previous button"/></button> : <img className='rotate img-like-button' src="https://img.icons8.com/color/48/circled-right--v3.png" alt="circled-right--v3"/>}
                
                {/* Page number rendering */}
                <div className="page-numbering">
                    {visiblePages.map((pageNumber) => (
                        <button disabled={currentPage === pageNumber} key={pageNumber} onClick={() => goToPage(pageNumber)}>{pageNumber}</button>
                    ))}
                </div>
                
                {nextPageUrl ? <button onClick={goToNextPage} ><img src="./circled-right.gif" alt="Next button"/></button> : <img className='img-like-button' src="https://img.icons8.com/color/48/circled-right--v3.png" alt="circled-right--v3"/>}
            </div>
        </div>
    )
}

export default Pokedex;