import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { columns } from '@/components/users/columns'
import { DataTable } from '@/components/users/data-table'

const Page = () => {
  return (
    <div className="py-3 px-4 rounded-xl bg-white">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-medium text-lg">Lorem ipsum dolor sit.</h2>
          <p className="text-black/70 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
            tempore.
          </p>
        </div>
        <Button className="rounded-xl">Agregar</Button>
      </div>
      <Separator className="my-3" />
      <DataTable columns={columns} data={[]} />
    </div>
  )
}

export default Page
