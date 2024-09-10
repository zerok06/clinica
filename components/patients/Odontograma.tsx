'use client'
import useOdontograma from '@/hook/useOdontograma'
import React from 'react'
import Tooth from './Tooth'
import { Button } from '../ui/button'
import type { tratamiento } from '@prisma/client'
import { createOdontograma } from '@/lib/actions/odontograma'
import { toast } from '../ui/use-toast'

interface OdontogramaProps {
  tratamientos: tratamiento[]
  id: string
}

const Odontograma: React.FC<OdontogramaProps> = ({ tratamientos, id }) => {
  const { odontograma, addDiagnosticoMono } = useOdontograma()

  const permanente_1 = odontograma.permanentes.slice(0, 16)
  const permanente_2 = odontograma.permanentes.slice(16, 32)
  const temporal_1 = odontograma.temporales.slice(0, 10)
  const temporal_2 = odontograma.temporales.slice(10, 20)

  return (
    <section className="w-full h-[calc(100vh-(12px+56px+48px+12px+12px+12px))] flex justify-center items-center bg-white rounded-2xl p-4 relative">
      <div className="w-[calc(16*40px+15*4px)] flex gap-4 flex-col items-center ">
        <div className="flex gap-1">
          {permanente_1.map(item => (
            <Tooth
              {...item}
              key={item.id}
              tratamientos={tratamientos!}
              addDiagnosticoMono={addDiagnosticoMono}
            />
          ))}
        </div>

        <div className="flex gap-1">
          {temporal_1.map(item => (
            <Tooth
              {...item}
              key={item.id}
              tratamientos={tratamientos!}
              addDiagnosticoMono={addDiagnosticoMono}
            />
          ))}
        </div>
        <div className="flex gap-1">
          {temporal_2.map(item => (
            <Tooth
              {...item}
              key={item.id}
              tratamientos={tratamientos!}
              addDiagnosticoMono={addDiagnosticoMono}
            />
          ))}
        </div>

        <div className="flex gap-1">
          {permanente_2.map(item => (
            <Tooth
              {...item}
              key={item.id}
              tratamientos={tratamientos!}
              addDiagnosticoMono={addDiagnosticoMono}
            />
          ))}
        </div>
      </div>
      <div>
        <Button
          onClick={() =>
            createOdontograma(odontograma, id).then(res =>
              toast({
                title: 'Uh oh! Something went wrong.',
                description: JSON.stringify(res),
              })
            )
          }
        >
          Guardar
        </Button>
      </div>
    </section>
  )
}

export default Odontograma
