'use client'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'
import { Configuration01Icon } from '../icons/Configuration01Icon'
import { changeStatus } from '@/lib/actions/dates'
import { toast } from '../ui/use-toast'

interface DatePatientProps {
  id: string
}

const OpcionsPatientDates: React.FC<DatePatientProps> = ({ id }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button size={'icon'} variant={'outline'}>
          <Configuration01Icon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() =>
            changeStatus(id, 'Completado').then(res => {
              toast({
                title: 'Uh oh! Something went wrong.',
                description: JSON.stringify(res),
              })
            })
          }
        >
          Completar
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            changeStatus(id, 'Cancelado').then(res => {
              toast({
                title: 'Uh oh! Something went wrong.',
                description: JSON.stringify(res),
              })
            })
          }
        >
          Cancelar
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            changeStatus(id, 'Pendiente').then(res => {
              toast({
                title: 'Uh oh! Something went wrong.',
                description: JSON.stringify(res),
              })
            })
          }
        >
          Pendiente
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default OpcionsPatientDates
