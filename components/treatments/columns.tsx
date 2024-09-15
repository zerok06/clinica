'use client'
import { ColumnDef } from '@tanstack/react-table'
import ButtonDelete from '../ButtonDelete'
import { deleteUser } from '@/lib/actions/users'
import { Badge } from '../ui/badge'
import { deleteTreatment } from '@/lib/actions/treatments'
import { toast } from '../ui/use-toast'
import FormatDate from '../FormatDate'
import { tratamiento } from '@prisma/client'
import ButtonUpdateTratamiento from './update/ButtonUpdateTratamiento'

export type Props = {
  id: string
  nombre: string
  descripcion: string
}

export const columns: ColumnDef<tratamiento>[] = [
  {
    accessorKey: 'nombre',
    header: 'Nombre',
  },
  {
    accessorKey: 'descripcion',
    header: 'Descripción',
  },
  {
    accessorKey: 'monto',
    header: 'Precio',
  },
  {
    header: 'Categoría',

    cell: ({ row: { original } }) => {
      const {
        /* @ts-ignore */
        categoriaTratamiento: { nombre },
      } = original

      return <Badge variant="default">{nombre}</Badge>
    },
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
          <ButtonUpdateTratamiento id={original.id} tratamiento={original} />
          <ButtonDelete
            label={'delete'}
            deleteDB={() =>
              deleteTreatment(original.id).then(res =>
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
