'use client'
import useOdontograma from '@/hook/useOdontograma'
import React from 'react'
import Tooth from './Tooth'

const Odontograma = () => {
  const { odontograma } = useOdontograma()

  const permanente_1 = odontograma.permanentes.slice(0, 16)
  const permanente_2 = odontograma.permanentes.slice(16, 32)
  const temporal_1 = odontograma.temporales.slice(0, 10)
  const temporal_2 = odontograma.temporales.slice(10, 20)

  console.log(odontograma)

  return (
    <section className="w-full">
      <div className="w-[calc(16*40px+15*4px)] flex gap-4 flex-col items-center mx-auto">
        <div className="flex gap-1">
          {permanente_1.map(item => (
            <Tooth {...item} />
          ))}
        </div>

        <div className="flex gap-1">
          {temporal_1.map(item => (
            <Tooth {...item} />
          ))}
        </div>
        <div className="flex gap-1">
          {temporal_2.map(item => (
            <Tooth {...item} />
          ))}
        </div>

        <div className="flex gap-1">
          {permanente_2.map(item => (
            <Tooth {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Odontograma
