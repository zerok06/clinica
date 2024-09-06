'use client'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'
import { changeStatus } from '@/lib/actions/dates'
import { toast } from '../ui/use-toast'
import { Bolt } from 'lucide-react'

interface DatePatientProps {
  id: string
}

const OpcionsPatientDates: React.FC<DatePatientProps> = ({ id }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={'icon'} variant={'outline'}>
          <Bolt size={16} className="text-black/70" />
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
