'use client'
import { ColumnDef } from '@tanstack/react-table'
import ButtonDelete from '../ButtonOption'
import { deleteUser } from '@/lib/actions/users'

export type Props = {
  id: string
  nombre: string
  descripcion: string
}

export const columns: ColumnDef<Props>[] = [
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
    header: 'Opciones',
    cell: ({ row: { original } }) => {
      return (
        <div className="flex justify-end">
          <ButtonDelete
            label={'delete'}
            deleteDB={() =>
              deleteUser(original.id).then(res => console.log(res))
            }
          />
        </div>
      )
    },
  },
]
