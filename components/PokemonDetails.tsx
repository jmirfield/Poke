import React from 'react'
import styles from '../styles/PokemonPage.module.css'

const PokemonDetails: React.FC<{ id: number | undefined, weight: number | undefined, height: number | undefined }> = (props) => {

    const weight = props?.weight ? Math.floor(props?.weight / 4.536) : 0
    const feet = props?.height ? Math.floor(props?.height / 3.048) : 0
    const inches = props?.height ? Math.ceil(((props?.height / 3.048) - feet) * 12) : 0

    return (
        <section className={styles.pokemon__details}>
            <section>
                <span>Pokedex</span>
                <span className={styles.pokemon_sub}>#{props?.id}</span>
            </section>
            <section>
                <span>Weight</span>
                <span className={styles.pokemon_sub}>{`${weight} lbs`}</span>
            </section>
            <section>
                <span>Height</span>
                <span className={styles.pokemon_sub}>{`${(inches === 12) ? feet + 1 : feet}' ${(inches === 12) ? 0 : inches}"`}</span>
            </section>
        </section>
    )
}

export default PokemonDetails