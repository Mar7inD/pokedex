import "../Styles/PokemonStats.css";
import { getPokemonColor, getSentenceFormat } from "../Modules/PokemonColorType";
import { getIdFromUrl } from "../Modules/UrlQueryModifier";
import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const PokemonStats = () => {

    const [pokemonId, setPokemonId] = useState(parseInt(getIdFromUrl(window.location.href)));
    
    const isLoading = useRef(false);
    const error = useRef();
    const [data, setData] = useState();

    const navigation = useNavigate();
  
    useEffect(() => {
        const fetchData = async () => {
            isLoading.current = true;
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const pokeData = await response.json();
                setData(pokeData);
                navigation(`/pokemon?id=${pokemonId}`, { replace: true })
              
            } catch (err) {
                console.error('Error fetching data:', err);
                error.current = err.message;
            } finally {
              isLoading.current = false;
            }
          };

          fetchData();
    }
    ,[pokemonId, navigation]);

  
    if (isLoading.current) return <div className="container"><p className="center">Loading...</p></div>;
    //if (error.current) return <div className="container"><p className="center">Error: {error.message}</p></div>;
  
    error.current = '';

    const pokemonIdChanger = (direction) => {
        if (direction === "forward") {
            if (parseInt(pokemonId) < 10277) setPokemonId(parseInt(pokemonId) + 1)
            else return 
        }
        else if (direction === "back") {
            if (parseInt(pokemonId) > 1) setPokemonId(parseInt(pokemonId) - 1)
            else return
        }
    }

    const primaryColor = getPokemonColor(data?.types[0].type.name);
    const arrow = 'pokedex/Images/arrow-right.gif';

    return (
        <div>
        <div className="container pokemon-stats-holder">
            <button onClick={() => pokemonIdChanger('back')}><img className="rotate" src={arrow} alt="Previous button" /></button>
            <section className="pokemon-holder" style={{ background: primaryColor }}>
            {data ? <>
                    <div className="container pokemon-headline">
                        <h2>{getSentenceFormat(data.name)}</h2>
                        <img src={data?.sprites?.other.dream_world.front_default} alt={data?.name} />
                        {data?.types.map(type => <div key={type.type.name} className='type' style={{background: getPokemonColor(type.type.name)}}>{getSentenceFormat(type.type.name)}</div>)}
                    </div>

                    <div className="container pokemon-stats">
                        <h2>Base stats:</h2>

                        {data.stats.map((stat) => 
                            <label key={stat.stat.name} htmlFor={stat.stat.name}>
                                <div>{getSentenceFormat(stat.stat.name) + ' (' + stat.base_stat + ')'}</div>
                                <progress id={stat.stat.name} value={stat.base_stat} max='255'></progress>
                            </label>
                        )}

                        <p>Total: {data.stats.reduce((a, stat) => a + stat.base_stat, 0)}</p>
                    </div>
                </> 
                : ( <div className="container"><p className="center">Loading...</p></div> ) }
            </section>
            <button onClick={() => pokemonIdChanger('forward')}><img src={arrow} alt="Next button"/></button>
        </div>
        <section className="back-button-holder"> 
        <Link to="/" style={{background: primaryColor}} className="back-button">Back</Link>
        </section>
        </div>
    );
  };
  
  export default PokemonStats;