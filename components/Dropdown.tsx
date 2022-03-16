import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Suggestion } from '../shared/interfaces/suggestion.interface'
import convToUppercase from '../util/convToUppercase'
import styles from '../styles/Dropdown.module.css'

interface DropdownProps {
  list: Suggestion[]
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  return (
    <section className={styles.dropdown__container}>
      <ul className={styles.dropdown}>
        {props.list.map(poke => {
          const className: string = poke.sprite ? '' : styles.placeholder
          return (
            <li key={poke.name}>
              <Link href={`/pokemon/${poke.name}`}>
                <a className={styles.dropdown__item}>
                  {poke.sprite && <Image src={poke.sprite} width={53} height={53} />}
                  <p className={className}>{convToUppercase(poke.name)}</p>
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