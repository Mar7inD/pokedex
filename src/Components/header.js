import '../Styles/header.css';
import {Link} from "react-router-dom";

const header = () => {

    return(
        <>
            <nav>
                <Link to="/" className="link">Pokedex</Link>
                <Link to="/about" className="link">About</Link>
            </nav>
        </>
    )
}

export default header;