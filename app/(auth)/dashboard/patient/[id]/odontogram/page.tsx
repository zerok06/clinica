import ButtonDeleteFile from '@/components/files/ButtonDeleteFile'
import ButtonUploadOdontograma from '@/components/files/ButtonUploadOdontograma'
import { Button } from '@/components/ui/button'
import { fetchFilesOdontogramaPatient } from '@/lib/actions/files'
import { fetchPacienteOdontograma } from '@/lib/actions/odontograma'
import { Eye, Image, Link2, LinkIcon, Wrench } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import FormatDate from '@/components/FormatDate'
import { Badge } from '@/components/ui/badge'
import ButtonDeleteOdontograma from '@/components/odontograma/ButtonDeleteOdontograma'

interface PageProps {
  params: { id: string }
}

interface DataItem {
  id: string
  createAt: Date
  updateAt: Date
  type: TypeTable
  size?: string
  path?: string
}
type TypeTable = 'file' | 'odontograma'

const generatePathOdontograma = (id: string, idOdontograma: string) =>
  `/dashboard/patient/${id}/odontogram/${idOdontograma}`

const Page: React.FC<PageProps> = async ({ params: { id } }) => {
  const { files = [] } = await fetchFilesOdontogramaPatient(id)
  const { odontogramas = [] } = await fetchPacienteOdontograma(id)
  const data: DataItem[] = files
    ?.map(item => ({
      id: item.id,
      createAt: item.createAt,
      updateAt: item.updateAt,
      type: 'file' as TypeTable,
      size: item.size,
      path: item.path,
    }))
    .concat(
      /* @ts-ignore */
      odontogramas?.map(item => ({
        id: item.id,
        createAt: item.createAt,
        updateAt: item.updateAt,
        type: 'odontograma' as TypeTable,
      }))
    )

  return (
    <div className="py-3 px-4 rounded-xl bg-white">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">Odontogramas</h3>
        </div>
        <div className="flex gap-2">
          <ButtonUploadOdontograma id={id} />
          <Button asChild size={'sm'}>
            <Link
              className=" flex gap-1"
              href={`/dashboard/patient/${id}/odontogram/new`}
            >
              Crear
              <Wrench size={16} />
            </Link>
          </Button>
        </div>
      </div>
      <div className=" mt-4 flex flex-col gap-2">
        <Table>
          <TableCaption>Lista de odontogramas.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Creacion</TableHead>
              <TableHead>Ultima actualizacion</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Opciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <FormatDate fecha={item.createAt} />
                </TableCell>
                <TableCell>
                  <FormatDate fecha={item.updateAt} />
                </TableCell>
                <TableCell>
                  <Badge>{item.type}</Badge>
                </TableCell>
                <TableCell className="flex justify-end">
                  {item.type == 'file' && (
                    <div className="flex gap-2 flex-row items-center">
                      <div className="text-black/70">{item.size}</div>
                      <Button asChild size={'icon'} variant={'outline'}>
                        <a
                          href={item.path}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <LinkIcon size={16} />
                        </a>
                      </Button>
                      <div>
                        <ButtonDeleteFile id={item.id} />
                      </div>
                    </div>
                  )}
                  {item.type == 'odontograma' && (
                    <div className="flex gap-2 flex-row items-center">
                      <Button asChild size={'icon'} variant={'outline'}>
                        <Link href={generatePathOdontograma(id, item.id)}>
                          <Eye size={16} />
                        </Link>
                      </Button>
                      <div>
                        <ButtonDeleteOdontograma id={item.id} />
                      </div>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* 
        {files?.map(item => (
          <div
            className="border p-3 rounded-xl flex gap-3 items-center"
            key={item.id}
          >
            <div className="bg-primary/5 h-8 w-8 flex justify-center items-center rounded-lg">
              <Image className="text-primary/40" size={18} />
            </div>
            <div className="flex-1">
              <a href={item.path} target="_blank" rel="noopener noreferrer">
                {item.name}
              </a>
            </div>
            <div className="flex gap-3 flex-row">
              <div className="text-black/70">{item.size}</div>
              <div>
                <ButtonDeleteFile id={item.id} />
              </div>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  )
}

export default Page
