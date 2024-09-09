'use client'
import { ColumnDef } from '@tanstack/react-table'
import ButtonDelete from '../ButtonDelete'
import type { insumo } from '@prisma/client'
import { deleteDate } from '@/lib/actions/dates'
import { toast } from '@/components/ui/use-toast'

export const columns: ColumnDef<insumo>[] = [
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
