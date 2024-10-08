import { Separator } from '@/components/ui/separator'

import DATA from '@/lib/config/labels.json'
import { columns } from '@/components/treatments/columns'
import { columns as columnsCate } from '@/components/categorieTreatment/columns'
import { categoriesTreatments, fetchTreatments } from '@/lib/actions/treatments'
import { DataTable } from '@/components/data-table'
import ButtonNewTreatment from '@/components/ButtonNewTreatment'
import ButtonNewCategoryTreatment from '@/components/treatments/ButtonNewCategoryTreatment'

const { tratamientos: Trat } = DATA

const Page = async () => {
  const { tratamientos = [] } = await fetchTreatments()
  const { categories = [] } = await categoriesTreatments()

  return (
    <>
      <div className="py-3 mb-4 px-4 rounded-xl bg-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-medium text-lg">Categorias</h2>
          </div>
          <ButtonNewCategoryTreatment />
        </div>
        <DataTable
          columns={columnsCate}
          excelName="categorias"
          data={categories!}
        />
      </div>
      <div className="py-3 px-4 rounded-xl bg-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-medium text-lg">{Trat.title}</h2>
            <p className="text-black/70 text-sm">{Trat.desc}</p>
          </div>
          <ButtonNewTreatment categories={categories!} />
        </div>
        <Separator className="my-3" />
        <DataTable
          columns={columns}
          excelName="tratamientos"
          data={tratamientos!}
        />
      </div>
    </>
  )
}

export default Page
