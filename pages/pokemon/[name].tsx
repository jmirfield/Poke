import React from 'react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import axios from 'axios'
import { PokemonType } from '../../shared/interfaces/pokemonType.interface'
import styles from '../../styles/PokemonPage.module.css'


const getPokemon = async (name: string) => {
    const MAIN_URL = `https://pokeapi.co/api/v2/pokemon/${name}`
    const { data: main } = await axios.get(MAIN_URL)
    const SPECIES_URL = `https://pokeapi.co/api/v2/pokemon-species/${name}`
    const { data: species } = await axios.get(SPECIES_URL)
    const EVO_URL = species.evolution_chain.url
    const { data: evolution } = await axios.get(EVO_URL)

    const image: string = main.sprites.other.dream_world.front_default || main.sprites.other['official-artwork'].front_default
    const pokeTypes: PokemonType[] = main.types.map((poke: { slot: Number, type: { name: string, url: string } }) => {
        return { slot: poke.slot, name: poke.type.name }
    })

    const evolutions: string[] = []
    if(evolution.chain.evolves_to.length > 0)console.log(evolution.chain)

    return { image, pokeTypes }
}

const PokemonPage: React.FC<GetServerSideProps> = () => {
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
        <div className={styles.pokemon__main}>
            <section className={styles.pokemon__card}>
                {data?.image && <Image src={data?.image} width={375} height={375} />}
                {data?.pokeTypes.map((pokeType: PokemonType) => <p key={pokeType.slot}>{pokeType.name}</p>)}
            </section>
        </div>
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