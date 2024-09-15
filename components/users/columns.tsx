'use client'
import { ColumnDef } from '@tanstack/react-table'
import type { credenciales, usuario } from '@prisma/client'
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
import ButtonUpdateUser from './update/ButtonUpdateUser'

interface Props extends usuario {
  credenciales: credenciales
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
          <ButtonUpdateUser id={original.id} user={original} />
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
