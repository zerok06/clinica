'use client'
import { ColumnDef } from '@tanstack/react-table'
import ButtonDelete from '../ButtonDelete'
import type { insumo } from '@prisma/client'
import { deleteInsumo } from '@/lib/actions/insumos'
import { toast } from '../ui/use-toast'

export const columns: ColumnDef<insumo>[] = [
  {
    accessorKey: 'nombre',
    header: 'Nombre',
  },
  {
    accessorKey: 'cantidad',
    header: 'Cantidad',
  },
  {
    accessorKey: 'description',
    header: 'Descripción',
  },
  {
    header: 'Opciones',
    cell: ({ row: { original } }) => {
      return (
        <div className="flex justify-end">
          <ButtonDelete
            label={'delete'}
            deleteDB={() =>
              deleteInsumo(original.id).then(res =>
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
