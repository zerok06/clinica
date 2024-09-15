'use client'
import React from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import useControlAlert from '@/hook/useControlAlert'
import { credenciales, usuario } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import FormUpdateUser from './FormUpdateUser'
interface UserProps extends usuario {
  credenciales: credenciales
}
interface ButtonUpdateUserProps {
  id: string
  user: UserProps
}

const ButtonUpdateUser: React.FC<ButtonUpdateUserProps> = ({ id, user }) => {
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
          <FormUpdateUser user={user} id={id} closeAlert={close} />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ButtonUpdateUser
