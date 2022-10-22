import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { StoreState } from "../redux";
import { Nav, BtnGoBack, TotalPokemons } from "./Navbar.style";
// import "./Navbar.css";


type NavbarProps = {
    hasGoBack?: boolean;
}

function Navbar(props: NavbarProps){
    const totalPokemons = useSelector((state: StoreState) => state.favorite);

    return (
    <Nav className="nav">
        <Link to="/" className="brand">
            Pokedex
            </Link>
            <div>
            <TotalPokemons>Total de favoritos: {totalPokemons.length}</TotalPokemons>
      {props.hasGoBack && (
        <BtnGoBack to="/"> Voltar </BtnGoBack>
        // <Link to="/" className="btn-goBack">
        //     Voltar
        //     </Link>
         )}
         </div>
    </Nav>
    
    );
}

export default Navbar;