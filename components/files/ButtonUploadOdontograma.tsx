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
import { Button } from '../ui/button'
import useControlAlert from '@/hook/useControlAlert'
import { Plus } from 'lucide-react'
import UploadOdontogramForm from './UploadOdontogramForm'

interface ButtonUploadOdontogramaProps {
  id: string
}

const ButtonUploadOdontograma: React.FC<ButtonUploadOdontogramaProps> = ({
  id,
}) => {
  const { active, close } = useControlAlert()

  return (
    <AlertDialog open={active} onOpenChange={close}>
      <AlertDialogTrigger asChild>
        <Button
          size={'sm'}
          className="flex gap-1 flex-row text-sm"
          variant={'default'}
        >
          Subir
          <Plus size={'16'} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <UploadOdontogramForm id={id} close={close} />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ButtonUploadOdontograma
