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
import { Delete02Icon } from './icons/Delete02Icon'

interface ButtonDeleteProps {
  label: 'delete' | 'edit'
  deleteDB: () => void
}

const controls = {
  delete: {
    icon: <Delete02Icon />,
    variant: 'destructive',
  },
}

const ButtonOption: React.FC<ButtonDeleteProps> = ({ label, deleteDB }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={controls[label as keyof typeof controls].variant}>
          {controls[label as keyof typeof controls].icon}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteDB}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ButtonOption
