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
import { Trash2 } from 'lucide-react'

interface ButtonDeleteProps {
  label: 'delete' | 'edit'
  deleteDB: () => void
  title?: string
  desc?: string
}

const controls = {
  delete: {
    icon: <Trash2 size={16} />,
    variant: 'destructive',
  },
}

const DEFAULT_DESC =
  '¿Estás seguro de que deseas realizar esta acción? Esta operación no puede deshacerse. Si estás seguro, presiona "Confirmar", de lo contrario, selecciona "Cancelar" para volver.'

const DEFAULT_TITLE = 'Confirmación de acción'
const ButtonOption: React.FC<ButtonDeleteProps> = ({
  label,
  deleteDB,
  desc = DEFAULT_DESC,
  title = DEFAULT_TITLE,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size={'icon'}>
          {controls[label as keyof typeof controls].icon}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={deleteDB}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ButtonOption
