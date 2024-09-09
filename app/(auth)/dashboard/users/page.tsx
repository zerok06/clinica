import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { columns } from '@/components/users/columns'
import { DataTable } from '@/components/data-table'

import DATA from '@/lib/config/labels.json'
import { fetchUsers } from '@/lib/actions/users'
import ExcelExport from '@/components/ExcelExport'
import ButtonNewUser from '@/components/users/ButtonNewUser'

const { usuarios } = DATA

const Page = async () => {
  const { users = [] } = await fetchUsers()

  return (
    <div className="py-3 px-4 rounded-xl bg-white">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-medium text-lg">{usuarios.title}</h2>
          <p className="text-black/70 text-sm">{usuarios.desc}</p>
        </div>
        <div>
          <ExcelExport data={users!} fileName="users" />
          <ButtonNewUser />
        </div>
      </div>
      <Separator className="my-3" />
      <DataTable columns={columns} data={users!} />
    </div>
  )
}

export default Page
