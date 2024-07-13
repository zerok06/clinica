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

import type { tratamiento } from '@prisma/client'
import FormNewDiagnosis from './diagnosis/FormNewDiagnosis'

interface ButtonNewDiagnosisProps {
  treatments: Array<tratamiento>
}

const ButtonNewDiagnosis: React.FC<ButtonNewDiagnosisProps> = ({
  treatments,
}) => {
  const { active, close } = useControlAlert()

  return (
    <AlertDialog open={active} onOpenChange={close}>
      <AlertDialogTrigger asChild>
        <Button>Agregar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <FormNewDiagnosis closeAlert={close} treatments={treatments} />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ButtonNewDiagnosis
