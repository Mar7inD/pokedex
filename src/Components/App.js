import '../App.css';
import {HashRouter, Route, Routes} from "react-router-dom";
import Pokedex from "./Pokedex";
import Header from "./header";
import About from "./About";
import {PokemonProvider} from './PokemonContext';

function App() {
  return (
    <HashRouter basename="/">
      <Header/>
      <Routes>
        <Route path="/" element={ <PokemonProvider><Pokedex/></PokemonProvider>} />
        <Route path="/about" element={ <About/> } />
      </Routes>
    </HashRouter>
  );
}

export default App;
