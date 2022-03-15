import React from 'react'
import Image from 'next/image'
import styles from '../styles/PokemonPage.module.css'

interface PropType {
    image: string | undefined
}

const MainImage: React.FC<PropType> = (props) => {
    if(props?.image) return (
        <section className={styles.pokemon__image}>
            <Image src={props?.image} width={375} height={375} />
        </section>
    )
    return <></>
}

export default MainImage