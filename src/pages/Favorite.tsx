import { useSelector } from "react-redux";
import { StoreState } from "../redux";
import { useEffect, useState } from "react";
import CardPokemon, { CardPokemonProps } from "../components/CardPokemon";
import { List }  from "../components/List.style";


import Navbar from "../components/Navbar";
import Title from "../components/Title";
import api from "../services/api";

function Favorite() {
    const [isLoading, setIsLoading] = useState(true);
    const [pokemonList, setPokemonList] = useState<CardPokemonProps[]>([]);
    const favoriteList = useSelector((state: StoreState) => state.favorite);

    async function getPokemonData(){
        const dadosCompletos = await Promise.all(
        favoriteList.map(async(pokemonId) => {
            const { data } = await api.get("pokemon/" + pokemonId);

            return {
                id: data.id,
                name: data.name,
                types: data.types,
            };
        })
    );

    setPokemonList(dadosCompletos);
    setIsLoading(false);
}

    useEffect(() => {
        getPokemonData();
    }, []);

    if(isLoading) {
        return <p>Opening Pokeballs...</p>
     }

    return (
        <>
            <Navbar />

            <Title text="Your favorite Pokemons!" />
            {/* <b>Find all</b> pokemons in one place */}

        <List>
            {pokemonList
            .sort((a, b) => {
                return a.id - b.id;
            })
            .map((pokemon, index) => {
                return (
                    <CardPokemon
                        key={index}
                        id={pokemon.id}
                        name={pokemon.name}
                        types={pokemon.types}
                    />
                );
            })}
        </List>
        </>
    );
}

export default Favorite;