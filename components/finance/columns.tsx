'use client'
import { ColumnDef } from '@tanstack/react-table'
import ButtonDelete from '../ButtonDelete'
import type { paciente, pagos, procedimiento } from '@prisma/client'
import { deleteInsumo } from '@/lib/actions/insumos'
import { toast } from '../ui/use-toast'
import FormatDate from '../FormatDate'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { DeletePagos } from '@/lib/actions/pagos'

interface ProcedimientoProps {
  paciente?: paciente
}

interface PagosProps extends pagos {
  procedimiento?: ProcedimientoProps
}

export const columns: ColumnDef<PagosProps>[] = [
  {
    accessorKey: 'title',
    header: 'Titulo',
  },
  {
    accessorKey: 'desc',
    header: 'Descripción',
  },
  {
    accessorKey: 'monto',
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
    accessorKey: 'procedimiento',
    header: 'Procedimiento',
    cell: ({ row: { original } }) => {
      return (
        <div className="flex">
          <div className="py-1 pl-1 pr-3 rounded-full flex gap-2 bg-black/20">
            <Avatar className="h-7 w-7 text-xs">
              <AvatarImage src="" />
              <AvatarFallback>
                {/* @ts-ignore */}
                {original.procedimiento.paciente.nombres[0]
                  /* @ts-ignore */
                  .concat(original.procedimiento.paciente.apellidos[0])
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-[12px] font-medium leading-none">
                {/* @ts-ignore */}
                {original.procedimiento.paciente.nombres}
              </p>
              <p className="text-[10px] text-black/70 leading-tight">
                {/* @ts-ignore */}
                {original.procedimiento.paciente.dni}
              </p>
            </div>
          </div>
        </div>
      )
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
              DeletePagos(original.id).then(res =>
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
