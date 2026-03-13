import {useState} from 'react'
import styles from './home.module.css'
import { BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function Home() {
  const [input, setInput] = useState('')
  
  return (
    <main className={styles.container}>
      <form className={styles.form}>
        <input type="text" placeholder='Digite o nome da moeda... Ex: Bitcoin' value={}/>
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
              <div className={styles.name} >
                <Link to={'/detail/bitcoin'}>
                  <span>BitCoin</span> | BTC
                </Link>
              </div>
            </td>

            <td className={styles.td} data-label="Valor de Mercado" >
              1T
            </td>

            <td className={styles.td} data-label="Preço" >
              8.000
            </td>

            <td className={styles.td} data-label="Volume" >
              1B
            </td>

            <td className={styles.tdProfit} data-label="Variação 24h" >
              <span>1.20</span>
            </td>

          </tr>
        </tbody>
      </table>

    </main>
  )
}