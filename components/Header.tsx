import styles from '../styles/Header.module.css'
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <nav className={styles.header}>
      <Link href='/'>
        <a>
          <img src='pokemon-logo.png'></img>
        </a>
      </Link>
    </nav>
  )
}

export default Header;