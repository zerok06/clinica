'use client'
import React from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import useControlAlert from '@/hook/useControlAlert'
import { insumo, pagos } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import FormUpdatePago from './FormUpdatePago'

interface ButtonUpdatePagoProps {
  id: string
  pago: pagos
}

const ButtonUpdatePago: React.FC<ButtonUpdatePagoProps> = ({ id, pago }) => {
  const { active, close } = useControlAlert()

  return (
    <AlertDialog open={active} onOpenChange={close}>
      <AlertDialogTrigger asChild>
        <Button variant={'outline'} size={'icon'}>
          <Pencil size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <FormUpdatePago pago={pago} id={id} closeAlert={close} />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ButtonUpdatePago
