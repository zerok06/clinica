'use client'
import React from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import useControlAlert from '@/hook/useControlAlert'

import { Button } from '../ui/button'
import FormNewPago from './FormNewPago'

interface ButtonNewPagoProps {
  procedimientoId: string
}

const ButtonNewPago: React.FC<ButtonNewPagoProps> = ({ procedimientoId }) => {
  const { active, close } = useControlAlert()

  return (
    <AlertDialog open={active} onOpenChange={close}>
      <AlertDialogTrigger asChild>
        <Button variant={'outline'} size={'sm'}>
          Agregar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <FormNewPago closeAlert={close} procedimientoId={procedimientoId} />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ButtonNewPago
