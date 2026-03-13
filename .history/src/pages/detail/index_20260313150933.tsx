import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CoinProps } from '../home'

interface ResponseData{
  data: CoinProps[]
}

interface ErrorData{
  error: string;
}

type DataProps = ResponseData | ErrorData;

export default function Detail() {
  
  const navigate = useNavigate()
  const { crypto } = useParams()

  useEffect(() => {
    async function getCoin() {
      try{
        fetch(`https://rest.coincap.io/v3/assets/${crypto}`)
        .then(res => res.json()).then((data: DataProps) => {
          if('error' in data) {
            navigate('/')
            return;
          }
        })
      } catch (error) {
        console.log(error)
        navigate('/')
      }
    }
    getCoin()
  }, [crypto])
  

  return (
    <div>
      <h1>Detail {crypto}</h1>
    </div>
  )
}