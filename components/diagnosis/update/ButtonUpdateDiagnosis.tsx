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
import useControlAlert from '@/hook/useControlAlert'
import { diagnostico, doctor, paciente } from '@prisma/client'
import { Button } from '@/components/ui/button'
import FormUpdateDiagnosis from './FormUpdateDiagnosis'
import { Pencil } from 'lucide-react'

interface ButtonUpdateDiagnosisProps {
  id: string
  diagnostico: diagnostico
}

const ButtonUpdateDiagnosis: React.FC<ButtonUpdateDiagnosisProps> = ({
  id,
  diagnostico,
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
          <FormUpdateDiagnosis
            diagnostico={diagnostico}
            id={id}
            closeAlert={close}
          />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ButtonUpdateDiagnosis
