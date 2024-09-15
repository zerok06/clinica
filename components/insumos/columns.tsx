'use client'
import { ColumnDef } from '@tanstack/react-table'
import ButtonDelete from '../ButtonDelete'
import type { insumo } from '@prisma/client'
import { deleteInsumo } from '@/lib/actions/insumos'
import { toast } from '../ui/use-toast'
import FormatDate from '../FormatDate'
import ButtonUpdateInsumo from './update/ButtonUpdateInsumo'

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
          <ButtonUpdateInsumo id={original.id} insumo={original} />
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
