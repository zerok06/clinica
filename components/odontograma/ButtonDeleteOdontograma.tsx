'use client'

import { deleteFilePatient } from '@/lib/actions/files'
import ButtonOption from '../ButtonDelete'
import { toast } from '../ui/use-toast'
import { deleteOdontograma } from '@/lib/actions/odontograma'

interface ButtonDeleteOdontogramaProps {
  id: string
}

const ButtonDeleteOdontograma: React.FC<ButtonDeleteOdontogramaProps> = ({
  id,
}) => {
  return (
    <ButtonOption
      label={'delete'}
      deleteDB={() =>
        deleteOdontograma(id).then(res =>
          toast({
            title: 'Uh oh! Something went wrong.',
            description: JSON.stringify(res),
          })
        )
      }
    />
  )
}

export default ButtonDeleteOdontograma
