import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { columns } from '@/components/users/columns'
import { DataTable } from '@/components/data-table'

import DATA from '@/lib/config/labels.json'
import { fetchUsers } from '@/lib/actions/users'
import ButtonNewPatient from '@/components/patients/ButtonNewPatient'

const { pacientes } = DATA

const Page = async () => {
  const { users } = await fetchUsers()

  return (
    <div className="py-3 px-4 rounded-xl bg-white">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-medium text-lg">{pacientes.title}</h2>
          <p className="text-black/70 text-sm">{pacientes.desc}</p>
        </div>
        <ButtonNewPatient />
      </div>
      <Separator className="my-3" />
      <DataTable columns={columns} data={users!} />
    </div>
  )
}

export default Page
