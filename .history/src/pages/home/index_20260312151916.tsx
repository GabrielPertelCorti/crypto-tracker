import styles from './home.module.css'
import { BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function Home() {
  
  return (
    <main className={styles.container}>
      <form className={styles.form}>
        <input type="text" placeholder='Digite o nome da moeda... Ex: BitCoin' />
        <button type="submit" >
          <BsSearch size={30} color="#fff" />
          </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope='col' >Moeda</th>
            <th scope='col' >Valor de Mercado</th>
            <th scope='col' >Preço</th>
            <th scope='col' >Volume</th>
            <th scope='col' >Variação 24h</th>
            
          </tr>
        </thead>

        <tbody id='tbody'>
          <tr className={styles.tr}>
            <td className={styles.td} data-label="Moeda" >
              <Link>
                <p>Bitcoin</p>
              Link>
            </td>
          </tr>
        </tbody>
      </table>

    </main>
  )
}