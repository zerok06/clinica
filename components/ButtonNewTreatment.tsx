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
import { Button } from './ui/button'
import useControlAlert from '@/hook/useControlAlert'
import FormNewTreatment from './treatments/FormNewTreatment'

import type { categoriaTratamiento } from '@prisma/client'

interface ButtonNewTreatmentProps {
  categories: Array<categoriaTratamiento>
}

const ButtonNewTreatment: React.FC<ButtonNewTreatmentProps> = ({
  categories,
}) => {
  const { active, close } = useControlAlert()

  return (
    <AlertDialog open={active} onOpenChange={close}>
      <AlertDialogTrigger asChild>
        <Button>Agregar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <FormNewTreatment closeAlert={close} categories={categories} />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ButtonNewTreatment
