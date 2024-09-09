import ButtonDeleteFile from '@/components/files/ButtonDeleteFile'
import ButtonUploadOdontograma from '@/components/files/ButtonUploadOdontograma'
import { fetchFilesOdontogramaPatient } from '@/lib/actions/files'
import { Image } from 'lucide-react'
import React from 'react'

interface PageProps {
  params: { id: string }
}

const Page: React.FC<PageProps> = async ({ params: { id } }) => {
  const { files } = await fetchFilesOdontogramaPatient(id)

  return (
    <div className="py-3 px-4 rounded-xl bg-white">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">Odontogramas</h3>
        </div>
        <div>
          <ButtonUploadOdontograma id={id} />
        </div>
      </div>
      <div className=" mt-4 flex flex-col gap-2">
        {files?.map(item => (
          <div
            className="border p-3 rounded-xl flex gap-3 items-center"
            key={item.id}
          >
            <div className="bg-primary/5 h-8 w-8 flex justify-center items-center rounded-lg">
              <Image className="text-primary/40" size={18} />
            </div>
            <div className="flex-1">
              <a href={item.path} target="_blank" rel="noopener noreferrer">
                {item.name}
              </a>
            </div>
            <div className="flex gap-3 flex-row">
              <div className="text-black/70">{item.size}</div>
              <div>
                <ButtonDeleteFile id={item.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
