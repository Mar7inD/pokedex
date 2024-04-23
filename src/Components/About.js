import "../Styles/About.css";

const About = () => {
    return(
        <section className="container about">
            <h1>About</h1>
            <p>This project is part of my WEB2 class. It fetches data from the PokeApi and presents it as pokemon cards. By clicking on one of the cards you can access the desired pokemon and see some stats about it. Enjoy!  </p>

            <h3>Technologies:</h3>
            <ul>
                <li>React</li>
                <li>Node.js</li>
                <li>JavaScript</li>
                <li>HTML/CSS</li>
            </ul>
        </section>
    )
}

export default About;