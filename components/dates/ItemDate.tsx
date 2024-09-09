'use client'
import React from 'react'
import type { cita } from '@prisma/client'
import OpcionsPatientDates from './OpcionsPatientDates'
import ButtonOption from '../ButtonDelete'
import { deleteDate } from '@/lib/actions/dates'
import { toast } from '../ui/use-toast'
import { Badge } from '../ui/badge'
import ChatWhatsapp from '../ChatWhatsapp'
const ItemDate: React.FC<cita> = item => {
  return (
    <div className="w-full rounded-xl border px-4 py-2 flex flex-row gap-4 items-center">
      <div>
        <h3 className="text-sm font-semibold">01 julio 2025</h3>
        <p className="text-black/70 text-xs">9:00 am - 11:00 am</p>
      </div>
      <div className="flex-1">
        <h3 className="text-base font-semibold">Retiro de muela</h3>
      </div>
      <div>
        {item.estado == 'Cancelado' && (
          <Badge className="bg-[#DC3545]">Cancelada</Badge>
        )}
        {item.estado == 'Completado' && (
          <Badge className="bg-[#218838]">Completada</Badge>
        )}
        {item.estado == 'Pendiente' && (
          <Badge className="bg-[#FFD700]">Pendiente</Badge>
        )}
      </div>
      <div className="flex flex-row gap-2">
        <OpcionsPatientDates id={item.id} />
        <ButtonOption
          label={'delete'}
          deleteDB={() =>
            deleteDate(item.id).then(res =>
              toast({
                title: 'Uh oh! Something went wrong.',
                description: JSON.stringify(res),
              })
            )
          }
        />
      </div>
    </div>
  )
}

export default ItemDate
