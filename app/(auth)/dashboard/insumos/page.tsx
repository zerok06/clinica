import { Separator } from '@/components/ui/separator'

import DATA from '@/lib/config/labels.json'
import { DataTable } from '@/components/data-table'
import ButtonNewInsumo from '@/components/insumos/ButtonNewInsumo'
import { fetchInsumo } from '@/lib/actions/insumos'
import { columns } from '@/components/insumos/columns'

const { insumos: Insu } = DATA

const Page = async () => {
  const { insumos } = await fetchInsumo()

  return (
    <div className="py-3 px-4 rounded-xl bg-white">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-medium text-lg">{Insu.title}</h2>
          <p className="text-black/70 text-sm">{Insu.desc}</p>
        </div>
        <ButtonNewInsumo />
      </div>
      <Separator className="my-3" />
      <DataTable columns={columns} data={insumos!} />
    </div>
  )
}

export default Page
