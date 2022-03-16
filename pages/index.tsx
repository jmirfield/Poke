import type { NextPage } from 'next'
import Container from '../components/Container'
import SearchBar from '../components/Search'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  return (
    <Container>
      <img className={styles.cover} src='/cover-pokemon.png'></img>
      <SearchBar />
    </Container>
    )
}

export default Home
