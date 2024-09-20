import { DataTable } from '@/components/data-table'
import ButtonNewProcedimiento from '@/components/procedimientos/ButtonNewProcedimiento'
import { columns } from '@/components/procedimientos/columns'
import { Separator } from '@/components/ui/separator'
import { fetchProcedimiento } from '@/lib/actions/procedimientos'
import {
  fetchTratamientoPacienteOrdontograma,
  fetchTreatments,
} from '@/lib/actions/treatments'
import React from 'react'

interface PagePatientProps {
  params: { id: string }
}

const Page: React.FC<PagePatientProps> = async ({ params: { id } }) => {
  const { tratamientos } = await fetchTreatments()
  const { tratamientos: tratamientosPacienteOdontograma } =
    await fetchTratamientoPacienteOrdontograma(id)
  const { procedimientos } = await fetchProcedimiento()

  return (
    <div className="py-3 px-4 rounded-xl bg-white">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-medium text-lg">Procedimientos</h2>
          <p className="text-black/70 text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat,
            dolorum.
          </p>
        </div>
        <ButtonNewProcedimiento
          recomendados={tratamientosPacienteOdontograma!}
          tratamientos={tratamientos!}
          patientId={id}
        />
      </div>
      <Separator className="my-3" />
      <DataTable
        columns={columns}
        filterColumn="title"
        excelName="procedimientos"
        data={procedimientos!}
      />
    </div>
  )
}

export default Page
