'use client'
import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '../ui/button'
import useControlAlert from '@/hook/useControlAlert'
import FormNewDate from './FormNewDate'
import { paciente } from '@prisma/client'

interface ButtonNewDateProps {
  pacientes?: paciente[]
  procedimientoId?: string
  type: 'particular' | 'procedimiento'
}

const ButtonNewDate: React.FC<ButtonNewDateProps> = ({
  pacientes = [],
  procedimientoId = '',
  type,
}) => {
  const { active, close } = useControlAlert()

  return (
    <AlertDialog open={active} onOpenChange={close}>
      <AlertDialogTrigger asChild>
        <Button size={'sm'} variant={'ghost'}>
          Agregar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <FormNewDate
            type={type}
            closeAlert={close}
            pacientes={pacientes}
            procedimientoId={procedimientoId}
          />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ButtonNewDate
