'use client'
import React from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '../ui/button'
import useControlAlert from '@/hook/useControlAlert'
import FormNewMessage from './FormNewMessage'

const ButtonNewMenssage = () => {
  const { active, close } = useControlAlert()

  return (
    <AlertDialog open={active} onOpenChange={close}>
      <AlertDialogTrigger asChild>
        <Button>Agregar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <FormNewMessage closeAlert={close} />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ButtonNewMenssage
