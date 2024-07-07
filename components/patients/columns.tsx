'use client'
import { ColumnDef } from '@tanstack/react-table'
import ButtonDelete from '../ButtonOption'
import { deleteUser } from '@/lib/actions/users'

export type Props = {
  id: string
  nombres: string
  apellidos: string
  email: string
  dni: string
  telefono: string
}

export const columns: ColumnDef<Props>[] = [
  {
    accessorKey: 'nombres',
    header: 'Nombres',
  },
  {
    accessorKey: 'apellidos',
    header: 'Apellidos',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'dni',
    header: 'Dni',
  },
  {
    accessorKey: 'telefono',
    header: 'Teléfono',
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
