import { Link } from "react-router-dom";
import { Nav, BtnGoBack } from "./Navbar.style";
// import "./Navbar.css";


type NavbarProps = {
    hasGoBack?: boolean;
}

function Navbar(props: NavbarProps){
    return (
    <Nav className="nav">
        <Link to="/" className="brand">
            Pokedex
            </Link>
      {props.hasGoBack && (
        <BtnGoBack to="/"> Voltar </BtnGoBack>
        // <Link to="/" className="btn-goBack">
        //     Voltar
        //     </Link>
         )}
    </Nav>
    
    );
}

export default Navbar;