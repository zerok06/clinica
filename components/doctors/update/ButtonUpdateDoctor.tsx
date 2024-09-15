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
import { doctor } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import FormUpdateDoctor from './FormUpdateDoctor'

interface ButtonUpdateDoctorProps {
  id: string
  doctor: doctor
}

const ButtonUpdateDoctor: React.FC<ButtonUpdateDoctorProps> = ({
  id,
  doctor,
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
          <FormUpdateDoctor doctor={doctor} id={id} closeAlert={close} />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ButtonUpdateDoctor
