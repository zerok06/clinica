import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/data-table'

import DATA from '@/lib/config/labels.json'
import { fetchTemplateMessage } from '@/lib/actions/message'
import { columns } from '@/components/messages/columns'
import ButtonNewMenssage from '@/components/messages/ButtonNewMenssage'

const { messages } = DATA

const Page = async () => {
  const { plantillas = [] } = await fetchTemplateMessage()

  return (
    <div className="py-3 px-4 rounded-xl bg-white">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-medium text-lg">{messages.title}</h2>
          <p className="text-black/70 text-sm">{messages.desc}</p>
        </div>
        <div>
          <ButtonNewMenssage />
        </div>
      </div>
      <Separator className="my-3" />
      <DataTable
        columns={columns}
        filterColumn="asunto"
        data={plantillas!}
        excelName="users"
      />
    </div>
  )
}

export default Page
