'use client'
import { ColumnDef } from '@tanstack/react-table'
import ButtonDelete from '../ButtonDelete'
import type { procedimiento } from '@prisma/client'
import { deleteInsumo } from '@/lib/actions/insumos'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Configuration01Icon } from '../icons/Configuration01Icon'
import { DeleteProcedimiento } from '@/lib/actions/procedimientos'
import { toast } from '../ui/use-toast'
import FormatDate from '../FormatDate'

const generatorUrl = (id: string, idProcedimiento: string) =>
  `/dashboard/patient/${id}/procedimiento/${idProcedimiento}`

export const columns: ColumnDef<procedimiento>[] = [
  {
    accessorKey: 'title',
    header: 'Nombre',
  },
  {
    accessorKey: 'desc',
    header: 'Descripcion',
  },
  {
    accessorKey: 'monto_total',
    header: 'Monto total',
  },
  {
    accessorKey: 'deuda',
    header: 'Deuda',
  },
  {
    header: 'Estado',
    cell: ({ row: { original } }) => {
      const { estado } = original

      return <Badge variant="default">{estado}</Badge>
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
        <div className="flex justify-end flex-row gap-2">
          <Button asChild size={'icon'} variant={'outline'}>
            <Link href={generatorUrl(original.pacienteId || '', original.id)}>
              <Configuration01Icon />
            </Link>
          </Button>
          <ButtonDelete
            label={'delete'}
            deleteDB={() =>
              DeleteProcedimiento(original.id).then(res =>
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
