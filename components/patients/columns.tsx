'use client'
import { ColumnDef } from '@tanstack/react-table'
import ButtonDelete from '../ButtonOption'
import { deleteUser } from '@/lib/actions/users'
import type { paciente } from '@prisma/client'
import { deletePatient } from '@/lib/actions/patients'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Configuration01Icon } from '../icons/Configuration01Icon'

const generatorUrl = (id: string) => `/dashboard/patient/${id}/home`

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
        <div className="flex justify-end gap-2">
          <Button asChild size={'icon'} variant={'outline'}>
            <Link href={generatorUrl(original.id)}>
              <Configuration01Icon />
            </Link>
          </Button>
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
