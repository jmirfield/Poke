import React from 'react'
import { PokemonType } from '../shared/interfaces/pokemonType.interface'
import styles from '../styles/PokemonPage.module.css'

const PokemonTypes: React.FC<{ types: PokemonType[] | undefined }> = (props) => {
    if (props?.types) {
        return (
            <ul className={styles.pokemon__list}>
                {props.types.map((pokeType: PokemonType) => {
                    return <li
                        className={`${styles.pokemon__type} ${styles[pokeType.name]}`}
                        key={pokeType.slot}
                    >
                        {pokeType.name.toUpperCase()}
                    </li>
                })}
            </ul>
        )
    }
    return <></>
}

export default PokemonTypes