import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { add, remove } from "../redux/favoriteSlice";
import { StoreState } from "../redux";

import Navbar from "../components/Navbar";
import Badge from "../components/Badge";
import api from "../services/api";

import { CardPokemonProps } from "../components/CardPokemon";

import {
Container,
Image,
Card,
Number,
Title,
Button,
Label,
Value,
ButtonMobile,
}

   from "./Details.style";

type DetailsProps = CardPokemonProps & {
   height: number;
   weight: number;
}

function Details() {
   const { id } = useParams();
   const dispatch = useDispatch();
   const favoriteList = useSelector((state: StoreState) => state.favorite);
   const [isLoading, setIsLoading] = useState(true);
   const [pokemonData, setPokemonData] = useState<DetailsProps>({} as DetailsProps
   );

   function handleClickAdd() {
      dispatch(add(id));
   }

   function handleClickRemove() {
      dispatch(remove(id));
   }


   async function getPokemonData() {
      const { data } = await api.get("/pokemon/" + id);
      setPokemonData({
         id: data.id,
         name: data.name,
         types: data.types,
         height: data.height / 10,
         weight: data.weight / 10,
      });
      setIsLoading(false);
   }

   useEffect(() => {
      getPokemonData();
   }, []);

   if (isLoading) {
      return <p>Loading....</p>;
   }

   return (
      <>
         <Navbar hasGoBack />
         <Container>

            {/* <h1>{pokemons.find((pokemon) => String(pokemon.id) == id)?.name}</h1> */}

            <Image
               src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
               alt={pokemonData.name}
            />

            <Card className={`type--${pokemonData.types[0].type.name.toLowerCase()}`}>
               <Number>#{String(id).padStart(3, "0")}</Number>
               <Title>{pokemonData.name}</Title>
               {pokemonData.types.map((item, index) => {
                  return <Badge key={index} name={item.type.name} />
               })}

               <Label>Weight</Label>
               <Value>{pokemonData.weight} Kg</Value>

               <Label>Height</Label>
               <Value>{pokemonData.height} m</Value>

               {!!favoriteList.find(pokemonId => String(pokemonId) === String(id)
               ) ? (
                  <>
                     <Button onClick={handleClickRemove}>❌Remove Favorite❌</Button>
                     <ButtonMobile onClick={handleClickRemove}>❌</ButtonMobile>
                  </>
               ) : (
                  <>
                     <Button onClick={handleClickAdd}>⭐Add to favorites⭐</Button>
                     <ButtonMobile onClick={handleClickAdd}>⭐</ButtonMobile>
                  </>
               )}

            </Card>

         </Container>
      </>
   );
}

export default Details;