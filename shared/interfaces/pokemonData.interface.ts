import { PokemonType } from "./pokemonType.interface";
import { Sprites } from "./sprites.interface";

export interface PokemonData {
    pokemonName: string,
    pokeTypes: PokemonType[],
    sprites: Sprites
    image: string,
    id: number,
    weight: number,
    height: number
} 