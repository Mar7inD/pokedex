import React, { useContext} from 'react';
import '../Modules/PokedexPagination';
import '../Styles/Pagination.css';
import {PokemonContext} from './PokemonContext';
import {modifyQuery} from '../Modules/UrlQueryModifier'

const Pagination = () => {

    // Context hooks for sharing data
    const { currentUrl, setCurrentUrl, nextUrl, prevUrl, visiblePages, currentPage, limit, setLimit } = useContext(PokemonContext);

    // Image urls
    const arrowAnimation = 'pokedex/Images/arrow-right.gif'

    // Triggered function on dropdown change
    const changeLimit = (event) => {
        const newLimit = event.target.value

        setLimit(parseInt(newLimit));
        setCurrentUrl(modifyQuery(currentUrl, 'limit', newLimit))
    };


    // Triggered function on button or Pagination click
    const goToPage = (target) => {
        if(typeof target === 'string') {
            if(target === 'next') {
                setCurrentUrl(modifyQuery(nextUrl, 'limit', limit));
            }
            else if(target === 'prev') {
                setCurrentUrl(prevUrl)
            }
        }
        else if(typeof target === 'number') 
        {
            const offset = (target - 1) * limit;
            setCurrentUrl(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        };
    }
    
    return (

    <div className='pagination-holder'>
        <div className='buttons'>
        {prevUrl ? <button onClick={() => {goToPage('prev')}} ><img className="rotate" src={arrowAnimation} alt="Previous button" /></button> : <img className='rotate img-like-button' src="https://img.icons8.com/color/48/circled-right--v3.png" alt="Previous button" />}
        
        {/* Page number rendering  */}
        <div className="page-numbering">
            {visiblePages.map((pageNumber) => (
                <button disabled={currentPage === pageNumber} key={pageNumber} onClick={() => {goToPage(pageNumber)}}>{pageNumber}</button>
            ))}
        </div>
        
        {nextUrl ? <button onClick={() => {goToPage('next')}} ><img src={arrowAnimation} alt="Next button" /></button> : <img className='img-like-button' src="https://img.icons8.com/color/48/circled-right--v3.png" alt="Next button" />}
        </div>
        <select id="count-dropdown" value={limit} onChange={changeLimit}>
            <option value="20">20 Pokemons</option>
            <option value="40">40 Pokemons</option>
            <option value="60">60 Pokemons</option>
        </select>
    </div>
    )
};

export default Pagination;