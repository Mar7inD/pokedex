import React, { useState, useEffect, useContext } from 'react';
import Pokemon from './Pokemon';
import '../Styles/Pokedex.css';
import { getCurrentPage, getVisiblePages } from '../Modules/PokedexPagination';
import Pagination from './PaginationComponent';
import {PokemonContext} from './PokemonContext';



const Pokedex = () => {

    // Context hooks for sharing data
    const { currentUrl, pokemonData, setPokemonData, setNextUrl, 
        setPrevUrl, currentPage, setCurrentPage, setVisiblePages, totalPages, setTotalPages, limit } = useContext(PokemonContext);

    // Hook for page loading sign
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            // Add try catch exception
            await fetch(currentUrl)
            .then(response => response.json())
            .then(data => {
                setPokemonData(data.results);
                setNextUrl(data.next);
                setPrevUrl(data.previous);
                
                let urlParams;
                if(data.next) {
                    urlParams = new URLSearchParams(data.next.split('?')[1]);
                };

                // Total pages calculation
                setTotalPages(Math.ceil(data.count / limit));
                console.log("total pages: " + totalPages);
                console.log("current page: " + currentPage)
                
                // New
                setCurrentPage(getCurrentPage(urlParams, totalPages, limit));
                setVisiblePages(getVisiblePages(currentPage, totalPages));
                
                
                setIsLoading(false);
            });
        };

        fetchData();
    }, [currentUrl, setCurrentPage, currentPage, setPokemonData, 
        setVisiblePages, setNextUrl, setPrevUrl, setTotalPages, totalPages, limit]);
    
    return (
        
        <div className='container'>
            { isLoading ? (
                <p>Loading data...</p>
            ) : (
                <div className='container'>
                    <div className='pokedex'>
                        {pokemonData.map(pokemon => <Pokemon key={pokemon.name} name={pokemon.name} url={pokemon.url} />)}
                    </div>
                    <Pagination />
                </div>
            )}
        </div>
    )
}

export default Pokedex;