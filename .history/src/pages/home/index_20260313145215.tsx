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
  const [offset, setOffset] = useState(0);

  const navigate = useNavigate();


    async function getData(){
        fetch(`https://rest.coincap.io/v3/assets?limit=10&offset=${offset}`)
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
            const listc
            setCoins(formatedResult)
        })
    }

    useEffect(() => {
      getData();
  }, [offset])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if(input === "") return;
    navigate(`/detail/${input}`)
    setInput('')
  }

  function handleShowMore() {
    if(offset === 0) {
      setOffset(10)
      return;
    }
    setOffset(offset + 10)
  }

  
  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o nome da moeda... Ex: Bitcoin"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <BsSearch size={30} color="#fff" />
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor de Mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
            <th scope="col">Variação 24h</th>
          </tr>
        </thead>

        <tbody id="tbody">
          {coins.length > 0 &&
            coins.map((item) => (
              <tr className={styles.tr} key={item.id}>
                <td className={styles.td} data-label="Moeda">
                  <div className={styles.name}>
                  <img src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`} alt="Logo do ativo" className={styles.logo} />
                    <Link to={`/detail/${item.id}`}>
                      <span>{item.name}</span> | {item.symbol}
                    </Link>
                  </div>
                </td>

                <td className={styles.td} data-label="Valor de Mercado">
                  {item.formatedMarketCap}
                </td>

                <td className={styles.td} data-label="Preço">
                  {item.formatedPrice}
                </td>

                <td className={styles.td} data-label="Volume">
                  {item.formatedVolume}
                </td>

                <td className={Number(item.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss} data-label="Variação 24h">
                  <span>{(Number(item.changePercent24Hr)).toFixed(2) + '%' }</span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <button className={styles.buttonShowMore} onClick={handleShowMore}>
        Carregar Mais
      </button>
    </main>
  );
}