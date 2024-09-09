'use client'
import { ColumnDef } from '@tanstack/react-table'
import type { usuario } from '@prisma/client'
import { Button } from '../ui/button'
import { MoreVerticalCircle01Icon } from '../icons/MoreVerticalCircle01Icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import ButtonDelete from '../ButtonDelete'
import { deleteUser } from '@/lib/actions/users'
import { toast } from '../ui/use-toast'
import FormatDate from '../FormatDate'

export type Props = {
  id: string
  nombres: string
  apellidos: string
  email: string
  dni: string
  telefono: string
}

export const columns: ColumnDef<usuario>[] = [
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
        <div className="flex justify-end">
          <ButtonDelete
            label={'delete'}
            deleteDB={() =>
              deleteUser(original.id).then(res =>
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
