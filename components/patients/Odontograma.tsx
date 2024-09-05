'use client'
import useOdontograma from '@/hook/useOdontograma'
import React from 'react'
import Tooth from './Tooth'
import { Button } from '../ui/button'
import type { tratamiento } from '@prisma/client'

interface OdontogramaProps {
  tratamientos: tratamiento[]
}

const Odontograma: React.FC<OdontogramaProps> = ({ tratamientos }) => {
  const { odontograma, addDiagnosticoMono } = useOdontograma()

  const permanente_1 = odontograma.permanentes.slice(0, 16)
  const permanente_2 = odontograma.permanentes.slice(16, 32)
  const temporal_1 = odontograma.temporales.slice(0, 10)
  const temporal_2 = odontograma.temporales.slice(10, 20)

  console.log(odontograma)

  return (
    <section className="w-full h-[calc(100vh-(12px+56px+48px+12px+12px+12px))] flex justify-center items-center bg-white rounded-2xl p-4 relative">
      <div className="w-[calc(16*40px+15*4px)] flex gap-4 flex-col items-center ">
        <div className="flex gap-1">
          {permanente_1.map(item => (
            <Tooth
              {...item}
              tratamientos={tratamientos!}
              addDiagnosticoMono={addDiagnosticoMono}
            />
          ))}
        </div>

        <div className="flex gap-1">
          {temporal_1.map(item => (
            <Tooth
              {...item}
              tratamientos={tratamientos!}
              addDiagnosticoMono={addDiagnosticoMono}
            />
          ))}
        </div>
        <div className="flex gap-1">
          {temporal_2.map(item => (
            <Tooth
              {...item}
              tratamientos={tratamientos!}
              addDiagnosticoMono={addDiagnosticoMono}
            />
          ))}
        </div>

        <div className="flex gap-1">
          {permanente_2.map(item => (
            <Tooth
              {...item}
              tratamientos={tratamientos!}
              addDiagnosticoMono={addDiagnosticoMono}
            />
          ))}
        </div>
      </div>
      <div>
        <Button onClick={() => console.log(odontograma)}>Guardar</Button>
      </div>
    </section>
  )
}

export default Odontograma
