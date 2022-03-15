import { GetServerSideProps } from 'next'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import axios from 'axios'
import styles from '../../styles/PokemonPage.module.css'

const getPokemon = async (name: string) => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${name}`
    const { data } = await axios.get(URL)
    const image: string = data.sprites.other.dream_world.front_default
    return { image }
}

const PokemonPage: React.FC<GetServerSideProps> = () => {
    const router = useRouter();
    const pokemonName = router.query.name ? router.query.name as string : "";

    const { data, isLoading, isError } = useQuery(
        ['pokemon', pokemonName],
        () => getPokemon(pokemonName),
        { enabled: pokemonName.length > 0, }
    )

    if(isError) router.push('/')
    if (isLoading) return <p className={styles.pokemon__main}>Loading...</p>
    return (
        <div className={styles.pokemon__main}>
            {data?.image && <Image src={data?.image} width={400} height={400} />}
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const name = context.query?.name as string
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery('pokemon', () => getPokemon(name))
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}



export default PokemonPage