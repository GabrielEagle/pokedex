import { useEffect, useState } from "react";
import { Input } from "./Home.styles"
import CardPokemon, { CardPokemonProps } from "../components/CardPokemon";
import { List } from "../components/List.style";

import Navbar from "../components/Navbar";
import Title from "../components/Title";
import api from "../services/api";
import "./Home.css";


// Para mais de uma linha no return da função, colocar parenteses
function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [pokemonList, setPokemonList] = useState<CardPokemonProps[]>([]);
    const [textoBusca, setTextoBusca] = useState("");



    async function getPokemonData() {
        const { data } = await api.get("/pokemon?limit=1100");

        if (data) {

            const dadosCompletos = await Promise.all(
                data.results.map(async (result: { url: string }) => {
                    const { data } = await api.get(result.url);

                    return {
                        id: data.id,
                        name: data.name,
                        types: data.types,
                    };
                })
            );

            setPokemonList(
                dadosCompletos
            );
            setIsLoading(false);
        }
        else {
         <p>Damn... These Pokeballs are hard to open. Bad Request :c</p>
        }

    }

    useEffect(() => {
        getPokemonData();
    }, [])

    if (isLoading) {
        return <img src="https://i.pinimg.com/originals/8a/4a/72/8a4a7213b43f4ec4f99db406be655f9e.gif" className="loading" />;
    }

    return (
        <>
            <Navbar />
            <Title text="Find all pokemons in one place" />

            <Input type="text" placeholder="Find Pokemon by name or ID" value={textoBusca} onChange={(event) => setTextoBusca(event.target.value)} />

            <List>
                {pokemonList
                    .filter(pokemon => pokemon.name.includes(textoBusca) || String(pokemon.id) === textoBusca)
                    .map((pokemon, index) => {
                        return (
                            <CardPokemon
                                key={index}
                                id={pokemon.id}
                                name={pokemon.name}
                                types={pokemon.types} />
                        );
                    })}

            </List>
        </>
    )
}





export default Home;