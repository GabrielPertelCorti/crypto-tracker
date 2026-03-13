import styles from './header.module.css'
import Logo from '../../assets/logo3.svg'
import { Link } from 'react-router-dom'	

export default function Header() {
  return (
    <header className={styles.container}>
      <Link to="/">
        <img src={Logo} alt="Logo Crypto Tracker"  />
      </Link>
    </header>
  )
}