import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import axios from 'axios'
import { PokemonType } from '../../shared/interfaces/pokemonType.interface'
import { Sprites } from '../../shared/interfaces/sprites.interface'
import MainImage from '../../components/MainImage'
import SpriteImages from '../../components/SpriteImages'
import PokemonTypes from '../../components/PokemonTypes'
import styles from '../../styles/PokemonPage.module.css'


const getPokemon = async (name: string) => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${name}`
    const { data } = await axios.get(URL)
    const image: string = data.sprites.other.dream_world.front_default || data.sprites.other['official-artwork'].front_default
    const pokeTypes: PokemonType[] = data.types.map((poke: { slot: Number, type: { name: string, url: string } }) => {
        return { slot: poke.slot, name: poke.type.name }
    })
    const id: number = data.id
    const weight: number = data.weight
    const height: number = data.height
    const sprites: Sprites = {
        front_default: data.sprites.front_default as string,
        back_default: data.sprites.back_default as string,
        front_shiny: data.sprites.front_shiny as string,
        back_shiny: data.sprites.back_shiny as string
    }

    return { image, pokeTypes, id, weight, height, sprites }
}

const PokemonPage: NextPage<GetServerSideProps> = () => {
    const router = useRouter();
    const pokemonName = router.query.name ? router.query.name as string : "";

    const { data, isLoading, isError } = useQuery(
        ['pokemon_main', pokemonName],
        () => getPokemon(pokemonName),
        { enabled: pokemonName.length > 0, }
    )

    if (isError) router.push('/')
    if (isLoading) return <p className={styles.pokemon__main}>Loading...</p>

    return (
        <section className={styles.pokemon__card}>
            <MainImage image={data?.image} />
            <SpriteImages sprites={data?.sprites} />
            <PokemonTypes types={data?.pokeTypes} />
            <p>Index {data?.id}</p>
            <p>{`weight: ${data?.weight}, height: ${data?.height}`}</p>
        </section>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const name = context.query?.name as string
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery('pokemon_main', () => getPokemon(name))
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}



export default PokemonPage