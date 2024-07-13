import { Separator } from '@/components/ui/separator'

import DATA from '@/lib/config/labels.json'
import { columns } from '@/components/diagnosis/columns'
import { DataTable } from '@/components/data-table'
import ButtonNewDiagnosis from '@/components/ButtonNewDiagnosis'
import { fetchDiagnosis } from '@/lib/actions/diagnosis'
import { fetchTreatments } from '@/lib/actions/treatments'

const { diagnostico: Diag } = DATA

const Page = async () => {
  const { tratamientos } = await fetchTreatments()
  const { diagnoses } = await fetchDiagnosis()

  return (
    <div className="py-3 px-4 rounded-xl bg-white">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-medium text-lg">{Diag.title}</h2>
          <p className="text-black/70 text-sm">{Diag.desc}</p>
        </div>
        <ButtonNewDiagnosis treatments={tratamientos!} />
      </div>
      <Separator className="my-3" />
      <DataTable columns={columns} data={diagnoses!} />
    </div>
  )
}

export default Page
