'use client'
import { ColumnDef } from '@tanstack/react-table'
import ButtonDelete from '../ButtonDelete'
import { deleteUser } from '@/lib/actions/users'
import { deleteDiagnosis } from '@/lib/actions/diagnosis'
import { toast } from '../ui/use-toast'
import FormatDate from '../FormatDate'
import { diagnostico } from '@prisma/client'

export type Props = {
  id: string
  nombre: string
  descripcion: string
}

export const columns: ColumnDef<diagnostico>[] = [
  {
    accessorKey: 'nombre',
    header: 'Nombre',
  },
  {
    accessorKey: 'descripcion',
    header: 'Descripción',
  },
  {
    accessorKey: 'email',
    header: 'Categoría',
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
          <ButtonDelete
            label={'delete'}
            deleteDB={() =>
              deleteDiagnosis(original.id).then(res =>
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
