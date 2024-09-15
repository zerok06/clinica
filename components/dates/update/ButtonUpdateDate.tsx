'use client'
import React from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '../../ui/button'
import useControlAlert from '@/hook/useControlAlert'
import { Pencil } from 'lucide-react'
import FormUpdateDate from './FormUpdateDate'
import { cita, doctor } from '@prisma/client'

interface ButtonUpdateDateProps {
  id: string
  cita: cita
  doctors: doctor[]
}

const ButtonUpdateDate: React.FC<ButtonUpdateDateProps> = ({
  id,
  cita,
  doctors,
}) => {
  const { active, close } = useControlAlert()

  return (
    <AlertDialog open={active} onOpenChange={close}>
      <AlertDialogTrigger asChild>
        <Button variant={'outline'} size={'icon'}>
          <Pencil size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <FormUpdateDate
            closeAlert={close}
            id={id}
            cita={cita}
            doctors={doctors}
          />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ButtonUpdateDate
