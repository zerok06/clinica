'use client'
import { ColumnDef } from '@tanstack/react-table'
import type { PlantillaMensaje } from '@prisma/client'

import ButtonDelete from '../ButtonDelete'
import { deleteUser } from '@/lib/actions/users'
import { toast } from '../ui/use-toast'
import FormatDate from '../FormatDate'
import ButtonUpdateMenssage from './ButtonUpdateMenssage'

export const columns: ColumnDef<PlantillaMensaje>[] = [
  {
    accessorKey: 'asunto',
    header: 'Asunto',
  },
  {
    accessorKey: 'mensaje',
    header: 'Mensaje',
  },
  {
    accessorKey: 'createAt',
    header: 'Creacion',
    cell: ({ row: { original } }) => {
      return <FormatDate fecha={original.createAt} />
    },
  },
  {
    accessorKey: 'updateAt',
    header: 'Ultima actualizacion',
    cell: ({ row: { original } }) => {
      return <FormatDate fecha={original.updateAt} />
    },
  },
  {
    header: 'Opciones',
    cell: ({ row: { original } }) => {
      return (
        <div className="flex justify-end gap-2">
          <ButtonUpdateMenssage
            id={original.id}
            asunto={original.asunto}
            mensaje={original.mensaje}
          />
          <ButtonDelete
            label={'delete'}
            deleteDB={() =>
              deleteUser(original.id).then(res =>
                toast({
                  title: 'Uh oh! Something went wrong.',
                  description: JSON.stringify(res),
                })
              )
            }
          />
        </div>
      )
    },
  },
]
