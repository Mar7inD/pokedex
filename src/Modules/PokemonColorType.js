export function getPokemonColor(type) {
    switch(type) {
        case "grass":
            return "#8bbe8a";
            
        case "fire":
            return "#ffa756";
            
        case "water":
            return "#58abf6";
            
        case "bug":
            return "#8bd674";
            
        case "poison":
            return "#b884dd";
            
        case "electric":
            return "#f5e844";
            
        case "flying":
            return "#A98FF3";
            
        case "fighting":
            return "#C22E28";
            
        case "normal":
            return "#A8A77A";
            
        case "ice":
            return "#96D9D6";
            
        case "ground":
            return "#E2BF65";
            
        case "psychic":
            return "#F95587";
            
        case "rock":
            return '#B6A136';
            
        case "ghost":
            return '#735797';
            
        case "dragon":
            return '#6F35FC';
            
        case "dark":
            return '#705746';
            
        case "steel":
            return '#B7B7CE';
            
        case "fairy":
            return '#D685AD';
            
        default:
            return "black";
    }

}