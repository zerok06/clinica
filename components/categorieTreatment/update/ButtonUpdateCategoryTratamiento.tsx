'use client'
import React from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import useControlAlert from '@/hook/useControlAlert'
import {
  categoriaTratamiento,
  insumo,
  paciente,
  pagos,
  tratamiento,
} from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import FormUpdateCategoryTratamiento from './FormUpdateCategoryTratamiento'

interface ButtonUpdateCategoryTratamientoProps {
  id: string
  tratamiento: categoriaTratamiento
}

const ButtonUpdateCategoryTratamiento: React.FC<
  ButtonUpdateCategoryTratamientoProps
> = ({ id, tratamiento }) => {
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
          <FormUpdateCategoryTratamiento
            tratamiento={tratamiento}
            id={id}
            closeAlert={close}
          />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ButtonUpdateCategoryTratamiento
