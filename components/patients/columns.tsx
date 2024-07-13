'use client'
import { ColumnDef } from '@tanstack/react-table'
import ButtonDelete from '../ButtonOption'
import { deleteUser } from '@/lib/actions/users'
import type { paciente } from '@prisma/client'
import { deletePatient } from '@/lib/actions/patients'

export const columns: ColumnDef<paciente>[] = [
  {
    accessorKey: 'nombres',
    header: 'Nombres',
  },
  {
    accessorKey: 'apellidos',
    header: 'Apellidos',
  },
  {
    accessorKey: 'nacimiento',
    header: 'Nacimiento',
  },
  {
    accessorKey: 'dni',
    header: 'Dni',
  },
  {
    accessorKey: 'celular',
    header: 'Celular',
  },
  {
    header: 'Opciones',
    cell: ({ row: { original } }) => {
      return (
        <div className="flex justify-end">
          <ButtonDelete
            label={'delete'}
            deleteDB={() =>
              deletePatient(original.id).then(res => console.log(res))
            }
          />
        </div>
      )
    },
  },
]
