import { useEffect, useState } from "react";
import CardPokemon, { CardPokemonProps } from "../components/CardPokemon";
import Navbar from "../components/Navbar";
import api from "../services/api";
import "./Home.css";
import { Title, List, Input } from "./Home.styles"


// Para mais de uma linha no return da função, colocar parenteses
function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [pokemonList, setPokemonList] = useState<CardPokemonProps[]>([]);
    const [textoBusca, setTextoBusca] = useState("");

    

    async function getPokemonData() {
        const { data } = await api.get("/pokemon?limit=1100");

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

    useEffect (() => {
        getPokemonData();
     }, [ ])

     if(isLoading) {
        return <img src="https://64.media.tumblr.com/02f03c1a168ba59bd5ba82395a27be01/tumblr_oaldzpLZhl1ux1dn3o1_500.gif" className="loading"/>;
     }

    return (
        <>
            <Navbar />
            <Title className="title">Encontre todos os pokemons em um só lugar</Title>

            <Input type="text" placeholder="Buscar por nome ou id" value={textoBusca} onChange={(event)=> setTextoBusca(event.target.value)} />

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