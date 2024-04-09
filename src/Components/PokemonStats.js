import "../Styles/PokemonStats.css";
import { getPokemonColor, getSentenceFormat } from "../Modules/PokemonColorType";
import { getIdFromUrl } from "../Modules/UrlQueryModifier";
import { useQuery } from "react-query";

const PokemonStats = () => {
    const pokemonId = getIdFromUrl(window.location.href);
  
    const { isLoading, error, data } = useQuery(['pokemon', pokemonId], async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      return response.json();
    });
  
    if (isLoading) return <div className="container"><p className="center">Loading...</p></div>;
    if (error) return <div className="container"><p className="center">Error: {error.message}</p></div>;
  
    return (
        <div className="container">

            <div className="pokemon-holder" style={{ background: getPokemonColor(data?.types[0]?.type.name) }}>
                
                <div className="container pokemon-headline">
                    <h2>{getSentenceFormat(data.name)}</h2>
                    <img src={data?.sprites?.other.dream_world.front_default} alt={data?.name} />
                    {data?.types.map(type => <div class='type' style={{background: getPokemonColor(type.type.name)}}>{getSentenceFormat(type.type.name)}</div>)}
                </div>

                <div className="container pokemon-stats">
                    <h2>Base stats:</h2>

                    {data.stats.map((stat,total = 0) => 
                        <label key={stat.stat.name} htmlFor={stat.stat.name}>
                            <div>{getSentenceFormat(stat.stat.name) + ' (' + stat.base_stat + ')'}</div>
                            <progress id={stat.stat.name} value={stat.base_stat} max='255'></progress>
                        </label>
                    )}

                    <p>Total: {data.stats.reduce((a, stat) => a + stat.base_stat, 0)}</p>
                </div>
            </div>
        </div>
    );
  };
  
  export default PokemonStats;