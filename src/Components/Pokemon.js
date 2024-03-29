import {useEffect, useState} from "react";
import "../Styles/Pokemon.css";

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

            switch(data.types[0].type.name) {
                case "grass":
                    setColor("#8bbe8a");
                    break;
                case "fire":
                    setColor("#ffa756");
                    break;
                case "water":
                    setColor("#58abf6");
                    break;
                case "bug":
                    setColor("#8bd674");
                    break;
                case "poison":
                    setColor("#b884dd");
                    break;
                case "electric":
                    setColor("#f5e844");
                    break;
                case "flying":
                    setColor("#A98FF3");
                    break;
                case "fighting":
                    setColor("#C22E28");
                    break;
                case "normal":
                    setColor("#A8A77A");
                    break;
                case "ice":
                    setColor("#96D9D6");
                    break;
                case "ground":
                    setColor("#E2BF65");
                    break;
                case "psychic":
                    setColor("#F95587");
                    break;
                case "rock":
                    setColor('#B6A136');
                    break;
                case "ghost":
                    setColor('#735797');
                    break;
                case "dragon":
                    setColor('#6F35FC');
                    break;
                case "":
                    setColor('');
                    break;
                case "dark":
                    setColor('#705746');
                    break;
                case "steel":
                    setColor('#B7B7CE');
                    break;
                case "fairy":
                    setColor('#D685AD');
                    break;
                default:
                    setColor("black");
            }
        });
      }, [url]);

      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)

    return(
        <div className="card" style={{ background: `${color}` }}> 
            <div className="text">
            <p>{`#${id}`}</p>   
            <h2>{capitalizedName}</h2>
            </div>
            <img src={image} alt={capitalizedName}/>
        </div>
    )
};

export default Pokemon;