import React, { createContext, useState } from 'react';

const PokemonContext = createContext({
    // Pokedex variables and functions
    pokemonData: [],
    setPokemonData: () => {},
    currentUrl: '',
    setCurrentUrl: () => {},

    // PaginationComponent variables and functions
    nextUrl: '',
    setNextUrl: () => {},
    prevUrl: "",
    setPrevUrl: () => {},
    visiblePages: [],
    setVisiblePages: () => {},
    currentPage: 1,
    setCurrentPage: () => {},
    totalPages: 1, 
    setTotalPages: () => {},
    limit: 20,
    setLimit: () => {}
});
  
function PokemonProvider({ children }) {
    
    //Hook for totalPages and limit
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(20);

    // Hooks for storing page showing data
    const [pokemonData, setPokemonData] = useState([]);
    const [currentUrl, setCurrentUrl] = useState(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`);
    
    // Hooks for next and previous page buttons
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();

    // Hooks for Pagination numbering
    const [visiblePages, setVisiblePages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    
  
return (
      <PokemonContext.Provider value={{ pokemonData, setPokemonData,currentUrl, 
      setCurrentUrl, nextUrl, setNextUrl, prevUrl, setPrevUrl, currentPage, 
      setCurrentPage, setVisiblePages, visiblePages, totalPages, setTotalPages, limit, setLimit}}>
        {children}
      </PokemonContext.Provider>
);
}
  
export { PokemonContext, PokemonProvider };