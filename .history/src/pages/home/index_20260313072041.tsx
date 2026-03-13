import { useState, useEffect, FormEvent } from 'react'
import styles from './home.module.css'
import { BsSearch } from 'react-icons/bs'
import { Link, useNavigate} from 'react-router-dom'

interface CoinProps{
  id: string,
  name: string,
  symbol: string,
  rank: string,
  supply: string,
  maxSupply: string,
  marketCapUsd: string,
  priceUsd: string,
  changePercent24Hr: string,
  volumeUsd24Hr: string,
  vwap24Hr: string,
  explorer: string,
  formatedPrice?: string,
  formatedMarketCap?: string,
  formatedVolume?: string,
}

interface DataProp{
  data: CoinProps[]
}

export default function Home() {
  const [input, setInput] = useState('')
  const [coins, setCoins] = useState<CoinProps[]>([])

  const navigate = useNavigate();


    async function getData(){
        fetch("https://rest.coincap.io/v3/assets?limit=5&offset=0")
        .then(response => response.json())
        .then((data: DataProp) => {
          const coinsData = data.data;
          
          const price = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          })

          const compactPrice = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            notation: "compact",
          })
          
          const formatedResult = coinsData.map((item) => {
            const formated = {
              ...item,
              formatedPrice: price.format(Number(item.priceUsd)),
              formatedMarketCap: compactPrice.format(Number(item.marketCapUsd)),
              formatedVolume: compactPrice.format(Number(item.volumeUsd24Hr)),
            }
            return formated;
          })
            //console.log(formatedResult)
            setCoins(formatedResult)
        })
    }

    useEffect(() => {
      getData();
  }, [])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if(input === "") return;
    navigate(`/detail/${input}`)
    setInput('')
  }

  function handleShowMore() {
    
  }

  
  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit} >
        <input type="text" placeholder='Digite o nome da moeda... Ex: Bitcoin'
        value={input} onChange={(e) => setInput(e.target.value)}/>
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
          {
            coins
          }
        </tbody>
      </table>

      <button className={styles.buttonShowMore} onClick={handleShowMore}>
        Carregar Mais
      </button>

    </main>
  )
}