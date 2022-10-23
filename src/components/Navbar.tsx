import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { StoreState } from "../redux";
import { Nav, BtnGoBack, TotalPokemons, CustomLink } from "./Navbar.style";
// import "./Navbar.css";


type NavbarProps = {
    hasGoBack?: boolean;
}

function Navbar(props: NavbarProps) {
    const totalPokemons = useSelector((state: StoreState) => state.favorite);

    return (
        <Nav className="nav">
            <Link to="/" className="brand">
                Pokedex
            </Link>
            <div>
                <CustomLink to="/favorite">
                    <TotalPokemons>Favorites: {totalPokemons.length}</TotalPokemons>
                </CustomLink>
                {props.hasGoBack && (
                    <BtnGoBack to="/"> Back </BtnGoBack>
                    // <Link to="/" className="btn-goBack">
                    //     Voltar
                    //     </Link>
                )}
            </div>
        </Nav>

    );
}

export default Navbar;