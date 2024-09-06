import ButtonOption from '@/components/ButtonOption'
import ButtonNewDate from '@/components/dates/ButtonNewDate'
import ItemDate from '@/components/dates/ItemDate'
import OpcionsPatientDates from '@/components/dates/OpcionsPatientDates'
import ButtonNewPago from '@/components/pagos/ButtonNewPago'
import ItemPago from '@/components/pagos/ItemPago'
import OptionsProcedimientos from '@/components/procedimientos/OptionsProcedimientos'
import { Badge } from '@/components/ui/badge'
import { fetchDatesProcedimientos } from '@/lib/actions/dates'
import { DeletePagos } from '@/lib/actions/pagos'
import { fetchOneProcedimiento } from '@/lib/actions/procedimientos'
import { cn } from '@/lib/utils'
import React from 'react'

interface PagePatientProps {
  params: { idProcedimiento: string }
}

const Page: React.FC<PagePatientProps> = async ({
  params: { idProcedimiento },
}) => {
  const { dates } = await fetchDatesProcedimientos(idProcedimiento)
  const { procedimiento } = await fetchOneProcedimiento(idProcedimiento)
  const pendiente = 'pendiente'

  return (
    <div className="py-3 px-4 rounded-xl bg-white">
      <div className="flex items-center mb-4">
        <div className="flex-1">
          <h2 className="text-sm font-light text-primary/70">Procedimiento</h2>
          <h1 className="text-lg font-medium flex items-center gap-4">
            {procedimiento?.title}
            {procedimiento?.estado == 'cancelada' && (
              <Badge className="bg-[#DC3545]">Cancelada</Badge>
            )}
            {procedimiento?.estado == 'completada' && (
              <Badge className="bg-[#218838]">Completada</Badge>
            )}
            {procedimiento?.estado == 'pendiente' && (
              <Badge className="bg-[#FFD700]">Pendiente</Badge>
            )}
            <OptionsProcedimientos id={procedimiento?.id!} />
          </h1>
          <p className="text-sm text-black/50 max-w-[312px] md:max-w-[512px]">
            {procedimiento?.desc}
          </p>
        </div>
        <div className="flex gap-4">
          <div>
            <p className="text-sm font-medium text-black/70">Total: </p>
            <p className="text-sm font-medium text-black/70">Recaudaddo: </p>
            <p className="text-sm font-medium text-black/70">Resto: </p>
          </div>
          <div>
            <p className="text-sm font-bold text-black flex justify-between items-center">
              <span className="text-xs font-medium text-black/70 mr-1 ">
                PEN
              </span>
              {procedimiento?.monto_total}
            </p>
            <p className="text-sm font-bold  flex justify-between items-center text-green-500">
              <span className="text-xs font-medium text-black/70 mr-1">
                PEN
              </span>
              {procedimiento?.recaudado}
            </p>
            <p className="text-sm font-bold  flex justify-between items-center text-red-500">
              <span className="text-xs font-medium text-black/70 mr-1">
                PEN
              </span>
              {procedimiento?.monto_total! - procedimiento?.recaudado!}
            </p>
          </div>
        </div>
      </div>
      <div
        className={cn(
          'flex flex-col gap-6 md:flex-row',
          procedimiento?.estado != pendiente &&
            'select-none pointer-events-none opacity-45'
        )}
      >
        <div className="flex-1">
          <div className="flex flex-row justify-between items-center">
            <h3 className="font-semibold">Citas</h3>
            <ButtonNewDate
              type={'procedimiento'}
              procedimientoId={idProcedimiento}
            />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            {dates?.map(item => (
              <ItemDate {...item} key={item.id} />
            ))}
          </div>
        </div>
        <div className="min-w-[312px]">
          <div className="flex flex-row justify-between items-center">
            <h3 className="font-semibold">Pagos</h3>
            <ButtonNewPago procedimientoId={idProcedimiento} />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            {procedimiento?.pagos.map(item => (
              <ItemPago {...item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
