'use client'
import { ColumnDef } from '@tanstack/react-table'
import ButtonDelete from '../ButtonDelete'
import { deleteUser } from '@/lib/actions/users'
import type { paciente } from '@prisma/client'
import { deletePatient } from '@/lib/actions/patients'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Configuration01Icon } from '../icons/Configuration01Icon'
import { toast } from '../ui/use-toast'
import FormatDate from '../FormatDate'
import ButtonUpdatePaciente from './update/ButtonUpdatePaciente'

const generatorUrl = (id: string) => `/dashboard/patient/${id}/resume`

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
    cell: ({ row: { original } }) => {
      return <FormatDate fecha={original.nacimiento} />
    },
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
          <Button asChild size={'icon'} variant={'outline'}>
            <Link href={generatorUrl(original.id)}>
              <Configuration01Icon />
            </Link>
          </Button>
          <ButtonUpdatePaciente id={original.id} paciente={original} />
          <ButtonDelete
            label={'delete'}
            deleteDB={() =>
              deletePatient(original.id).then(res =>
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
