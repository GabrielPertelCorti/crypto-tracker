import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function Detail() {
  
  const navigate = useNavigate()
  const { crypto } = useParams()

  useEffect(() => {
    async function getCoin() {
      try{

      } catch (error) {
        console.log(error)
        na
      }
    };
  }, [crypto])
  

  return (
    <div>
      <h1>Detail {crypto}</h1>
    </div>
  )
}