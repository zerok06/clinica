'use client'
import { ColumnDef } from '@tanstack/react-table'
import type { doctor } from '@prisma/client'
import { toast } from '../ui/use-toast'
import FormatDate from '../FormatDate'
import ButtonDeleteDoctor from './ButtonDeleteDoctor'
import { deleteDoctors } from '@/lib/actions/doctors'

export const columns: ColumnDef<doctor>[] = [
  {
    accessorKey: 'nombres',
    header: 'Nombres',
  },
  {
    accessorKey: 'apellidos',
    header: 'Apellidos',
  },
  {
    accessorKey: 'code',
    header: 'Codigo',
  },
  {
    accessorKey: 'dni',
    header: 'Dni',
  },
  {
    accessorKey: 'email',
    header: 'Correo',
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
        <div className="flex justify-end">
          <ButtonDeleteDoctor
            label={'delete'}
            deleteDB={() =>
              deleteDoctors(original.id).then(res =>
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
