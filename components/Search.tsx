import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Dropdown from './Dropdown'
import { Suggestion } from '../shared/interfaces/suggestion.interface'
import { POKE_LIST } from '../constants/poke'
import styles from '../styles/Search.module.css'

const Search: React.FC = () => {
    const [text, setText] = useState('')
    const [suggestions, setSuggestions] = useState<Suggestion[] | []>([])

    const textChangeHandler = (e: React.FormEvent<HTMLInputElement>) => setText(e.currentTarget.value)

    useEffect(() => {
        if(text.trim().length === 0) setSuggestions([])
        else {
            setSuggestions(POKE_LIST.filter(pokemon => {
                return pokemon.name.match(new RegExp(`^${text.trim()}`, 'i'))
            }))
        }
    }, [text])

    return (
        <section className={styles.search__main}>
            <form className={styles.search__form} onSubmit={(e) => e.preventDefault()}>
                <Image src='/search.svg' width='24px' height='24px' />
                <input value={text} onChange={textChangeHandler}></input>
            </form>
            {text.trim().length > 0 && <Dropdown list={suggestions} />}
        </section>
    )
}

export default Search