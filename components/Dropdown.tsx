import React from 'react'
import Image from 'next/image'
import { Suggestion } from '../shared/interfaces/suggestion.interface'
import styles from '../styles/Dropdown.module.css'
import Link from 'next/link'

interface DropdownProps {
  list: Suggestion[]
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const format: RegExp = /(\b[a-z](?!\s))/g;

  return (
    <section className={styles.dropdown__container}>
      <ul className={styles.dropdown}>
        {props.list.map(poke => {
          const className: string = poke.sprite ? '' : styles.placeholder
          return (
            <li key={poke.name}>
              <Link href={`/pokemon/${poke.name}`}>
                <a className={styles.dropdown__item}>
                  {poke.sprite && <Image src={poke.sprite} width='53px' height='53px' />}
                  <p className={className}>{poke.name.replace(format, (s) => s.toUpperCase())}</p>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default Dropdown