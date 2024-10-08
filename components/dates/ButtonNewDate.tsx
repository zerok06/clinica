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
import { doctor, paciente } from '@prisma/client'

interface ButtonNewDateProps {
  pacientes?: paciente[]
  doctors: doctor[]
  procedimientoId?: string
  type: 'particular' | 'procedimiento'
}

const ButtonNewDate: React.FC<ButtonNewDateProps> = ({
  pacientes = [],
  doctors = [],
  procedimientoId = '',
  type,
}) => {
  const { active, close } = useControlAlert()

  return (
    <AlertDialog open={active} onOpenChange={close}>
      <AlertDialogTrigger asChild>
        <Button size={'sm'} variant={'outline'}>
          Agregar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <FormNewDate
            type={type}
            closeAlert={close}
            doctors={doctors}
            pacientes={pacientes}
            procedimientoId={procedimientoId}
          />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ButtonNewDate
