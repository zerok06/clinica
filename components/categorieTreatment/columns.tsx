'use client'
import { ColumnDef } from '@tanstack/react-table'
import ButtonDelete from '../ButtonDelete'
import { deleteUser } from '@/lib/actions/users'
import { Badge } from '../ui/badge'
import {
  deleteCategoryTreatment,
  deleteTreatment,
} from '@/lib/actions/treatments'
import { toast } from '../ui/use-toast'
import FormatDate from '../FormatDate'
import { categoriaTratamiento } from '@prisma/client'
import ButtonUpdateTratamiento from './update/ButtonUpdateCategoryTratamiento'
import ButtonUpdateCategoryTratamiento from './update/ButtonUpdateCategoryTratamiento'

export type Props = {
  id: string
  nombre: string
  descripcion: string
}

export const columns: ColumnDef<categoriaTratamiento>[] = [
  {
    accessorKey: 'nombre',
    header: 'Nombre',
  },
  {
    accessorKey: 'descripcion',
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
          <ButtonUpdateCategoryTratamiento
            id={original.id}
            tratamiento={original}
          />
          <ButtonDelete
            label={'delete'}
            deleteDB={() =>
              deleteCategoryTreatment(original.id).then(res =>
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
