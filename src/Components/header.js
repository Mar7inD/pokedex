import '../Styles/header.css';
import {Link} from "react-router-dom";

const header = () => {

    return(
        <>
            <div class="element-with-top-shadow"></div>
            <nav>
                

                <Link to="/" className="link">
                    <p className='pokedex-text'>Pokédex</p>
                    <span className="pokedex-line"></span>
                </Link>
                <Link to="/about" className="link">
                    <p className='about-text'>About</p>
                    <span className="about-line"></span>
                </Link>
            </nav>
        </>
    )
}

export default header;