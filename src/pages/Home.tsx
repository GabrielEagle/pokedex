import { useEffect, useState } from "react";
import CardPokemon, { CardPokemonProps } from "../components/CardPokemon";
import Navbar from "../components/Navbar";
import "./Home.css";
import api from "../services/api";



// Para mais de uma linha no return da função, colocar parenteses
function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [pokemonList, setPokemonList] = useState<CardPokemonProps[]>([]);

    

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
            <h1 className="title">Encontre todos os pokemons em um só lugar</h1>

            <div className="list">
                {pokemonList.map((pokemon, index) => {
                return (
                <CardPokemon 
                    key={index} 
                    id={pokemon.id} 
                    name={pokemon.name} 
                    types={pokemon.types} />
                )
            })}
            
            </div>
        </>
    )
 }
   




export default Home;