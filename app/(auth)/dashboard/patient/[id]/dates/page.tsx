import { fetchDatesPatient } from '@/lib/actions/dates'
import React from 'react'

import OpcionsPatientDates from '@/components/dates/OpcionsPatientDates'
import { Button } from '@/components/ui/button'
import { Configuration01Icon } from '@/components/icons/Configuration01Icon'
import { Badge } from '@/components/ui/badge'

interface PagePatientProps {
  params: { id: string }
}

const Page: React.FC<PagePatientProps> = async ({ params: { id } }) => {
  const { dates } = await fetchDatesPatient(id)

  return (
    <section className="w-full  bg-white rounded-2xl p-4 relative">
      <div className=" flex flex-col gap-3">
        {dates?.map(item => (
          <div
            key={item.id}
            className="w-full rounded-xl border justify-between p-6 flex flex-row gap-4 items-center"
          >
            <div>
              <h3 className="text-base font-semibold">01 julio 2025</h3>
              <p className="text-black/70 text-sm">9:00 am - 11:00 am</p>
            </div>
            <div>
              <h3 className="text-base font-semibold">Retiro de muela</h3>
              <p className="text-black/70 text-sm">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit
                tenetur exercitationem ut explicabo iusto ea repellendus, ullam
                tempore placeat rem.
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
            <div>
              <OpcionsPatientDates id={item.id} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Page
