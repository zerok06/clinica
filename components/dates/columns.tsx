'use client'
import { ColumnDef } from '@tanstack/react-table'
import ButtonDelete from '../ButtonDelete'
import type { cita, insumo } from '@prisma/client'
import { deleteDate } from '@/lib/actions/dates'
import { toast } from '@/components/ui/use-toast'
import FormatDate from '../FormatDate'

export const columns: ColumnDef<cita>[] = [
  {
    accessorKey: 'title',
    header: 'Titulo',
  },
  {
    accessorKey: 'date',
    header: 'Fecha',
  },
  {
    accessorKey: 'description',
    header: 'Descripcion',
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
              deleteDate(original.id).then(res =>
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
