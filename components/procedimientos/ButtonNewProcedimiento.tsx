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
import FormNewProcedimiento from './FormNewProcedimiento'
import { tratamiento } from '@prisma/client'

interface ButtonNewProcedimientoProps {
  tratamientos: tratamiento[]
  patientId: string
}

const ButtonNewProcedimiento: React.FC<ButtonNewProcedimientoProps> = ({
  tratamientos,
  patientId,
}) => {
  const { active, close } = useControlAlert()

  return (
    <AlertDialog open={active} onOpenChange={close}>
      <AlertDialogTrigger asChild>
        <Button>Nuevo</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <FormNewProcedimiento
            patientId={patientId}
            closeAlert={close}
            tratamientos={tratamientos}
          />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ButtonNewProcedimiento
