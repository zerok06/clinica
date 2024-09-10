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
import FormUpdateMessage from './FormUpdateMessage'
import { Pencil } from 'lucide-react'

interface ButtonUpdateMenssageProps {
  id: string
  asunto: string
  mensaje: string
}

const ButtonUpdateMenssage: React.FC<ButtonUpdateMenssageProps> = ({
  id,
  asunto,
  mensaje,
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
          <FormUpdateMessage
            closeAlert={close}
            asunto={asunto}
            id={id}
            mensaje={mensaje}
          />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ButtonUpdateMenssage
