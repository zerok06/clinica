'use client'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'
import { toast } from '../ui/use-toast'
import { Bolt } from 'lucide-react'
import { ChangeStatusProcedimiento } from '@/lib/actions/procedimientos'

interface DatePatientProps {
  id: string
}

const OptionsProcedimientos: React.FC<DatePatientProps> = ({ id }) => {
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
            ChangeStatusProcedimiento(id, 'completada').then(res => {
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
            ChangeStatusProcedimiento(id, 'cancelada').then(res => {
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
            ChangeStatusProcedimiento(id, 'pendiente').then(res => {
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

export default OptionsProcedimientos
