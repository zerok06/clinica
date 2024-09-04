'use client'
import { ColumnDef } from '@tanstack/react-table'
import ButtonDelete from '../ButtonOption'
import type { insumo } from '@prisma/client'
import { deleteInsumo } from '@/lib/actions/insumos'

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
              deleteInsumo(original.id).then(res => console.log(res))
            }
          />
        </div>
      )
    },
  },
]
