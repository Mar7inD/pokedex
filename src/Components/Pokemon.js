import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Pokemon.css";
import { getPokemonColor } from "../Modules/PokemonColorType"

const Pokemon = ({name, url}) => {

    const [image, setImage] = useState();
    const [color, setColor] = useState();
    const [id, setId] = useState();

    useEffect(() => {
        fetch(url)
        .then(res => res.json() )
        .then(data => {        
            setImage(data.sprites.front_default);

            setId(data.id);
            setColor(getPokemonColor(data.types[0].type.name));
        });
      }, [url]);

      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)

    return(
        
        <div className="card" style={{ background: `${color}` }}>
            <Link to={`/pokemon?id=${id}`} className="pokemon-link">
            <div className="text">
            <p>{`#${id}`}</p>   
            <h2>{capitalizedName}</h2>
            </div>
            <img src={image} alt={capitalizedName}/>
            </Link>
        </div>
        
    )
};

export default Pokemon;