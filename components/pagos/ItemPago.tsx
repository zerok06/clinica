'use client'
import React from 'react'
import type { pagos } from '@prisma/client'
import ButtonOption from '../ButtonOption'
import { DeletePagos } from '@/lib/actions/pagos'
import { toast } from '../ui/use-toast'

const ItemPago: React.FC<pagos> = item => {
  return (
    <div className="w-full rounded-xl border px-4 py-2 flex flex-row gap-4 items-center">
      <div>
        <div className="h-3 w-3 rounded-full bg-primary"></div>
      </div>
      <div className="flex-1">{item.title}</div>
      <div>
        <ButtonOption
          label={'delete'}
          deleteDB={() =>
            DeletePagos(item.id).then(res =>
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

export default ItemPago
