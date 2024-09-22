import ChatWhatsapp from '@/components/ChatWhatsapp'
import OpcionsPatientDates from '@/components/dates/OpcionsPatientDates'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { fetchResumePatient } from '@/lib/actions/patients'
import { Image } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface PageResumeProps {
  params: { id: string }
}

const Page: React.FC<PageResumeProps> = async ({ params: { id } }) => {
  const { data } = await fetchResumePatient(id)

  return (
    <div className="flex flex-col gap-4  ">
      <div className="flex flex-row gap-4 flex-wrap  ">
        <div className="py-3 px-4 rounded-xl bg-white flex-1 min-w-[312px] flex">
          <div className="flex-1 flex-col border-r-2 pr-2 flex items-center">
            <div className="h-20 w-20 rounded-full bg-primary text-white flex justify-center items-center">
              CN
            </div>
            <p className="text-sm font-medium mt-2">
              {data?.patient?.nombres.concat(' ', data.patient.apellidos)}
            </p>
            <p className="text-xs text-black/70">{data?.patient?.direccion}</p>
            <div className="flex flex-col items-center mt-2">
              <p className="text-sm font-bold mb-1">Citas</p>
              <div className="flex">
                <div className="flex flex-col items-center font-semibold border-r-2 pr-2">
                  {data?.citas.citas_data._count}
                  <span className="text-xs text-black/70  font-normal">
                    Pasadas
                  </span>
                </div>
                <div className="flex flex-col items-center font-semibold pl-2">
                  {data?.citas.citas_data._count}
                  <span className="text-xs text-black/70 font-normal">
                    Pendientes
                  </span>
                </div>
              </div>
            </div>
            <ChatWhatsapp tel={data?.patient?.celular!} icon={false} />
          </div>
          <div className="min-w-[312px] px-8 py-6 flex flex-col gap-6">
            <div className="flex flex-row">
              <div className="flex-1">
                <h4 className="text-xs font-semibold">Dni</h4>
                <p className="text-xs  text-black/70"> {data?.patient?.dni}</p>
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-semibold">Telefono</h4>
                <p className="text-xs  text-black/70">
                  {data?.patient?.celular}
                </p>
              </div>
            </div>
            <div className="flex flex-row ">
              <div className="flex-1">
                <h4 className="text-xs font-semibold">Direccion</h4>
                <p className="text-xs  text-black/70">
                  {data?.patient?.direccion}
                </p>
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-semibold">Edad</h4>
                <p className="text-xs  text-black/70">{data?.patient?.edad}</p>
              </div>
            </div>
            {/* <div className="flex flex-row">
              <div className="flex-1">
                <h4 className="text-xs font-semibold">Genero</h4>
                <p className="text-xs  text-black/70">{data?.patient?.dni}</p>
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-semibold">Genero</h4>
                <p className="text-xs  text-black/70">Masculino</p>
              </div>
            </div> */}
          </div>
        </div>
        <div className="py-3 px-4 rounded-xl bg-white min-w-[312px]"></div>
        <div className="py-3 px-4 rounded-xl bg-white min-w-[312px]">
          <div className="flex justify-between items-center">
            <h3 className="text-xs ">Archivos / Documentos</h3>
            <Button asChild variant={'link'} className="text-black/70 text-xs">
              <Link href={`/dashboard/patient/${id}/files`}>
                Agregar archivos
              </Link>
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            {data?.files.map(item => (
              <div
                className="border px-2 py-1 rounded-xl flex gap-3 items-center"
                key={item.id}
              >
                <div className="bg-primary/5 h-6 w-6 flex justify-center items-center rounded-lg">
                  <Image className="text-primary/40" size={14} />
                </div>
                <div className="flex-1 text-xs">
                  <a href={item.path} target="_blank" rel="noopener noreferrer">
                    {item.name.slice(0, 20)}
                  </a>
                </div>
                <div className="text-black/70 text-[10px]">{item.type}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4 flex-wrap">
        <div className="py-3 px-4 rounded-xl bg-white flex-1 min-w-[312px]">
          <div className=" flex flex-col gap-2">
            {data?.citas.data.map(item => (
              <div
                key={item.id}
                className="w-full rounded-xl border justify-between p-3 flex flex-row gap-4 items-center"
              >
                <div>
                  <h3 className="text-sm font-semibold">01 julio 2025</h3>
                  <p className="text-black/70 text-xs">9:00 am - 11:00 am</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Retiro de muela</h3>
                  <p className="text-black/70 text-xs">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Velit tenetur exercitationem ut explicabo iusto ea
                    repellendus, ullam tempore placeat rem.
                  </p>
                </div>
                <div>
                  {item.estado == 'Cancelado' && (
                    <Badge className="bg-[#DC3545]">Cancelada</Badge>
                  )}
                  {item.estado == 'Completado' && (
                    <Badge className="bg-[#218838]">Completada</Badge>
                  )}
                  {item.estado == 'Pendiente' && (
                    <Badge className="bg-[#FFD700]">Pendiente</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="py-3 px-4 rounded-xl bg-white min-w-[312px]">
          <div className="flex justify-between items-center">
            <h3 className="text-xs ">Pagos</h3>
            <Button asChild variant={'link'} className="text-black/70 text-xs">
              <Link href={`/dashboard/patient/${id}/files`}>
                Agregar archivos
              </Link>
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            {data?.pagos.data.map(item => (
              <div
                className="border px-2 py-2 rounded-xl flex gap-3 items-center"
                key={item.id}
              >
                <div className="h-2 w-2 bg-primary rounded-full"></div>
                <div className="flex-1 text-xs">
                  {/* <a href={item.path} target="_blank" rel="noopener noreferrer">
                    {item.name}
                  </a> */}
                  {item.title}
                </div>
                <div className="text-black/70 text-xs">{item.monto}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between items-center">
            <p className="text-xs font-medium">Total:</p>
            <p className="text-xs font-semibold">
              <span className="mr-1 font-normal text-black/70">PEN</span>
              {data?.pagos.pagos_data._sum.monto}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
