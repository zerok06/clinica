'use client'

import { deleteFilePatient } from '@/lib/actions/files'
import ButtonOption from '../ButtonDelete'
import { toast } from '../ui/use-toast'

interface ButtonDeleteFileProps {
  id: string
}

const ButtonDeleteFile: React.FC<ButtonDeleteFileProps> = ({ id }) => {
  return (
    <ButtonOption
      label={'delete'}
      deleteDB={() =>
        deleteFilePatient(id).then(res =>
          toast({
            title: 'Uh oh! Something went wrong.',
            description: JSON.stringify(res),
          })
        )
      }
    />
  )
}

export default ButtonDeleteFile
