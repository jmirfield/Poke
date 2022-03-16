import React from 'react'
import Image from 'next/image'
import { Sprites } from '../shared/interfaces/sprites.interface'
import styles from '../styles/PokemonPage.module.css'

const SpriteImages: React.FC<{sprites: Sprites | undefined}> = (props) => {
    if (props?.sprites) return (
        <section className={styles.pokemon__sprites}>
            {props?.sprites?.front_default && <Image src={props?.sprites.front_default} width={75} height={75} />}
            {props?.sprites?.back_default && <Image src={props?.sprites.back_default} width={75} height={75} />}
            {props?.sprites?.front_shiny && <Image src={props?.sprites.front_shiny} width={75} height={75} />}
            {props?.sprites?.back_shiny && <Image src={props?.sprites.back_shiny} width={75} height={75} />}
        </section>
    )
    return <></>
}

export default SpriteImages