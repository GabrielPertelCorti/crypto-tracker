import styles from './home.module.css'

export default function Home() {
  
  return (
    <main className={styles.container}>
      <form className={styles.form}>
        <input type="text" placeholder='Digite o nome da moeda' />
      </form>
    </main>
  )
}