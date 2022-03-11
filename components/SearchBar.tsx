import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/SearchBar.module.css'

const SearchBar = () => {
    const [text, setText] = useState('')
    const textChangeHandler = (e: React.FormEvent<HTMLInputElement>) => setText(e.currentTarget.value)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (text.trim().length > 0) console.log(text)
        }, 500)
        return () => clearTimeout(timer)
    }, [text])

    return (
    <section>
        <img className={styles.cover} src='/cover-pokemon.png'></img>
        <article className={styles.search}>
            <Image src='/search.svg' width='24px' height='24px' />
            <input value={text} onChange={textChangeHandler}></input>
        </article>
    </section>
    )
}

export default SearchBar