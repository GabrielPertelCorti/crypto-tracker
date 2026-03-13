import styles from './header.module.css'
import Logo from '../../assets/logo2.svg'

export default function Header() {
  return (
    <header className={styles.container}>
      <img src={Logo} alt="Logo Crypto Tracker" />
    </header>
  )
}