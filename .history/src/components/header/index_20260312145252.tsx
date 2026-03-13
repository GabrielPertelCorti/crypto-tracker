import styles from './header.module.css'
import Logo from '../../assets/logo2.svg'
import { Link } from 'react-router-dom'	

export default function Header() {
  return (
    <header className={styles.container}>
      <img src={Logo} alt="Logo Crypto Tracker" L />
    </header>
  )
}