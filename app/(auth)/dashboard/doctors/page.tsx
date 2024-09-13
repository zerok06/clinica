import { Separator } from '@/components/ui/separator'

import DATA from '@/lib/config/labels.json'
import { DataTable } from '@/components/data-table'
import { fetchDoctors } from '@/lib/actions/doctors'
import { columns } from '@/components/doctors/columns'
import ButtonNewDoctor from '@/components/doctors/ButtonNewDoctor'

const { doctors: Doctors } = DATA

const Page = async () => {
  const { doctors = [] } = await fetchDoctors()

  return (
    <div className="py-3 px-4 rounded-xl bg-white">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-medium text-lg">{Doctors.title}</h2>
          <p className="text-black/70 text-sm">{Doctors.desc}</p>
        </div>
        <ButtonNewDoctor />
      </div>
      <Separator className="my-3" />
      <DataTable
        columns={columns}
        excelName="insumos"
        filterColumn="nombres"
        data={doctors!}
      />
    </div>
  )
}

export default Page
