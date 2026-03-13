import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Detail() {
  
  const { crypto } = useParams()

  useEffect(() => {
    async function getCoin() {
      try{
        
      }
    };
  }, [crypto])
  

  return (
    <div>
      <h1>Detail {crypto}</h1>
    </div>
  )
}