import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import styles from '../../styles/PokemonPage.module.css'

const PokemonPage: React.FC = () => {
    const router = useRouter()
    const { name } = router.query
    // https://pokeapi.co/api/v2/pokemon/${name}

    return (
        <div className={styles.pokemon__main}>{name}</div>
    )
}

export default PokemonPage