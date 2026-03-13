import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { CoinProps } from '../home/index'
import styles from './detail.module.css'

interface ResponseData{
  data: CoinProps
}

interface ErrorData{
  error: string;
}

type DataProps = ResponseData | ErrorData;

export default function Detail() {
  
  const navigate = useNavigate()
  const { crypto } = useParams()

  const [coin, setCoin] = useState<CoinProps>()
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_COINCAP_KEY

  useEffect(() => {
    async function getCoin() {
      try{
        fetch(`https://rest.coincap.io/v3/assets/${crypto}`, {
          headers: {
            Authorization: `Bearer ${apiKey}`
          }
        })
        .then(res => res.json()).then((data: DataProps) => {
          if('error' in data) {
            navigate('/')
            return;
          }

          const price = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          })

          const compactPrice = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            notation: "compact",
          })

          const resultData = {
            ...data.data,
            formatedPrice: price.format(Number(data.data.priceUsd)),
            formatedMarketCap: compactPrice.format(Number(data.data.marketCapUsd)),
            formatedVolume: compactPrice.format(Number(data.data.volumeUsd24Hr)),
          }
          setCoin(resultData)
          setLoading(false);

        })
      } catch (error) {
        console.log(error)
        navigate('/')
      }
    }
    getCoin()
  }, [crypto])

  if(loading || !coin) {
    return (
      <div className={styles.container} >
        <h4 className={styles.center} >Carregando detalhes...</h4>
      </div>
    )
  }
  

  return (
    <div className={styles.container} >
      <h1 className={styles.center} >{coin?.name}</h1>
      <h1 className={styles.center} >{coin?.symbol}</h1>

      <section className={styles.content}>
        <img src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLowerCase()}@2x.png`} alt={`Logo do ativo ${coin?.name}`} className={styles.logo} />

        <h1>{coin?.name} | {coin?.symbol}</h1>

        <p><strong>Preço:</strong> {coin?.formatedPrice}</p>

        <a>
          <strong>Valor de Mercado:</strong> {coin?.formatedMarketCap}
        </a>

        <a>
          <strong>Volume:</strong> {coin?.formatedVolume}
        </a>

        <a>
          <strong>Variação:</strong> <span 
          className={Number(coin?.changePercent24Hr) > 0 ? styles.profit : styles.loss } >
            {Number(coin?.changePercent24Hr).toFixed(2) + "%"}</span>
        </a>

      </section>

    </div>
  )
}