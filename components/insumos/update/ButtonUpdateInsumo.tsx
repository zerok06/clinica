'use client'
import React from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import useControlAlert from '@/hook/useControlAlert'
import { insumo } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import FormUpdateInsumo from './FormUpdateInsumo'

interface ButtonUpdateInsumoProps {
  id: string
  insumo: insumo
}

const ButtonUpdateInsumo: React.FC<ButtonUpdateInsumoProps> = ({
  id,
  insumo,
}) => {
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
          <FormUpdateInsumo insumo={insumo} id={id} closeAlert={close} />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ButtonUpdateInsumo
